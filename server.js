const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from your first EC2 backend!");
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    message: "Your backend is working fine!",
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
