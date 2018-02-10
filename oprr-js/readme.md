# One Page Report (OPR) Renderer JavaScript Monorepo

This is the monorepo of the JavaScript implementation of the One Page Report Renderer. [Lerna](https://github.com/lerna/lerna) is used to manage the monorepo.

## Licencing

Each module/package in this repo states it's own licencing conditions. Basically all modules/packages are targeted to be licenced using the MIT licence but this is not mandatory and assured for each module's/package's version.

Care should be taken that base modules/packages will have permissive licences.

## Development

### Module Namespace-Prefix
All OPR Renderer modules should use `oprr-` as prefix.

### Local Module Interdependency Hints

#### Don't use npm install 
In order to properly resolve inter dependencies of local oprr-modules, `npm install` should not be used in the modules/packages. Instead manually enter all dependencies into the requiring module's/package's `package.json` and call [`lerna bootstrap`](https://github.com/lerna/lerna#bootstrap) in "lernas" root directory i.e. in `[path to ]/oprr-js/`.

#### Use `require.resolve` with `babel-loader` in Webpack Configuration
Like observed [here](https://github.com/babel/babel-loader/issues/149) and [here](https://stackoverflow.com/questions/34574403/how-to-set-resolve-for-babel-loader-presets/)
using `babel-loader` with local dependencies can fail, unless the babel presets are configured via `require.resolve` (e.g. `require.resolve('babel-preset-env')` rather than simply `'env'`).

### Prototyping
Prototype code and assets should not be part of the offical npm module. Add those to `.npmignore` of the respective module/package ([also see guide on the web](https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package)).


# Thoughts and Decisions

It is getting more and more tedious to work on this project because 
1. refactoring is very hard, since dynamic typing and dynamic class extension cav have tests pass although they shouldn't, sinon helps a lot
2. failing unit tests are sometimes hard to find, labeling of single tests helps but 
2. concepts (especially reflected in the names of methods, properties and classes) are at some points misleading and not focused enough
3. IDE is not supporting distant module type resolution (although VS Code does an impressive job)
4. The architecture and design of classes and components and the seperation of concerns has been done badly (e.g. System Ids, Instance Management)

After Version 0.1.0 has been finished, it shall be investigated if the usage of TypeScript and Angular/Ionic or Knockout can help for a quick improvement. Moreover moving to mocha and jasmin should be investigated or even jest.




