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








