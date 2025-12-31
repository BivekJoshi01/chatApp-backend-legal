import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // e.g., "sandbox.smtp.mailtrap.io"
  port: parseInt("587"), // Usually 587 or 2525
  auth: {
    user: "bvkjosi03@gmail.com",
    pass: "geni auua pjuw jzll",
  },
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Universal Stationery Suppliers",
};
