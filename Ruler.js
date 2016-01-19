
biolog.Ruler = function() {
    this.rules = [];
    this.functions = [];
};

biolog.Ruler.prototype.addRules = function(newRules) {

    for (var ri in newRules) {
        var rule = newRules[ri];
        this.rules.push(rule);
        var expr = rule.expression;
        if (!expr) expr = biolog.RuleTool.buildJSRuleExpression(rule);
        var fn = new Function("context", expr);
        this.functions.push(fn);
    }
};


biolog.Ruler.prototype.applyRules = function(context) {
    var results = [];
    for (var ri in this.rules) {
        var rule = this.rules[ri];
        var fn = this.functions[ri];
        var result = fn(context);
        if (!result) continue;
        results.push({
            rule: rule,
            result: result
        });
        return results;
    }
};