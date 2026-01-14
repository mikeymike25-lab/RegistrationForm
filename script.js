$(document).ready(function () {

    // Patterns
    const namePattern = /^[A-Za-z]+$/;
    const usernamePattern = /^[A-Za-z0-9_]{3,}$/; // letters, numbers, underscore, min 3 chars
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^09[0-9]{8,}$/; // starts with 09 + 8 digits = total 10 digits minimum

    // Real-time validation function
    function validateField(fieldId, validationFn, errorMsg) {
        const value = $(`#${fieldId}`).val().trim();
        if (!validationFn(value)) {
            $(`#${fieldId}`).closest(".form-group").find(".error").text(errorMsg);
            return false;
        } else {
            $(`#${fieldId}`).closest(".form-group").find(".error").text("");
            return true;
        }
    }

    // Individual field validation rules
    $("#username").on("input", function () {
        validateField("username", val => usernamePattern.test(val), 
                      "Username must be at least 3 characters, letters/numbers/underscore only");
    });

    $("#firstName").on("input", function () {
        validateField("firstName", val => namePattern.test(val), "First name must contain letters only");
    });

    $("#lastName").on("input", function () {
        validateField("lastName", val => namePattern.test(val), "Last name must contain letters only");
    });

    $("#email").on("input", function () {
        validateField("email", val => emailPattern.test(val), "Enter a valid email address");
    });

    $("#phone").on("input", function () {
        validateField("phone", val => phonePattern.test(val), "Phone number must start with 09 and be at least 10 digits");
    });

    $("#password, #confirmPassword").on("input", function () {
        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();
        if (password === "" || password !== confirmPassword) {
            $("#confirmPassword").closest(".form-group").find(".error").text("Passwords do not match");
        } else {
            $("#confirmPassword").closest(".form-group").find(".error").text("");
        }
    });

    $("#gender, #birthDate, #terms").on("change", function () {
        if ($(this).attr("id") === "gender") {
            validateField("gender", val => val !== "", "Please select your gender");
        }

        if ($(this).attr("id") === "birthDate") {
            const birthDate = $("#birthDate").val();
            if (birthDate === "") {
                $("#birthDate").closest(".form-group").find(".error").text("Please enter your birth date");
            } else {
                let birth = new Date(birthDate);
                let today = new Date();
                let age = today.getFullYear() - birth.getFullYear();
                let m = today.getMonth() - birth.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
                if (age < 13) {
                    $("#birthDate").closest(".form-group").find(".error").text("You must be at least 13 years old");
                } else {
                    $("#birthDate").closest(".form-group").find(".error").text("");
                }
            }
        }

        if ($(this).attr("id") === "terms") {
            if (!$("#terms").is(":checked")) {
                $("#terms").closest(".form-group").find(".error").text("You must agree to the terms");
            } else {
                $("#terms").closest(".form-group").find(".error").text("");
            }
        }
    });

    // Submit handler
    $("#registerForm").submit(function (e) {
        e.preventDefault();

        let isValid = true;

        // Validate all fields on submit
        isValid &= validateField("username", val => usernamePattern.test(val), "Username must be at least 3 characters, letters/numbers/underscore only");
        isValid &= validateField("firstName", val => namePattern.test(val), "First name must contain letters only");
        isValid &= validateField("lastName", val => namePattern.test(val), "Last name must contain letters only");
        isValid &= validateField("email", val => emailPattern.test(val), "Enter a valid email address");
        isValid &= validateField("phone", val => phonePattern.test(val), "Phone number must start with 09 and be at least 10 digits");

        // Gender
        if ($("#gender").val() === "") {
            $("#gender").closest(".form-group").find(".error").text("Please select your gender");
            isValid = false;
        }

        // Birthdate
        const birthDate = $("#birthDate").val();
        if (birthDate === "") {
            $("#birthDate").closest(".form-group").find(".error").text("Please enter your birth date");
            isValid = false;
        } else {
            let birth = new Date(birthDate);
            let today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            let m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
            if (age < 13) {
                $("#birthDate").closest(".form-group").find(".error").text("You must be at least 13 years old");
                isValid = false;
            }
        }

        // Password
        const password = $("#password").val();
        const confirmPassword = $("#confirmPassword").val();
        if (password === "" || password !== confirmPassword) {
            $("#confirmPassword").closest(".form-group").find(".error").text("Passwords do not match");
            isValid = false;
        }

        // Terms
        if (!$("#terms").is(":checked")) {
            $("#terms").closest(".form-group").find(".error").text("You must agree to the terms");
            isValid = false;
        }

        // Success
        if (isValid) {
            $("#successModal").modal("show");
            $("#registerForm")[0].reset();
        }

    });

});
