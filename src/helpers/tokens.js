/* eslint-disable max-len */
const jwt = require('jsonwebtoken');

exports.createAccessToken = (sid) => jwt.sign({ sid }, process.env.ACCESS_TOKEN_JWT_KEY, { expiresIn: '1h' });

exports.createRefreshToken = (sid) => jwt.sign({ sid }, process.env.REFRESH_TOKEN_JWT_KEY, { expiresIn: '7h' });

exports.decodeRefreshToken = (refreshToken) => jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_KEY);

exports.decodeAccessToken = (accessToken) => jwt.verify(accessToken, process.env.ACCESS_TOKEN_JWT_KEY);

exports.findRefreshToken = (user, refreshToken) => {
  let tokenIndex = -1;
  user.tokens.forEach((token, index) => {
    if (token.refreshToken === refreshToken) {
      tokenIndex = index;
    }
  });
  return tokenIndex;
};
