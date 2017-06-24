const fs = require('fs')
const lines = fs.readFileSync('day7.txt', { encoding: 'utf8' }).split('\n')
// const lines = [
//   'abba[mnop]qrst', // yes
//   'abcd[bddb]xyyx', // no
//   'aaaa[qwer]tyui', // no
//   'ioxxoj[asdfgh]zxcvbn' // yes
// ]
let count = 0
lines.forEach(line => {
  if (line && supportsTLS(line)) {
    count++
  }
})

function isAbba (chars) {
  return chars[0] === chars[3] &&
         chars[1] === chars[2] &&
         chars[0] !== chars[1]
}

function supportsTLS (line) {
  let bracketsContext = false
  let hasAbba = false
  let hasAbbaInBracketsContext = false
  const collected = []

  const chars = line.split('')
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]
    collected.push(char)
    if (char === '[') {
      bracketsContext = true
      continue
    }
    if (collected.length < 4) continue // nothing to do here

    // has ABBA in brackets
    if (char === ']') {
      if (bracketsContext && isAbba(chars.slice(i - 4, i))) {
        hasAbbaInBracketsContext = true
        break
      }

      bracketsContext = false
    }

    if (isAbba(chars.slice(i - 3, i + 1))) {
      hasAbba = true
      if (bracketsContext) {
        hasAbbaInBracketsContext = true
        break
      }
    }
  }

  const res = hasAbba && !hasAbbaInBracketsContext
  if (res) {
    console.log('YES:', line, 'abba:', hasAbba, 'brackets:', hasAbbaInBracketsContext)
  } else {
    console.log('NO:', line, 'abba:', hasAbba, 'brackets:', hasAbbaInBracketsContext)
  }
  return hasAbba && !hasAbbaInBracketsContext
}

console.log('count:', count)
