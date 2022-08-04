const changeForm = document.getElementById('changeForm')
let idForm = changeForm.parentNode.id
let html = ``

if (idForm === 'register') {
  html = `
    <p class="w-full p-3 text-xl">Log in</p>
    <label for="email">
      <input
        type="text" id="email" placeholder="Email"
        class="w-full rounded-md p-2 border my-4 focus:border-blue-400"
      >
    </label>
    
    <label for="password">
      <input
        type="text" id="email" placeholder="Password"
        class="w-full rounded-md p-2 border my-4"
      >
    </label>
    
    <button class="w-full p-2 bg-blue-500 rounded-md text-white">Log in</button>
    <div class="">
      <p class="text-center p-2">or</p>
    </div>
    <button 
      id="changeForm"
      class="text-center w-full p-2 transition-all bg-gray-300 text-slate-400 hover:bg-blue-200 hover:text-slate-900 rounded-md">Registration</button>
  `
} else if (idForm === 'login') {
  html = `
    <p class="w-full p-3 text-xl">Sign in</p>
    <label for="email">
      <input
        type="text" id="email" placeholder="Email"
        class="w-full rounded-md p-2 border my-4 focus:border-blue-400"
      >
    </label>
    
    <label for="password">
      <input
        type="text" id="email" placeholder="Password"
        class="w-full rounded-md p-2 border my-4"
      >
    </label>
    
    <button class="w-full p-2 bg-blue-500 rounded-md text-white">Sign in</button>
    <div class="">
      <p class="text-center p-2">or</p>
    </div>
    <button 
      id="changeForm"
      class="text-center w-full p-2 transition-all bg-gray-300 text-slate-400 hover:bg-blue-200 hover:text-slate-900 rounded-md">Authorization</button>
  `
}

changeForm.addEventListener('click', (e) => {
  e.preventDefault();
  let place = document.querySelector(`form#${idForm}`)
  console.log(idForm)
  console.log(place)
  if (idForm === 'login'){
    idForm = 'registration'
  }
  if (idForm === 'register'){
    idForm = 'login' 
  }
  place.innerHTML = html;
  place.id = idForm
})