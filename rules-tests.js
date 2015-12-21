// Write your tests here!
// Here is an example.

Tinytest.add('biolog:rules basic rule', function (test) {
    var ruler = new biolog.Ruler();
    var ruleTool = new biolog.RuleTool();
    var clause = biolog.RuleUtil.newClause("prop1", "==", 7);
    ruleTool.addClause(clause);
    test.equal(clause.path, "block.clauses[0]", "Expected clause.path to equal 'block.clauses[0]'");
    ruleTool.buildExpression();
    test.isTrue(ruler.testExpression(ruleTool.rule.expression, {prop1: 7}), "Expected prop1 to equal 7");
    test.isFalse(ruler.testExpression(ruleTool.rule.expression, {prop1: 8}), "Expected prop1 to NOT equal 8");
});


Tinytest.add('biolog:rules complex rule', function (test) {
    var complexObj = {
        prop1: "tan",
        lev1: {
            "prop 2": "pink",
            "lev 2": {
                "prop 3a": "black",
                "prop 3b": ["yellow", "blue"],
                arr3: [{prop4a: ["red", "white"]}, {prop4b: ["purple", "gray"]}, {prop4c: ["red", "blue", "green"]}]
            }
        }
    };
    //console.log("lev1.lev2.prop2a='" + complexObj.lev1.lev2.prop3a + "'");
    var ruler = new biolog.Ruler();
    var ruleTool = new biolog.RuleTool();

    var clause1 = biolog.RuleUtil.newClause("prop1", "==", "tan");
    //var clause1 = biolog.RuleUtil.newClause("lev1.prop1", "in", ["pink", "light blue"]);
    ruleTool.addClause(clause1);
    ruleTool.buildExpression();
    test.isTrue(ruler.testExpression(ruleTool.rule.expression, complexObj), "expected prop1 to equal 'tan'");

    var clause2 = biolog.RuleUtil.newClause("lev1['prop 2']", "==", "pink");
    //var clause1 = biolog.RuleUtil.newClause("lev1.prop1", "in", ["pink", "light blue"]);
    ruleTool.addClause(clause2);
    ruleTool.buildExpression();
    test.isTrue(ruler.testExpression(ruleTool.rule.expression, complexObj), "expected lev1.prop2 to equal 'pink'");

    var clause3 = biolog.RuleUtil.newClause("lev1['lev 2']['prop 3a']", "in", ['red', 'black', 'green']);
    ruleTool.addClause(clause3);
    ruleTool.buildExpression();
    test.isTrue(ruler.testExpression(ruleTool.rule.expression, complexObj), "expected lev1['lev 2']['prop 3a'] to contain one of: ['red', 'black', 'green']");

    var clause4 = biolog.RuleUtil.newClause("lev1['lev 2']['prop 3a']", "in", ['red', 'blue', 'green']);
    var falseClause = ruleTool.addClause(clause4);
    ruleTool.buildExpression();
    test.isFalse(ruler.testExpression(ruleTool.rule.expression, complexObj), "expected lev1['lev 2']['prop 3a'] to contain one of: ['red', 'blue', 'green']");

    //remove the offending clause
    console.log("falseClause=", falseClause);
    ruleTool.removeClause(falseClause.path);
    ruleTool.buildExpression();
    console.log("Changed expression to: ", ruleTool.rule.expression);
    test.isTrue(ruler.testExpression(ruleTool.rule.expression, complexObj), "No longer expected lev1['lev 2']['prop 3a'] to contain one of: ['red', 'blue', 'green']");

});