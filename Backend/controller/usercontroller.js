const { Error } = require("mongoose");
const User = require("../models/user");
const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const nodemailer = require("../utlis/nodemailer");
const cloudinary = require("cloudinary");

exports.signup = async (req, res) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    if (req.body.password === req.body.cpassword) {
      const { name, email, password } = req.body;
      let user = await User.create({
        name,
        email,
        password,
        images: {
          public_id: myCloud.public_id,
          public_url: myCloud.secure_url,
        },
      });
      if (user) {
        var token = jwt.sign({ id: user._id }, process.env.Secret_key);
        res.cookie("token", token, {
          httpOnly: true,
          expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 DAYS
        });
        res.status(200).json({
          success: true,
          user,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Bad Request",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Password doesnt match",
      });
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
exports.logout = async (req, res) => {
  // res.clearCookie("token");
  console.log("ee");
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  return res.status(200).json({
    success: true,
    message: "Succesfully Logged Out",
  });
};

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid Username/Password",
      });
    } else {
      if (await bcryptjs.compare(req.body.password, user.password)) {
        var token = jwt.sign({ id: user._id }, process.env.Secret_key);
        res.cookie("token", token, {
          httpOnly: true,
          expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 DAYS
        });
        res.status(200).json({
          success: true,
          user,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid Username/Password",
        });
      }
    }
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.forgotpass = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Account Doesnt Exist",
      });
    } else {
      var token = jwt.sign({ id: "aufyv" }, process.env.Secret_key);
      user.resetpass = token;
      user.resetpasstime = Date.now() + 15 * 60 * 1000;
      await user.save();
      // const resetPasswordUrl =`http://localhost:3000/resetpass/${token}`
      const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
      )}/resetpass/${token}`;
      const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
      await nodemailer.main({
        email: req.body.email,
        subject: "Email for resetting Password",
        message: message,
      });
      return res.status(200).json({
        success: true,
        message: "Req done",
      });
    }
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};

exports.changepass = async (req, res) => {
  let user = await User.findOne({ resetpass: req.params.token });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Token Either Expired or wrong ",
    });
  } else {
    if (user.resetpasstime > Date.now()) {
      if (req.body.password === req.body.cpassword) {
        user.resetpass = undefined;
        user.resetpasstime = undefined;
        user.password = req.body.password;
        await user.save();
        var token = jwt.sign({ id: user._id }, process.env.Secret_key);
        res.cookie("token", token, {
          httpOnly: true,
          expiresIn: 7 * 24 * 60 * 60 * 1000, // 7 DAYS
        });
        return res.status(200).json({
          success: true,
          message: "Password Updates Successfully",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Password does'nt match ",
        });
      }
    } else {
      user.resetpass = undefined;
      user.resetpasstime = undefined;
      await user.save();
      return res.status(401).json({
        success: false,
        message: "Token Either Expired or wrong ",
      });
    }
  }
};

// Get User Details
exports.getuserdetail = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.User,
    });
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};

// Update Password or other details from user side
exports.updateuser = async (req, res) => {
  try {
    let user = await User.findById(req.User.id);
    // all other field will be autofilled handlled from frontend
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.avatar != "") {
      const imageId = user.images.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      user.images = {
        public_id: myCloud.public_id,
        public_url: myCloud.secure_url,
      };
    }
    await user.save();
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updatepass = async (req, res) => {
  try {
    if (await bcryptjs.compare(req.body.oldpassword, req.User.password)) {
      if (req.body.password === req.body.cpassword) {
        req.User.password = req.body.password;
        await req.User.save();
        res.status(200).json({
          success: true,
          message: "Password Updated Successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Password doesnt match",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "OldPassword iswrong",
      });
    }
  } catch (e) {
    res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};

exports.createreviews = async (req, res) => {
  try {
    let productid = req.body.productid;
    let userid = req.User.id;
    let product = await Product.findById(productid);
    if (!product) {
      res.status(401).json(`Product Does Not Exists!!`);
    }
    let isreviewed = false;
    product.reviews.forEach((element) => {
      if (element.user.toString() === userid.toString()) {
        (element.rating = req.body.rating),
          (element.comment = req.body.comment);
        isreviewed = true;
        return;
      }
    });
    if (isreviewed === true) {
      let avg = 0;
      product.reviews.forEach((element) => {
        avg += element.rating;
      });
      avg = avg / product.noofreviews;
      product.ratings = avg;
      await product.save();
    } else {
      let review = {
        user: userid,
        name: req.User.name,
        rating: req.body.rating,
        comment: req.body.comment,
      };
      console.log(review);
      product.reviews.push(review);
      let avg = 0;
      product.reviews.forEach((element) => {
        avg += element.rating;
      });
      product.noofreviews = Number(product.noofreviews) + 1;
      avg = avg / product.noofreviews;
      product.ratings = avg;
      await product.save();
    }
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};
