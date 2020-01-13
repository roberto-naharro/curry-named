# curry-named

A curry function with named parameters

## Example

```javascript
const get(obj, key) => obj[key]
const getC = curryNClassic(2, get)
const getC2 = curry(['obj', 'key'], get)

getC({a: 1, b: 2})('a')
// 1
getC2({obj: {a: 1, b: 2}})({key: 'a'})
// 1

getC('a')({a: 1, b: 2})
// ERROR
getC2({key: 'a'})({obj: {a: 1, b: 2}})
// 1
```
