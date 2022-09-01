const User = require("./models").user;

const { Op } = require("sequelize");

async function getAllUsers() {
  try {
    // This is how we can use a query method to get all the users from the database
    // Selects all rows. Resolves with a (possibly empty) array
    const allUsers = await User.findAll({ raw: true });
    return allUsers;
  } catch (e) {
    console.log(e);
  }
}

async function getOneUser() {
  try {
    const specificUser = await User.findOne({
      where: { name: "Dan Abramov" },
      raw: true,
    });
    return specificUser;
  } catch (e) {
    next(e);
  }
}

getAllUsers().then((users) => console.log(users));
getOneUser().then((user) => console.log(user));
