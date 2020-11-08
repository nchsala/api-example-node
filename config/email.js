"use strict";
const   nodemailer  = require('nodemailer'),
        conf        = require('../credentials/email');
/**
 * Metodo para envio de e-mail por SMTP
 * @param {{
 *  from: String,
 *  to: String,
 *  subject: String,
 *  html?: String,
 *  text?: String
 * }} message
 */
async function send( message ){
  let transporter = nodemailer.createTransport( conf );
  let info = await transporter.sendMail( message );
  return info.messageId
}
module.exports = {send, conf}