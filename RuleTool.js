/**
 * Created by dd on 11/8/15.
 */

biolog.RuleTool = {};

biolog.RuleTool.newRule = function(property, operator, values, aggregate) {
    if (!aggregate) aggregate = "and";
    return {
        property: property,
        operator: operator,
        values: values,
        aggregate: aggregate,
        tags: []
    };
};


//biolog.RuleTool.getMongoOperator = function(str) {
//    var oper = "$eq";
//    if (str == "==") {
//        oper = "$eq";
//    }
//    if (str == ">") {
//        oper = "$gt";
//    }
//    if (str == "<") {
//        oper = "$lt";
//    }
//    if (str == ">=") {
//        oper = "$gte";
//    }
//    if (str == "<=") {
//        oper = "$lte";
//    }
//    if (str == "!=") {
//        oper = "$neq";
//    }
//    if (str == "in") {
//        oper = "$in";
//    }
//    if (str == "!in") {
//        oper = "$nin";
//    }
//    if (str == "exists") {
//        oper = "$exists";
//    }
//    if (str == "!exists") {
//        oper = "$exists";
//    }
//    return oper;
//};



//biolog.RuleTool.newRule = function(property, operator, values, path, negated) {
//    return {
//        property: property,
//        operator: operator,
//        values: values,
//        path: path,
//        negated: negated
//    };
//};

//biolog.RuleTool.newExpression = function(conjunction, property, operator, values, path, negated) {
//    return {
//        property: property,
//        operator: operator,
//        values: values,
//        path: path,
//        negated: negated
//    };
//};