import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
// import path from 'path'
import { rateLimit } from 'express-rate-limit'
import cors from "cors"
// import rateLimiter from "./middleware/ratelimiter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
// const __dirname = path.resolve();
 
  app.use(
  cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
/// This  middleware will parse json bodies:re.body or simple custom  middle ware
// app.use(rateLimiter)
app.use((req, res, next) => {
  console.log(`Request method is ${req.method} & Req URL is ${res.url}`);
  next();

})


app.use("/api/notes", limiter, notesRoutes);



connectDB().then(() => {

  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);

  });
});
