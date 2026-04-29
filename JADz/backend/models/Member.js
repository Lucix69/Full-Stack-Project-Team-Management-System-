const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    rollNumber: {
      type: String,
      required: [true, 'Roll number is required'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Year is required'],
    },
    degree: {
      type: String,
      default: 'B.Tech',
    },
    aboutProject: {
      type: String,
      default: '',
    },
    hobbies: {
      type: [String],
      default: [],
    },
    certificate: {
      type: String,
      default: '',
    },
    internship: {
      type: String,
      default: '',
    },
    aboutYourAim: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
