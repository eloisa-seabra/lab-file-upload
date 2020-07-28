const { Schema, model } = require('mongoose');
//THIS
//const mongoose = require('mongoose')
//mongoose.Schema()
//IS THE SAME AS THIS
//const {Schema} = require('mongoose')

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    picPath: {
      type: String,
      required: true
    },
    picName: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Post', postSchema);
