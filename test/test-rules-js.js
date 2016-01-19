

Tinytest.add('biolog:rules test 1 nutrition rule', function (test) {
    var rule = biolog.rules.Diet[1];
    var expr = biolog.RuleTool.buildJSRuleExpression(rule);
    console.log("Test condition rule has expression: " + expr);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 0}) === 1);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 1}) === 0.9);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 1.99999}) === 0.9);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 2}) === 0.825);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 6.77777}) === 0.795);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 99999}) === 0.795);
});

Tinytest.add('biolog:rules test all nutrition rules', function (test) {
    var ruler = new biolog.Ruler();
    ruler.addRules(biolog.rules.Diet);
    var results = ruler.applyRules({diet_daily_fruit: 2});
    console.log("Test all nutrition rules has results: ", results);
    //test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 0}) === 1);
    //test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 1}) === 0.9);
    //test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 1.99999}) === 0.9);
    //test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 2}) === 0.825);
    //test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 6.77777}) === 0.795);
    //test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_daily_fruit: 99999}) === 0.795);
});