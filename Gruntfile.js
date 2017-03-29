"use strict";

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    "copy": {
      "dist": {
        "files":[{
          "cwd": 'lib/views/',
          "src": ["*.jade"],
          "dest": 'dist/views/',
          "expand": true,
          "ext": ".jade"
        }]
      }
    },
    "babel": {
      "options": {
        "sourceMap": true,
        "presets": ["babel-preset-es2015"]
      },
      "dist": {
        "files": [{
          "expand": true,
          "cwd": "lib/",
          "src": ["**/*.es6"],
          "dest": "dist/",
          "ext": ".js"
        }, {
          "expand": true,
          "cwd": "test/",
          "src": ["**/*.js"],
          "dest": "dist/test/",
          "ext": ".js"
        }]
      }
    },
    "clean": [
      "dist/"
    ],
    "mochaTest": {
      "test": {
        "options": {
          "reporter": "spec",
          "captureFile": "test_results.txt",
          "quiet": false,
          "timeout": 2000
        },
        "src": ["test/*.js"]
      }
    },
    "watch": {
      "es6": {
        "files": ["lib/**/*.es6"],
        "tasks": ["babel:dist"]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task.
  grunt.registerTask("default", [
    "buildCommon",
    "mochatest"
  ]);

  // Common build task
  grunt.registerTask("buildCommon", [
    "clean",
    "copy",
    "babel",
  ]);

  // Common test task
  grunt.registerTask("mochatest", [
    "mochaTest:test"
  ]);
};
