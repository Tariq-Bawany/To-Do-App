import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "./config/firebase.js";

var loginForm = document.getElementById('loginForm');
var signupForm = document.getElementById('signupForm');
var showSignup = document.getElementById('showSignup');
var showLogin = document.getElementById('showLogin');

// Switch to Signup
showSignup.addEventListener('click', function switchToSingUp(e) {
    e.preventDefault();
    loginForm.classList.add('hidden');
    loginForm.classList.remove('visible');
    signupForm.classList.remove('hidden');
    setTimeout(() => {
        signupForm.classList.add('visible');
    }, 10);

});

// Switch to Login
showLogin.addEventListener('click', function switchToLogin(e) {
    e.preventDefault();
    signupForm.classList.add('hidden');
    signupForm.classList.remove('visible');
    loginForm.classList.remove('hidden');
    setTimeout(() => {
        loginForm.classList.add('visible');
    }, 10);
}
);


// Sign UP
var signUpEmail = document.getElementById("Sign-up-email");
var signUpPass = document.getElementById("Sign-up-password");
var signUpBtn = document.getElementById("Sign-up")
var signUpPassCfrm = document.getElementById("Sign-up-confirm-password")

signUpBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Check if passwords match
    if (signUpPass.value === signUpPassCfrm.value) {
        // check password has minimum 6 character
        if (signUpPass.value.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        if (!isValidEmail(signUpEmail.value)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const auth = getAuth();
            // Await Firebase's createUserWithEmailAndPassword
            const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPass.value);
            // Signed up
            const user = userCredential.user;
            //
            setTimeout(() => {
                // switch to login
                signupForm.classList.add('hidden');
                signupForm.classList.remove('visible');
                loginForm.classList.remove('hidden');
                setTimeout(() => {
                    loginForm.classList.add('visible');
                }, 10);

                alert("you has been Signed Up, Now Login to continue to!") //alert afteryou have been signup
            }, 2000);
        }
        catch (error) {
            setTimeout(() => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode.includes("auth/email-already-in-use")) {
                    alert("This email is already in use. Please use a different email.");
                } else if (errorCode.includes("auth/weak-password")) {
                    alert("Password is too weak. Please choose a stronger password.");
                } else {
                    alert(`Signup failed: ${errorMessage}`);
                }
                // Debugging: Log the error for developers
                console.error(`Error Code: ${errorCode}, Message: ${errorMessage}`);
            }, 1000);

        };

        // if password don't match
    } else if (signUpPass.value !== signUpPassCfrm.value) {
        alert("Your Passwords don't match!")
    }
    function isValidEmail(signUpEmail) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpEmail);
    }
});

// Login 
var loginBtn = document.getElementById("Login")
var loginEmail = document.getElementById("Login-email")
var loginPass = document.getElementById("Login-password")

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // 

    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginEmail.value, loginPass.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

})

loginBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
        const auth = getAuth();

        // Await Firebase's signInWithEmailAndPassword
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail.value, loginPass.value);

        // Signed in successfully
        const user = userCredential.user;
        alert("You have successfully logged in!");
        setTimeout(() => {
            Example: window.location.href = "/index.html";
        }, 500);

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Handle specific Firebase auth errors
        if (errorCode.includes("auth/user-not-found")) {
            alert("No user found with this email. Please check your email or sign up.");
        } else if (errorCode.includes("auth/wrong-password")) {
            alert("Incorrect password. Please try again.");
        } else if (errorCode.includes("auth/invalid-email")) {
            alert("Invalid email format. Please enter a valid email.");
        } else {
            alert("invalid-credential");
        }

        // Log error for debugging
        console.error(`Error Code: ${errorCode}, Message: ${errorMessage}`);
    }
});

