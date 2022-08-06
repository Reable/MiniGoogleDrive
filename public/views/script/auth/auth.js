const button = document.querySelector('button#auth')

async function sendRequest(event){
  const inputs = document.querySelectorAll('input')
  
  let obj = {}
  inputs.forEach(inp => {
    obj[inp.name] = inp.value
  })

  let route;
  if (idForm === 'login') {
    route = 'authorization'
  } else {
    route = 'registration'
  }
  console.log(route)
  fetch(`http://localhost:3000/api/${route}`,{
    method: 'post',
    body: JSON.stringify(obj),
    headers: {
      "Content-type":'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    jobWithData(res);
  })
}

button.addEventListener('click', (e) => {
  e.preventDefault()
  sendRequest(e)
})

function jobWithData(res) {
  if (res.error) {
    const errorInput = document.getElementById(res.error)
    const placeholder = errorInput.placeholder
    errorInput.placeholder = res.message
    errorInput.classList.add('border-red-400');
    errorInput.classList.add('placeholder:text-red-400');
    console.log(errorInput.classList)
    setTimeout(()=> {
      errorInput.placeholder = placeholder
      errorInput.classList.remove('border-red-400');
    }, 3000)
  }
  localStorage.setItem('token', res.token)
  console.log(res)
}