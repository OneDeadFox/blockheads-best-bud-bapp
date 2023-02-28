const dayjs = require(`dayjs`);
const { Schema, Types } = require('mongoose');

//reactionId, reactionBody, username, createdAt
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: [true, `Reaction content is a required field.`],
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: (date) => {
                return dayjs(date).format(`MM/DD/YYYY hh:mm:ss a`);
            }
        }
    },{
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;