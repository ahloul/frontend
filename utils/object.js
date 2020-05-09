import { transform, isEqual, isObject, isArray, includes } from 'lodash/fp'

// https://gist.github.com/Yimiprod/7ee176597fef230d1451

const _transform = transform.convert({
  cap: false,
})

const iteratee = (baseObj, ignoredKeys) => (result, value, key) => {
  if (!isEqual(value, baseObj[key]) || includes(key, ignoredKeys)) {
    const valIsObj =
      isObject(value) &&
      !isArray(value) &&
      isObject(baseObj[key]) &&
      !includes(key, ignoredKeys)
    result[key] = valIsObj === true ? difference(value, baseObj[key]) : value
  }
}

export const difference = (targetObj, baseObj, ignoredKeys) => {
  return _transform(iteratee(baseObj, ignoredKeys), null, targetObj)
}
