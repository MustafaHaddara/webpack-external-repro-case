# Webpack Externals and mjs

The setup here is fairly straightforward: we're building a react component library, so we declare react and react-dom as `externals`. We're using webpack to build our library as a module, with `experiments.outputModule = true`, `output.environment.module = true`, and `output.library.type = 'module'`.

Our component depends on `react-loading-skeleton`, but that library also requires React as an external dependency. Both our library and `react-loading-skeleton` import the `createContext()` function from `react` and call it.

When we do our build:

- our build gets react as `external_react_`
- our code's calls to `React.createContext` get compiled correctly as `external_react_.createContext()`
- our dependency's calls to `React.createContext` get compiled **incorrectly** as `external_react_["default"].createContext()`

## Details

In our library, this is done in `index.js`, like so:

```javascript
import { createContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const MyContext = createContext({
  foo: 'bar',
  fex: 'bax'
});

export const MySkeleton = () => (
  <Skeleton duration={2} />
);
```

When we do our build, we generate `es/index.js`. In that file, starting on line 636, we have this block:

```javascript
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(810);
;// CONCATENATED MODULE: ./node_modules/react-loading-skeleton/dist/index.mjs


/**
 * @internal
 */
const SkeletonThemeContext = external_react_["default"].createContext({});
```

Compare, on starting on line 778, we have this block:

```javascript
var MyContext = /*#__PURE__*/(0,external_react_.createContext)({
  foo: 'bar',
  fex: 'bax'
});
```

The second call succeeds-- `__webpack_require__(810)` resolves to this block (line 560):

```javascript
/***/ 810:
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })
```

and `__WEBPACK_EXTERNAL_MODULE_react__` is defined at the top of the file:

```javascript
import * as __WEBPACK_EXTERNAL_MODULE_react__ from "react";
```
