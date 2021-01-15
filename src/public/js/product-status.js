const Soluong = document.getElementsByClassName('Tinh-So-Luong');
const Sotien = document.getElementsByClassName('Tinh-So-Tien');
let Tongtien = document.getElementsByClassName('Tong-Gia-Tien');

let sum = 0;
for (let i = 0; i < Soluong.length; i++) {
  console.log(Soluong[i].innerHTML);
  console.log(Sotien[i].innerHTML);
  sum += parseInt(Soluong[i].innerHTML) * parseInt(Sotien[i].innerHTML);
}
Tongtien[0].innerHTML = sum;
