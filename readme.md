hummel-hummel
===========
helping with buckets since 1787.

Convenience functions for pull-buckets and flumeview-level-aggregate and 

hummel-hummel creates the fitsBucket() and add() functions for the mocules mentioned above.

Concepts
---
There is a list of buckets that each have a unique key. The bucket key is typically derived from a timestamp value. pull-buckets (and therefore flumeview-level-aggregate) requires bucket keys to be created in lexical order, i.e. if you've created a bucket with key 1970 and then another one with key 1971, it is an error to create a second bucket with key 1970.

buckets are objects containing named accumulators (think: counters). If a new item is processed, its bucket key is derived, and then an accName, the name of the property within the budket that holds a counter value, is derived as well.

Finally the new item is (somehow) added to the accumulator value


Options:

- `key(item)` => string: get the bucket key from an item. (See time-based-buckets for some helper functions for this)
- `accName(item) => string`: get the property name/counter name/accumulator within a bucket
- `reduce(acc, item) => acc`: add item's value to the accumulator/counter

Examples
---

Count visitors per year and weekday.

``` js
  {
    key: item=>DateTime.fromMillis(item.timestamp).year
    accName: item=>DateTime.fromMillis(item.timestamp).weekDay
    reduce: (acc, item)=>(acc || 0) + item.count
  }
```

See also:

- time-based-buckets
