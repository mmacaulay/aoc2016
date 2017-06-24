const crypto = require('crypto')

const input = 'wtnhxymk'

function findNextHash (index, doorId) {
  let found = false
  let n = index
  while(!found) {
    const hash = crypto.createHash('md5')
    hash.update(doorId + n)
    const hex = hash.digest('hex')
    if (hex.slice(0, 5) === '00000') {
      const position = hex.split('')[5]
      const char = hex.split('')[6]
      const posInt = parseInt(position, 10)
      if (isNaN(posInt) || posInt < 0 || posInt > 7) {
        n++
        continue
      }
      if (!res[position]) {
        res[position] = {
          position,
          char
        }
        console.log('Found:', hex)
        console.log('Position: ', hex.split('')[5])
        console.log('Char: ', hex.split('')[6])
      }
      return n
    }
    n++
  }
}

// console.log(findNextHash(0, 'abc'))
// return

let index = 0
let res = {}

while(Object.keys(res).length < 8) {
  console.log(index = findNextHash(index, input) + 1)
}

console.log('Result:', res)
