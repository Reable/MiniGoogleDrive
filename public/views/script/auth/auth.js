const button = document.querySelector('button#auth')

async function sendRequest(event){
  const inputs = document.querySelectorAll('form#'+idForm, ' input')
  console.log(inputs.length);
}

button.addEventListener('click', (e) => {
  e.preventDefault()
  sendRequest(e)
})