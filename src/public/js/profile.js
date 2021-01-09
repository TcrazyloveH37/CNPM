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

function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }
  let selectorRules = {};

  function validate(inputElement, rule) {
    let errorElement = getParent(
      inputElement,
      options.formGroupSelector,
    ).querySelector(options.errorSelector);
    let errorMessage;

    let rules = selectorRules[rule.selector];

    for (let i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case 'radio':
        case 'checkbox':
          errorMessage = rule[i](
            formElement.querySelector(rule.selector + ':checked'),
          );
          break;
        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add(
        'invalid',
      );
    } else {
      errorElement.innerText = '';
      getParent(inputElement, options.formGroupSelector).classList.remove(
        'invalid',
      );
    }
    return !errorMessage;
  }

  //Lấy element của form
  let formElement = document.querySelector(options.form);

  if (formElement) {
    // Khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();

      let isFormValid = true;

      options.rules.forEach(function (rule) {
        let inputElement = formElement.querySelector(rule.selector);
        let isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof options.onSubmit === 'function') {
          let enableInputs = formElement.querySelectorAll(['name']);
          let formValues = Array.from(enableInputs).reduce(function (
            values,
            input,
          ) {
            switch (input.type) {
              case 'radio':
                values[input.name] = formElement.querySelector(
                  'input[name="' + input.name + '"]:checked',
                ).value;
                break;
              case 'checkbox':
                if (!input.matches(':checked')) {
                  values[input.name] = '';
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;
              case 'file':
                values[input.name] = input.value;
            }

            return values;
          },
          {});
          options, onSubmit(formValues);
        } else {
          formElement.submit();
        }
      }
    };

    //Lặp qua mỗi rule và xử lý sự kiện: blur, input, ...
    options.rules.forEach(function (rule) {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      let inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach(function (inputElement) {
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };

        inputElement.oninput = function () {
          let errorElement = getParent(
            inputElement,
            options.formGroupSelector,
          ).querySelector(options.errorSelector);
          errorElement.innerText = '';
          getParent(inputElement, options.formGroupSelector).classList.remove(
            'invalid',
          );
        };
      });
    });
  }
}

//Dinh nghia rules
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || 'Vui lòng nhập trường này';
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

document.addEventListener('DOMContentLoaded', function () {
  Validator({
    form: '#form_profile',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      Validator.isRequired('#fullname', 'Vui lòng nhập tên đầy đủ của bạn'),
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
          return document.querySelector('#form_profile #password').value;
        },
        'Mật khẩu nhập lại không chính xác.',
      ),
    ],
  });
});
