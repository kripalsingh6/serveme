import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

if(!RESEND_API_KEY){
    console.log("Provide RESEND_API_KEY inside env file");
}

const resend = new Resend(process.env.RESEND_API_KEY);

 const sendEmail= async ({tosend, subject,html})=>{
    try {
        const { data, error } = await resend.emails.send({
    from: 'Servme <onboarding@resend.dev>',
    to: tosend,
    subject: subject,
    html: html,
  });
   if (error) {
    return console.error({ error });
  }

  return data;
    } 
    catch (error) {
        console.log(error);
    }
 }
