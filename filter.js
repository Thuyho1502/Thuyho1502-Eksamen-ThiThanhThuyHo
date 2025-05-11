

const matchedBtn = document.getElementById("matchedDatingBtn");
const matchedSection = document.getElementById("matchedSection");
const randomuser = document.getElementById("randomUser");
const matchContainer = document.getElementById("matchContainer");

const genderSelect = document.getElementById("genderSelect");
const minAgeInput = document.getElementById("minAge");
const maxAgeInput= document.getElementById("maxAge");

const viewProfileBtn = document.getElementById("viewProfileBtn");

matchedBtn.addEventListener("click", () => {
    matchedSection.classList.remove("hidden");
    document.getElementById("userProfile").classList.add("hidden");
    loadFilterSetting();
});

randomuser.addEventListener("click", showRandomFilterUser );

[genderSelect, minAgeInput, maxAgeInput].forEach(input =>{
    input.addEventListener("change",saveFilterSettings);
});
function saveFilterSettings(){
    const filters ={
        gender : genderSelect.value,
        minAgeInput : parseInt(minAgeInput.value),
        maxAgeInput : parseInt(maxAgeInput.value)
    };
    localStorage.setItem("userFilters", JSON.stringify(filters));
}

function loadFilterSetting(){
    const saved = JSON.parse(localStorage.getItem("userFilters"));
    if(saved){
        genderSelect.value = saved.gender || "";
        minAgeInput.value = saved.minAgeInput ||18;
        maxAgeInput.value = saved.maxAgeInput ||100;

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
 const filter ={
    gender: genderSelect.value,
    minAge : parseInt(minAgeInput.value),
    maxAge: parseInt(maxAgeInput.value)
 }; 

  let user; 

do{
    user = await fetchUser(); 
    
}

 while(
    (filter.gender && user.gender !== filter.gender) ||
    user.dob.age <= filter.minAge ||
    user.dob.age >= filter.maxAge
        
    
 )
  console.log("Matched user:", user);
 
 
 const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${user.picture.large}" alt="User picture">
        <h1>${user.name.title} ${user.name.first} ${user.name.last}</h1>
        <p>Gender: ${user.gender}</p>
        <p>Age :${user.dob.age}<p>
        <p>Email: ${user.email}</p>
        <p>Address: ${user.location.city}, ${user.location.country}</p>
        <p>Phone: ${user.phone}</p>
        <div class="card-button">
        <button class="like-btn"> Like </button> 
        <button class="skip-btn"> Skip </button>        
        </div>

    `;

    matchContainer.innerHTML = "";
    matchContainer.appendChild(card);
}
 
