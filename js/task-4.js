const form = document.querySelector('.login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const { email, password } = form.elements;
  const data = {
    email: email.value.trim(),
    password: password.value.trim(),
  };

  if (data.email === '' || data.password === '') {
    alert('All form fields must be filled in');
    return;
  }

  console.log(data);
  form.reset();
});