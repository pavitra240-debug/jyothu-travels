# Admin Dashboard - Quick Reference Guide

## 🔐 Login Information

### Admin Credentials:
- **Email**: admin@jyothu.com
- **Password**: Admin@123
- **Login URL**: http://localhost:5174/admin-login

### Session Management:
- **Token Expiration**: 8 hours
- **Storage**: LocalStorage (`jyothu_admin_token`)
- **Behavior**: Persists across browser sessions until expired or cleared

---

## 📊 Dashboard Features

### What You Can Do:

1. **View Bookings**
   - See all customer booking requests
   - Includes name, phone, email, travel date
   - Number of travelers, booking type
   - Special requests/messages

2. **Manage Travel Packages**
   - View all listed packages
   - Add new packages
   - Edit package details (name, description, price)
   - Delete packages
   - Upload images for packages

3. **Manage Cars**
   - View all available cars
   - Add new car rental options
   - Edit car details
   - Delete cars
   - Set daily rental prices

4. **Manage Buses**
   - View available buses
   - Add new buses
   - Edit bus information
   - Delete buses
   - Set pricing for group travel

5. **View Contact Submissions**
   - See all messages from contact form
   - View customer inquiries
   - Follow up on requests

---

## 🚀 How to Access Features

### Step 1: Login
1. Go to http://localhost:5174/admin-login
2. Enter email: `admin@jyothu.com`
3. Enter password: `Admin@123`
4. Click "Sign In"

### Step 2: Navigate Dashboard
After login, you'll see:
- Sidebar with main sections
- Booking requests
- Travel packages management
- Cars management
- Buses management
- Contact submissions

### Step 3: Perform Actions

**To Add a New Package:**
1. Click "Travel Packages"
2. Click "Add New Package"
3. Fill in: Name, Description, Price, Image URL
4. Click "Create"

**To Edit an Existing Package:**
1. Find the package in the list
2. Click "Edit"
3. Modify the details
4. Click "Save Changes"

**To Delete a Package:**
1. Find the package in the list
2. Click "Delete"
3. Confirm deletion

---

## 📱 Data Management from Database

### Alternative: Manage Data via MongoDB

If you prefer to manage data directly in MongoDB Atlas:

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Login** with your credentials
3. **Find Your Cluster**: Your database connection
4. **Browse Collections**:
   - `packages` - Travel packages
   - `cars` - Car rental options
   - `buses` - Bus details
   - `bookings` - Customer bookings
   - `contacts` - Contact form submissions

5. **Add/Edit/Delete Records**:
   - Click on collection
   - Click "+" to add new document
   - Click document to edit
   - Use "Delete" to remove

### MongoDB Document Structure:

**Package Document:**
```json
{
  "name": "Goa Weekend Escape",
  "description": "3-day Goa beach tour",
  "price": 15000,
  "imageUrl": "https://example.com/image.jpg",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Car Document:**
```json
{
  "name": "Honda City",
  "description": "Comfortable sedan for family trips",
  "pricePerDay": 2500,
  "imageUrl": "https://example.com/car.jpg",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Bus Document:**
```json
{
  "name": "Tempo Traveller 17-Seater",
  "description": "AC bus for group travel",
  "pricePerDay": 5000,
  "imageUrl": "https://example.com/bus.jpg",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Booking Document:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "travelDate": "2024-02-15",
  "numberOfPeople": 4,
  "type": "package",
  "message": "Need family accommodation",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## 🛠️ Troubleshooting

### Problem: Can't Login
**Solution**:
1. Check if server is running: `npm run dev` in server folder
2. Clear browser cache and cookies
3. Try incognito/private browsing
4. Verify credentials are correct

### Problem: Data Not Showing
**Solution**:
1. Refresh the page (F5)
2. Check MongoDB connection
3. Verify data exists in database
4. Check browser console for errors (F12)

### Problem: Changes Not Saving
**Solution**:
1. Check internet connection
2. Ensure server is running
3. Check if form has validation errors
4. Try again after waiting 2-3 seconds

### Problem: Lost Admin Access
**Solution**:
1. Clear browser LocalStorage: Open DevTools (F12) → Application → LocalStorage → Clear
2. Log in again with credentials
3. If password forgotten, update in MongoDB or backend code

---

## 📋 Common Tasks

### Task 1: Update a Package Price
1. Go to Admin Dashboard
2. Click "Travel Packages"
3. Find the package
4. Click "Edit"
5. Change the price value
6. Click "Save"

### Task 2: Add New Car Option
1. Go to Admin Dashboard
2. Click "Cars"
3. Click "Add New Car"
4. Fill in: Name, Description, Daily Price, Image URL
5. Click "Create"
6. New car now appears on website

### Task 3: View Recent Bookings
1. Go to Admin Dashboard
2. Click "Bookings" (usually first section)
3. See list of all customer booking requests
4. Click on any booking to see details
5. Contact customer at phone number provided

### Task 4: Respond to Customer Inquiry
1. Go to "Contact Submissions"
2. Read the message
3. Call customer at phone number provided
4. Or click "Email" to respond
5. Or use WhatsApp link to contact via messaging

### Task 5: Add Image to Package
When adding/editing packages:
1. Get image URL (from internet, your server, or cloud storage)
2. Paste URL in "Image URL" field
3. Image displays on website packages page
4. Make sure URL is public and accessible

---

## 🔑 Important Information

### Security Notes:
- Never share your admin credentials
- Change default password if deployed publicly
- Token expires after 8 hours (auto logout)
- Always logout before closing browser on shared computers

### Best Practices:
- Add 3-5 sample packages, cars, buses before launch
- Keep descriptions under 200 characters
- Use high-quality images (PNG or JPG)
- Include prices in packages for customer reference
- Review bookings daily to respond quickly

### Data Backup:
- MongoDB Atlas automatically backs up data daily
- Your data is stored in cloud and won't be lost
- If you delete something accidentally, it's gone (no undo)
- Export important data periodically

---

## 📞 Support Features on Website

### Customer Contact Options:
- **Phone**: Click phone number to call directly
- **WhatsApp**: Click WhatsApp link for instant messaging
- **Email**: Send inquiry through contact form
- **Booking**: Multi-step booking form for reservations

All customer inquiries go to your email and phone number configured in the backend.

---

## 🌐 Website Statistics

After deployment, you can track:
- **Page Views**: Using Google Analytics
- **Bookings**: Via booking dashboard
- **Customer Inquiries**: Via contact submissions
- **Traffic**: Using Google Search Console

---

## 📝 Regular Maintenance Checklist

- [ ] Check booking requests daily
- [ ] Respond to customer inquiries within 2 hours
- [ ] Update package prices seasonally
- [ ] Add new travel options as available
- [ ] Review and archive old bookings monthly
- [ ] Update website images with current offerings
- [ ] Monitor for expired links or broken images
- [ ] Backup important data monthly

---

## 🎯 Next Steps

1. **Login and Explore**: Get familiar with the dashboard
2. **Add Sample Data**: Create 3-5 packages, cars, buses
3. **Test Booking Form**: Try booking from customer perspective
4. **Test Contact Form**: Verify you receive inquiries
5. **Share with Team**: If team members need access, create additional admin accounts

---

**Last Updated**: January 2024  
**Version**: 1.0  
**Contact**: Check your admin credentials and database for support info
