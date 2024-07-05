const express = require("express");
const cors = require("cors");
const PORT = 3000;
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',  // i am doing this because of cookie request
    // origin: 'http://65.0.30.99',  // i am doing this because of cookie request
    // origin: 'http://crm.bhupeshmittal.com',  // i am doing this because of cookie request
    credentials: true,
}));
app.use(express.json());
// app.use(cookieParser());


const authRouter = require("./routes/auth/authRouter");

// app.use('/api/v1/util', utilRouter);

app.listen(PORT, () => {
    console.log("Server started");
});