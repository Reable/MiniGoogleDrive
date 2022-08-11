
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
    space.innerHTML = user[elem]
  })
}

async function addFile() {
  const file = document.getElementById('file-input')
  const data = new FormData()
  data.append('file',file.files[0])
  fetch('http://localhost:3000/api/addFile', {
    method: 'post',
    headers: {
      Authorization: "Bearer "+token,
    },
    body: data
  })
    .then(res => res.json())
    .then(res => console.log(res))

}
const form = document.getElementById('addFile')
form.addEventListener('submit',(e) => {
  e.preventDefault()
  addFile(e)
})