import { apiUrl } from "../Authentication/AUTH.js";
const viewProfileBtn = document.getElementById("viewProfileBtn");

const userProfileDiv = document.getElementById("userProfile");
const profileView = document.getElementById("profileView");
const profileEdit = document.getElementById("profileEdit");

const userName = document.getElementById("userName");
const userAge = document.getElementById("userAge");
const userGender = document.getElementById("userGender");
const userEmail = document.getElementById("userEmail");
const userTelephone = document.getElementById("userTelephone");
const userImage = document.getElementById("userImage");

const editEmail = document.getElementById("editEmail");
const editTelephone = document.getElementById("editTelephone");
const editPassword = document.getElementById("editPassword");
const editImage = document.getElementById("editImage");
const editName = document.getElementById("editName");
const editAge = document.getElementById("editAge");
const editGender = document.getElementById("editGender");

viewProfileBtn.addEventListener("click",() =>{
  userProfileDiv.classList.remove("hidden");
  document.getElementById("matchedSection").classList.add("hidden");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user._id) {
    displayProfile(user);
  } else {
    alert("Please log in first.");
    window.location.href = "Side1/login.html";
  }
});



function displayProfile(userData) {
  userName.textContent = userData.name || " ";
  userAge.textContent = userData.age || " ";
  userGender.textContent = userData.gender || " ";
  userEmail.textContent = userData.email || " ";
  userTelephone.textContent = userData.telephone || "";
  userImage.src = userData.image || " ";

  console.log("Display user profile",userData);
}


document.getElementById("editProfileBtn").addEventListener("click", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  profileView.classList.add("hidden");
  profileEdit.classList.remove("hidden");


editName.value = user.name || "";
editAge.value = user.age || "";
editGender.value = user.gender || "other";
editEmail.value = user.email || "";
editTelephone.value = user.telephone || "";
editPassword.value = user.password || "";
editImage.value = user.image || "";



});


document.getElementById("saveProfileBtn").addEventListener("click", async () => {
 const user = JSON.parse(localStorage.getItem("user"));


  if (!user || !user._id) {
    alert("Cannot update profile. You are not logged in with a server user.");
    return;
  }

  const { _id, ...userWithoutId } = user;
  
 const updatedUser = {
  ...userWithoutId,
  name: editName.value.trim(),
  age: editAge.value.trim(),
  gender: editGender.value.trim(),
  email: editEmail.value.trim(),
  telephone: editTelephone.value.trim(),
  password: editPassword.value.trim(), 
  image: editImage.value.trim()
};


  try {
   
    const response= await axios.put(`${apiUrl}/${user._id}`, updatedUser);
    console.log("Update to crudcrud:", response.data);
    const newUser = { ...updatedUser, _id };
    
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem(newUser.userName, JSON.stringify(newUser));
     displayProfile(newUser);

    profileEdit.classList.add("hidden");
    profileView.classList.remove("hidden");

    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Failed to update profile in API", err);
    alert("Error updating profile");
  }

  console.log("User updated!",updatedUser);
});




document.getElementById("logOutBtn").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "Side1/login.html";
});


