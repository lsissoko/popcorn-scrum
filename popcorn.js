let speakers = ['alice', 'bob', 'master roshi', 'castiel']

const logRemaining = () => {
  console.log('\nremaining speakers:')
  Object.keys(speakers).forEach(idx => {
    console.log(`${idx} - ${speakers[idx]}`)
  })
}

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const loop = () => {
  if (Object.keys(speakers).length <= 0) {
    console.log('everyone has spoken! goodbye')
    return rl.close()
  }
  rl.question('\n\n\n> next speaker ("exit" to quit): ', (input) => {
    input = input.replace(/\s/g, '').toLowerCase()
    if (input === 'exit') {
      return rl.close()
    } else if (Number.isInteger(parseInt(input))) {
      const idx = parseInt(input)
      console.log(`${speakers[idx].toUpperCase()} has spoken!`)
      delete speakers[idx]
      logRemaining()
    }
    loop()
  })
}

logRemaining()
loop()

