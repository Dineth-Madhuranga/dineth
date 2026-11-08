import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { ContactFields } from "../contact-schema";
import { ownerEmail, visitorEmail } from "./templates";
import { siteUrl } from "../../data/site";

let transporter: Transporter | undefined;
export function getTransporter() {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT || 465);
  if (![465, 587].includes(port)) throw new Error("Unsupported SMTP port");
  const secure = port === 465;
  if (process.env.SMTP_SECURE && (process.env.SMTP_SECURE === "true") !== secure)
    throw new Error("Inconsistent SMTP security configuration");
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    requireTLS: !secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
  });
  return transporter;
}

export async function sendOwner(data: ContactFields, key: string) {
  const result = await getTransporter().sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.CONTACT_TO_EMAIL || "dinethlaksitha@gmail.com",
    replyTo: data.email,
    messageId: `<portfolio-${key}@${new URL(siteUrl()).hostname}>`,
    ...ownerEmail(data, siteUrl(), new Date().toISOString()),
  });
  if (!result.accepted?.length) throw new Error("Owner notification not accepted");
}

export async function sendAcknowledgment(data: ContactFields, key: string) {
  const result = await getTransporter().sendMail({
    from: process.env.MAIL_FROM,
    to: data.email,
    replyTo: process.env.CONTACT_TO_EMAIL || "dinethlaksitha@gmail.com",
    messageId: `<confirmation-${key}@${new URL(siteUrl()).hostname}>`,
    ...visitorEmail(data, siteUrl()),
  });
  if (!result.accepted?.length) throw new Error("Acknowledgment not accepted");
}
