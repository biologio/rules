/**
 * Created by dd on 1/15/15.
 */


//var jexl = new Jexl();
//var Jexl = NPM.require('jexl');

//NPM.require('jexl');

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
    return block;
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
    console.log("addClause: add to " + blockPath, clause);
    var block = biolog.BiologUtil.getValuePath(this.rule, blockPath);
    var newIndex = block.clauses.length;
    var newPath = blockPath + ".clauses[" + newIndex + "]";
    clause.path = newPath;
    block.clauses.push(clause);
    return clause;
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
    if (! clausePath) return;
    biolog.BiologUtil.setValuePath(this.rule, clausePath, clause);
    //block.clauses = clauses;
};

biolog.RuleTool.prototype.removeClause = function(clausePath) {
    if (! clausePath) return;
    console.log("Remove: " + clausePath + " from", this.rule);
    var truncatePostition = clausePath.lastIndexOf("[");
    var clausesPath = clausePath.substring(0, truncatePostition);
    var clausesArray = biolog.BiologUtil.getValuePath(this.rule, clausesPath);
    var closeBracket = clausePath.lastIndexOf("]");
    var clauseIndex = clausePath.substring(truncatePostition +1, closeBracket);
    for (var i=clauseIndex; i < clausesArray.length; i++) {
        var currentPath = clausesPath + "[" + i + "]";
        var clause = clausesArray[i];
        clause.path = currentPath;
    }
    delete clausesArray[clauseIndex];
    biolog.BiologUtil.setValuePath(this.rule, clausesPath, clausesArray);
    //block.clauses = clauses;
};

biolog.RuleTool.prototype.getClause = function(clauses, clausePath) {
    if (! clausePath) clausePath = "block.clauses[0]";
    var clause = biolog.BiologUtil.getValuePath(this.rule, clausePath);
    return clause;
};
