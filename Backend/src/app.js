const express = require("express");
const cookieParser=require("cookie-parser")
const cors=require("cors")

const app = express();

app.use(express.json());
app.use(cookieParser())
// app.use(cors({
//     origin:"http://localhost:5174",
//     credentials:true
// }))

// app.use(cors({
//     origin: [
//     //   "http://localhost:5174",
//       "https://full-stack-preap-ai-project.vercel.app/"
//     ],
//     credentials: true
//   }));

  app.use(cors({
    origin: [
      "http://localhost:5174",
      "https://bishal-preap-ai.netlify.app"
    ],
    credentials: true
  }));

// required all the routes here
const authRouter = require("./routes/auth.routes");

// required the interview routes--/
const interviewRouter=require("./routes/interview.routes")

// using all the routes here *
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
