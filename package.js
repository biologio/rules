Package.describe({
  name: 'biolog:rules',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Permits any Meteor application to have rules, governing any kind of behavior of the application.  Defines schema and provides methods for working with rules',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/biologio/rules',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.2.0.1');
    api.use([
            //'reactive-var@1.0.6',
            'promise@0.5.1',
            'npm-container@1.2.0',
            'meteorhacks:async@1.0.0',
            'meteorhacks:npm@1.5.0',
            //'cosmos:browserify@0.4.0',
            'biolog:biolog-core@0.0.1'
            //'biolog:filtrex@0.0.1'
        ],
        ['server']);

    //api.use([
    //    'deanius:promise@3.1.3'
    //], 'client');

    api.addFiles([
        'RuleUtil.js',
        'RuleTool.js',
        'Ruler.js'
    ], ['server']);

});

//    "promise": "7.0.4",

Npm.depends({
    "fibers": "1.0.8",
    "jexl": "1.1.2"
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('promise');
    api.use('biolog:biolog-core');
    api.use('biolog:rules');
    api.addFiles('rules-tests.js', 'server');
});
