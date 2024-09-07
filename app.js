const express = require("express");
const app = express();
const path = require("path");

// Middleware to check working hours (Monday to Friday, 9 AM to 5 PM)
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  const hour = now.getHours(); // 0 - 23

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send(
      "<h1>Our services are only available Monday to Friday, 9 AM to 5 PM.</h1>"
    );
  }
};

// Apply middleware to all routes
app.use(workingHoursMiddleware);

// Set view engine to Pug (if you choose Pug)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serve static files like CSS
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/services", (req, res) => {
  res.render("services", { title: "Our Services" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
