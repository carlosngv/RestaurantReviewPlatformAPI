import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  
  private transporter: nodemailer.Transporter;

  constructor() {
    if( !this.transporter )
      this.transporter = this.configEmailTransport();
  }

  configEmailTransport(): nodemailer.Transporter {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });
  }

  async sendEmail( userEmail: string, token: string ) {
    const confirmationUrl = `${process.env.APP_HOST}:${process.env.PORT}/api/auth/confirmation/${ token }`;
    await this.transporter.sendMail({
      from: `"Restaurant Review Team 🧑🏻‍🍳"<${ process.env.APP_EMAIL }>`,
      to: userEmail,
      subject: 'Restaurant Review - Email Confirmation',
      html: `
        <h1>Please, confirm your email</h1>
        <p>To confirm your email address, please click the link below:</p>
        <br/>
        <a href="${confirmationUrl}">${confirmationUrl}</a>
      `
    })
  }

  

}
