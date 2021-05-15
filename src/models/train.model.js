const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.set("useFindAndModify", false);

const trainDataSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    label: [
      {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TrainData = mongoose.model("train", trainDataSchema);

TrainData.insertData = (data) =>
  TrainData.insertMany(data).then((message) => message);

TrainData.clearData = () => TrainData.deleteMany().then((message) => message);
module.exports = TrainData;
