const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const StoriesSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

//Creates stories model from the above schema, using mongoose's model method
const Stories = mongoose.model("Stories", StoriesSchema);

module.exports = Stories;