# popcorn-scrum

This script reads files line-by-line to build a list of names to display.

## Usage
- run the script
```
node popcorn.js             # default file (maybe you work on one team)
node popcorn.js <filepath>  # given file (maybe you juggle teams)
```
- read the prompt
- enter the current speaker's number
- repeat until you're done
- type `exit` to exit, or ctrl+C, or ctrl+Z (whatever... I don't know your terminal)
- profit!


## Creating a default file
- create a `data` directory and add a file with your names on separate lines
- create a `conf.js` file and paste the following (replacing `<filename>` with your chosen default file):
```
module.exports = {
  default_names: 'data/<filename>'
}
```
