import { EmailAttachment } from "./EmailAttachment";

export class Email{
   received!:Date;
  from!:String;
   subject!:String;
   body!:String;
  attachments!:EmailAttachment[];
}