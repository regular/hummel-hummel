const hummel = require('.')
const pull = require('pull-stream')
const test = require('tape')

test('without accName', t=>{
  const {fitsBucket, add} = hummel(
    item=>item.name[0],
    (acc, item) => {
      acc = acc || {count: 0, sumAge: 0}
      acc.count++
      acc.sumAge += item.age
      return acc
    }
  )
  let bucket
  pull(
    pull.values([
      {name: 'Hummel', age: 22},
      {name: 'Hans', age: 42}
    ]),
    pull.through(item=>{
      bucket = add(bucket, item)
    }),
    pull.onEnd(err=>{
      t.notOk(err)
      t.deepEqual(
        bucket, 
        { key: 'H', value: { count: 2, sumAge: 64 } }
      )
      t.end()
    })
  )
})

test('with accName', t=>{
  const {fitsBucket, add} = hummel(
    item=>'all',
    (acc, item) => {
      acc = acc || {count: 0, sumAge: 0}
      acc.count++
      acc.sumAge += item.age
      return acc
    },
    item=>item.name[0],
  )
  let bucket
  pull(
    pull.values([
      {name: 'Hummel', age: 22},
      {name: 'Hans', age: 42}
    ]),
    pull.through(item=>{
      bucket = add(bucket, item)
    }),
    pull.onEnd(err=>{
      t.notOk(err)
      t.deepEqual(
        bucket, 
        { key: 'all', value: {H: { count: 2, sumAge: 64 } } }
      )
      t.end()
    })
  )
})
