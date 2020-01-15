/**
 * Check if the function has all the arguments to be called
 *
 * @param {array | number} params total params needed to complete the function
 * call
 * @param {array} paramsGiven params passed already to the function
 * @returns {boolean}
 */
const isComplete = (params, paramsGiven) => {
  if (Array.isArray(params)) {
    return params.every(param => paramsGiven[param] !== undefined);
  } else {
    return paramsGiven.length >= params;
  }
};

/**
 * Add new arguments to the params given and return it
 *
 * @param {array} newArgs New arguments added to the function
 * @param {array | object} paramsGiven Arguments the function already has
 *
 * @returns {array | object}
 */
const addArgs = (newArgs, paramsGiven) => {
  if (Array.isArray(paramsGiven)) {
    const params = [...paramsGiven];
    if (newArgs) {
      newArgs.forEach(newArg => params.push(newArg));
    }
    return params;
  } else {
    const params = { ...paramsGiven };
    if (newArgs) {
      newArgs.forEach(newArg => Object.assign(params, newArg));
    }
    return params;
  }
};

/**
 * @param {Function} fn Function to be called
 * @param {array | number} params total params needed to complete the function
 * call
 * @param {array | object} paramsGiven arguments values to pass to the function
 */
const callFn = (fn, params, paramsGiven) => {
  return Array.isArray(paramsGiven)
    ? fn(...paramsGiven)
    : fn(...params.map(p => paramsGiven[p]));
};

const executeIfFunction = f => (typeof f === "function" ? f() : f);

const switchcase = cases => defaultCase => key =>
  cases.hasOwnProperty(key) ? cases[key] : defaultCase;

const switchcaseF = cases => defaultCase => key =>
  executeIfFunction(switchcase(cases)(defaultCase)(key));

/**
 * Curry a function
 * @example
 * ```
 * const find = (elem, arr) => arr.findIndex(elem)
 *
 * curry(find)
 * find(1)([1, 2])
 *
 * curry(['elem', 'arr'], add)
 * find({arr: [1,2]})({elem: 1})
 *
 * curry(2, add)
 * find(1)([1, 2])
 * ```
 */
const curry = (...args) => {
  let fn0;
  let params0;

  switchcaseF({
    0: () => {
      throw new Error("Must have at least 1 parameter");
    },
    1: () => {
      // curry(fn)
      fn0 = args[0];
      params0 = fn0.length;
    },
    2: () => {
      // curry(n, fn)
      // curry([key1, ...keyN], fn)
      params0 = args[0];
      fn0 = args[1];
    }
  })()(args.length);

  const curried = (params, paramsGiven, fn) => (...newArgs) => {
    const paramsAcc = addArgs(newArgs, paramsGiven);

    return isComplete(params, paramsAcc)
      ? callFn(fn, params, paramsAcc)
      : curried(params, paramsAcc, fn);
  };

  return curried(params0, Array.isArray(params0) ? {} : [], fn0);
};

module.exports = curry;
