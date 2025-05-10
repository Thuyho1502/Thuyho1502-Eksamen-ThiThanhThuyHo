

const matchedBtn = document.getElementById("matchedDatingBtn");
const matchedSection = document.getElementById("matchedSection");
const randomuser = document.getElementById("randomUser");
const matchContainer = document.getElementById("matchContainer");
const viewProfileBtn = document.getElementById("viewProfileBtn");

// Hiển thị khu vực matched khi nhấn "Matched Dating"
matchedBtn.addEventListener("click", () => {
    matchedSection.classList.remove("hidden");
    // Có thể ẩn các khu vực khác nếu cần, ví dụ:
    document.getElementById("userProfile").classList.add("hidden");
});

async function fetchUser() {
    let response = await fetch("https://randomuser.me/api/");
    let data = await response.json();
    console.log(data);
    return data.results[0];
}

randomuser.addEventListener("click", showRandomUser);

async function showRandomUser() {
    const user = await fetchUser(); 
 
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
    `;

    card.classList.add("card");

    matchContainer.innerHTML = "";
    matchContainer.appendChild(card);
}
