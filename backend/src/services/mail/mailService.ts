import { EmailServiceError } from "@/errors/InfrastructureError.js";
import nodemailer, { type Transporter } from "nodemailer";
import { renderActivationEmail } from "./renderActivationMail.js";

export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    try {
      if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        throw new EmailServiceError("Check SMTP configuration!");
      }

      const info = await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Account activation on ${process.env.API_URL}`,
        html: renderActivationEmail(link),
      });
      return info;
    } catch (error: any) {
      throw new EmailServiceError(error.message);
    }
  }
}
