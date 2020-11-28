let arrDelete = document.querySelectorAll("table tr > td > .get-id-delete");
let arrEdit = document.querySelectorAll("table tr > td > .get-id-edit");
let Form = document.forms['delete-product-form'];
let btnYES = document.getElementById('delete-products-comfirm');
let idSlug;



for (let i = 0; i < arrDelete.length; i++) {
    arrDelete[i].addEventListener('click', () => {
        idSlug = arrDelete[i].getAttribute('data-id');
        Form.innerHTML = '';
        btnYES.addEventListener('click', () => {
            Form.action = '/products/' + idSlug + '?_method=PATCH';
            Form.submit();
        });
    });
    arrEdit[i].addEventListener('click', () => {
        idSlug = arrDelete[i].getAttribute('data-id');

        let getID = document.getElementsByClassName(idSlug)[0].querySelectorAll('td');

        console.log(getID);

        let name = document.createElement("input");
        name.name = 'name';
        name.value = getID[1].innerHTML;
        let description = document.createElement("input");
        description.name = 'description';
        description.value = getID[2].innerHTML;
        let image = document.createElement("input");
        image.name = 'image';
        image.value = getID[3].querySelector('img').getAttribute('src');
        let price = document.createElement("input");
        price.name = 'price';
        price.value = getID[4].innerHTML;

        Form.appendChild(name);
        Form.appendChild(description);
        Form.appendChild(image);
        Form.appendChild(price);

        console.log(document.querySelector('#dialog-modal > div').appendChild(Form));
           
        btnYES.addEventListener('click', () => {
            Form.action = '/products/' + idSlug + '?_method=PUT';
            Form.submit();
        });
    });
}

// Đối tượng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        
        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
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
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
               // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                } 
            });
        });
    }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isName = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || 'Vui lòng nhập ';
        }
    };
}

Validator.isDescription = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message ||  'Vui lòng nhập mô tả';
        }
    };
}

Validator.isNumber = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            console.log(value);
            return value == parseInt(value, 10) ? undefined :  message || `Vui lòng nhập số`;
        }
    };
}

Validator.isAmount = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            console.log(value);
            return value == parseInt(value, 10) ? undefined :  message || `Vui lòng nhập số lượng`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}




document.addEventListener('DOMContentLoaded', function () {
    // Mong muốn của chúng ta
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isName('#name', 'Vui lòng nhập tên đầy đủ của bạn'),
        //Validator.isDescription('#description'),
        Validator.isNumber('#price', 1),
        Validator.isAmount('#amount', 1),
    //     Validator.isName('#password_confirmation'),
    //     Validator.isConfirmed('#password_confirmation', function () {
    //       return document.querySelector('#form-1 #password').value;
    //     }, 'Mật khẩu nhập lại không chính xác')
            ],
      onSubmit: function (data) {
        // Call API
        console.log(data);
      }
    });

  });
