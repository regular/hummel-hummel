//jshint  esversion: 11, -W033, -W018

module.exports = function(key, reduce, accName) {

  return {
    fitsBucket,
    add
  }

  function fitsBucket(bucket, item) {
    return key(item) == bucket.key
  }

  function add(bucket, item) {
    bucket = bucket || {
      key: key(item),
      value: accName ? {} : undefined
    }
    const prop = accName && accName(item)

    if (prop) {
      bucket.value[prop] = reduce(bucket.value[prop], item)
    } else {
      bucket.value = reduce(bucket.value, item)
    }
    return bucket
  }
}

