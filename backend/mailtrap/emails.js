// import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
// import { mailtrapClient, sender } from "./mailtrap.config.js";

// export const sendVerificationEmail = async (email, verificationToken) => {
//   const recipient = [{ email }];
//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Verify your email",
//       html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
//       category:"Email Verification"
//     });
//     console.log("Email send Succes",response)
//   } catch (error) {
//     console.log("🚀 ~ sendVerificationEmail ~ error:", error)
//     throw new Error(`Error sending verification email:, ${error}`)
//   }
// };


// export const sendWelcomeEmail=async(email,name)=>{

// }


import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { transporter, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const html = VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken);

  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Verify your email",
      html,
    });
    console.log("Email sent successfully:", response.messageId);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};


export const sendWelcomeEmail = async (email, name) => {
  const html = `<h1>Welcome, ${name}!</h1><p>Thanks for joining Universal Stationery Suppliers.</p>`;

  try {
    const response = await transporter.sendMail({
      from: `"${sender.name}" <${sender.email}>`,
      to: email,
      subject: "Welcome to Universal Stationery Suppliers!",
      html,
    });
    console.log("Welcome email sent:", response.messageId);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};
