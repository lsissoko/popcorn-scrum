const fs = require('fs')
let speakers = []

const logRemaining = () => {
  console.log('\nremaining speakers:')

  // Iterating with Object.keys() because the array length never changes (the final array is [ <x empty items> ])
  Object.keys(speakers).forEach(idx => {
    console.log(`${idx} - ${speakers[idx]}`)
  })
}

const loop = (reader) => {
  if (Object.keys(speakers).length <= 0) {
    console.log('everyone has spoken! goodbye')
    return reader.close()
  }
  reader.question('\n\n\n> next speaker ("exit" to quit): ', (input) => {
    input = input.replace(/\s/g, '').toLowerCase()
    if (input === 'exit') {
      return reader.close()
    } else if (Number.isInteger(parseInt(input))) {
      const idx = parseInt(input)
      console.log(`${speakers[idx].toUpperCase()} has spoken!`)
      delete speakers[idx]
      logRemaining()
    }
    loop(reader)
  })
}

fs.readFile('./names.txt', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  speakers = data.toString().split('\n').filter(n => n.length)
  logRemaining()

  loop(require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  }))
})
