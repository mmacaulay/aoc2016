const lines = `URULLLLLRLDDUURRRULLLDURRDRDRDLURURURLDLLLLRUDDRRLUDDDDDDLRLRDDDUUDUDLDULUDLDURDULLRDDURLLLRRRLLRURLLUDRDLLRRLDDRUDULRRDDLUUUDRLDLURRRULURRDLLLDDDLUDURDDRLDDDLLRULDRUDDDLUDLURUDLLRURRUURUDLLLUUUUDDURDRDDDLDRRUDURDLLLULUDURURDUUULRULUDRUUUUDLRLUUUUUDDRRDDDURULLLRRLDURLDLDRDLLLUULLRRLLLLDRLRDRRDRRUDDLULUUDDDDRRUUDDLURLRDUUDRRLDUDLRRRLRRUUDURDRULULRDURDRRRDLDUUULRDDLRLRDLUUDDUDDRLRRULLLULULLDDDRRDUUUDDRURDDURDRLRDLDRDRULRLUURUDRLULRLURLRRULDRLRDUDLDURLLRLUDLUDDURDUURLUDRLUL
LLLUUURUULDDDULRRDLRLLLLLLLLRURRDLURLUDRRDDULDRRRRRRLDURRULDDULLDDDRUUDLUDULLDLRRLUULULRULURDURLLDULURDUDLRRLRLLDULLRLDURRUULDLDULLRDULULLLULDRLDLDLDLDDLULRLDUDRULUDDRDDRLRLURURRDULLUULLDRRDRRDLDLLRDLDDUUURLUULDDRRRUULDULDDRDDLULUDRURUULLUDRURDRULDRUULLRRDURUDDLDUULLDDRLRRDUDRLRRRLDRLRULDRDRRUDRLLLDDUDLULLURRURRLUURDRLLDLLDUDLUUURRLRDDUDRLUDLLRULLDUUURDLUUUDUDULRLDLDRUUDULRDRRUDLULRLRDLDRRDDDUDLDLDLRUURLDLLUURDLDLRDLDRUDDUURLLLRDRDRRULLRLRDULUDDDLUDURLDUDLLRULRDURDRDLLULRRDLLLDUURRDUDDLDDRULRRRRLRDDRURLLRRLLL
DRURLDDDDRLUDRDURUDDULLRRLLRLDDRLULURLDURRLDRRLRLUURDDRRDLRDLDLULDURUDRLRUDULRURURLRUDRLLDDUDDRDLDRLLDDLRRDRUUULDUUDRUULRLLDLLULLLRRDRURDLDDRRDDUDDULLDUUULDRUDLDLURLDRURUDLRDDDURRLRDDUDLLLRRUDRULRULRRLLUUULDRLRRRLLLDLLDUDDUUDRURLDLRRUUURLUDDDRRDDLDDDDLUURDDULDRLRURLULLURRDRLLURLLLURDURLDLUDUUDUULLRLDLLLLULRDDLDUDUDDDUULURRLULDLDRLRDRLULLUDDUUUUURDRURLDUULDRRDULUDUDLDDRDLUDDURUDURLDULRUDRRDLRLRDRRURLDLURLULULDDUUDLRLLLLURRURULDDRUUULLDULDRDULDDDLLLRLULDDUDLRUDUDUDURLURLDDLRULDLURD
DRUDRDURUURDLRLUUUUURUDLRDUURLLDUULDUULDLURDDUULDRDDRDULUDDDRRRRLDDUURLRDLLRLRURDRRRDURDULRLDRDURUDLLDDULRDUDULRRLLUDLLUUURDULRDDLURULRURDDLRLLULUDURDRRUDLULLRLDUDLURUDRUULDUDLRDUDRRDULDDLDRLRRULURULUURDULRRLDLDULULRUUUUULUURLURLRDLLRRRRLURRUDLRLDDDLDRDRURLULRDUDLRLURRDRRLRLLDLDDLLRRULRLRLRUDRUUULLDUULLDDRLUDDRURLRLDLULDURLLRRLDLLRDDDUDDUULLUDRUDURLLRDRUDLUDLLUDRUUDLRUURRRLLUULLUUURLLLRURUULLDLLDURUUUULDDDLRLURDRLRRRRRRUDLLLRUUULDRRDLRDLLDRDLDDLDLRDUDLDDRDDDDRULRRLRDULLDULULULRULLRRLLUURUUUDLDLUDUDDDLUUDDDDUDDDUURUUDRDURRLUULRRDUUDDUDRRRDLRDRLDLRRURUUDRRRUUDLDRLRDURD
DDDLRURUDRRRURUUDLRLRDULDRDUULRURRRUULUDULDDLRRLLRLDDLURLRUDRLRRLRDLRLLDDLULDLRRURDDRDLLDDRUDRRRURRDUDULUDDULRRDRLDUULDLLLDRLUDRDURDRRDLLLLRRLRLLULRURUUDDRULDLLRULDRDLUDLULDDDLLUULRRLDDUURDLULUULULRDDDLDUDDLLLRRLLLDULRDDLRRUDDRDDLLLLDLDLULRRRDUDURRLUUDLLLLDUUULDULRDRULLRDRUDULRUUDULULDRDLDUDRRLRRDRLDUDLULLUDDLURLUUUDRDUDRULULDRDLRDRRLDDRRLUURDRULDLRRLLRRLDLRRLDLDRULDDRLURDULRRUDURRUURDUUURULUUUDLRRLDRDLULDURUDUDLUDDDULULRULDRRRLRURLRLRLUDDLUUDRRRLUUUDURLDRLRRDRRDURLLL`.split('\n')

// const lines = [
//   'ULL',
//   'RRDDD',
//   'LURDL',
//   'UUUUD'
// ]

// const pad = {
//   '-1,1':   1,
//   '0,1':    2,
//   '1,1':    3,
//   '-1,0':   4,
//   '0,0':    5,
//   '1,0':    6,
//   '-1,-1':  7,
//   '0,-1':   8,
//   '1,-1':   9
// }

// 0, 0 = 1
// 0, 1 = undefined
// 1, 0 = 2
// 1, 1 = 3
// etc
// const pad = [
//   ['1'],
//   ['2', '3', '4'],
//   ['5', '6', '7', '8', '9'],
//   ['A', 'B', 'C'],
//   ['D']
// ]

let coords = { x: 0, y: 2 }
const digits = []

const pad = [
  [null, null, '1', null, null],
  [null, '2',  '3', '4',  null],
  ['5',  '6',  '7', '8',  '9' ],
  [null, 'A',  'B', 'C',  null],
  [null, null, 'D', null, null]
]


for (let i = 0; i < lines.length; i++) {
  const chars = lines[i].split('')
  for (let j = 0; j < chars.length; j++) {
    const char = chars[j]
    coords = getNextCoords(coords, char)
  }
  digits.push(getDigit(coords))
}

console.log(digits)

function getNextCoords (coords, direction) {
  const origCoords = Object.assign({}, coords)
  switch (direction) {
    case 'U':
      coords.y--
      break
    case 'D':
      coords.y++
      break
    case 'L':
      coords.x--
      break
    case 'R':
      coords.x++
      break
  }

  console.log('getting digit for', coords)
  const digit = getDigit(coords)
  if (!digit) {
    console.log('invalid move, resetting coords')
    return origCoords
  }

  console.log('got digit for', coords, ':', digit)

  return coords
}

function getDigit (coords) {
  const y = pad[coords.y]
  if (y) {
    return y[coords.x]
  }
}
