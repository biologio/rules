

var rule = biolog.RuleUtil.newRule("+");
var tool = new biolog.RuleTool(rule);
var chfClause = biolog.RuleUtil.newClause("data['patient/condition'].C0018802.valid", ">", "0", 1, 0);

var htnClause = biolog.RuleUtil.newClause("data['patient/condition'].C0018802.valid", ">", "0", 1, 0);

var oldClause = biolog.RuleUtil.newClause("data['patient/condition'].C0018802.valid", ">", "0", 1, 0);

var dmClause = biolog.RuleUtil.newClause("data['patient/condition'].C0011847.valid", ">", "0", 1, 0);

var cvaBlock = biolog.RuleUtil.newClause("data['patient/condition']|isValidAndContainsProperty('patient/condition', 'ID4THROMBOEMBOLIC')", ">", "0", 1, 0);