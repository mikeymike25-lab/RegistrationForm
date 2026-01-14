$(document).ready(function () {

    $("#registerForm").submit(function (e) {
        e.preventDefault();

        let isValid = true;
        $(".error").text("");

        // Patterns
        let namePattern = /^[A-Za-z]+$/;
        let usernamePattern = /^[A-Za-z0-9_]{3,}$/; // letters, numbers, underscore, min 3 chars
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let phonePattern = /^[0-9]{10,}$/;

        // Values
        let username = $("#username").val().trim();
        let firstName = $("#firstName").val().trim();
        let lastName = $("#lastName").val().trim();
        let gender = $("#gender").val();
        let birthDate = $("#birthDate").val();
        let email = $("#email").val().trim();
        let phone = $("#phone").val().trim();
        let password = $("#password").val();
        let confirmPassword = $("#confirmPassword").val();
        let terms = $("#terms").is(":checked");

        // Username
        if (!usernamePattern.test(username)) {
            $("#username")
                .closest(".form-group")
                .find(".error")
                .text("Username must be at least 3 characters, letters/numbers/underscore only");
            isValid = false;
        }

        // First Name
        if (!namePattern.test(firstName)) {
            $("#firstName")
                .closest(".form-group")
                .find(".error")
                .text("First name must contain letters only");
            isValid = false;
        }

        // Last Name
        if (!namePattern.test(lastName)) {
            $("#lastName")
                .closest(".form-group")
                .find(".error")
                .text("Last name must contain letters only");
            isValid = false;
        }

        // Gender
        if (gender === "") {
            $("#gender")
                .closest(".form-group")
                .find(".error")
                .text("Please select your gender");
            isValid = false;
        }

        // Birth Date
        if (birthDate === "") {
            $("#birthDate")
                .closest(".form-group")
                .find(".error")
                .text("Please enter your birth date");
            isValid = false;
        } else {
            // Optional: Check if age >= 13
            let birth = new Date(birthDate);
            let today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            let m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            if (age < 13) {
                $("#birthDate")
                    .closest(".form-group")
                    .find(".error")
                    .text("You must be at least 13 years old");
                isValid = false;
            }
        }

        // Email
        if (!emailPattern.test(email)) {
            $("#email")
                .closest(".form-group")
                .find(".error")
                .text("Enter a valid email address");
            isValid = false;
        }

        // Phone
        if (!phonePattern.test(phone)) {
            $("#phone")
                .closest(".form-group")
                .find(".error")
                .text("Phone number must be numeric and at least 10 digits");
            isValid = false;
        }

        // Password
        if (password === "" || password !== confirmPassword) {
            $("#confirmPassword")
                .closest(".form-group")
                .find(".error")
                .text("Passwords do not match");
            isValid = false;
        }

        // Terms
        if (!terms) {
            $("#terms")
                .closest(".form-group")
                .find(".error")
                .text("You must agree to the terms");
            isValid = false;
        }

        // Success
        if (isValid) {
            $("#successModal").modal("show");
            $("#registerForm")[0].reset();
        }

    });

});
