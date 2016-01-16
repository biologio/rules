/**
 * Created by dd on 1/15/15.
 */

biolog.RuleTool.prototype.buildJSExpression = function() {
    this.rule.expression = biolog.RuleTool.buildJSBlockExpression(this.rule.block);
};


biolog.RuleTool.buildJSBlockExpression = function(block) {
    var expr = "";
    var conj = block.conjunction;

    //loop thru each clause
    for (var ci in block.clauses) {
        //for this clause, build an expression
        var clause = block.clauses[ci];
        var clauseExpression = biolog.RuleTool.buildJSClauseExpression(clause);
        if (expr.length > 0) expr += " " + conj + " ";
        expr += "(" + clauseExpression + ")";
        //expr += clauseExpression;
    }//next clause

    //loop thru each block
    for (var bi in block.blocks) {
        //for this block, build an expression
        var block = block.blocks[bi];

        var blockExpression = biolog.RuleTool.buildJSBlockExpression(block);
        if (expr.length > 0) expr += " " + conj + " ";
        expr += "(" + blockExpression + ")";
        //expr += blockExpression;
    }//next block

    return expr;
};


biolog.RuleTool.buildJSClauseExpression = function(clause) {
    var expr = "";
    console.log("buildJSClauseExpression for ", clause);
    if (clause.negated) clause += "! ";
    expr += clause.property;

    var valueStr = "";
    if( Object.prototype.toString.call( clause.values ) === '[object Array]' ) {

        //values contains an array
        valueStr  += "[";
        for (var i in clause.values) {
            var value = clause.values[i];
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

        if (biolog.BiologUtil.isNumber(clause.values)) {
            valueStr += clause.values;
        } else if (biolog.BiologUtil.isString(clause.values)) {
            valueStr += '"' + clause.values + '"';
        }
        //TODO support dates
    }
    if (clause.subproperty) {
        expr += "[." + clause.subproperty + " " + clause.operator + " " + valueStr + "]";
    } else {
        expr += " " + clause.operator + " " + valueStr;
    }
    if (typeof clause.trueVal != 'undefined' && typeof clause.trueVal != "null") {
        expr += " ? " + clause.trueVal;
    }

    if (typeof clause.falseVal != 'undefined' && typeof clause.falseVal != "null") {
        expr += " : " + clause.falseVal;
    }

    return expr;
};







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


biolog.RuleTool.prototype.buildJSClauseExpression = function(rule, context) {
    //console.log("buildJSClauseExpression for ", rule);
    var expr = "";
    if (context) {
        expr += "[.";
    }

    //if (rule.negated) rule += "! ";
    expr += rule.property;
    if (rule.operator) expr += " " + rule.operator + " ";
    var valueStr = "";
    if (!rule.values) return expr;
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



    //if (typeof rule.trueVal != 'undefined' && typeof rule.trueVal != "null") {
    //    expr += " ? " + rule.trueVal;
    //}
    //
    //if (typeof rule.falseVal != 'undefined' && typeof rule.falseVal != "null") {
    //    expr += " : " + rule.falseVal;
    //}

    return expr;
};







//REPEAT??

biolog.RuleTool.buildJSExpression = function(rule) {
    return biolog.RuleTool.buildJSBlockExpression(rule);
};


biolog.RuleTool.buildJSBlockExpression = function(block) {
    var expr = "";
    var conj = block.conjunction;

    //loop thru each clause
    for (var ci in block.clauses) {
        //for this clause, build an expression
        var clause = block.clauses[ci];
        var clauseExpression = biolog.RuleTool.buildJSClauseExpression(clause);
        if (expr.length > 0) expr += " " + conj + " ";
        expr += "(" + clauseExpression + ")";
        //expr += clauseExpression;
    }//next clause

    //loop thru each block
    for (var bi in block.blocks) {
        //for this block, build an expression
        var block = block.blocks[bi];

        var blockExpression = biolog.RuleTool.buildJSBlockExpression(block);
        if (expr.length > 0) expr += " " + conj + " ";
        expr += "(" + blockExpression + ")";
        //expr += blockExpression;
    }//next block

    return expr;
};


biolog.RuleTool.buildJSClauseExpression = function(clause) {
    var expr = "";
    console.log("buildJSClauseExpression for ", clause);
    if (clause.negated) clause += "! ";
    expr += clause.property;

    var valueStr = "";
    if( Object.prototype.toString.call( clause.values ) === '[object Array]' ) {

        //values contains an array
        valueStr  += "[";
        for (var i in clause.values) {
            var value = clause.values[i];
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

        if (biolog.BiologUtil.isNumber(clause.values)) {
            valueStr += clause.values;
        } else if (biolog.BiologUtil.isString(clause.values)) {
            valueStr += '"' + clause.values + '"';
        }
        //TODO support dates
    }
    if (clause.subproperty) {
        expr += "[." + clause.subproperty + " " + clause.operator + " " + valueStr + "]";
    } else {
        expr += " " + clause.operator + " " + valueStr;
    }
    if (typeof clause.trueVal != 'undefined' && typeof clause.trueVal != "null") {
        expr += " ? " + clause.trueVal;
    }

    if (typeof clause.falseVal != 'undefined' && typeof clause.falseVal != "null") {
        expr += " : " + clause.falseVal;
    }

    return expr;
};


