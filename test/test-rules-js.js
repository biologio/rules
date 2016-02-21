

Tinytest.add('biolog:rules test 1 nutrition rule', function (test) {
    var rule = biolog.rules.Diet[1];
    var expr = biolog.RuleTool.buildJSRuleExpression(rule);
    console.log("Test condition rule has expression: " + expr);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_dailyIntake: {fruit: {normVal: 0} } }) === 1);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_dailyIntake: {fruit: {normVal: 1} } }) === 0.9);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_dailyIntake: {fruit: {normVal: 1.99999} } }) === 0.9);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_dailyIntake: {fruit: {normVal: 2} } }) === 0.825);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_dailyIntake: {fruit: {normVal: 6.77777} } }) === 0.795);
    test.isTrue(biolog.RuleTool.applyFunction(expr, {diet_dailyIntake: {fruit: {normVal: 999999} } }) === 0.795);
});

Tinytest.add('biolog:rules test fruit nutrition rule', function (test) {
    var ruler = new biolog.Ruler();
    ruler.addRules(biolog.rules.Diet);
    //var results = ruler.applyRules({diet_daily_fruit: 2});
    var results = ruler.applyRules( {diet_dailyIntake: {fruit: {normVal: 2} } });
    test.isTrue(results[0].result === 0.825);
});

Tinytest.add('biolog:rules test apply rule to patient object', function (test) {
    var ruler = new biolog.Ruler();
    ruler.addRules(biolog.rules.Diet);
    var results = ruler.applyRules(testPatient.data);
    console.log("Test all nutrition rules has results: ", results);
    test.isTrue(results[0].result === 0.81);
});