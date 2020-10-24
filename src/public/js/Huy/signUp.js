function Validator(options) {
    let formElement = document.querySelector(options.form);

    if (formElement) {

        options.rules.forEach(rule => {

            let inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                inputElement.onblur = () => {
                    console.log(inputElement.value + rule.selector);
                }
            }
        });
    }


}

Validator.isRequired = (selector) => {
    return {
        selector,
        check(inputUser) {

        }
    };
}

Validator.isPass = (selector) => {
    return {
        selector,
        check(inputUser) {

        }
    };
}

Validator.isConfirmPass = (selector) => {
    return {
        selector,
        check(inputUser) {

        }
    };
}