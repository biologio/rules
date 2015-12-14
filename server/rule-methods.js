Meteor.methods({
    /* save an rule and associated methods */

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
        ruleTool.buildExpression();
        ruleTool.buildMongoQuery();
        ruleTool.buildElasticSearchQuery();
        //Rules.insert(rule);
        ruleTool.rule.save();
        return ruleTool.rule;


    }
});