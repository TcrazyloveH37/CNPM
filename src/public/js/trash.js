let arrDelete = document.querySelectorAll("table tr > td > .get-id-delete");
let arrEdit = document.querySelectorAll("table tr > td > .get-id-edit");
let Form = document.forms['restore-product-form'];
let btnYES = document.getElementById('restore-products-comfirm');
let idSlug;

for (let i = 0; i < arrDelete.length; i++) {
    arrEdit[i].addEventListener('click', () => {
        idSlug = arrDelete[i].getAttribute('data-id');
        Form.innerHTML = '';
        btnYES.addEventListener('click', () => {
            Form.action = '/trash/' + idSlug + '?_method=PUT';
            Form.submit();
        });
    });
    arrDelete[i].addEventListener('click', () => {
        idSlug = arrDelete[i].getAttribute('data-id');
        Form.innerHTML = '';
        btnYES.addEventListener('click', () => {
            Form.action = '/trash/' + idSlug + '?_method=DELETE';
            Form.submit();
        });
    });
}