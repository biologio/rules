
Patients = new Mongo.Collection("patients");
Patients.remove({_id: testPatient._id});
Patients.insert(testPatient);


if (Meteor.isServer) {
    Meteor.publish("patients", function () {
        return Patients.find({});
    });
}

if (Meteor.isClient) {
    Meteor.subscribe("patients");
}

Tinytest.add('biolog:rules test query Mongo using patient rule with subproperties', function (test) {

    var rule = {
        //aggregate: "and",
        //rules: [
        //    {
                property: "data.patient/medication.$.valid",
                operator: ">",
                values: 0,
        //property: "data",
        //        aggregate: "and",
        //        rules: [
        //            {
        //                property: "valid",
        //                operator: ">",
        //                values: 0
        //            }
                    //{
                    //    property: "data.medication/ingredient",
                    //    rules: [
                    //        {
                    //            property: "obj",
                    //            operator: "in",
                    //            values: ["C0023660"]
                    //        }
                    //    ]
                    //}
                //],
                transform: {
                    true: 1,
                    false: 0
                }
            //}
        //]
    };

    //rule = {
    //    property: "data.id/sex.text",
    //    operator: "in",
    //    values: ["Male"]
    //};

    //var ruleTool = new biolog.RuleTool(rule);
    //ruleTool.buildJSRuleJSExpression();

    var testQuery = {_id: testPatient._id};
    var testResult = biolog.Ruler.testMongoQuery(testQuery, Patients);
    console.log("Mongo query result= ", testResult);
    test.isTrue(testResult.length > 0, "Expected patient to be in the database.");

    var query = biolog.RuleTool.buildMongoQuery(rule);
    console.log("Tested Mongo query: ", query);
    var result = biolog.Ruler.testMongoQuery(query, Patients);
    console.log("Mongo query result= ", result);
    test.isTrue(result.length > 0, "Expected patient to be on a medicine with ingredient C0023660.");
});