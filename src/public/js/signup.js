// const form = document.querySelector("form");
// const emailError = document.querySelector("form > .email");
// const passwordError = document.querySelector("form > .password");
// const nameError = document.querySelector("form > .name");
// const addressError = document.querySelector("form > .address");
// const phoneError = document.querySelector("form > .phone");


// form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     // reset errors
//     emailError.textContent = '';
//     passwordError.textContent = '';
//     nameError.textContent = '';
//     addressError.textContent = '';
//     phoneError.textContent = '';

//     //get the values;
//     const email = form.email.value;
//     const password = form.password.value;
//     const name = form.name.value;
//     const address = form.address.value;
//     const phone = form.phone.value;

//     let value;
//     const radios = document.getElementsByName('gender');
//     for (let i = 0, length = radios.length; i < length; i++) {
//         if (radios[i].checked) {
//             // do whatever you want with the checked radio
//             value = radios[i].value;
//             // only one radio can be logically checked, don't check the rest
//             break;
//         }
//     }
//     const gender = value;

//     try {
//         const res = await fetch("/sign-up", {
//             method: "POST",
//             body: JSON.stringify({ email, password, name, address, phone, gender }),
//             headers: { "Content-Type": "application/json" },
//         });

//         const data = await res.json();

//         if (data.errors) {
//             emailError.textContent = data.errors.email;
//             passwordError.textContent = data.errors.password;
//             nameError.textContent = data.errors.name;
//             addressError.textContent = data.errors.address;
//             phoneError.textContent = data.errors.phone;
//             genderError.textContent = data.errors.gender;
//         }
//         if (data.user) {
//             location.assign('/');
//         }
//     } catch (err) {
//         console.log(err);
//     }
// });
let countError = 0;
function Validator(options) {
  let selectorRules = {};

  function validate(inputElement, rule) {
    let errorElement = inputElement.parentElement.querySelector(
      options.errorSelector,
    );
    let errorMessage;

    let rules = selectorRules[rule.selector];

    for (let i = 0; i < rules.length; ++i) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add('invalid');
    } else {
      let errorElement = inputElement.parentElement.querySelector(
        options.errorSelector,
      );
      errorElement.innerText = '';
      inputElement.parentElement.classList.remove('invalid');
    }
  }

  let formElement = document.querySelector(options.form);

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
    


  if (formElement) {
    // Khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      options.rules.forEach(function (rule) {
        let inputElement = formElement.querySelector(rule.selector);
        validate(inputElement, rule);
      });

      if(document.getElementsByClassName('invalid').length === 0){
        // formElement.submit();
        let name = document.getElementById('fullname');
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        const res = await fetch("/sign-up", {
            method: "POST",

            body: JSON.stringify({ name, email, password }),

            headers: { "Content-Type": "application/json" },
        });
      }
      else{
        console.log(document.getElementsByClassName('invalid').length);
      }
    };


    //Lap qua tung rule va xu ly su kien: blur, input,...
    options.rules.forEach(function (rule) {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      let inputElement = formElement.querySelector(rule.selector);
      let errorElement = inputElement.parentElement.querySelector(
        options.errorSelector,
      );

      if (inputElement) {
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        inputElement.oninput = function () {
          errorElement.innerText = '';
          inputElement.parentElement.classList.remove('invalid');
        };
      }
    });
  }
}

//Dinh nghia rules
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || 'Vui lòng nhập trường này';
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(value)
        ? undefined
        : message || 'Trường này phải là email: ';
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `Vui lòng nhập tối thiểu ${min} ký tự`;
    },
  };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : message || 'Giá trị nhập vào không chính xác';
    },
  };
};

Validator({
  form: '#form_sign_up',
  errorSelector: '.form-message',
  rules: [
    Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn'),
    Validator.isRequired('#email', 'Vui lòng nhập email của bạn'),
    Validator.isEmail('#email', 'Đây không phải là email'),
    Validator.minLength(
      '#password',
      6,
      'Vui lòng nhập mật khẩu tối thiểu 6 ký tự',
    ),
    Validator.isRequired(
      '#password_confirmation',
      'Vui lòng nhập Nhập lại mật khẩu',
    ),
    Validator.isConfirmed(
      '#password_confirmation',
      function () {
        return document.querySelector('#form_sign_up #password').value;
      },
      'Mật khẩu nhập lại không chính xác.',
    ),
  ],

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

