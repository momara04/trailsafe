import { config } from '../config.js';

// in production we'd import Twilio/mailgun/etc.
export async function notifyContacts({ contacts, message, location }) {
  const payload = { message, location, from: config.notify.smsFrom };
  console.log('NOTIFY ->', { to: contacts, ...payload });
  // return a shape your frontend can display
  return { sent: contacts.map(c => ({ id: c.id, phone: c.phone, status: 'queued' })) };
}
