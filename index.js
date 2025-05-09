const user = JSON.parse(localStorage.getItem('user'));

if (user) {
    // Display profile information if logged in
    document.getElementById('userProfile').classList.remove('hidden');
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userAge').textContent = user.age;
    document.getElementById('userGender').textContent = user.gender;

    // Handle logout
    document.getElementById('logOutBtn').addEventListener('click', function() {
        localStorage.removeItem('user');
        window.location.href = "Side1/login.html";
    });
    
}
