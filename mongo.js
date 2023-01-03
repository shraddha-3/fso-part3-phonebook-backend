const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]


const url = `mongodb+srv://fullstackopen:${password}@cluster0.4izy3oa.mongodb.net/phonebookApp?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})
}

else if(process.argv.length === 5){
    const name = process.argv[3]
    const number = process.argv[4] 

    const person = new Person({
            name: name,
            number: number,
        })
    
    person.save()
    .then(() => {
        console.log(`added ${name} number ${number} to the phonebook`)
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err)) 
}

