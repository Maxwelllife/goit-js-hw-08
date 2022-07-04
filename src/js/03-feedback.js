import throttle from 'lodash.throttle';
const STORAGE__KEY = 'feedback-form-state';
let formData = {};
let parsedData = {};
const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

//додаємо слухачів на всю форму та окремо на input
refs.form.addEventListener('submit', onFormSubmit);

refs.form.addEventListener('input', throttle(onInputText, 500));
//виклик функції яка бере інформацію із localStorage та записує її в поля
onGetDataToInputs();

// заборона дій браузера по замовчуванням
// при відправці форми очищаємо форму
// та очищаємо localStorage
function onFormSubmit(event) {
  event.preventDefault();
  event.target.reset();
  localStorage.removeItem(STORAGE__KEY);
}

// додавши слухача на всю форму, якщо об'єкт formData пустий записуємо в пустий об'єкт
// ключ e.target.name та його значення e.target.value
// перетворюємо об'єкт на строку
// записуємо в localStorage цю строку
function onInputText(e) {
  // console.log(localStorage);

  // console.log(localStorage.getItem(STORAGE__KEY));

  formData = localStorage.getItem(STORAGE__KEY) ? parsedData : {};
  formData[e.target.name] = e.target.value;
  const savedData = JSON.stringify(formData);
  localStorage.setItem(STORAGE__KEY, savedData);
  console.log(formData);
}

// отримуємо STORAGE__KEY (значення) із сховища, якщо там щось було оновлюємо DOM
function onGetDataToInputs() {
  parsedData = JSON.parse(localStorage.getItem(STORAGE__KEY));
  if (parsedData) {
    refs.input.value = parsedData.email ? parsedData.email : '';
    refs.textarea.value = parsedData.message ? parsedData.message : '';
  }
}
