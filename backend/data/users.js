import bcrypt from "bcryptjs";

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmial.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@gmial.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: 'jane@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
];

export default users;