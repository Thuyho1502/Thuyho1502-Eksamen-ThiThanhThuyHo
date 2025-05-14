const { createFilterObject, isUserMatchingFilter,canLike,
  canSkip,
  decrementLike,
  decrementSkip,
  setSwipeDataForTest,
  getSwipeData,fetchUser } = require("./side2-function.js");

// filter section test
describe("createFilterObject", () => {
    test("Create a properly structured filter object", () => {
        const obj = createFilterObject("abc123", "female", "20", "30");
        expect(obj).toEqual({
            userId: "abc123",
            gender: "female",
            minAge: 20,
            maxAge: 30
        });
    });
});

jest.mock("axios");
test("createFilterObject should convert string ages to integers", () => {
    const obj = createFilterObject("abc123", "female", "25", "35");
    expect(obj.minAge).toBe(25);
    expect(obj.maxAge).toBe(35);
});
test("Returns true if user is exactly minAge", () => {
    const filter = { gender: "female", minAge: 25, maxAge: 30 };
    const user = { gender: "female", dob: { age: 25 } };
    expect(isUserMatchingFilter(user, filter)).toBe(true);
});

test("Returns true if user is exactly maxAge", () => {
    const filter = { gender: "female", minAge: 20, maxAge: 25 };
    const user = { gender: "female", dob: { age: 25 } };
    expect(isUserMatchingFilter(user, filter)).toBe(true);
});


describe("isUserMatchingFilter", () => {
    const user = {
        gender: "female",
        dob: { age: 25 }
    };

    test("Returns true if user matches filter", () => {
        const filter = { gender: "female", minAge: 20, maxAge: 30 };
        expect(isUserMatchingFilter(user, filter)).toBe(true);
    });

    test("Returns false if gender is incorrect ", () => {
        const filter = { gender: "male", minAge: 20, maxAge: 30 };
        expect(isUserMatchingFilter(user, filter)).toBe(false);
    });

    test("Returns false if age is incorrect", () => {
        const filter = { gender: "female", minAge: 30, maxAge: 40 };
        expect(isUserMatchingFilter(user, filter)).toBe(false);
    });

    test("Returns true if no gender filtering", () => {
        const filter = { gender: "", minAge: 20, maxAge: 30 };
        expect(isUserMatchingFilter(user, filter)).toBe(true);
    });
});

//Swipe section 

describe("Swipe limit logic", () => {
  beforeEach(() => {
    setSwipeDataForTest({
      userId: "abc123",
      remainingLikes: 3,
      remainingSkips: 2,
      lastReset: new Date().toISOString()
    });
  });
 
  test("canLike returns true if there are still turn likes", () => {
    expect(canLike()).toBe(true);
  });
 
  test("canSkip returns true if there are still turns skip", () => {
    expect(canSkip()).toBe(true);
  });
 
  test("decrementLike decreased by exactly 1", () => {
    decrementLike();
    expect(getSwipeData().remainingLikes).toBe(2);
  });
 
  test("decrementSkip  decreased by exactly 1", () => {
    decrementSkip();
    expect(getSwipeData().remainingSkips).toBe(1);
  });
 
  test("canLike returns false if there are no more likes", () => {
    setSwipeDataForTest({
      userId: "abc123",
      remainingLikes: 0,
      remainingSkips: 2,
      lastReset: new Date().toISOString()
    });
    expect(canLike()).toBe(false);
  });
 
  test("decrementLike does not decrease if the turn is over", () => {
    setSwipeDataForTest({
      userId: "abc123",
      remainingLikes: 0,
      remainingSkips: 2,
      lastReset: new Date().toISOString()
    });
    decrementLike();
    expect(getSwipeData().remainingLikes).toBe(0);
  });
});


//fetch test 
global.fetch = jest.fn();

describe("fetchUser", () => {
  test("returns user data from API", async () => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve({ results: [{ gender: "female" }] }),
    });

    const user = await fetchUser();
    expect(user).toEqual(expect.objectContaining({ gender: "female" }));
  });

});


