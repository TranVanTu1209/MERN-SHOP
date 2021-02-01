const bcryptjs = require('bcryptjs');

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcryptjs.hashSync('tudeptrai', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: bcryptjs.hashSync('tudeptrai', 10),
  },
  {
    name: 'Brad Traversy',
    email: 'brad@gmail.com',
    password: bcryptjs.hashSync('tudeptrai', 10),
  },
  {
    name: 'Tu Tran Van',
    email: 'tu@gmail.com',
    password: bcryptjs.hashSync('tudeptrai', 10),
  }
];

module.exports = users;