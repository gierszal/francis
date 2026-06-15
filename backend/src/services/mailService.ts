import { EmailConfigError, EmailSendingError } from "@/errors/index.js";
import nodemailer, { type Transporter } from "nodemailer";

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
        throw new EmailConfigError("Check SMTP configuration!");
      }

      const info = await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Account activation on ${process.env.API_URL}`,
        html: `
          <div>
            <h1>For activation click link below</h1>
            <a href="${link}">${link}</a>
          </div>
        `,
      });
      return info;
    } catch (error: any) {
      throw new EmailSendingError(error.message);
    }
  }
}
