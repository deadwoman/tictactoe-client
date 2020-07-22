'use strict'

const addNestedValue = function (pojo, name, value) {
  const recurse = function recurse (pojo, keys, value) {
    const key = keys.shift()
    const next = keys[0]
    if (next === '') {
      pojo[key] = pojo[key] || []
      pojo[key].push(value)
    } else if (next) {
      pojo[key] = pojo[key] || {}
      recurse(pojo[key], keys, value)
    } else { 
      pojo[key] = value
    }

    return pojo
  }

  const keys = name.split('[').map((k) => k.replace(/]$/, ''))
  return recurse(pojo, keys, value)
}

module.exports = addNestedValue
