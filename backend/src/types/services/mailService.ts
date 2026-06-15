import type { Transporter } from "nodemailer";

export type MailServiceType = {
  sendActivationMail(to: string, link: string): Promise<any>;
};
