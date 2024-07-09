require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// app.use(cookieParser());

// Serve static files from the 'public' directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const authRouter = require("./routes/auth/authRouter");
const paymentRouter = require("./routes/payment/paymentRouter");
const dashboardRouter = require("./routes/dashboard/dashboardRouter");
const profileRouter = require("./routes/profile/profileRouter");

app.use('/api/v1', authRouter);
app.use('/api/v1/order', paymentRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/profile', profileRouter);

app.listen(PORT, () => {
    console.log("Server started");
});