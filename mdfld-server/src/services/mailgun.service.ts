import formData from "form-data";
import Mailgun from "mailgun.js";
import { TMAILCONTEXT } from "../types/mail.type.js";
import CustomError from "../utils/common/error.util.js";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_SENDING_API_KEY as string,
});

class MailgunService {
  static async sendMail(context: TMAILCONTEXT) {
    return new Promise((resolve, reject) => {
      mg.messages
        .create(context.domain, {
          from: context.from,
          to: context.to,
          subject: context.subject,
          html: context.body,
        })
        .then((msg: any) => {
          resolve(msg);
        })
        .catch((err: any) => {
          const mailGunError = new CustomError(
            err.status,
            `message: ${err.message},${err.details},${err.types}`
          );
          reject(mailGunError);
        });
    });
  }
}
export default MailgunService;
