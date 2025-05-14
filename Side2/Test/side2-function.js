// Function to create filter object from form
function createFilterObject(userId, gender, minAge, maxAge) {
    return {
        userId,
        gender,
        minAge: parseInt(minAge),
        maxAge: parseInt(maxAge)
    };
}

// Function to filter users by filter
function isUserMatchingFilter(user, filter) {
    return (
        (!filter.gender || user.gender === filter.gender) &&
        user.dob.age >= filter.minAge &&
        user.dob.age <= filter.maxAge
    );
}

let swipeData = {
  userId: "abc123",
  remainingLikes: 3,
  remainingSkips: 2,
  lastReset: new Date().toISOString()
};
 
function canLike() {
  return swipeData && swipeData.remainingLikes > 0;
}
 
function canSkip() {
  return swipeData && swipeData.remainingSkips > 0;
}
 
function decrementLike() {
  if (canLike()) {
    swipeData.remainingLikes--;
  }
}
 
function decrementSkip() {
  if (canSkip()) {
    swipeData.remainingSkips--;
  }
}
 
function setSwipeDataForTest(data) {
  swipeData = data;
}
 
function getSwipeData() {
  return swipeData;
}

async function fetchUser() {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data.results[0];
}


module.exports = {
  createFilterObject,
  isUserMatchingFilter,canLike,
  canSkip,
  decrementLike,
  decrementSkip,
  setSwipeDataForTest,
  getSwipeData,
  fetchUser
};
