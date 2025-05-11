import { apiUrl } from "../Authentication/AUTH.js";


const userId = localStorage.getItem("user_id");

const matchedBtn = document.getElementById("matchedDatingBtn");
const matchedSection = document.getElementById("matchedSection");
const saveFilter = document.getElementById("saveFilter");
const matchContainer = document.getElementById("matchContainer");

const genderSelect = document.getElementById("genderSelect");
const minAgeInput = document.getElementById("minAge");
const maxAgeInput= document.getElementById("maxAge");


saveFilter.addEventListener("click",()=>{
       saveFilterSettings();

} );


matchedBtn.addEventListener("click", () => {
    matchedSection.classList.remove("hidden");
    document.getElementById("userProfile").classList.add("hidden");
    document.getElementById("likedUsersSection").classList.add("hidden");
    loadFilterSetting();
    showRandomFilterUser();

});

async function saveFilterSettings() {
    const filters = {
        userId: userId,
        gender: genderSelect.value,
        minAge: parseInt(minAgeInput.value),
        maxAge: parseInt(maxAgeInput.value)
    };
    localStorage.setItem("userFilters", JSON.stringify(filters));

    try {
        const existing = await axios.get(apiUrl);
        const existingFilter = existing.data.find(f => f.userId === userId);

        if (existingFilter) {
            await axios.put(`${apiUrl}/${existingFilter._id}`, filters);
        } else {
            await axios.post(apiUrl, filters);
        }

        console.log("Filter settings saved.");
    } catch (err) {
        console.error("Error saving filters:", err);
    }
}

async function loadFilterSetting() {
    // Check local storage first
    const saved = JSON.parse(localStorage.getItem("userFilters"));
    if (saved && saved.userId === userId) {
        genderSelect.value = saved.gender || "";
        minAgeInput.value = saved.minAge || 18;
        maxAgeInput.value = saved.maxAge || 100;
    } else {
        // If no filter settings in local storage, check the API
        try {
            const response = await axios.get(apiUrl);
            const userFilter = response.data.find(f => f.userId === userId);

            if (userFilter) {
                genderSelect.value = userFilter.gender || "";
                minAgeInput.value = userFilter.minAge || 18;
                maxAgeInput.value = userFilter.maxAge || 100;
            }
        } catch (err) {
            console.error("Failed to load filter settings:", err);
        }
    }
}

async function fetchUser() {
    
    try{
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        console.log(data);
        return data.results[0];
    }
    catch(error){
        console.log("Fetch failed:", error);
        return null;
    }
}


async function showRandomFilterUser() {
    
    const existingUser = JSON.parse(localStorage.getItem(`currentUser_${userId}`));
    if (existingUser) {
        renderUserCard(existingUser);
        return;
    }

    const filter = {
        gender: genderSelect.value,
        minAge: parseInt(minAgeInput.value),
        maxAge: parseInt(maxAgeInput.value)
    };

    let user;
    do {
        user = await fetchUser();
    } while (
        (filter.gender && user.gender !== filter.gender) ||
        user.dob.age < filter.minAge ||
        user.dob.age > filter.maxAge
    );


    console.log("Matched user:", user);
    localStorage.setItem(`currentUser_${userId}`, JSON.stringify(user));
        
    renderUserCard(user);
    
}

function renderUserCard(user) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${user.picture.large}" alt="User picture">
        <h1>${user.name.title} ${user.name.first} ${user.name.last}</h1>
        <p>Gender: ${user.gender}</p>
        <p>Age: ${user.dob.age}</p>
        <p>Email: ${user.email}</p>
        <p>Address: ${user.location.city}, ${user.location.country}</p>
        <p>Phone: ${user.phone}</p>
        <div class="card-button">
            <button class="like-btn">Like</button> 
            <button class="skip-btn">Skip</button>        
        </div>
        
    `;

    matchContainer.innerHTML = "";
    matchContainer.appendChild(card);

    const likeBtn = card.querySelector(".like-btn");
    const skipBtn = card.querySelector(".skip-btn");

    likeBtn.addEventListener("click", () => {
        addUserToLike(user);
        localStorage.removeItem(`currentUser_${userId}`);
        matchContainer.innerHTML = "<p>You liked this user!</p>";
    });

    skipBtn.addEventListener("click", () => {
        localStorage.removeItem(`currentUser_${userId}`);
        showRandomFilterUser();
    });
}

function addUserToLike(user){
    let likedUsers = JSON.parse(localStorage.getItem("likedUsers")) ||[];
    const isUserAlreadyLiked = likedUsers.some(likedUsers => likedUsers.name === user.name );

    if(!isUserAlreadyLiked){
        likedUsers.push(user);
        
        localStorage.setItem("likedUsers",JSON.stringify(likedUsers));
        alert("User liked !");
    }else{
        alert("You have already liked this user!");
    }
}

const likedUsersBtn = document.getElementById("likedUsersBtn");
const likedUsersSection = document.getElementById("likedUsersSection");
const likedUsersList = document.getElementById("likeUsersList");

likedUsersBtn.addEventListener("click",() =>{
    likedUsersSection.classList.remove("hidden");
    document.getElementById("userProfile").classList.add("hidden");
    document.getElementById("matchedSection").classList.add("hidden");

    displayLikedUsers();
});

function displayLikedUsers(){
    likedUsersList.innerHTML ="";
    const likedUsers = JSON.parse(localStorage.getItem("likedUsers")) || [];

    if(likedUsers.length === 0){
        likedUsersList.innerHTML = "<p>No liked users yet.</p>";
        return;
    }
    
    likedUsers.forEach(user => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${user.picture.large}" alt="User picture">
            <h3>${user.name.title} ${user.name.first} ${user.name.last}</h3>
            <p>Gender: ${user.gender}</p>
            <p>Age: ${user.dob.age}</p>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            <hr>
        `;
        likedUsersList.appendChild(card);
    });

}








