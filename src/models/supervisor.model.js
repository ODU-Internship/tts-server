const mongoose = require("mongoose");
const tokens = require("../helpers/tokens");

const Schema = mongoose.Schema;

const supervisorSchema = new Schema(
  {
    sid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    gender: {
      type: String,
      trim: true,
      minlength: 1,
    },
    tokens: [
      {
        accessToken: {
          type: String,
          required: true,
        },
        accessTokenTime: {
          type: Number,
          required: true,
        },
        refreshToken: {
          type: String,
          required: true,
        },
        refreshTokenTime: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

supervisorSchema.methods.generateAuthToken =
  async function generateAuthToken() {
    // Generates an access token and refresh token for the supervisor

    const supervisor = this;
    const accessToken = tokens.createAccessToken(supervisor.sid);
    const refreshToken = tokens.createRefreshToken(supervisor.sid);
    const token = {
      accessToken,
      accessTokenTime: 3600,
      refreshToken,
      refreshTokenTime: 604800,
    };
    supervisor.tokens.push(token);
    await supervisor.save();
    return token;
  };

supervisorSchema.methods.refreshAccessToken = async (refreshToken) => {
  // Search for a supervisor by sid
  const { sid } = tokens.decodeRefreshToken(refreshToken);
  const supervisor = await Supervisor.findOne({
    sid,
    "tokens.refreshToken": refreshToken,
  });
  if (!supervisor) {
    throw new Error({ message: "Supervisor Not found" });
  }
  const index = tokens.findRefreshToken(supervisor, refreshToken);
  if (index === -1) {
    throw new Error({ message: "Refresh token dosent exist Suddenly but how" });
  }
  const accessToken = tokens.createAccessToken(sid);
  supervisor.tokens[index].accessToken = accessToken;
  await supervisor.save();
  return supervisor.tokens[index];
};

const Supervisor = mongoose.model("Supervisor", supervisorSchema);

Supervisor.getAllSupervisorDetails = () =>
  Supervisor.find().then((supervisor) => supervisor);

Supervisor.getSupervisorDetails = (sid) =>
  Supervisor.find({ sid: sid }).then((supervisor) => supervisor[0]);

Supervisor.addSupervisor = (name, sid, password, email, phone, gender) =>
  Supervisor.create({
    name: name,
    sid: sid,
    password: password,
    email: email,
    phone: phone,
    gender: gender,
  }).then((supervisor) => supervisor);

Supervisor.deleteSupervisor = (supervisorID) =>
  Supervisor.deleteOne({ sid: supervisorID }).then((supervisor) => supervisor);

module.exports = Supervisor;
