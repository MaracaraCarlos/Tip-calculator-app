const bill = document.getElementById('bill');
const tipBtns = document.querySelectorAll('.tip_btn');
const tipCustom = document.getElementById('select');
const numberPeople = document.getElementById('people');
const tipPerPerson = document.getElementById('tip_value');
const totalPerPerson = document.getElementById('total_value');
const btnReset = document.querySelector('.btn_reset');
const error = document.querySelector('.error');

bill.addEventListener('input', billInputFun);
numberPeople.addEventListener('input', peopleInputFun);
tipBtns.forEach( val => {
  val.addEventListener('click', handlerClick);
});
tipCustom.addEventListener('input', tipCustomFun);
btnReset.addEventListener('click', reset);

bill.value = '0.0';
numberPeople.value = '1';
tipPerPerson.innerHTML = (0.0).toFixed(2);
totalPerPerson.innerHTML = (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.10;

function billInputFun(){
  billValue = parseFloat(bill.value);
  calculateTip();
}

function peopleInputFun(){
  peopleValue = parseFloat(numberPeople.value);
  calculateTip();

  if(peopleValue < 1) {
    error.style.display = 'block';
    numberPeople.classList.add('wrong');
  }else{
    error.style.display = 'none';
    numberPeople.classList.remove('wrong');
  }
}

function tipCustomFun(){
  tipValue = parseFloat(tipCustom.value / 100);

  tipBtns.forEach(val => {
    val.classList.remove('active_tip');
  });
  calculateTip();
}

function handlerClick(e){
  tipBtns.forEach(val => {

    val.classList.remove('active_tip');

    if(e.target.innerHTML == val.innerHTML) {
      val.classList.add('active_tip');
      tipValue = parseFloat(val.innerHTML) / 100;
    }
  });
  calculateTip();
}

function calculateTip(){
  if(peopleValue >= 1){
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = ((billValue * tipValue) + billValue) / peopleValue;
    tipPerPerson.innerHTML = tipAmount.toFixed(2);
    totalPerPerson.innerHTML = total.toFixed(2);
  }
}

function reset(){
  bill.value = '0.0';
  billInputFun();
  numberPeople.value = '1';
  peopleInputFun();
  tipCustom.value = '';
}