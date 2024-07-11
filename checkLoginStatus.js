document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        const userAuth = document.getElementById("user-auth");
        const userInfo = document.getElementById("user-info");
        const usernameDisplay = document.getElementById("username-display");

        if (userAuth) {
            userAuth.classList.add("d-none");
        }
        if (userInfo) {
            userInfo.classList.remove("d-none");
        }
        if (usernameDisplay) {
            usernameDisplay.textContent = `Welcome, ${loggedInUser}`;
        }
    }
});
