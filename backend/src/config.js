import 'dotenv/config';

export const config = {
  port: process.env.PORT || 4000,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  openWeatherKey: process.env.OPENWEATHER_API_KEY || '',
  trailsApiBase: process.env.TRAILS_API_BASE || '',
  notify: {
    smsFrom: process.env.NOTIFY_SMS_FROM || '',
    twilioSid: process.env.NOTIFY_TWILIO_SID || '',
    twilioToken: process.env.NOTIFY_TWILIO_TOKEN || ''
  }
};
