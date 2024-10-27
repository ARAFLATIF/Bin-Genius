// Toggle Navbar Background on Scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Password Visibility Toggle
document.addEventListener("DOMContentLoaded", () => {
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");
    const togglePassword = document.createElement("span");

    // Configure toggle icon
    togglePassword.innerHTML = `<i class="fas fa-eye"></i>`;
    togglePassword.style.cursor = "pointer";
    togglePassword.style.position = "absolute";
    togglePassword.style.right = "15px";
    togglePassword.style.top = "35px";
    togglePassword.style.color = "#28a745";

    // Append the toggle icon after the password field
    passwordField.parentNode.appendChild(togglePassword);

    // Toggle the password visibility on click
    togglePassword.addEventListener("click", () => {
        const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        confirmPasswordField.setAttribute("type", type);
        togglePassword.innerHTML = type === "password" ? `<i class="fas fa-eye"></i>` : `<i class="fas fa-eye-slash"></i>`;
    });
});

// Form Validation
document.querySelector("form").addEventListener("submit", function (event) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
        event.preventDefault();
        alert("Passwords do not match. Please re-enter your password.");
    }
});
