biolog.RuleCollection = new Mongo.Collection('biolog.rules');

//BiologRuleCollection.attachSchema(
//    new SimpleSchema({
//        name: { type: String, label: "Name" },
//        description: { type: String, label: "Description" }, //the description
//        etypes: { type: [String], optional: true, index: 1 }, //the types of entities this can be applied to
//        contexts: { type: [String], optional: true, index: 1 }, //a list of tags that can be used for filtering rules.  Examples: health, fatigue
//        inputs: { type: [String], optional: true, index: 1 }, //the input properties that this rule requires
//        block: { type: Object, blackbox: true, optional: true }, //object containing nested rule logic. Has conjunction, array of clauses, and array of blocks
//        //ifQuery: { type: Object, blackbox: true, optional: true }, //the ElasticSearch filter/ query, capable of being percolated (apply many rules to 1 entity) or searched (apply 1 rule to many entities)
//        then: { type: [Object], blackbox: true, optional: true }, //array containing consequents.  Each has a predicate and object.  Value can be static or from formula
//        priority: { type: Number, decimal: true, defaultValue: 100 }
//    })
//);

biolog.Rule = Astro.Class({
    name: "biolog.Rule",
    collection: biolog.RuleCollection,
    fields: {
        name: { type: "string", label: "Name" },
        description: { type: "string", label: "Description" }, //the description
        tags: { type: "array", optional: true, index: 1 }, //a list of tags that can be used for filtering rules.  Examples: health, fatigue
        inputs: { type: "array", optional: true, index: 1 }, //the properties that this rule requires as inputs
        outputs: { type: "array", optional: true, index: 1 }, //the properties that this rule generates as outputs
        block: { type: "object", optional: true }, //object containing nested rule's IF logic. Has conjunction, array of clauses, and array of blocks
        query: { type: "object", optional: true }, //mongo query object
        then: { type: "array", optional: true }, //array containing consequents.  Each has a predicate.  Can have a static value or object ID or another rule
        priority: { type: "number", decimal: true, default: 100 },
        expression: { type: "string", optional: true }, //Javascript expression, for testing this rule against an object
        elasticSearchQuery: { type: "object", optional: true } //ElasticSearch query for testing this rule against a ElasticSearch collection
    }
});