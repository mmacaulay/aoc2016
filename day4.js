const fs = require('fs')
let lines = fs.readFileSync('day4.txt', { encoding: 'utf8' }).split('\n')
lines = lines.slice(0, lines.length - 1)

const rooms = lines.map(line => {
  return {
    line: line,
    letters: line.match(/[-a-z]+/)[0].replace(/-/g, ''),
    sectorId: line.match(/\d+/)[0],
    checksum: line.match(/\[([a-z]+)\]/)[1]
  }
})

function extractLetters(line) {
  return line.match(/[-a-z]+/)[0].replace(/-/g, '')
}

function extractSectorId(line) {
  return line.match(/\d+/)[0]
}

function extractChecksum(line) {
  return line.match(/\[([a-z]+)\]/)[1]
}

function calcChecksum(letters) {
  const letterMap = {}
  letters.split('').forEach(letter => {
    if (!letterMap[letter]) {
      letterMap[letter] = 1
    } else {
      letterMap[letter]++
    }
  })
  // console.log('lettermap', letterMap)
  return Object.keys(letterMap).sort((a, b) => {
    if (letterMap[a] > letterMap[b]) {
      return -1
    } else if (letterMap[a] === letterMap[b]) {
      return a > b ? 1 : -1
    } else {
      return 1
    }
  }).join('').substring(0, 5)
}

function nextChar(c) {
  let res = String.fromCharCode(c.charCodeAt(0) + 1)
  if (res === '{') res = 'a'
  return res
}

function decrypt(room) {
  const cypherText = room.line.match(/[-a-z]+/)[0].replace(/-/g, ' ')
  return cypherText.split('').map(c => {
    if (c === ' ') return c
    let res = c
    for (let i = 0; i < parseInt(room.sectorId); i++) {
      res = nextChar(res)
    }
    return res
  }).join('')
}

// const x = 'aaaaa-bbb-z-y-x-123[abxyz]'
// console.log(extractLetters(x))
// console.log(extractSectorId(x))
// console.log(extractChecksum(x))
// console.log(calcChecksum(extractLetters(x)))
// console.log(extractChecksum(x) === calcChecksum(extractLetters(x)))
// console.log('\n')

// const y  = 'a-b-c-d-e-f-g-h-987[abcde]'
// console.log(extractLetters(y))
// console.log(extractSectorId(y))
// console.log(extractChecksum(y))
// console.log(calcChecksum(extractLetters(y)))
// console.log(extractChecksum(y) === calcChecksum(extractLetters(y)))
// console.log('\n')

// const z = 'not-a-real-room-404[oarel]'
// console.log(extractLetters(z))
// console.log(extractSectorId(z))
// console.log(extractChecksum(z))
// console.log(calcChecksum(extractLetters(z)))
// console.log(extractChecksum(z) === calcChecksum(extractLetters(z)))


//return

let realRooms = rooms.filter(room => {
  // console.log('room', room)
  // console.log('checksum', calcChecksum(room.letters))
  return room.checksum === calcChecksum(room.letters)
})
// }).reduce((acc, realRoom) => {
//   return acc + parseInt(realRoom.sectorId, 10)
// }, 0)

// console.log('result:', res)

realRooms.forEach(room => {
  console.log(decrypt(room), room.sectorId)
})

