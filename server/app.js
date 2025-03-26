import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import session from "express-session";


const app = express();

dotenv.config({ path: './.env' });

// Set up MySQL database connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL connection successful");
  }
});

// Enable CORS for all origins
app.use(cors({
  origin: "http://localhost:5173",  // Allow requests only from your frontend server
  methods: ["GET", "POST", "PUT", "DELETE"],  // Specify the allowed HTTP methods
}));

app.use(bodyParser.json());  // Allow JSON data in the request body

// Register Route
app.post("/Register", async (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    db.query('SELECT * FROM users WHERE EMAIL = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ Message: "Error querying database" });
        }

        if (results.length > 0) {
            return res.status(400).json({ Message: "User already exists" });
        } else {
            // Hash the password before storing it in the database
            const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

            const query = "INSERT INTO users (EMAIL, PASS) VALUES (?)";
            const values = [email, hashedPassword];

            // Execute the query to insert the new user
            db.query(query, [values], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ Message: "Error inserting into database" });
                } else {
                    console.log(result);
                    return res.status(201).json({ Message: "Registration successful", result });
                }
            });
        }
    });
});

// Login Route
app.post('/Login', (req, res) => {
    const { email, password } = req.body;

    // Query to find the user by email
    const query1 = "SELECT * FROM users WHERE EMAIL = ?";
    const values = [email];
    
    db.query(query1, values, async (err, result) => {
        if (err) {
            console.log("Database query error:", err);
            return res.status(500).json({ Message: "Error querying database", error: err });
        }

        if (result.length > 0) {
            const user = result[0]; // Assuming one user with that email

            // Compare the provided password with the hashed password stored in the database
            const isMatch = await bcrypt.compare(password, user.PASS);

            if (isMatch) {
                return res.status(200).json({ Login: true });
            } else {
                return res.status(401).json({ Login: false, Message: "Invalid credentials" });
            }
        } else {
            return res.status(401).json({ Login: false, Message: "User not found" });
        }
    });
});

// Start the server
const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});