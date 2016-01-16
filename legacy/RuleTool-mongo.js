
biolog.RuleTool.buildMongoQuery = function(rule) {
    if (!rule) return;

    var clauseObj = biolog.RuleTool.buildMongoClause(rule);
    console.log("buildMongoQuery: clauseObj=", clauseObj);
    var agg = "$and";
    if (rule.aggregate == "and") {
        agg = "$and";
    } else if (rule.aggregate == "or") {
        agg = "$or";
    } else if (rule.aggregate == "sum") {
        agg = "$sum";
    }
    var queryObj = {};
    queryObj[agg] = [];
    if (clauseObj) queryObj[agg].push(clauseObj);

    if (! rule.rules) {
        //queryObj[agg]
        //queryObj[agg]["$elemMatch"] = [];
        return queryObj;
    }
    //loop thru each clause

    //if a property is defined, then we are doing an $elemMatch query within that context
    if (rule.property) {
        var subqueryObj = {};
        subqueryObj[rule.property] = {"$elemMatch": {} };

        for (var ci in rule.rules) {
            //for this clause, build a clauseQueryObj
            var subrule = rule.rules[ci];
            var subquery = biolog.RuleTool.buildMongoQuery(subrule);
            if (subquery) {
                //if (!queryObj[agg]) queryObj[agg] = [];
                var key = Object.keys(subquery)[0];
                var subsubqueries = subquery[key];
                for (var i in subsubqueries) {
                    var subsubquery = subsubqueries[i];
                    var key2 = Object.keys(subsubquery)[0];
                    var val2 = subsubquery[key2];
                    subqueryObj[rule.property]["$elemMatch"][key2] = val2;
                }
            }
        }
        queryObj[agg].push(subqueryObj);

    } else {

        for (var ci in rule.rules) {
            //for this clause, build a clauseQueryObj
            var subrule = rule.rules[ci];
            var subquery = biolog.RuleTool.buildMongoQuery(subrule);
            if (subquery) {
                //if (!queryObj[agg]) queryObj[agg] = [];
                queryObj[agg].push(subquery);
            }
        }
    }//next clause

    return queryObj;
};

biolog.RuleTool.buildMongoClause = function(rule) {
    if (!rule || !rule.property) return;
    var oper = biolog.RuleUtil.getMongoOperator(rule.operator);
    var vals = rule.values;
    if (typeof vals == 'undefined' || typeof vals == "null") {
        oper = "$exists";
        vals = true;
    }
    if (rule.operator == "exists") {
        vals = true;
    }
    if (rule.operator == "!exists") {
        vals = false;
    }
    //if( Object.prototype.toString.call( rule.values ) === '[object Array]' ) {
    //
    //}
    var q = {};
    q[rule.property] = {};
    q[rule.property][oper] = vals;

    return q;
};