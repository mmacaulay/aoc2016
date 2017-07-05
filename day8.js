const fs = require('fs')
const lines = fs.readFileSync('day8.txt', { encoding: 'utf8' }).split('\n')

const width = 50
const height = 6
const display = createDisplay()

printDisplay()

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const cmd = parseLine(line)
  switch (cmd.type) {
    case 'rect':
      rect(cmd.width, cmd.height)
      break
    case 'row':
      rotateRow(cmd.y, cmd.pixels)
      break
    case 'column':
      rotateCol(cmd.x, cmd.pixels)
      break
    default:
      console.error('Unknown type:', cmd.type)
  }
  printDisplay()
}

printDisplay()
countPixels()

function parseLine (line) {
  const res = {}
  if (line.startsWith('rect')) {
    res.type = 'rect'
    const dimensions = line.split(' ')[1].split('x')
    res.width = parseInt(dimensions[0], 10)
    res.height = parseInt(dimensions[1], 10)
  } else {
    const matches = line.match(/rotate\s(row|column)\s[x|y]=(\d+)\sby\s(\d+)/)
    if (matches && matches.length === 4) {
      res.type = matches[1]
      const field = res.type === 'column' ? 'x' : 'y'
      res[field] = parseInt(matches[2], 10)
      res.pixels = parseInt(matches[3], 10)
    } else {
      console.log('Unexpected input:', line)
    }
  }

  return res
}

// Test data
// const width = 7
// const height = 3
// const display = createDisplay()
// printDisplay()

// rect(3, 2)

// printDisplay()

// rotateCol(1, 1)

// printDisplay()

// rotateRow(0, 4)

// printDisplay()

// rotateCol(1, 1)

// printDisplay()

function rect (w, h) {
  console.log('rect:', w, h)
  for (let y = height - 1; y >= height - h; y--) {
    for (let x = 0; x < w; x++) {
      turnOnPixel(x, y)
    }
  }
}

function rotateArray (arr, n) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    let index = i + n
    if (index > arr.length - 1) {
      index = Math.abs(arr.length - index)
    }
    newArr[index] = arr[i]
  }
  return newArr
}

function rotateRow (y, pixels) {
  console.log('rotateRow:', y, pixels)
  y = height - y - 1
  let row = []

  for (let i = 0; i < width; i++) {
    row.push(display[i][y])
  }

  row = rotateArray(row, pixels)

  for (let i = 0; i < width; i++) {
    setPixel(i, y, row[i])
  }
}

function rotateCol (x, pixels) {
  console.log('rotateCol:', x, pixels)
  let col = []
  for (let i = height - 1; i >= 0; i--) {
    col.push(display[x][i])
  }

  col = rotateArray(col, pixels)
  col.reverse()

  for (let i = 0; i < height; i++) {
    setPixel(x, i, col[i])
  }
}

function turnOnPixel (x, y) {
  setPixel(x, y, '#')
}

function setPixel (x, y, value) {
  display[x][y] = value
}

function createDisplay () {
  const arr = []
  for (let i = 0; i < width; i++) {
    arr.push(Array(height).fill('.'))
  }
  return arr
}

function printDisplay () {
  console.log('\n')
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      process.stdout.write(display[x][y])
    }
    process.stdout.write('\n')
  }
}

function countPixels () {
  let count = 0
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      if (display[x][y] === '#') count++
    }
  }
  console.log('Lit pixels:', count)
}
