07.11.2017
===
(following https://webpack.js.org/guides/getting-started/)

1. npm init 
    1. Version 0.0.1
2. Install babel into project npm install --save-dev babel-cli    
3. Save Script from https://medium.com/@TomazZaman/how-to-get-fast-unit-tests-with-out-webpack-793c408a076f into `mocha-runner.js`
    1. Observe that `npx babel-node mocha-runner.js` complains about first `import` statement.
4. npm install --save-dev babel-preset-env
5. added "basic" `.babelrc` to project root folder following http://babeljs.io/env
6. npm install --save-dev jsdom
7. npm install --save-dev mocha
8. Since VisualStudio Code complains about many changes -> added .gitignore to project root with content from https://github.com/github/gitignore/blob/master/Node.gitignore
9. npm install --save-dev sinon
10. npm install --save-dev chai
11. npm install --save-dev chai-as-promised

12. Observe that `npx babel-node mocha-runner.js` fails with `_jsdom2.default.jsdom is not a function`. this code is generate by babel from the code `jsdom.jsdom([...])`.
    1. Transpiled into file: `npx babel mocha-runner.js -o mocha-runner-tp.js` so that script can run in node
    2. Debugging in VS Code shows that module is loaded. I figure that API for jsdom might have changed. At least the code shown here https://github.com/tmpvar/jsdom differs from the code in the script. I cannot tell if the code is having the same result.
    3. Delaying the Task of implementing an infrastructure for unit testing... first i have to understand the difference of import and require statements and there is also mocha-webpack to consider.
    
13. npm install --save-dev webpack
14. create folders `src` and `dist`

15. changed the code from `mocha-runner.js` so that it now runs in babel-node and node if transpiled beforehand.
    1. running it from babel-node has the problem that it is difficult to terminate from mingw bash at least, it is better to run the statically transpiled version with node in this regard.

16. added some basic javascript and html files to learn how modules can be used.
    1. Decided to go with CommonJS Module "export" because it allows to export single classes.

17. Read about mocha being "heavy weight" and startetd exploring how to use tape -> 
    1. added folder `test`
    2. npm install --save-dev tape
    
18. Decided to use `verge` for viewport information extraction (https://github.com/ryanve/verge#viewportw)
    1. npm install verge
    2. build facade html-viewport-size

19. installing tape runner globaly to get access to 'tape' command in cli: npm install -g tape
20. tape-watch: npm install -g tape-watch 
21. tape-watcher: npm i -g tape-wachter <- because is less verbose

22. Cleaning up...
    1. mocha-runner.js is not used stick with tape

23. Added src/infrastructure and src/contentcomponents folder old src was moved to appropriate folders.

22.11.2017
===

24. Cleaning up dependencies
    1. npm uninstall --save-dev mocha
    2. npm uninstall --save-dev chai
    3. npm uninstall --save-dev chai-as-promised

25. configuring babel for webpack to build for ie11 (see http://jamesknelson.com/using-es6-in-the-browser-with-babel-6-and-webpack/ and https://webpack.js.org/loaders/babel-loader/)
    1. npm install --save-dev babel-core babel-loader
    2. npm install babel-runtime --save
    3. npm install babel-plugin-transform-runtime --save-dev
    4. npm install babel-preset-es2015 --save-dev
    5. added webpack-babel.config.js
    6. added script-entry to package.json to build babeled output











