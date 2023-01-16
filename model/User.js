const mongoose = require("mongoose")
let Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'], //got this code from rupshtiwaris github account
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
        },
        url: {
            type: String,
        },
        access_token_id: { type: Schema.Types.ObjectId, ref: 'apikey' }

    },
    { timestamps: true },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

let User = mongoose.model("user", userSchema);



module.exports = User;
