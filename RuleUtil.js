/**
 * Created by dd on 11/8/15.
 */

biolog.RuleUtil = {};

biolog.RuleUtil.newRule = function(conjunction, tags) {
    //return new biolog.Rule({
    //    tags: tags,
    //    block: biolog.RuleUtil.newBlock("&&", "block")
    //});

    if (!conjunction) conjunction = "&&";
    return {
        tags: tags,
        block: biolog.RuleUtil.newBlock(conjunction, "block")
    };
};

/**
 * Each block has an operation.  Default is boolean.  Others include: sum
 * @param conjunction
 * @param internalPath
 * @returns {{operation: string, conjunction: *, clauses: Array, blocks: Array, internalPath: *}}
 */
biolog.RuleUtil.newBlock = function(conjunction, internalPath) {
    return {
        operation: "boolean",
        conjunction: conjunction,
        clauses: [],
        blocks: [],
        internalPath: internalPath
    };
};

biolog.RuleUtil.newClause = function(property, operator, values, trueVal, falseVal, path, negated) {
    return {
        property: property,
        operator: operator,
        values: values,
        path: path,
        trueVal: trueVal,
        falseVal: falseVal,
        negated: negated
    };
};

//biolog.RuleUtil.newRule = function(property, operator, values, path, negated) {
//    return {
//        property: property,
//        operator: operator,
//        values: values,
//        path: path,
//        negated: negated
//    };
//};

//biolog.RuleUtil.newExpression = function(conjunction, property, operator, values, path, negated) {
//    return {
//        property: property,
//        operator: operator,
//        values: values,
//        path: path,
//        negated: negated
//    };
//};