const _ = require('lodash')

const commands = ['L3', 'R2', 'L5', 'R1', 'L1', 'L2', 'L2', 'R1', 'R5', 'R1', 'L1', 'L2', 'R2', 'R4', 'L4', 'L3', 'L3', 'R5', 'L1', 'R3', 'L5', 'L2', 'R4', 'L5', 'R4', 'R2', 'L2', 'L1', 'R1', 'L3', 'L3', 'R2', 'R1', 'L4', 'L1', 'L1', 'R4', 'R5', 'R1', 'L2', 'L1', 'R188', 'R4', 'L3', 'R54', 'L4', 'R4', 'R74', 'R2', 'L4', 'R185', 'R1', 'R3', 'R5', 'L2', 'L3', 'R1', 'L1', 'L3', 'R3', 'R2', 'L3', 'L4', 'R1', 'L3', 'L5', 'L2', 'R2', 'L1', 'R2', 'R1', 'L4', 'R5', 'R4', 'L5', 'L5', 'L4', 'R5', 'R4', 'L5', 'L3', 'R4', 'R1', 'L5', 'L4', 'L3', 'R5', 'L5', 'L2', 'L4', 'R4', 'R4', 'R2', 'L1', 'L3', 'L2', 'R5', 'R4', 'L5', 'R1', 'R2', 'R5', 'L2', 'R4', 'R5', 'L2', 'L3', 'R3', 'L4', 'R3', 'L2', 'R1', 'R4', 'L5', 'R1', 'L5', 'L3', 'R4', 'L2', 'L2', 'L5', 'L5', 'R5', 'R2', 'L5', 'R1', 'L3', 'L2', 'L2', 'R3', 'L3', 'L4', 'R2', 'R3', 'L1', 'R2', 'L5', 'L3', 'R4', 'L4', 'R4', 'R3', 'L3', 'R1', 'L3', 'R5', 'L5', 'R1', 'R5', 'R3', 'L1']

// const commands = ['L3', 'R2']

const start = [0, 0]
const coords = [0, 0]
let currentDirection = 'N'
const directions = ['E', 'S', 'W', 'N']
const visited = {}

commands: for (let i = 0; i < commands.length; i++) {
  let command = commands[i]

  const chars = command.split('')
  const turn = chars[0]
  const spaces = parseInt(chars.slice(1, chars.length).join(''), 10)

  currentDirection = makeTurn(currentDirection, turn)
  console.log('moving', currentDirection, spaces)

  let origCoords = coords.slice()

  switch (currentDirection) {
    case 'N':
      coords[1] += spaces
      break
    case 'W':
      coords[0] -= spaces
      break
    case 'S':
      coords[1] -= spaces
      break
    case 'E':
      coords[0] += spaces
      break
  }

  let xrange = _.range(origCoords[0], coords[0])
  let yrange = _.range(origCoords[1], coords[1])
  if (!xrange.length) xrange.push(coords[0])
  if (!yrange.length) yrange.push(coords[1])

  for (let x = 0; x < xrange.length; x++) {
    for (let y = 0; y < yrange.length; y++) {
      let loc = [xrange[x], yrange[y]].join(',')
      console.log('visiting', loc)
      if (visited[loc]) {
        console.log('I have previously visited', loc)
        break commands
      }
      visited[loc] = true
    }
  }

  console.log(coords)
}

console.log('final', coords)

function trackVisits (origCoords, newCoords) {

}

function makeTurn (currentDirection, turn) {
  const index = directions.indexOf(currentDirection)
  return turn === 'L' ? moveLeft(index) : moveRight(index)
}

function moveLeft (index) {
  const newIndex = index--
  if (index < 0) index = directions.length - 1
  return directions[index]
}

function moveRight (index) {
  const newIndex = index++
  if (index > directions.length - 1) index = 0
  return directions[index]
}
console.log('dest', coords)
