const express = require("express");
const User = require("./models").user;
const app = express();
const PORT = 4000;
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

app.post("/echo", (req, res) => {
  res.json(req.body);
});

app.post("/users", async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      res.status(400).send("Must provide an all information");
    } else {
      const user = await User.create({
        name,
        email,
        phone,
        password,
      });
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
