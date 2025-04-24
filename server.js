const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

const JWT_SECRET = "WahidBitcoder";

// ✅ Route: Login and send token in a cookie
app.post("/login-cookie", (req, res) => {
  const token = jwt.sign({ id: "user123" }, JWT_SECRET, { expiresIn: "1h" });
  res.cookie("userToken", token, {
    httpOnly: true,
    maxAge: 3600000, // 1 hour
  });
  res.send({ success: true, method: "cookie", token });
});

// ✅ Route: Login and send token in response (for header)
app.post("/login-header", (req, res) => {
  const token = jwt.sign({ id: "user123" }, JWT_SECRET, { expiresIn: "1h" });
  res.send({ success: true, method: "header", token });
});

// ✅ Middleware to protect route
const protect = (req, res, next) => {
  let token = req.cookies.userToken;

  if (!token && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.status(401).send({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid or expired token" });
  }
};

// ✅ Protected route
app.get("/protected", protect, (req, res) => {
  res.send({ message: "You accessed a protected route!", user: req.user });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
