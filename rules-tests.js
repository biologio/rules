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
                "prop 3b": ["yellow", "blue"]
                //arr3: [{prop4a: ["red", "white"]}, {prop4b: ["purple", "gray"]}, {prop4c: ["red", "blue", "green"]}]
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

    var falseClause = ruleTool.addClause(clause4);
    ruleTool.buildExpression();
    test.isFalse(ruler.testExpression(ruleTool.rule.expression, complexObj), "expected lev1['lev 2']['prop 3a'] to contain one of: ['red', 'blue', 'green']");

    ruleTool.removeClause(falseClause.path);
    ruleTool.buildExpression();
    console.log("Changed expression to: ", ruleTool.rule.expression);
    test.isTrue(ruler.testExpression(ruleTool.rule.expression, complexObj), "No longer expected lev1['lev 2']['prop 3a'] to contain one of: ['red', 'blue', 'green']");

    var clause5 = biolog.RuleUtil.newClause("lev1['lev 2']['prop 3a']", "in", ['black', 'green', 'yellow']);
    var clause5 = ruleTool.addClause(clause5);
    ruleTool.buildExpression();
    test.isTrue(ruler.testExpression(ruleTool.rule.expression, complexObj), "expected lev1['lev 2']['prop 3a'] to contain one of: ['black', 'green', 'yellow']");

});



Tinytest.add('biolog:rules simulate user building & editing a rule', function (test) {
    var ruler = new biolog.Ruler();
    var ruleTool = new biolog.RuleTool();
    var clause = biolog.RuleUtil.newClause("data['patient/condition'].C0000737.valid", ">", "0", "1", "0");
    ruleTool.addClause(clause);
    ruleTool.buildExpression();
    console.log("Test condition rule: " + ruleTool.rule.expression);
    test.isTrue(ruler.testExpression(ruleTool.rule.expression, patient), "Expected patient conditions to include C000737");
});

//jexl.addTransform('defined', function(val) {
//    if (val) return true;
//    return false;
//});


var patient = {
    _id: "patient/0123456789",
    name: "Random Person",
    etypes: [
        "patient"
    ],
    creator: "WQeBRgtkYQHtCKSKD",
    created: new Date("2015-10-17T09:06:53.269Z"),
    valid: 1,
    data: {
        "id/dob": {
            pred: "id/dob",
            startDate: new Date("1959-06-07T00:00:00Z"),
            startFlag: 0,
            endFlag: 1,
            creator: "WQeBRgtkYQHtCKSKD",
            created: new Date("2015-10-21T02:20:21.534Z"),
            valid: 1,
            _id: "aced09396a727d0789914a41"
        },
        "id/nickname": {
            pred: "id/nickname",
            text: "Random Person",
            startFlag: 0,
            endFlag: 1,
            creator: "WQeBRgtkYQHtCKSKD",
            created: new Date("2015-10-21T02:20:21.593Z"),
            valid: 1,
            _id: "1517ffb1250654c61d450c18"
        },
        "id/sex": {
            pred: "id/sex",
            text: "Male",
            startFlag: 0,
            endFlag: 1,
            creator: "WQeBRgtkYQHtCKSKD",
            created: new Date("2015-10-21T02:20:21.734Z"),
            valid: 1,
            _id: "632aeefd2385284684de6d7b"
        },
        "geo/country": {
            pred: "geo/country",
            text: "US",
            startFlag: 0,
            endFlag: 1,
            creator: "WQeBRgtkYQHtCKSKD",
            created: new Date("2015-10-21T02:20:21.907Z"),
            valid: 1,
            _id: "ea2054b006baebc95e856ee6"
        },
        "geo/zip": {
            pred: "geo/zip",
            startFlag: 0,
            endFlag: 1,
            creator: "WQeBRgtkYQHtCKSKD",
            created: new Date("2015-10-21T02:20:22.033Z"),
            valid: 1,
            _id: "73d9a79ed6cba5cdbe036938"
        },
        "patient/condition": {
            C0011860: {
                pred: "patient/condition",
                obj: "C0011860",
                objName: "Diabetes Type 2",
                startDate: new Date("2005-10-20T08:00:00Z"),
                endFlag: 1,
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-10-21T09:37:57.168Z"),
                startFlag: 0,
                valid: 1,
                endDate: new Date("2014-05-05T08:00:00Z"),
                num: 3,
                _id: "556347e21baaed7c07be7eb9"
            },
            C0000737: {
                pred: "patient/condition",
                obj: "C0000737",
                objName: "Bellyache",
                startDate: new Date("2015-10-25T15:12:07.237Z"),
                endFlag: 1,
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-10-25T15:12:08.739Z"),
                startFlag: 0,
                valid: 1,
                _id: "42cc692356499361df02341a"
            },
            C0019080: {
                pred: "patient/condition",
                obj: "C0019080",
                objName: "Hemorrhage",
                startDate: new Date("2015-10-31T08:00:00Z"),
                endFlag: 1,
                endDate: null,
                num: 2.5,
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-10-31T12:18:39.827Z"),
                startFlag: 0,
                valid: 1,
                _id: "31911a125ae66e29282d11b1"
            },
            C0014591: {
                pred: "patient/condition",
                obj: "C0014591",
                objName: "Nosebleed",
                startDate: new Date("2015-10-31T04:00:00Z"),
                endFlag: 1,
                endDate: null,
                num: 1,
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-11-14T21:33:32.337Z"),
                startFlag: 0,
                valid: 1,
                _id: "7e19cb120422688d815a13bd"
            },
            C0011849: {
                pred: "patient/condition",
                obj: "C0011849",
                objName: "Diabetes Mellitus",
                startDate: new Date("2015-10-31T04:00:00Z"),
                endFlag: 1,
                endDate: null,
                num: 4,
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-11-14T21:33:20.186Z"),
                startFlag: 0,
                valid: 1,
                _id: "209868aa8518790b26d1ff19"
            },
            C0024031: {
                pred: "patient/condition",
                obj: "C0024031",
                objName: "Low Back Pain",
                startDate: new Date("2015-11-16T05:00:00Z"),
                endFlag: 1,
                endDate: null,
                num: 4,
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-11-16T21:33:02.440Z"),
                startFlag: 0,
                valid: 1,
                _id: "f6f9b3c931f80838b265e7dd"
            },
            C0037199: {
                pred: "patient/condition",
                obj: "C0037199",
                objName: "Sinus Infection",
                startDate: new Date("2015-11-19T05:00:00Z"),
                endFlag: 1,
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-11-20T01:50:11.244Z"),
                startFlag: 0,
                valid: 1,
                endDate: null,
                num: 4,
                _id: "758aa5a99dab7ac055be4000"
            },
            C0010200: {
                pred: "patient/condition",
                obj: "C0010200",
                objName: "Cough",
                startDate: new Date("2015-11-06T05:00:00Z"),
                endFlag: 0,
                endDate: new Date("2015-11-21T05:00:00Z"),
                num: 1,
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-11-22T13:43:53.913Z"),
                startFlag: 0,
                valid: 1,
                _id: "105d7eb976105f3d6046ad27"
            }
        },
        "patient/medication": {
            C3249291: {
                pred: "patient/medication",
                obj: "C3249291",
                objName: "Band-Aid Hurt-Free",
                startDate: new Date("2013-10-20T08:00:00Z"),
                endFlag: 1,
                data: {
                    "medication/ingredient": {
                        C0005025: {
                            obj: "C0005025",
                            text: "benzalkonium",
                            num: 100
                        },
                        C0023660: {
                            obj: "C0023660",
                            text: "lidocaine"
                        }
                    },
                    rating: {
                        pred: "rating",
                        text: "3",
                        num: 3
                    },
                    "medication/frequency": {
                        pred: "medication/frequency",
                        text: "1",
                        num: 1
                    }
                },
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-10-21T02:18:36.059Z"),
                startFlag: 0,
                valid: 1,
                endDate: null,
                _id: "812e1cacb9f6304bb8d34a69"
            },
            C0051696: {
                pred: "patient/medication",
                obj: "C0051696",
                objName: "Amlodipine",
                startDate: new Date("2015-10-28T04:00:00Z"),
                endFlag: 1,
                data: {
                    "medication/ingredient": {
                        C0051696: {
                            obj: "C0051696",
                            text: "amlodipine",
                            num: 20
                        }
                    },
                    rating: {
                        pred: "rating",
                        text: "5",
                        num: 5
                    },
                    "medication/frequency": {
                        pred: "medication/frequency",
                        text: "3",
                        num: 3
                    }
                },
                endDate: null,
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-11-14T21:35:03.056Z"),
                startFlag: 0,
                valid: 1,
                _id: "3043ea206d219e4cad239ec3"
            },
            C0020740: {
                pred: "patient/medication",
                obj: "C0020740",
                objName: "Ibuprofen",
                startDate: new Date("2015-11-01T04:00:00Z"),
                endFlag: 1,
                data: {
                    "medication/ingredient": {
                        C0020740: {
                            obj: "C0020740",
                            text: "ibuprofen",
                            num: 200
                        }
                    },
                    "medication/frequency": {
                        pred: "medication/frequency",
                        text: "2",
                        num: 2
                    },
                    rating: {
                        pred: "rating",
                        text: "3",
                        num: 3
                    }
                },
                endDate: new Date("2015-11-23T05:00:00Z"),
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-11-24T02:54:16.470Z"),
                startFlag: 0,
                valid: 1,
                _id: "64aa2aba4986d0a900f909b5"
            },
            C0004057: {
                pred: "patient/medication",
                obj: "C0004057",
                objName: "Aspirin",
                startDate: new Date("2015-11-23T05:00:00Z"),
                endFlag: 1,
                data: {
                    "medication/ingredient": {
                        C0004057: {
                            obj: "C0004057",
                            text: "aspirin"
                        }
                    },
                    "medication/frequency": {
                        pred: "medication/frequency",
                        text: "1",
                        num: 1
                    },
                    rating: {
                        pred: "rating",
                        text: "5",
                        num: 5
                    }
                },
                endDate: null,
                creator: "WQeBRgtkYQHtCKSKD",
                created: new Date("2015-11-24T03:20:13.541Z"),
                startFlag: 0,
                valid: 1,
                _id: "e1ec503b3ad69f65d80bbe80"
            }
        }
    }
};