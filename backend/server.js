const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://sharmaanimesh2004:os9pm8iyYqF0hnn5@cluster0.4ebmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process on connection failure
  });
// Schemas
const queryInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  entityType: { type: String, required: true, enum: ['vendor', 'promoter', 'organizer'] },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  serviceType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  additionalDetails: { type: String },
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
}, { timestamps: true });

// Models
const QueryInfo = mongoose.model("QueryInfo", queryInfoSchema);
const Booking = mongoose.model("Booking", bookingSchema);
const Admin = mongoose.model('Admin', adminSchema);

// Helper Functions
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: admin.role },
    process.env.JWT_SECRET || '16d5aef5f23a13e2ab13999c3cb12a00c3c9c319639e98bddcd9f167061bba954ca36b7b4a23029b753cefd2e7046b6aab99d126ec442f3a54d48272d8fb1a6f008664342110a438a2d947394ff3a635b8506b2d355ccc710fade554d7ed7d78823e2b2afdfa4320fe01ab29d87f4156bbe53c5c2a81a355f88ca05726f523125678747d24b4bac83aea7628f23ed3c7e770c8ae6e03f030c1a6c189e9629ba134a3427f5c338424a22d9560c5adcbfa5bd4fbda10a971da8abbabbbaa3f9c5ca5e32b80961751595faf532e478129f77b032e05c713241a643908c659be7b082e3d5bc094a526d926561a0963bc4b9a8d7ae1c1ca773151d701995e75914d59',
    { expiresIn: '8h' }
  );
};

// Middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || '16d5aef5f23a13e2ab13999c3cb12a00c3c9c319639e98bddcd9f167061bba954ca36b7b4a23029b753cefd2e7046b6aab99d126ec442f3a54d48272d8fb1a6f008664342110a438a2d947394ff3a635b8506b2d355ccc710fade554d7ed7d78823e2b2afdfa4320fe01ab29d87f4156bbe53c5c2a81a355f88ca05726f523125678747d24b4bac83aea7628f23ed3c7e770c8ae6e03f030c1a6c189e9629ba134a3427f5c338424a22d9560c5adcbfa5bd4fbda10a971da8abbabbbaa3f9c5ca5e32b80961751595faf532e478129f77b032e05c713241a643908c659be7b082e3d5bc094a526d926561a0963bc4b9a8d7ae1c1ca773151d701995e75914d59');
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// API Endpoints

// Query Form Submission
app.post("/api/query", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newQuery = new QueryInfo({ name, email, message });
    await newQuery.save();
    
    res.status(201).json({ 
      success: true,
      message: "Thank you for contacting us. We'll reach out to you soon." 
    });
  } catch (err) {
    console.error("Error saving query:", err);
    res.status(500).json({ 
      success: false,
      error: "Failed to save your query. Please try again later." 
    });
  }
});

// Booking Form Submission
app.post("/api/bookings", async (req, res) => {
  try {
    const { entityType, ...data } = req.body;

    if (!entityType || !data.name || !data.email || !data.phone || !data.serviceType || !data.eventDate) {
      return res.status(400).json({ 
        success: false,
        error: "All required fields must be provided" 
      });
    }

    const bookingData = { ...data, entityType };
    const newBooking = new Booking(bookingData);
    await newBooking.save();

    res.status(201).json({ 
      success: true,
      message: "Your booking has been saved successfully!",
      bookingId: newBooking._id
    });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ 
      success: false,
      error: "Failed to save booking. Please try again later." 
    });
  }
});

// Admin Endpoints

// Create Admin (Initial setup only)
app.post('/api/admin/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    const token = generateToken(admin);
    res.status(201).json({ 
      success: true,
      token,
      admin: { email: admin.email, role: admin.role }
    });
  } catch (err) {
    console.error('Admin registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Admin Login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin);
    res.json({ 
      success: true,
      token,
      admin: { email: admin.email, role: admin.role }
    });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Protected Admin Routes

// Get all queries
app.get('/api/admin/queries', authenticateAdmin, async (req, res) => {
  try {
    const queries = await QueryInfo.find().sort({ createdAt: -1 });
    res.json({ 
      success: true,
      count: queries.length,
      queries 
    });
  } catch (err) {
    console.error('Error fetching queries:', err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch queries' 
    });
  }
});

// Get all bookings
app.get('/api/admin/bookings', authenticateAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ 
      success: true,
      count: bookings.length,
      bookings 
    });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch bookings' 
    });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong on the server' 
  });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});