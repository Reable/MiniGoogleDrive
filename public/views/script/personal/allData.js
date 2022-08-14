generateYourData()
generateFiles()
async function generateYourData(){
  fetch('http://localhost:3000/api/personal', {
    headers: {
      'Authorization': 'Bearer '+ token
    }
  })
    .then(res => res.json())
    .then(user => {
      const allId = ['email', 'role', 'usedSpace', 'diskSpace']
      
      allId.forEach(elem => {
        let text = user[elem]
        if (elem === 'usedSpace' || elem === 'diskSpace'){
          text = Number(text).toFixed(2)
        }
        let space = document.getElementById(elem)
        space.innerHTML = text
      })
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
    .then(res => {
      if (res.error) {
        return alert(res.message)
      }
      generateYourData()
      generateFiles()
    })

}

function generateFiles () {
  let html = ''
  fetch('http://localhost:3000/api/files', {
    headers: {
      Authorization: 'Bearer '+token
    }
  })
    .then(res => res.json())
    .then(data => {
      const placeFiles = document.querySelector('div#place')
      if (data.error === 404) return placeFiles.innerHTML = '<h1>Файлы пока что не добавленны</h1>'
      for (let i = 0; i< data.files.length; i++) {
        let file = data.files[i].split('.')[1]
        let img = file === 'zip' 
          ? `default.jpg`
          : `${data.id}/${data.files[i]}`
        html += `
          <div
            class="file w-36 h-36 flex flex-wrap justify-center m-5 transition-all hover:scale-110">
            <div class="w-4/5 h-4/5 rounded-xl">
              <img id="openPopUp" src="/files/${img}" alt="" class="w-full h-full rounded-md">
            </div>
            <a href="/api/download/${data.id}/${data.files[i]}"
              class="text-center border transition-all border-blue-400 px-2 py-1 mt-2 w-full hover:bg-blue-400 hover:text-white"> 
              ${data.files[i]}
            </a>
          </div>
        `
      }
      placeFiles.innerHTML = html
    })
}

const form = document.getElementById('addFile')
form.addEventListener('submit',(e) => {
    e.preventDefault()
    addFile()
})

document.querySelector('button.exit').addEventListener('click', (e) => {
  localStorage.clear()
  location.href = '/'
})