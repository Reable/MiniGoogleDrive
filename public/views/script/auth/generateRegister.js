const changeForm = document.getElementById('changeForm')
let idForm = changeForm.parentNode.id

changeForm.addEventListener('click', (e) => {
  e.preventDefault();
  generateHtml()
})

function generateHtml () {
  let html = ``
  let buttonText = ``
  let linkText = ``

  if (idForm === 'register') {
    html = `
      <p class="w-full p-3 text-xl">Log in</p>
      <label for="email">
        <input
        type="text" id="email" name="email" placeholder="Email"
        class="w-full rounded-md p-2 border my-4 focus:border-blue-400"
        >
      </label>
      
      <label for="password">
        <input
        type="text" id="password" name="password" placeholder="Password"
        class="w-full rounded-md p-2 border my-4"
        >
      </label>
    `
    buttonText = 'Log in'
    linkText = 'Registration'
  } else if (idForm === 'login') {
    html = `
      <p class="w-full p-3 text-xl">Sign in</p>
      <label for="email">
        <input
        type="text" id="email" name="email" placeholder="Email"
        class="w-full rounded-md p-2 border my-4 focus:border-blue-400"
        >
      </label>
      
      <label for="password">
        <input
        type="text" id="password" name="password" placeholder="Password"
        class="w-full rounded-md p-2 border my-4"
        >
      </label>
      
      <label for="password">
        <input
        type="text" id="email" placeholder="Password confirm"
        class="w-full rounded-md p-2 border my-4"
        >
      </label>
    `
    buttonText = 'Sign in'
    linkText = 'Authorization'
  }

  let place = document.querySelector(`form#${idForm} div.form-inputs`)
  let form = document.querySelector(`form#${idForm}`)
  let authButton = document.querySelector(`button#auth`)
  if (idForm === 'login'){
    idForm = 'register'
  } else if (idForm === 'register') {
    idForm = 'login' 
  }

  changeForm.innerHTML = linkText
  authButton.innerHTML = buttonText
  place.innerHTML = html;
  form.id = idForm
}