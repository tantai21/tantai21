const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    status: {
        type: String,
        enum: ['To Learn', 'Learning', 'Learned']
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: users
    }
})

module.exports = mongoose.model('posts', PostSchema);