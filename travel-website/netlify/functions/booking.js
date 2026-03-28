import mongoose from 'mongoose';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Define booking schema within the function since we need it for MongoDB connection
const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    travelDate: { type: Date, required: true },
    numberOfPeople: { type: Number, required: true },
    message: String,
    type: {
      type: String,
      enum: ['package', 'car', 'bus'],
      required: true
    },
    serviceId: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

let Booking;
try {
  Booking = mongoose.model('Booking');
} catch (e) {
  Booking = mongoose.model('Booking', bookingSchema);
}

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
}

export const handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);

        // Honeypot check
        if (body.website) {
            console.log('Bot detected via honeypot field');
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Booking received (honeypot)' }),
            };
        }

        // Input Sanitization
        const sanitizedBody = {
            name: (body.name || '').trim().substring(0, 100),
            phone: (body.phone || '').trim().substring(0, 15),
            email: (body.email || '').trim().toLowerCase(),
            travelDate: body.travelDate,
            numberOfPeople: Number(body.numberOfPeople),
            message: (body.message || '').trim().substring(0, 1000),
            type: body.type,
            serviceId: (body.serviceId || '').trim().substring(0, 100)
        };

        // Connect to MongoDB
        await connectDB();

        // Save to Database
        const newBooking = await Booking.create(sanitizedBody);

        // Send Email via Resend
        const { data, error } = await resend.emails.send({
            from: 'Jyothu Travels <onboarding@resend.dev>', // You should use your domain here once verified
            to: 'jyothutravelsandtourism@gmail.com',
            subject: `New Booking Request: ${sanitizedBody.name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #0b6e4f;">New Booking Received</h2>
                    <p><strong>Customer Name:</strong> ${sanitizedBody.name}</p>
                    <p><strong>Phone:</strong> ${sanitizedBody.phone}</p>
                    <p><strong>Email:</strong> ${sanitizedBody.email}</p>
                    <p><strong>Travel Date:</strong> ${sanitizedBody.travelDate}</p>
                    <p><strong>Number of People:</strong> ${sanitizedBody.numberOfPeople}</p>
                    <p><strong>Service Type:</strong> ${sanitizedBody.type}</p>
                    <p><strong>Service ID:</strong> ${sanitizedBody.serviceId || 'N/A'}</p>
                    <p><strong>Message:</strong> ${sanitizedBody.message || 'No message provided.'}</p>
                    <hr>
                    <p style="font-size: 12px; color: #666;">This is an automated notification from Jyothu Travels Website.</p>
                </div>
            `
        });

        if (error) {
            console.error('Resend Error:', error);
        }

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Booking created successfully', id: newBooking._id }),
        };

    } catch (err) {
        console.error('Handler Error:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error', error: err.message }),
        };
    }
};
