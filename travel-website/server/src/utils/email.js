import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send booking notification email
 * @param {Object} bookingDetails - The booking information
 */
export const sendBookingNotification = async (bookingDetails) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️ Nodemailer not configured. Please set EMAIL_USER and EMAIL_PASS in .env to enable email notifications.');
    return false;
  }

  const { name, phone, email, travelDate, numberOfPeople, type, serviceId, message } = bookingDetails;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'jyothutravelsandtourism@gmail.com', // As requested by user
    subject: `New Booking Request: ${type.toUpperCase()} from ${name}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr />
      <h3>Travel Details</h3>
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Service Name/ID:</strong> ${serviceId || 'N/A'}</p>
      <p><strong>Date of Travel:</strong> ${travelDate}</p>
      <p><strong>Number of Travelers:</strong> ${numberOfPeople}</p>
      <hr />
      <h3>Special Requests</h3>
      <p>${message || 'None'}</p>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Booking email notification sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending booking email notification:', error);
    return false;
  }
};

/**
 * Send contact form notification email
 * @param {Object} contactDetails - The contact form information
 */
export const sendContactNotification = async (contactDetails) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return false;

  const { name, email, phone, message } = contactDetails;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'jyothutravelsandtourism@gmail.com',
    subject: `New Contact Request from ${name}`,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr />
      <h3>Message:</h3>
      <p>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('❌ Error sending contact email notification:', error);
    return false;
  }
};
