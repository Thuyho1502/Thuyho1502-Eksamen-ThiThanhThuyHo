

const likedUsersBtn = document.getElementById("likedUsersBtn");
const likedUsersSection = document.getElementById("likedUsersSection");

likedUsersBtn.addEventListener("click", () => {
    displayLikedUsers();
});
function displayLikedUsers() {
    // Lấy danh sách người dùng đã Like từ localStorage
    const likedUsers = JSON.parse(localStorage.getItem("likedUsers")) || [];

    // Xóa nội dung cũ của likedUsersSection
    likedUsersSection.innerHTML = "";

    if (likedUsers.length === 0) {
        likedUsersSection.innerHTML = "<p>No users liked yet!</p>";
    } else {
        // Hiển thị danh sách người dùng đã Like
        likedUsers.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-card");
            userCard.innerHTML = `
                <img src="${user.picture.large}" alt="User picture">
                <h1>${user.name.title} ${user.name.first} ${user.name.last}</h1>
                <p>Gender: ${user.gender}</p>
                <p>Age: ${user.dob.age}</p>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
            `;
            likedUsersSection.appendChild(userCard);
        });
    }
}