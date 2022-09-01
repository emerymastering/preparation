const { user, todoItem, todoList } = require("./models");

async function listsWithUsers() {
  const lists = await todoList.findAll({
    // include: [user],
    include: [{ model: user, attributes: ["name"] }],
  });

  return lists.map((list) => list.toJSON());
}

async function getUsers() {
  const allUsers = await user.findAll({
    include: { model: todoList, attributes: ["name"] },
  });
  return allUsers.map((user) => user.toJSON());
}

async function getUserByID(id) {
  const userById = await user.findByPk(id, { include: { model: todoList } });
  return userById.toJSON();
}

async function importantTodo() {
  const result = await todoItem.findAll({
    where: { important: true },
    include: { model: todoList, attributes: ["name"] },
  });
  return result.map((item) => item.toJSON());
}

async function userByIdTask(id) {
  const result = await user.findByPk(id, {
    include: [
      {
        model: todoList,
        attributes: ["name"],
        include: { model: todoItem, attributes: ["task"] },
      },
    ],
  });
  return result.toJSON();
}

// listsWithUsers().then((lists) => console.log(lists));
// getUsers().then((users) => console.log(users));
// getUserByID(1).then((user) => console.log(user));
// importantTodo().then((items) => console.log(items));
userByIdTask(2).then((items) => console.log(items));
