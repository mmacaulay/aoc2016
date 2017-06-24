const fs = require('fs')
const lines = fs.readFileSync('day6.txt', { encoding: 'utf8' }).split('\n')

const charMap = new Map()

lines.forEach(line => {
  if (!line) return
  const chars = line.split('')
  chars.forEach((char, index) => {
    let map = charMap.get(index)
    if (!map) map = {}
    if (!map[char]) map[char] = 0
    map[char]++
    charMap.set(index, map)
  })
})

function findGreatest (map) {
  let n = 0, greatest = null
  Object.keys(map).forEach(key => {
    if (map[key] > n) {
      n = map[key]
      greatest = key
    }
  })
  console.log('greatest', greatest)
  return greatest
}

function findLeast (map) {
  let n = 100, least = null
  Object.keys(map).forEach(key => {
    if (map[key] < n) {
      n = map[key]
      least = key
    }
  })
  console.log('least', least)
  return least
}

console.log(Array.from(charMap.entries()).map(c => {
  console.log(c)
  return findLeast(c[1])
}).join(''))
// console.log(Array.from(charMap.entries()).sort((a, b) => {
//   if (a[1] > b[1]) {
//     return -1
//   } else if (b[1] > a[1]) {
//     return 1
//   } else {
//     return 0
//   }
// }).map(c => c[0]).join(''))
