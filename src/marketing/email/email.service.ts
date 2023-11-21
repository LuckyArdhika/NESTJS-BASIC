type SendEmailOpt = {
  useTemplate: 'FG';
  sender: string;
  receiver: string;
  templateOptions?: {
    link?: string;
  }
}

export class EmailService {

  async sendEmail(options: SendEmailOpt){
    // You can use any email client or smtp server like Brevo, Mailjet, SendGrid, etc
    // Your code here ....
  }
}