

Tinytest.add('biolog:rules basic rule', function (test) {
    //var biolog.Ruler = new biolog.Ruler();
    //var ruleTool = new biolog.RuleTool();
    var rule = biolog.RuleTool.newRule("prop1", "==", 7);

    //ruleTool.addRule(rule);
    test.equal(rule.aggregate, "and", "Expected rule.aggregate to equal 'and'");
    var expr = biolog.RuleTool.buildJSRuleExpression(rule);
    test.isTrue(biolog.Ruler.testExpression(expr, {prop1: 7}), "Expected prop1 to equal 7");
    test.isFalse(biolog.Ruler.testExpression(expr, {prop1: 8}), "Expected prop1 to NOT equal 8");
});


Tinytest.add('biolog:rules complex rule', function (test) {
    var complexObj = {
        prop1: "tan",
        lev1: {
            "prop 2": "pink",
            "lev 2": {
                "prop 3a": "black",
                "prop 3b": ["yellow", "blue"]
                //arr3: [{prop4a: ["red", "white"]}, {prop4b: ["purple", "gray"]}, {prop4c: ["red", "blue", "green"]}]
            }
        }
    };

    var rule = biolog.RuleTool.newRule();
    rule.rules = [];

    var rule1 = biolog.RuleTool.newRule("prop1", "==", "tan");
    rule.rules.push(rule1);
    //var rule1 = biolog.RuleTool.newRule("lev1.prop1", "in", ["pink", "light blue"]);
    var expr = biolog.RuleTool.buildJSRuleExpression(rule);
    test.isTrue(biolog.Ruler.testExpression(expr, complexObj), "expected prop1 to equal 'tan'");

    var rule2 = biolog.RuleTool.newRule("lev1['prop 2']", "==", "pink");
    rule.rules.push(rule2);
    //var rule1 = biolog.RuleTool.newRule("lev1.prop1", "in", ["pink", "light blue"]);
    expr = biolog.RuleTool.buildJSRuleExpression(rule);
    test.isTrue(biolog.Ruler.testExpression(expr, complexObj), "expected lev1.prop2 to equal 'pink'");

    var rule3 = biolog.RuleTool.newRule("lev1['lev 2']['prop 3a']", "in", ['red', 'black', 'green']);
    rule.rules.push(rule3);
    expr = biolog.RuleTool.buildJSRuleExpression(rule);
    test.isTrue(biolog.Ruler.testExpression(expr, complexObj), "expected lev1['lev 2']['prop 3a'] to contain one of: ['red', 'black', 'green']");

    var rule4 = biolog.RuleTool.newRule("lev1['lev 2']['prop 3a']", "in", ['red', 'blue', 'green']);
    rule.rules.push(rule4);
    expr = biolog.RuleTool.buildJSRuleExpression(rule);
    test.isFalse(biolog.Ruler.testExpression(expr, complexObj), "expected lev1['lev 2']['prop 3a'] to contain one of: ['red', 'blue', 'green']");

    //remove the offending rule
    rule.rules.splice(3, 1);
    expr = biolog.RuleTool.buildJSRuleExpression(rule);
    console.log("Changed expression to: ", expr);
    test.isTrue(biolog.Ruler.testExpression(expr, complexObj), "No longer expected lev1['lev 2']['prop 3a'] to contain one of: ['red', 'blue', 'green']");

    var rule5 = biolog.RuleTool.newRule("lev1['lev 2']['prop 3a']", "in", ['black', 'green', 'yellow']);
    rule.rules.push(rule5);
    expr = biolog.RuleTool.buildJSRuleExpression(rule);
    test.isTrue(biolog.Ruler.testExpression(expr, complexObj), "expected lev1['lev 2']['prop 3a'] to contain one of: ['black', 'green', 'yellow']");

});



Tinytest.add('biolog:rules test rule that assigns a value', function (test) {
    var rule = biolog.RuleTool.newRule("data['patient/condition'].C0000737.valid", ">", "0");
    rule.transform = {
        true: 1,
        false: 0
    };
    var expr = biolog.RuleTool.buildJSRuleExpression(rule);
    //console.log("Test condition rule: " + expr);
    //test.isTrue(biolog.Ruler.testExpression(expr, testPatient) === 1, "Expected patient conditions to include C000737");
    test.isTrue(biolog.Ruler.testExpression(expr, testPatient) === 1, "Expected patient conditions to include C000737");
});


Tinytest.add('biolog:rules test subproperties of a patient rule', function (test) {

    var rule = {
        aggregate: "sum",
        rules: [
            {
                property: "data['patient/medication']",
                aggregate: "and",
                rules: [
                    {
                        property: "valid",
                        operator: ">",
                        values: 0
                    }
                    //complex hierarchies not supported yet
                    //{
                    //    property: "data.medication/ingredient",
                    //    rules: [
                    //        {
                    //            property: "obj",
                    //            operator: "in",
                    //            values: ["C002360"]
                    //        }
                    //    ]
                    //}
                ],
                transform: {
                    true: 1,
                    false: 0
                }
            }
        ]
    };
    //var ruleTool = new biolog.RuleTool(rule);
    //ruleTool.buildJSRuleJSExpression();
    var expr = biolog.RuleTool.buildJSRuleExpression(rule);
    console.log("Test condition rule: " + expr);
    test.isTrue(biolog.RuleTool.applyFunction(expr, testPatient), "Expected patient to be on a medicine with ingredient C0023660.");
});


Tinytest.add('biolog:rules test nutrition rules', function (test) {
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