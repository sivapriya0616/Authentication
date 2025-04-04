// import express from "express";
// import mysql from "mysql2";
// import dotenv from "dotenv";
// import cors from "cors";
// import bodyParser from "body-parser";
// import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
// // import jwt from "jsonwebtoken"; // Uncomment if using JWT
// import cookieParser from "cookie-parser"; 
// import session from 'express-session';

// const app = express();

// dotenv.config({ path: './.env' });

// // Set up MySQL database connection
// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE,
// });

// db.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("MySQL connection successful");
//   }
// });

// // Enable CORS for all origins
// app.use(cors({
//   origin: "http://localhost:5173",  // Allow requests only from your frontend server
//   methods: ["GET", "POST", "PUT", "DELETE"],  // Specify the allowed HTTP methods
//   credentials: true,  // Allow credentials (cookies, sessions, etc.)

// }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(session({
//     secret: 'secret',
//     resave: false, // Prevents saving the session if nothing has changed
//     saveUninitialized: false,
//     cookie: { 
//         secure: false,  // Use true if using HTTPS
//         httpOnly: true,
//         maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
//     }
// }));

// app.use(bodyParser.json());  // Allow JSON data in the request body

// // Register Route
// app.post("/Register", async (req, res) => {
//     const { name, email, password } = req.body;

//     // Validate input
//     if (!name || !email || !password) {
//         return res.status(400).json({ Message: "Please fill in all fields" });
//     }

//     // Check if the user already exists
//     db.query('SELECT * FROM users WHERE EMAIL = ?', [email], async (err, results) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ Message: "Error querying database" });
//         }

//         if (results.length > 0) {
//             return res.status(400).json({ Message: "User already exists" });
//         } else {
//             // Hash the password before storing it in the database
//             const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

//             const query = "INSERT INTO users (EMAIL, PASS, USERNAME) VALUES (?)";
//             const values = [email, hashedPassword, name];

//             // Execute the query to insert the new user
//             db.query(query, [values], (err, result) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(500).json({ Message: "Error inserting into database" });
//                 } else {
//                     console.log(result);
//                     return res.status(201).json({ Message: "Registration successful", result });
//                 }
//             });
//         }
//     });
// });

// // Login Route
// app.post('/Login', async (req, res) => {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//         return res.status(400).json({ Message: "Please provide both email and password" });
//     }

//     // Query to find the user by email
//     const query1 = "SELECT * FROM users WHERE EMAIL = ?";
//     const values = [email];
    
//     db.query(query1, values, async (err, result) => {
//         if (err) {
//             console.log("Database query error:", err);
//             return res.status(500).json({ Message: "Error querying database", error: err });
//         }

//         if (result.length > 0) {
//             const user = result[0]; // Assuming one user with that email

//             // Compare the provided password with the hashed password stored in the database
//             const isMatch = await bcrypt.compare(password, user.PASS);

//             if (isMatch) {
//                 req.session.name = result[0].USERNAME; // Store username in session
//                 console.log("Logged in as:", req.session.name);
                
//                 // Uncomment and use JWT if needed
//                 // const token = jwt.sign({ id: user.ID }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
//                 // res.cookie("auth_token", token, { httpOnly: true, secure: false });

//                 // Respond with the login success
//                 res.status(200).json({ Login: true, message: "Login successful" });
//             } else {
//                 return res.status(401).json({ Login: false, Message: "Invalid credentials" });
//             }
//         } else {
//             return res.status(401).json({ Login: false, Message: "User not found" });
//         }
//     });
// });

// // Logout Route
// app.post('/Logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).json({ Message: "Error logging out" });
//         }
//         res.clearCookie('connect.sid'); // Clear the session cookie
//         res.status(200).json({ Message: "Logout successful" });
//     });
// });

// // Get Route for Session Validation
// app.get('/', (req, res) => {
//     if (req.session.name) {
//         return res.json({ valid: true, name: req.session.name });
//     } else {
//         return res.json({ valid: false });
//     }
// });

// // Start the server
// const port = 5001;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

dotenv.config({ path: "./.env" });

// Set up MySQL database connection
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("MySQL connection successful");
  }
});

// Enable CORS for all origins
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests only from your frontend server
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
    credentials: true, // Allow credentials (cookies, sessions, etc.)
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false, // Prevents saving the session if nothing has changed
    saveUninitialized: false,
    cookie: {
      secure: false, // Use true if using HTTPS
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);
app.use(bodyParser.json()); // Allow JSON data in the request body

// Register Route
app.post("/Register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ Message: "Please fill in all fields" });
  }

  db.query("SELECT * FROM users WHERE EMAIL = ?", [email], async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error querying database" });
    }

    if (results.length > 0) {
      return res.status(400).json({ Message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = "INSERT INTO users (EMAIL, PASS, USERNAME) VALUES (?)";
      const values = [email, hashedPassword, name];

      db.query(query, [values], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ Message: "Error inserting into database" });
        } else {
          return res.status(201).json({ Message: "Registration successful" });
        }
      });
    }
  });
});

// Login Route
app.post("/Login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ Message: "Please provide both email and password" });
  }

  const query = "SELECT * FROM users WHERE EMAIL = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error querying database" });
    }

    if (results.length > 0) {
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.PASS);

      if (isMatch) {
        req.session.name = user.USERNAME;
        return res.status(200).json({ Login: true, Message: "Login successful" });
      } else {
        return res.status(401).json({ Login: false, Message: "Invalid credentials" });
      }
    } else {
      return res.status(401).json({ Login: false, Message: "User not found" });
    }
  });
});

// Logout Route
app.post("/Logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ Message: "Error logging out" });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({ Message: "Logout successful" });
  });
});

// Session Validation Route
app.get("/", (req, res) => {
  if (req.session.name) {
    return res.json({ valid: true, name: req.session.name });
  } else {
    return res.json({ valid: false });
  }
});

// Start the server
const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});