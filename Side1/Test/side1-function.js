// Function to check if user is valid (in the list of users from API)
function validateUserCredentials(userList, inputUsername, inputPassword) {
    return userList.find(
        user => user.userName === inputUsername && user.password === inputPassword
    );
}

// Function to create user object from register form
function createUserObject(name, username, password) {
    return {
        name,
        userName: username,
        password,
        image: "",
        email: "",
        telephone: "",
        age: "",
        gender: ""
    };
}

module.exports = {
    validateUserCredentials,
    createUserObject
};
