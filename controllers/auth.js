// const Account = require('../models/account');
// const jwt = require('jsonwebtoken');
// const Constants = require('../utils/constants');
// const bcrypt = require('bcrypt');
// const logger = require('../utils/logger');

// exports.login = async (req, res, next) => {
//   const data = req.body;

//   if (data) {
//     try {
//       const account = await Account.findOne({
//         where: {
//           account_email: data.email,
//         },
//       });
//       if (account) {
//         //Verify password
//         const isSamePassword = await bcrypt.compare(
//           data.password,
//           account.account_password
//         );

//         if (isSamePassword) {
//           const responseData = {
//             id: account.id_account,
//             name: account.account_fullname,
//             email: account.account_email,
//             status: account.account_status,
//             token: jwt.sign(
//               {
//                 id: account.id_account,
//                 username: account.account_username,
//                 email: account.account_email,
//               },
//               Constants.SECRET,
//               {
//                 expiresIn: '30d',
//               }
//             ),
//           };
//           return res.status(200).json({
//             ...responseData,
//           });
//         }
//       }

//       return res.status(401).json({
//         message: 'Incorrect username and password',
//       });
//     } catch (err) {
//       logger.error({
//         message: 'Error on auth.controller (login): ',
//         error: err,
//       });
//       return res.status(500).json({ err, message: err.toString() });
//     }
//   }
// };

const { Router, response } = require("express");
const firebase = require("firebase");
const axios = require("axios");

const { admin } = require("../config/admin");
const auth = require("../middleware/validate_auth");

const { Contact, Rider } = require("../models");
const { token } = require("morgan");

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const data = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const token = await data.user.getIdToken();

    const user = await admin.auth().getUser(data.user.uid);

    const refreshToken = data.user.toJSON()?.stsTokenManager?.refreshToken;

    return response.status(200).json({ token, user, refreshToken });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error, message: error.toString() });
  }
};

const refreshToken = async (request, response) => {
  try {
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer ")
    ) {
      let token = request.headers.authorization.split("Bearer ")[1];

      const result = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`,
        {
          refresh_token: token,
          grant_type: "refresh_token",
        }
      );

      return response.status(200).json({ token: result.data?.access_token });
    } else {
      console.error("No refresh token found");
      return response.status(401).json({ error: "Unauthoraized" });
    }
  } catch (error) {
    return response.status(500).json({ error, message: error.toString() });
  }
};

const fetchUser = async (request, response) => {
  try {
    const user = { ...request.user };

    console.log(user.uid);

    if (user.customClaims?.contact) {
      user.contact = await Contact.findOne({ where: { accountId: user.uid } });
    } else if (user.customClaims?.rider) {
      user.rider = await Rider.findOne({ where: { accountId: user.uid } });
    }

    return response.status(200).json({ user });
  } catch (error) {
    return response.status(500).json({ error, message: error.toString() });
  }
};