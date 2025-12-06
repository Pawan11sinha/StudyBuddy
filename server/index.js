const express = require("express");
const app = express();

const doubtRoutes = require("./routes/Doubt");
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;


database.connect();


const allowedOrigins = [
  "http://localhost:5173",                
  "study-buddy-omega-tan.vercel.app", 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ---------- Middlewares ----------
app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.use("/api/v1/doubt", doubtRoutes);


app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.get("/ping", (req, res) => {
  return res.json({
    success: true,
    message: "Server is running fine ✅",
  });
});


app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
