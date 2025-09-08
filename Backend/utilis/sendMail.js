import nodemailer from "nodemailer";

export const sendMAil = async (options) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "akd12345678901@gmail.com", // your Gmail
        pass: "psjfbjpkwhoxnvaj", // app password
      },
    });

    const mailOptions = {
      from: "akd12345678901@gmail.com",
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    const info = await transport.sendMail(mailOptions);
    console.log("Email sent:", info.response); // debug info
    return info;
  } catch (err) {
    console.error("Error sending email:", err); // log actual reason
    throw err; // propagate error to outer try/catch
  }
};
