const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper


exports.main=async (options)=>{
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: process.env.service,
      auth: {
          user: process.env.USER,
          pass: process.env.PASS
      }
    });
    
    await transporter.sendMail({
      from: process.env.USER, // sender address
      to: options.email, // list of receivers
        subject: options.subject, // Subject line
      text: options.message, // html body
    });
}
