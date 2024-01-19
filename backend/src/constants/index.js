const { FORBIDDEN } = require("http-status");

const successMsg = {
    LOGIN_SUCCESS: 'Login process is successful!'
};

const errorMsg = {
    ID_NOT_FOUND: 'No record was found for the specified ID!',
    TOKEN_NOT_FOUND: 'Token not found!',
    AUTH_REQUIRED: 'Authentication required, please sign in!',
    ACCESS_FORBIDDEN: 'Access forbidden!',
};

module.exports = {
    successMsg,
    errorMsg
};