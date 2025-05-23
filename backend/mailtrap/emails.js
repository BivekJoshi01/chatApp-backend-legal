import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
      category:"Email Verification"
    });
    console.log("Email send Succes",response)
  } catch (error) {
    console.log("🚀 ~ sendVerificationEmail ~ error:", error)
    throw new Error(`Error sending verification email:, ${error}`)
  }
};


export const sendWelcomeEmail=async(email,name)=>{

}