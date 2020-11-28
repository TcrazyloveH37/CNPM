
const form = document.querySelector("form");
const emailError = document.querySelector("form > .email");
const passwordError = document.querySelector("form > .password");
const nameError = document.querySelector("form > .name");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    nameError.textContent = '';

    //get the values;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    

    try {
        const res = await fetch("/sign-up", {
            method: "POST",
            body: JSON.stringify({ email, password, name }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data.errors) {
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
            nameError.textContent = data.errors.name;
        }
        if (data.user) {
            location.assign('/');
        }
    } catch (err) {
        console.log(err);
    }
});