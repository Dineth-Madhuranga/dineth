import type { ContactFields } from "../contact-schema";
import { site } from "../../data/site";

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!,
  );
}

function shell(label: string, title: string, body: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head><body style="margin:0;background:#f5f2eb;color:#1b211e;font-family:Arial,Helvetica,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fffcf7;border:1px solid #d8d0c2"><tr><td style="padding:32px;border-bottom:1px solid #d8d0c2"><span style="font-size:38px;font-weight:bold;letter-spacing:-3px">dm<span style="color:#b85f42">.</span></span><p style="font-size:10px;letter-spacing:2px;color:#465b4b">${label}</p></td></tr><tr><td style="padding:32px"><h1 style="font-size:30px;line-height:1.2;font-weight:normal;margin:0 0 28px">${title}</h1>${body}</td></tr><tr><td style="border-top:1px solid #d8d0c2;padding:24px 32px;color:#62665e;font-size:12px;line-height:1.7">Dineth Madhuranga · Software Engineer<br>Sri Lanka · Thoughtful interfaces. Dependable engineering.</td></tr></table></td></tr></table></body></html>`;
}

export function ownerEmail(data: ContactFields, origin: string, timestamp: string) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const fields = [
    ["FROM", `${name} &lt;${email}&gt;`],
    ["COMPANY", escapeHtml(data.company || "Not provided")],
    ["INQUIRY", escapeHtml(data.inquiry)],
    ["RECEIVED", escapeHtml(timestamp)],
    ["SOURCE", escapeHtml(origin)],
  ];
  return {
    subject: `New Portfolio Inquiry — ${data.name}`,
    html: shell(
      "A NEW CONVERSATION",
      "Someone has something in mind.",
      `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${fields.map(([label, value]) => `<tr><td style="padding:8px 0;font-size:10px;color:#62665e;vertical-align:top;width:90px">${label}</td><td style="padding:8px 0;font-size:14px;overflow-wrap:anywhere">${value}</td></tr>`).join("")}</table><div style="margin:24px 0;padding:24px;background:#f5f2eb;border-left:3px solid #b85f42;font-size:15px;line-height:1.7;overflow-wrap:anywhere">${escapeHtml(data.message).replace(/\r?\n/g, "<br>")}</div><a href="mailto:${email}" style="display:inline-block;padding:14px 22px;background:#1b211e;color:#fffcf7;text-decoration:none;font-size:14px">Reply to visitor &#8599;</a>`,
    ),
    text: `New portfolio inquiry\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "Not provided"}\nInquiry: ${data.inquiry}\nReceived: ${timestamp}\nSource: ${origin}\n\n${data.message}\n\nReply: ${data.email}`,
  };
}

export function visitorEmail(data: ContactFields, origin: string) {
  const firstName = escapeHtml(data.name.split(/\s+/)[0]);
  const linkedInHtml = site.linkedinVerified
    ? ` · <a style="color:#465b4b" href="${escapeHtml(site.linkedin)}">LinkedIn</a>`
    : "";
  return {
    subject: "Thanks for reaching out — Dineth Madhuranga",
    html: shell(
      "MESSAGE RECEIVED",
      "Thanks for getting in touch.",
      `<p style="font-size:16px;line-height:1.8">Hi ${firstName},</p><p style="font-size:16px;line-height:1.8">I’ve received your message and appreciate you taking the time to reach out. I’ll review your inquiry and get back to you as soon as possible.</p><p style="font-size:16px;line-height:1.8">In the meantime, feel free to explore some of my recent work.</p><p style="margin:28px 0"><a href="${escapeHtml(origin)}/#work" style="display:inline-block;padding:14px 22px;background:#1b211e;color:#fffcf7;text-decoration:none;font-size:14px">Explore selected work &#8599;</a></p><p style="font-size:15px;line-height:1.8">Best regards,<br><strong>Dineth Madhuranga</strong><br>Software Engineer</p><p style="font-size:13px"><a style="color:#465b4b" href="${escapeHtml(site.github)}">GitHub</a>${linkedInHtml}</p><p style="font-size:12px;color:#62665e">Your ${escapeHtml(data.inquiry.toLowerCase())} inquiry has been received.</p>`,
    ),
    text: `Hi ${data.name.split(/\s+/)[0]},\n\nThanks for getting in touch.\n\nI've received your message and appreciate you taking the time to reach out. I'll review your inquiry and get back to you as soon as possible.\n\nIn the meantime, feel free to explore some of my recent work: ${origin}/#work\n\nBest regards,\nDineth Madhuranga\nSoftware Engineer\n${site.github}${site.linkedinVerified ? `\n${site.linkedin}` : ""}`,
  };
}
