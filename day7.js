const fs = require('fs')
const lines = fs.readFileSync('day7.txt', { encoding: 'utf8' }).split('\n')
// example TLS lines
// const lines = [
//   'abba[mnop]qrst', // yes
//   'abcd[bddb]xyyx', // no
//   'aaaa[qwer]tyui', // no
//   'ioxxoj[asdfgh]zxcvbn' // yes
// ]
// example SSL lines
// const lines = [
//   'aba[bab]xyz', // yes
//   'xyx[xyx]xyx', // no
//   'aaa[kek]eke', // yes
//   'zazbz[bzb]cdb' // yes
// ]
let count = 0
lines.forEach(line => {
  // if (line && supportsTLS(line)) {
  if (line && supportsSSL(line)) {
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

function isABA (chars) {
  return chars[0] === chars[2] &&
         chars[0] !== chars[1]
}

function isBAB (aba, chars) {
  return aba[0] === chars[1] &&
         aba[1] === chars[0]
}

function hasBAB (aba, collectedBABs) {
  for (let i = 0; i < collectedBABs.length; i++) {
    const bab = collectedBABs[i]
    if (isBAB(aba, bab)) return true
  }
}

function supportsSSL (line) {
  let bracketsContext = false
  const collected = []
  const collectedABAs = []
  const collectedBABs = []

  const chars = line.split('')
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]
    collected.push(char)

    const lastThreeChars = chars.slice(i - 2, i + 1)
    if (lastThreeChars[2] === '[') {
      bracketsContext = true
      continue
    } else if (lastThreeChars[2] === ']') {
      bracketsContext = false
      continue
    }
    if (collected.length < 3) continue // nothing to do here
    if (isABA(lastThreeChars)) {
      if (bracketsContext) {
        collectedBABs.push(lastThreeChars)
      } else {
        collectedABAs.push(lastThreeChars)
      }
    }
  }

  for (let i = 0; i < collectedABAs.length; i++) {
    const aba = collectedABAs[i]
    if (hasBAB(aba, collectedBABs)) {
      console.log('has BAB:', line)
      count++
      break
    }
  }
}

console.log('count:', count)
