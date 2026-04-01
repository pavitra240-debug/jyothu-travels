import dotenv from "dotenv";
dotenv.config();

async function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("⚠️ Email credentials not configured");
    return null;
  }

  const nodemailer = (await import("nodemailer")).default;

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export const sendBookingNotification = async (bookingDetails) => {
  try {
    const transporter = await getTransporter();
    if (!transporter) return false;

    const {
      name,
      phone,
      email,
      travelDate,
      numberOfPeople,
      type,
      serviceId,
      message,
    } = bookingDetails;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "jyothutravelsandtourism@gmail.com",
      subject: `New Booking Request: ${type.toUpperCase()} from ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <h3>Travel Details</h3>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Service Name/ID:</strong> ${serviceId || "N/A"}</p>
        <p><strong>Date of Travel:</strong> ${travelDate}</p>
        <p><strong>Number of Travelers:</strong> ${numberOfPeople}</p>
        <hr/>
        <h3>Special Requests</h3>
        <p>${message || "None"}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Booking email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Booking email error:", error);
    return false;
  }
};

export const sendContactNotification = async (contactDetails) => {
  try {
    const transporter = await getTransporter();
    if (!transporter) return false;

    const { name, email, phone, message } = contactDetails;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "jyothutravelsandtourism@gmail.com",
      subject: `New Contact Request from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <h3>Message</h3>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("❌ Contact email error:", error);
    return false;
  }
};