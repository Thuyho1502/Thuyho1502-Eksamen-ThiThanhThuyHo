import { apiUrl } from "../Authentication/AUTH.js";
import { likeUserUrl} from "../Authentication/AUTH.js";
import { loadSwipeLimits, canLike, decrementLike, canSkip, decrementSkip } from "./swipeLimit.js";


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


matchedBtn.addEventListener("click", async () => {
    matchedSection.classList.remove("hidden");
    document.getElementById("userProfile").classList.add("hidden");
    document.getElementById("likedUsersSection").classList.add("hidden");

    console.log("Matched Dating clicked");

    await loadSwipeLimits(); 
    console.log("Swipe limits loaded!");

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
   
    const saved = JSON.parse(localStorage.getItem("userFilters"));
    if (saved && saved.userId === userId) {
        genderSelect.value = saved.gender || "";
        minAgeInput.value = saved.minAge || 18;
        maxAgeInput.value = saved.maxAge || 100;
    } else {
       
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

    likeBtn.addEventListener("click", async() => {
        if( canLike()){           
            await addUserToLike(user);     
            await decrementLike();    
            localStorage.removeItem(`currentUser_${userId}`);
            matchContainer.innerHTML = "<p>You liked this user!</p>"; 
        } else{
            alert("You have run out of Likes for today. Please come back in 24 hours.");
        }
        
       
   
   });

    skipBtn.addEventListener("click", async () => {
        console.log("Skip button clicked");
         console.log("canSkip():", canSkip());
        if( canSkip()){
            console.log("Decrementing skip and loading new user...");
            await decrementSkip();
            localStorage.removeItem(`currentUser_${userId}`);
            showRandomFilterUser();
        }else{
            alert('You have run out of "Skip" attempts for today. Please come back in 24 hours.');
        }

    });
}

async function addUserToLike(user) {
    const userId = localStorage.getItem("user_id");

    try {
        const res = await axios.get(likeUserUrl);
        const existingUser = res.data.find(entry => entry.userId === userId);

        if (existingUser) {
            const alreadyLiked = existingUser.likedUsers.some(u => u.name === user.name);

            if (alreadyLiked) {
                alert("You have already liked this user!");
                return;
            }

            existingUser.likedUsers.push(user);

            await axios.put(`${likeUserUrl}/${existingUser._id}`, {
                userId: userId,
                likedUsers: existingUser.likedUsers
            });

        } else {
            
            await axios.post(likeUserUrl, {
                userId: userId,
                likedUsers: [user]
            });
        }

        alert("User liked!");
        console.log("Add user to like list",user);

    } catch (err) {
        console.error("Error saving liked user:", err);
        alert("Failed to save liked user.");
    }
}