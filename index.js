#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var walker = require('filewalker');
var handlebars = require('handlebars');


module.exports = execute;

function execute(templateName, projectName) {
    getTemplateNames(__dirname, main.bind(undefined, templateName, projectName));
}

function main(templateName, projectName, templateNames) {
    if(templateNames.indexOf(templateName) == -1) return console.error('Invalid template name provided! Pick one from these: ' + templateNames.join(', '));
    if(!projectName) return console.error('No project name provided!');

    var templatePath = path.join(__dirname, templateName);
    var confPath = path.join(__dirname, '..', 'config.json');
    var conf;

    if(!fs.existsSync(confPath)) return console.error('Missing configuration! Create .mankees/config.json!');
    if(fs.existsSync(projectName)) return console.error('Project exists already!');

    conf = require(confPath);
    conf.project = projectName;

    console.log('Creating directory: ' + projectName);
    fs.mkdirSync(projectName);

    console.log('Injecting data to templates and writing output');
    walker(templatePath).on('file', function(p) {
        var fp = path.join(templatePath, p);
        var data = handlebars.compile(fs.readFileSync(fp, {encoding: 'utf8'}))(conf);
        var op = path.join('.', projectName, p);

        console.log('Writing ' + op);
        fs.writeFileSync(op, data);
    }).walk();
}

function getTemplateNames(root, cb) {
    var ret = [];

    walker(root).on('dir', function(p) {
        if(p.indexOf('node_modules') !== 0 && p[0] !== '.') ret.push(p);
    }).on('done', function() {
        cb(ret);
    }).walk();
}
