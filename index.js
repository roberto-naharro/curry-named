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
  let fn = args.pop();
  let params;
  let paramsGiven;

  const init = () => {
    params =
      args.length > 0
        ? Array.isArray(args[0])
          ? args[0]
          : args[0]
        : fn.length;

    paramsGiven = Array.isArray(params) ? {} : [];
  };

  const isComplete = () => {
    if (Array.isArray(params)) {
      return params.every(param => paramsGiven[param] !== undefined);
    } else {
      return paramsGiven.length >= params;
    }
  };

  const addArgs = newArgs => {
    if (Array.isArray(paramsGiven)) {
      paramsGiven = paramsGiven.concat(newArgs);
    } else {
      newArgs.map(newArg => Object.assign(paramsGiven, newArg));
    }
  };

  const cleanAndCall = () => {
    const out = Array.isArray(paramsGiven)
      ? fn(...paramsGiven)
      : fn(...params.map(p => paramsGiven[p]));
    init();
    return out;
  };

  init();
  
  const curried = (...newArgs) => {
    addArgs(newArgs);

    return isComplete() ? cleanAndCall() : curried;
  };

  return curried;
};

module.export = curry;
