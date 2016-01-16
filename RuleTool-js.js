/**
 * Created by dd on 1/15/15.
 */

biolog.RuleTool.buildJSRuleExpression = function(rule, context) {
    var expr = "";
    var agg = rule.aggregate;
    if (agg == "and") agg = "&&";
    if (agg == "or") agg = "||";
    if (agg == "sum") agg = "+";
    if (! agg) agg = "&&";
    if (rule.property) expr += biolog.RuleTool.buildJSClauseExpression(rule, context);
    if (rule.rules) {
        if (expr) expr += " " + agg + " ";
        expr += biolog.RuleTool.buildJSSubrulesExpression(rule)
    }
    return expr;
};



biolog.RuleTool.buildJSSubrulesExpression = function(rule) {
    var context = rule.property;
    var expr = "";
    var agg = rule.aggregate;
    if (agg == "and") agg = "&&";
    if (agg == "or") agg = "||";
    if (agg == "sum") agg = "+";
    if (! agg) agg = "&&";

    //loop thru each clause
    for (var ci in rule.rules) {
        //for this clause, build an expression
        var r = rule.rules[ci];
        var ruleExpression = biolog.RuleTool.buildJSRuleExpression(r, context);
        if (expr.length > 0) expr += " " + agg + " ";
        expr += "(" + ruleExpression + ")";
    }//next clause

    return expr;
};


biolog.RuleTool.buildJSClauseExpression = function(rule, context) {
    //console.log("buildJSClauseExpression for ", rule);
    var expr = "";
    if (context) {
        expr += context + "[.";
    }

    //if (rule.negated) rule += "! ";
    expr += rule.property;
    if (rule.operator) expr += " " + rule.operator + " ";
    var valueStr = "";
    if (typeof rule.values == 'undefined' || typeof rule.values == "null") {
        if (context) expr += "]";
        return expr;
    }
    if( Object.prototype.toString.call( rule.values ) === '[object Array]' ) {

        //values contains an array
        valueStr  += "[";
        for (var i in rule.values) {
            var value = rule.values[i];
            if (biolog.BiologUtil.isNumber(value)) {
                //do not quote
            } else if (biolog.BiologUtil.isString(value)) {
                value = '"' + value + '"';
            }
            //TODO support dates
            if (i > 0) valueStr += ", ";
            valueStr += value;
        }
        valueStr +=  "]";

    } else {
        //values contains a string or number
        if (biolog.BiologUtil.isNumber(rule.values)) {
            valueStr += rule.values;
        } else if (biolog.BiologUtil.isString(rule.values)) {
            valueStr += '"' + rule.values + '"';
        }
        //TODO support dates
    }

    expr += valueStr;

    if (context) {
        expr += "]";
    }



    //if (rule.subproperty) {
    //    expr += "[." + rule.subproperty + " " + rule.operator + " " + valueStr + "]";
    //} else {
    //    expr += " " + rule.operator + " " + valueStr;
    //}
    //expr += " " + rule.operator + " ";
    //if (! rule.pred || ! rule.objects) return "";


    if (rule.transform) {
        if (typeof rule.transform.true != 'undefined' && typeof rule.transform.true != "null") {
            expr += " ? " + rule.transform.true;
        }

        if (typeof rule.transform.false != 'undefined' && typeof rule.transform.false != "null") {
            expr += " : " + rule.transform.false;
        }
    }
    

    return expr;
};



