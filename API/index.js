require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();

app.use(cors({
    origin: 'http://localhost:3001',  // i am doing this because of cookie request
    // origin: 'http://65.0.30.99',  // i am doing this because of cookie request
    // origin: 'http://crm.bhupeshmittal.com',  // i am doing this because of cookie request
    credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());
// app.use(cookieParser());


const authRouter = require("./routes/auth/authRouter");
const paymentRouter = require("./routes/payment/paymentRouter");
const dashboardRouter = require("./routes/dashboard/dashboardRouter");

app.use('/api/v1', authRouter);
app.use('/api/v1/order', paymentRouter);
app.use('/api/v1/dashboard', dashboardRouter);

app.listen(PORT, () => {
    console.log("Server started");
});