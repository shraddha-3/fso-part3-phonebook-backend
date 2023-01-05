const mongoose = require('mongoose')


const url = process.env.MONGODB_URI
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {type: String, minLength: 5, required: true},
  number: {type: String, minLength: 8, 
    validate: 
    (v) => {
      return (/\d{2,3}\-\d+/.test(v));
    },
      required: true}
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)