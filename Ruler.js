
biolog.Ruler = {


    applyFunction: function(expr, context) {
        //console.log("applyFunction: context=", context);
        var fn = new Function("context", expr);
        var result = fn(context);
        //console.log("applyFunction: result=", result);
        return result;
    }
};