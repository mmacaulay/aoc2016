const fs = require('fs')
const lines = fs.readFileSync('day3.txt', { encoding: 'utf8' }).split('\n').map(l => l.match(/\d+/g))

const triangles = [0, 1, 2].reduce((collected, currColumn) => {
  let acc = []
  lines.forEach(line => {
    if (!line) return
    acc.push(line[currColumn])
    if (acc.length === 3) {
      collected.push(acc)
      return acc = []
    } else {
      return acc
    }
  })
  return collected
}, [])

let possible = 0, impossible = 0

triangles.forEach((triangle) => {
  if (isPossible(triangle)) {
    possible++
  } else {
    impossible++
  }
})

function isPossible (triangle) {
  if (!triangle) return false

  const sides = triangle.map(s => parseInt(s, 10))

  const permutations = [
    [sides[0], sides[1], sides[2]],
    [sides[1], sides[2], sides[0]],
    [sides[2], sides[1], sides[0]]
  ]
  // console.log(permutations)

  for(let i = 0; i < permutations.length; i++) {
    const current = permutations[i]
    if (current[0] >= (current[1] + current[2])) {
      return false
    }
  }

  return true
}

console.log('possible', possible)
console.log('impossible', impossible)

