/**
 * Created by dd on 12/12/15.
 */

//var Jexl = Meteor.npmRequire('jexl');
//var Future = Meteor.npmRequire('fibers/future');

//if (Meteor.isServer()) {
    var Jexl = Npm.require('jexl');
    var Future = Npm.require('fibers/future');
    global.Promise = Npm.require('promise');
//}

Jexl.addTransform('isValidAndContainsProperty', function(val, property, id) {
    if (val.valid <= 0) return false;
    if (! val.data || ! val.data[property] || ! val.data[property][id]) return false;
    return true;
});


//Promise = Npm.require('promise');

biolog.Ruler = function(expressionsArray) {
    expressions = [];
    if (expressionsArray) expressions = expressionsArray;
};

biolog.Ruler.prototype.testExpression = function(expression, object) {
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


//biolog.Ruler.prototype.apply = function(object) {
//    //var jexl = Jexl;
//    for (var exprI in this.expressions) {
//        var expression = this.expressions[exprI];
//
//        var result = Async.runSync(function(done) {
//            Jexl.eval(_self.rule.expression, object, function(err, data) {
//                done(null, data);
//            });
//        });
//    }
//    console.log("RuleTool testing expression: " + this.rule.expression);
//
//    return result;
//};