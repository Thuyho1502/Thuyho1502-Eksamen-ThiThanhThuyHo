import { apiUrl } from "../Authentication/AUTH.js";
import { likeUserUrl } from "../Authentication/AUTH.js";

const likedUsersBtn = document.getElementById("likedUsersBtn");
const likedUsersSection = document.getElementById("likedUsersSection");
const likedUsersList = document.getElementById("likeUsersList");

likedUsersBtn.addEventListener("click",() =>{
    likedUsersSection.classList.remove("hidden");
    document.getElementById("userProfile").classList.add("hidden");
    document.getElementById("matchedSection").classList.add("hidden");

    displayLikedUsers();
});
async function displayLikedUsers() {
    likedUsersList.innerHTML = "";

    const userId = localStorage.getItem("user_id");


    try {
        const res = await axios.get(likeUserUrl);
        const userData = res.data.find(entry => entry.userId === userId);

        if (!userData || userData.likedUsers.length === 0) {
            likedUsersList.innerHTML = "<p>No liked users yet.</p>";
            return;
        }

        localStorage.setItem(`likedUsers_${userId}`, JSON.stringify(userData.likedUsers));

        userData.likedUsers.forEach(user => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${user.picture.large}" alt="User picture">
                <h3>${user.name.title} ${user.name.first} ${user.name.last}</h3>
                <p>Gender: ${user.gender}</p>
                <p>Age: ${user.dob.age}</p>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <div>
                    <button class="card-button1">Delete</button>
                </div>
            `;
            likedUsersList.appendChild(card);
            const deleteBtn = card.querySelector(".card-button1");
            deleteBtn.addEventListener("click",() =>{
                deleteLikedUser(user);
            });
       
 
        });
        

    } catch (err) {
        console.error("Failed to load liked users:", err);
        likedUsersList.innerHTML = "<p>Error loading liked users.</p>";
    }
}

async function deleteLikedUser(userToDelete) {
    const userId = localStorage.getItem("user_id");

    try{
        const response = await axios.get(likeUserUrl);
        const userData = response.data.find(entry =>entry.userId === userId);

        if(!userData){
            return;
        }
        const updatedLikedUsers  = userData.likedUsers.filter(
            user =>user.email !== userToDelete.email
        );
        await axios.put(`${likeUserUrl}/${userData._id}`,{
            userId : userId,
            likedUsers : updatedLikedUsers

        });
        
        localStorage.setItem(`likedUsers_${userId}`,JSON.stringify(updatedLikedUsers));
        console.log("Succesful delete user:",userToDelete);

        displayLikedUsers();

    }catch(err){
        console.error("Fail to delete liked user:",err);
    }
    
}





