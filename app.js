import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
     apiKey: "AIzaSyAlhnsbWQs_YnbvGQBy_8MtfvWGjMzR_8U",
    authDomain: "navya-project-67af1.firebaseapp.com",
    projectId: "navya-project-67af1",
    storageBucket: "navya-project-67af1.appspot.com",
    messagingSenderId: "664477830595",
    appId: "1:664477830595:web:ac5e01a551ca502a400176",
    measurementId: "G-4K7GHLV9DT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signupContainer = document.getElementById('signup-container');
const loginContainer = document.getElementById('login-container');
const gotoSignup = document.getElementById('goto-signup');
const gotoLogin = document.getElementById('goto-login');

const signupForm = document.getElementById('signup-form');
const signupFullname = document.getElementById('signup-fullname');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupConfirmPassword = document.getElementById('signup-confirm-password');

const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

gotoSignup.addEventListener('click', () => {
    loginContainer.classList.remove('active');
    signupContainer.classList.add('active');
});

gotoLogin.addEventListener('click', () => {
    signupContainer.classList.remove('active');
    loginContainer.classList.add('active');
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupEmail.value;
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;
    const fullName = signupFullname.value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
                displayName: fullName
            }).then(() => {
                alert('Sign up successful');
                signupForm.reset();
            }).catch((error) => {
                alert(`Error: ${error.message}`);
            });
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Login successful');
            loginForm.reset();
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
});

signupContainer.classList.add('active');
