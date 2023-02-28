const { Schema, model } = require('mongoose');

//username email thoughts friends, friendCount virtual
const userSchema = new Schema(
    {
        username: {type: String, required: [true, `Username is a required field`], unique: true, trim: true},
        email: {
            type: String, 
            requierd: [true, `Username is a required field`], 
            unique: true, 
            validate: {
                validator: function(v) {
                    return /^[\w-\.]+@[\w-]+\.+[\w-]{2,4}$/.test(v);
                },
                message: props => `${props.value} is not a valid email address`
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: `thought`
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: `user`
            }
        ]
    },{
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema
    .virtual(`friendCount`)
    .get( function() {
        if(this.friends){
            return `${this.username} has ${this.friends.length} friends`;
        } else {
            return `${this.username} has no friends :(`;
        }
    });

const User = model(`user`, userSchema);

module.exports = User;