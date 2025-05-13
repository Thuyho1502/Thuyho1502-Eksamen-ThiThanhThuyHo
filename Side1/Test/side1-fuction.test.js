const { validateUserCredentials, createUserObject } = require("./side1-function.js");

describe("validateUserCredentials", () => {
    const dummyUsers = [
        { userName: "alice", password: "1234" },
        { userName: "bob", password: "abcd" }
    ];

    test("Returns correct user if username and password match", () => {
        const result = validateUserCredentials(dummyUsers, "alice", "1234");
        expect(result).toEqual({ userName: "alice", password: "1234" });
    });

    test("return undefined if username is incorrect", () => {
        const result = validateUserCredentials(dummyUsers, "john", "1234");
        expect(result).toBeUndefined();
    });

    test("return undefined if password is incorrect", () => {
        const result = validateUserCredentials(dummyUsers, "alice", "wrong");
        expect(result).toBeUndefined();
    });
});

describe("createUserObject", () => {
    test("create full user object with default information", () => {
        const user = createUserObject("Alice", "alice123", "pass123");
        expect(user).toEqual({
            name: "Alice",
            userName: "alice123",
            password: "pass123",
            image: "",
            email: "",
            telephone: "",
            age: "",
            gender: ""
        });
    });
});
