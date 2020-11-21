
const form = document.querySelector("form");
const emailError = document.querySelector("form > .email");
const passwordError = document.querySelector("form > .password");
const nameError = document.querySelector("form > .name");
const addressError = document.querySelector("form > .address");
const phoneError = document.querySelector("form > .phone");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    nameError.textContent = '';
    addressError.textContent = '';
    phoneError.textContent = '';

    //get the values;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const address = form.address.value;
    const phone = form.phone.value;
    
    let value;
    const radios = document.getElementsByName('gender');
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            value = radios[i].value;
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    const gender = value;


    try {
        const res = await fetch("/sign-up", {
            method: "POST",
            body: JSON.stringify({ email, password, name, address, phone, gender }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data.errors) {
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
            nameError.textContent = data.errors.name;
            addressError.textContent = data.errors.address;
            phoneError.textContent = data.errors.phone;
            genderError.textContent = data.errors.gender;
        }
        if (data.user) {
            location.assign('/');
        }
    } catch (err) {
        console.log(err);
    }
});