const mongoose = require('mongoose')
const TodoSchema = new mongoose.Schema( { 
    title: {
        type: String
    },
    tag: {
        type: String
    },
    priority: {
        type: String
    },
    status: {
        type: String
    },
    checked: {
        type: String
    },
    desc: {
        type: String
    }
})

module.exports = mongoose.model('todo', TodoSchema)