/**
 * Created by dd on 11/8/15.
 */

biolog.RuleUtil = {};

biolog.RuleUtil.newRule = function(tags) {
    return new biolog.Rule({
        tags: tags,
        block: biolog.RuleUtil.newBlock("&&", "block")
    });
};

biolog.RuleUtil.newBlock = function(conjunction, internalPath) {
    return {
        conjunction: conjunction,
        clauses: [],
        blocks: [],
        internalPath: internalPath
    };
};

biolog.RuleUtil.newClause = function(property, operator, values, path, negated) {
    return {
        property: property,
        operator: operator,
        values: values,
        path: path,
        negated: negated
    };
};

//biolog.RuleUtil.newExpression = function(conjunction, property, operator, values, path, negated) {
//    return {
//        property: property,
//        operator: operator,
//        values: values,
//        path: path,
//        negated: negated
//    };
//};