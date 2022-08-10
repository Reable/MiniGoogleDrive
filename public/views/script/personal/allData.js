fetch('http://localhost:3000/api/personal', {
    headers: {
      'Authorization': 'Bearer '+ token
    }
  })
    .then(res => res.json())
    .then(res => {
      generateYourData(res)
    })

async function generateYourData(user){
  console.log(user);
  const allId = ['email', 'role', 'usedSpace', 'diskSpace']
  allId.forEach(elem => {
    let space = document.getElementById(elem) 
    console.log(space)
    space.innerHTML = user[elem]
  })
}