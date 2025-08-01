const JWT_ADMIN_PASSWORD=process.env.JWT_ADMIN_PASSWORD;
const JWT_USER_PASSWORD=process.env.JWT_USER_PASSWORD;

module.exports={
    JWT_ADMIN_PASSWORD,JWT_USER_PASSWORD
}


// By default, "process.env" only contains the system environment variables.
// To load variables from a .env file, you need the dotenv package:npm i dotenv
// In index.js file include: require('dotenv').config()
// Now all the variables in your .env file will be available via process.env.