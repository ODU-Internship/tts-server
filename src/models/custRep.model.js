const mongoose = require("mongoose");
const tokens = require("../helpers/tokens");

const Schema = mongoose.Schema;

const custRepSchema = new Schema(
  {
    cid: {
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

custRepSchema.methods.generateAuthToken = async function generateAuthToken() {
  // Generates an access token and refresh token for the custRep

  const custRep = this;
  const accessToken = tokens.createAccessToken(custRep.cid);
  const refreshToken = tokens.createRefreshToken(custRep.cid);
  const token = {
    accessToken,
    accessTokenTime: 3600,
    refreshToken,
    refreshTokenTime: 604800,
  };
  custRep.tokens.push(token);
  await custRep.save();
  return token;
};

custRepSchema.methods.refreshAccessToken = async (refreshToken) => {
  // Search for a custRep by sid
  const { cid } = tokens.decodeRefreshToken(refreshToken);
  const custRep = await CustRep.findOne({
    cid,
    "tokens.refreshToken": refreshToken,
  });
  if (!custRep) {
    throw new Error({ message: "CustRep Not found" });
  }
  const index = tokens.findRefreshToken(custRep, refreshToken);
  if (index === -1) {
    throw new Error({ message: "Refresh token dosent exist Suddenly but how" });
  }
  const accessToken = tokens.createAccessToken(sid);
  custRep.tokens[index].accessToken = accessToken;
  await custRep.save();
  return custRep.tokens[index];
};

const CustRep = mongoose.model("CustRep", custRepSchema);

CustRep.getCustRepDetails = (cid) =>
  CustRep.find({ cid: cid }).then((custRep) => custRep[0]);

module.exports = CustRep;
