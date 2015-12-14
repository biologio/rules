/**
 * Created by dd on 1/15/15.
 */

//var Jexl = Meteor.npmRequire('jexl');
//var Jexl = NPM.require('jexl');

biolog.RuleTool = function(rule) {
    this.rule = null;
    if (rule) {
        this.rule = rule;
    } else {
        this.rule = biolog.RuleUtil.newRule();
    }
    if (!this.rule.block) {
        this.rule.block = {};
    }
};

biolog.RuleTool.prototype.addBlock = function(block, blockPath) {
    if (! blockPath) blockPath = "block";
    var block = biolog.BiologUtil.getValuePath(this.rule, blockPath);
    block.blocks.push(block);
};

biolog.RuleTool.prototype.setBlocks = function(blocks, blockPath) {
    if (! blockPath) blockPath = "block";
    var block = biolog.BiologUtil.getValuePath(this.rule, blockPath);
    block.blocks = blocks;
};

biolog.RuleTool.prototype.getBlocks = function(blocks, blockPath) {
    if (! blockPath) blockPath = "block";
    var block = biolog.BiologUtil.getValuePath(this.rule, blockPath);
    return block.blocks;
};

biolog.RuleTool.prototype.addClause = function(clause, blockPath) {
    if (! blockPath) blockPath = "block";
    //console.log("addClause: add to " + blockPath, clause);
    var block = biolog.BiologUtil.getValuePath(this.rule, blockPath);
    var newIndex = block.clauses.length;
    var newPath = blockPath + ".clauses[" + newIndex + "]";
    clause.path = newPath;
    block.clauses.push(clause);
};

biolog.RuleTool.prototype.setClauses = function(clauses, blockPath) {
    if (! blockPath) blockPath = "block";
    var block = biolog.BiologUtil.getValuePath(this.rule, blockPath);
    block.clauses = clauses;
};

biolog.RuleTool.prototype.getClauses = function(clauses, blockPath) {
    if (! blockPath) blockPath = "block";
    var block = biolog.BiologUtil.getValuePath(this.rule, blockPath);
    return block.clauses;
};

biolog.RuleTool.prototype.setClause = function(clause, clausePath) {
    if (! clausePath) clausePath = "block.clauses[0]";
    biolog.BiologUtil.setValuePath(this.rule, clausePath, clausePath);
    block.clauses = clauses;
};

biolog.RuleTool.prototype.getClause = function(clauses, clausePath) {
    if (! clausePath) clausePath = "block.clauses[0]";
    var clause = biolog.BiologUtil.getValuePath(this.rule, clausePath);
    return clause;
};

biolog.RuleTool.prototype.buildExpression = function() {
    this.rule.expression = biolog.RuleTool.prototype.buildBlockExpression(this.rule.block);
};


biolog.RuleTool.prototype.buildBlockExpression = function(block) {
    var expr = "";
    var conj = block.conjunction.toLowerCase();

    //loop thru each clause
    for (var ci in block.clauses) {
        //for this clause, build an expression
        var clause = block.clauses[ci];
        var clauseExpression = biolog.RuleTool.prototype.buildClauseExpression(clause);
        if (expr.length > 0) expr += " " + conj + " ";
        expr += "(" + clauseExpression + ")";
        //expr += clauseExpression;
    }//next clause

    //loop thru each block
    for (var bi in block.blocks) {
        //for this block, build an expression
        var block = block.blocks[bi];

        var blockExpression = biolog.RuleTool.prototype.buildBlockExpression(block);
        if (expr.length > 0) expr += " " + conj + " ";
        expr += "(" + blockExpression + ")";
        //expr += blockExpression;
    }//next block

    return expr;
};


biolog.RuleTool.prototype.buildClauseExpression = function(clause) {
    var expr = "";
    //console.log("buildClauseExpression for ", clause);
    if (clause.negated) clause += "not ";
    expr += clause.property + " " + clause.operator + " ";
    //if (! clause.pred || ! clause.objects) return "";

    if( Object.prototype.toString.call( clause.values ) === '[object Array]' ) {
        expr  += "(";
        //values contains an array
        for (var i in clause.values) {
            var value = clause.values[i];
            if (biolog.BiologUtil.isNumber(value)) {
                //do not quote
            } else if (biolog.BiologUtil.isString(value)) {
                value = '"' + value + '"';
            }
            //TODO support dates
            if (i > 0) expr += ", ";
            expr += value;
        }
        expr +=  ")";
    } else {
        //values contains a string or number

        if (biolog.BiologUtil.isNumber(clause.values)) {
            expr += clause.values;
        } else if (biolog.BiologUtil.isString(clause.values)) {
            expr += '"' + clause.values + '"';
        }
        //TODO support dates
    }


    return expr;
};

//Filtrex
biolog.RuleTool.prototype.apply = function(object) {
    console.log("RuleTool testing expression: " + this.rule.expression);
    var tester = Filtrex.compileExpression(this.rule.expression);
    var result = tester(object);
    return result;
};

//biolog.RuleTool.prototype.apply = function(object) {
//    var jexl = new Jexl();
//    console.log("RuleTool testing expression: " + this.rule.expression);
//    var result = Async.runSync(function(done) {
//        jexl.eval(this.rule.expression, object, function(err, data) {
//            done(null, data);
//        });
//    });
//    return result;
//};
