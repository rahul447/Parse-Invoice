# Parse Invoice

## URL - Eg - http://127.0.0.1:8060

## Setup

1. Check the npm packages:

    ```
    npm install
    ```

2. Start the application

    ```
    node dist/api.js
    ```

## Managing the project with Grunt

* Runs eslint, babel:dist and mochaTest

    ```
    grunt
    ```

* Runs the tests (the same as ```npm test```) 

    ```
    grunt mochatest
    ```

* Compiles the .es6 files to .js
 
    ```
    grunt babel:dist
    ```