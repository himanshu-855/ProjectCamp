import dotenv from 'dotenv';

dotenv.config({
    path: "./.env",
})

let Username = process.env.username
console.log("Value: ",Username);

console.log("Hello, World!");
