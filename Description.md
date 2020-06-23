# Kaart

# Set baseline

## Generate project
```bash
$ ng new kaart
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? CSS
CREATE kaart/README.md (1023 bytes)
CREATE kaart/.editorconfig (246 bytes)
CREATE kaart/.gitignore (631 bytes)
CREATE kaart/angular.json (3567 bytes)
CREATE kaart/package.json (1283 bytes)
CREATE kaart/tsconfig.json (543 bytes)
CREATE kaart/tslint.json (1953 bytes)
CREATE kaart/browserslist (429 bytes)
CREATE kaart/karma.conf.js (1018 bytes)
CREATE kaart/tsconfig.app.json (210 bytes)
CREATE kaart/tsconfig.spec.json (270 bytes)
CREATE kaart/src/favicon.ico (948 bytes)
CREATE kaart/src/index.html (292 bytes)
CREATE kaart/src/main.ts (372 bytes)
CREATE kaart/src/polyfills.ts (2838 bytes)
CREATE kaart/src/styles.css (80 bytes)
CREATE kaart/src/test.ts (753 bytes)
CREATE kaart/src/assets/.gitkeep (0 bytes)
CREATE kaart/src/environments/environment.prod.ts (51 bytes)
CREATE kaart/src/environments/environment.ts (662 bytes)
CREATE kaart/src/app/app-routing.module.ts (246 bytes)
CREATE kaart/src/app/app.module.ts (393 bytes)
CREATE kaart/src/app/app.component.css (0 bytes)
CREATE kaart/src/app/app.component.html (25705 bytes)
CREATE kaart/src/app/app.component.spec.ts (1059 bytes)
CREATE kaart/src/app/app.component.ts (210 bytes)
CREATE kaart/e2e/protractor.conf.js (808 bytes)
CREATE kaart/e2e/tsconfig.json (214 bytes)
CREATE kaart/e2e/src/app.e2e-spec.ts (639 bytes)
CREATE kaart/e2e/src/app.po.ts (301 bytes)
✔ Packages installed successfully.
    Successfully initialized git.
```

## Test project
To verify the project works
```bash
$ npm start
```

## Check versions
```bash
$ npm outdated
Package                             Current    Wanted   Latest  Location
@angular-devkit/build-angular       0.900.7   0.900.7  0.901.9  kaart
@angular/animations                   9.0.7     9.0.7   9.1.11  kaart
@angular/cli                          9.0.7     9.0.7    9.1.9  kaart
@angular/common                       9.0.7     9.0.7   9.1.11  kaart
@angular/compiler                     9.0.7     9.0.7   9.1.11  kaart
@angular/compiler-cli                 9.0.7     9.0.7   9.1.11  kaart
@angular/core                         9.0.7     9.0.7   9.1.11  kaart
@angular/forms                        9.0.7     9.0.7   9.1.11  kaart
@angular/language-service             9.0.7     9.0.7   9.1.11  kaart
@angular/platform-browser             9.0.7     9.0.7   9.1.11  kaart
@angular/platform-browser-dynamic     9.0.7     9.0.7   9.1.11  kaart
@angular/router                       9.0.7     9.0.7   9.1.11  kaart
@types/node                        12.12.47  12.12.47  14.0.13  kaart
jasmine-spec-reporter                 4.2.1     4.2.1    5.0.2  kaart
karma                                 4.3.0     4.3.0    5.1.0  kaart
karma-coverage-istanbul-reporter      2.1.1     2.1.1    3.0.3  kaart
karma-jasmine                         2.0.1     2.0.1    3.3.1  kaart
protractor                            5.4.4     5.4.4    7.0.0  kaart
ts-node                               8.3.0     8.3.0   8.10.2  kaart
tslib                                1.13.0    1.13.0    2.0.0  kaart
tslint                               5.18.0    5.18.0    6.1.2  kaart
typescript                            3.7.5     3.7.5    3.9.5  kaart
```

## Upgrade version
### Save current state
```bash
$ git checkout -b upgrade-01
```

### Update versions
In package.json set the latest versions for each used package and install latest packages
```bash
$ npm install
```
Verify everything still works
```bash
$ npm start

> mkaart@0.0.0 start /home/bvpelt/Develop/mkaart
> ng serve

Compiling @angular/core : es2015 as esm2015
Compiling @angular/animations : es2015 as esm2015
Compiling @angular/compiler/testing : es2015 as esm2015
Compiling @angular/common : es2015 as esm2015
Compiling @angular/animations/browser : es2015 as esm2015
Compiling @angular/core/testing : es2015 as esm2015
Compiling @angular/platform-browser : es2015 as esm2015
Compiling @angular/common/http : es2015 as esm2015
Compiling @angular/animations/browser/testing : es2015 as esm2015
Compiling @angular/common/testing : es2015 as esm2015
Compiling @angular/router : es2015 as esm2015
Compiling @angular/forms : es2015 as esm2015
Compiling @angular/platform-browser/testing : es2015 as esm2015
Compiling @angular/platform-browser-dynamic : es2015 as esm2015
Compiling @angular/platform-browser/animations : es2015 as esm2015
Compiling @angular/common/http/testing : es2015 as esm2015
Compiling @angular/platform-browser-dynamic/testing : es2015 as esm2015
Compiling @angular/router/testing : es2015 as esm2015

chunk {main} main.js, main.js.map (main) 1.99 kB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 673 bytes [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 6.15 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 12.4 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 340 kB [initial] [rendered]
Date: 2020-06-22T18:28:00.330Z - Hash: c7dfee0efcb2491c2ea0 - Time: 486ms

ERROR in The Angular Compiler requires TypeScript >=3.6.4 and <3.9.0 but 3.9.5 was found instead.
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
```

Since there is an error message set typescript to 3.8.3 in package.json rerun ```npm install``` followed by ```npm start``` to verify everything is ok.

It worked

### Check for outdated
```bash
npm outdated
Package     Current  Wanted  Latest  Location
typescript    3.8.3   3.8.3   3.9.5  mkaart
```

## Add openlayers
```bash
npm install ol
```

## Add bootstrap
```bash
npm install bootstrap
```
Change angular.json and add bootstrap in styles (see file changes)


## Add components 
```bash
$ ng generate component location
$ ng generate component map
```

# References
- [error handling](https://grokonez.com/frontend/angular/angular-6/error-handler-angular-6-httpclient-catcherror-retry-with-node-js-express-example)
