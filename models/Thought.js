const dayjs = require(`dayjs`);
const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

//thoughtText createdAt username reactions, reactionCount virtual
const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: [true, `Thought content is a required field`], minLength: 1, maxLength: 280 },
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: (date) => {
                return dayjs(date).format(`MM/DD/YYYY hh:mm:ss a`);
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    }, {
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false,
}
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        if(this.reactions){
            return this.reactions.length;
        } else {
            return;
        }
    });

const Thought = model(`thought`, thoughtSchema);

module.exports = Thought;