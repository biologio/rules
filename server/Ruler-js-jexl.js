/**
 * Created by dd on 12/12/15.
 */

var Jexl = Npm.require('jexl');
var Future = Npm.require('fibers/future');
global.Promise = Npm.require('promise');

//biolog.Ruler.prototype.expressions = [];

biolog.Ruler.testExpression = function(expression, object) {
    console.log("testExpression: " + expression);
    console.time("testExpression: " + expression);

    var future = new Future();

    Jexl.eval(expression, object, function(err, data) {
        if (err) {
            console.error("Ruler.testExpression error: ", err);
            future.throw(err);
        } else {
            console.log("Ruler.testExpression success: ", data);
            future.return(data);
        }
    });


    // Wait for all the futures to complete.
    return future.wait();

    console.time("testExpression: " + expression);
};

biolog.Ruler.applyRules = function(rules, collection, entity) {
    var results = [];
    for (var ri in rules) {
        var rule = rules[ri];
        var expr = rule.expression;
        if (!expr) expr = biolog.RuleTool.buildJSRuleExpression(rule);
        console.log("Ruler.applyRules: test expression=", expr);
        var data = biolog.Ruler.testExpression(expr, entity);
        console.log("Ruler.applyRules: result for expression=" + expr + " is", data);
        results.push(data);
    }
    return results;
};