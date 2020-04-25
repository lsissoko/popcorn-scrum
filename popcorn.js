const fs = require('fs')
let speakers = []

const filepath = process.argv[2] || require('./conf.js').default_names

const logRemaining = () => {
  console.log('\nremaining speakers:')

  // Iterating this way because the length never changes (the final array is [ <x empty items> ])
  Object.keys(speakers).forEach(idx => {
    console.log(`${idx}) ${speakers[idx]}`)
  })
}

const loop = (reader) => {
  if (Object.keys(speakers).length <= 0) {
    console.log('everyone has spoken! goodbye')
    return reader.close()
  }

  reader.question('\n\n> next speaker ("exit" to quit): ', (input) => {
    input = input.replace(/\s/g, '').toLowerCase()

    const idx = parseInt(input)

    if (input === 'exit') {
      return reader.close()
    } else if (Number.isInteger(idx)) {
      if (speakers[idx]) {
        console.log(`${speakers[idx].toUpperCase()} has spoken!`)
        delete speakers[idx]
      } else {
        console.log('invalid input!')
      }
      logRemaining()
    }

    loop(reader)
  })
}

fs.readFile(filepath, (err, data) => {
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
