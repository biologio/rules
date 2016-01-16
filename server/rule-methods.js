Meteor.methods({
    /* save a rule */
    "biolog/saveRule": function (rule) {
        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            var message = "User not authenticated";
            console.error(message);
            throw new Meteor.Error(403, 'Not permitted', 'User not authenticated');
        }

        //make sure the rule  does not already exists
        var alreadyExisting = biolog.RuleCollection.findOne(rule._id);
        var theDate = new Date();

        //new rule
        if (! alreadyExisting) {
            rule._id = new Meteor.Collection.ObjectID()._str;
            rule.creator = Meteor.userId();
            rule.created = theDate;
            rule.updater = Meteor.userId();
            rule.updated = theDate;
            rule.source = "biolog:rules/server/rule-methods.js";
            console.log("Saving rule: ", rule);
        } else {
            //existing rule:

            //check permissions
            if (rule.creator != Meteor.userId()) {
                var message = "Rule already exists";
                console.error(message);
                throw new Meteor.Error(403, 'Not permitted', 'User does not have permission');
                return;
            }

            //update the rule
            rule._id = alreadyExisting._id;
            rule.updater = Meteor.userId();
            rule.updated = theDate;
            console.log("Updating rule: ", rule);
        }

        if (! rule.validate()) {
            // Send errors back to the client.
            rule.throwValidationException();
            return;
        }
        var ruleTool = new biolog.RuleTool(rule);
        ruleTool.buildJSExpression();
        ruleTool.buildMongoQuery();
        ruleTool.buildElasticSearchQuery();
        //Rules.insert(rule);
        ruleTool.rule.save();
        return ruleTool.rule;
    },

    /**
     *  Apply rules to the provided entity
     *  If entity exists in the DB, merge provided data with that data first
     *  @entity - the entity to apply rules to.  Merge info from the entity into the specified collection
     *  @collection - optional.  The collection containing the entity
     **/
    "biolog/applyRules": function (entity, collection) {
        if (!entity || !entity._id) {
            throw new Meteor.Error(500, 'Error 500: Invalid arguments', 'Must specify the entity to apply rules against');
        }
        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            var message = "User not authenticated";
            console.error(message);
            throw new Meteor.Error(403, 'Not permitted', 'User not authenticated');
        }

        //find the entity
        var storedEntity = collection.findOne(entity._id);
        if (!storedEntity) {
            storedEntity = entity;
            collection.insert(storedEntity);
        }
        //todo merge any entity.data into the stored entity


        biolog.Ruler.applyRules(StaticRules, storedEntity);

    }
});