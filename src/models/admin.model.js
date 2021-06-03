const mongoose = require("mongoose");
const tokens = require("../helpers/tokens");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    aid: {
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

adminSchema.methods.generateAuthToken = async function generateAuthToken() {
  // Generates an access token and refresh token for the admin
  const admin = this;
  const accessToken = tokens.createAccessToken(admin.aid);
  const refreshToken = tokens.createRefreshToken(admin.aid);
  const token = {
    accessToken,
    accessTokenTime: 3600,
    refreshToken,
    refreshTokenTime: 604800,
  };
  admin.tokens.push(token);
  await admin.save();
  return token;
};

adminSchema.methods.refreshAccessToken = async (refreshToken) => {
  // Search for a admin by aid
  const { aid } = tokens.decodeRefreshToken(refreshToken);
  const admin = await Admin.findOne({
    aid,
    "tokens.refreshToken": refreshToken,
  });
  if (!admin) {
    throw new Error({ message: "Admin Not found" });
  }
  const index = tokens.findRefreshToken(admin, refreshToken);
  if (index === -1) {
    throw new Error({
      message: "Refresh token doesn't exist Suddenly but how",
    });
  }
  const accessToken = tokens.createAccessToken(aid);
  admin.tokens[index].accessToken = accessToken;
  await admin.save();
  return admin.tokens[index];
};

const Admin = mongoose.model("Admin", adminSchema);

Admin.getAdminDetails = (aid) =>
  Admin.find({ aid: aid }).then((admin) => admin[0]);

module.exports = Admin;
