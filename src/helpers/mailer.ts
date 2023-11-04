

import nodemailer from "nodemailer";

import User from "@/models/userModel";

import bcryptjs from "bcryptjs";

export const sendEmail = async({email, emailType, userId}:any) => {

    try {

        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType==="VERIFY") {
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if(emailType==="RESET") {
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, verifyYokenExpiry: Date.now() + 3600000})
        } 

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "5f7492179361f8",
              pass: "c8be381e4ee4e5"
            }
          });


          const mailOptions ={
            from: "sammitbathla9@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" :"RESET YOUR PASSWORD",
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token = ${hashedToken}">here</a> to ${emailType==="VERIFY" ? "Verify your email" : "Reset your password"} or copy and paste the link in the browser. <br> ${process.env.DOMAIN}/vberifyemail?token = ${hashedToken} </p>`

          }

          const mailresponse =  await transport.sendMail(mailOptions);
          return mailresponse;

    }

    catch (error:any) {
        throw new Error(error.message);
        console.log(error);
    }
 


}

