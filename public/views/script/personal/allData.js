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
            class="file w-36 h-36 flex flex-wrap justify-center m-5 transition-all hover:scale-110" id="${data.files[i]}">
            <div class="w-4/5 h-4/5 rounded-xl">
              <img src="/files/${img}" alt="" class="popup w-full h-full rounded-md">
            </div>
            <a href="/api/download/${data.id}/${data.files[i]}"
              class="text-center border transition-all border-blue-400 px-2 py-1 mt-2 w-full hover:bg-blue-400 hover:text-white"> 
              ${data.files[i]}
            </a>
          </div>
        `
      }
      placeFiles.innerHTML = html

      const images = document.getElementsByClassName('popup')
      for (let i = 0; i < images.length; i++){
        images[i].addEventListener('click',(e)=>{
          openPopUp(e.target, data.id)
        })
      }
    })
}

async function openPopUp(img, userId){

  const popUpPlace = document.querySelector('.popupPlace')

  const filename = img.src.split('/').slice(-1).join('')

  popUpPlace.classList.remove('none')

  let popup = `
    <div class="w-1/2 h-2/3 bg-white p-10 opacity-90 relative">
      <img src="${img.src}" alt="" class="w-full h-3/4">
      <nav class="mt-10 flex justify-around flex-wrap">
        <a href="/api/download/${userId}/${filename}" class="border-2 text-center transition-all text-xl border-blue-400 bg-white w-2/5 p-2 hover:bg-blue-400 hover:text-white">download</a>
        <button class="deleteFile border-2 transition-all text-xl border-red-400 bg-white w-2/5 p-2 hover:bg-red-400 hover:text-white">delete</button>
      </nav>
      <button class="popupClose border border-red-700 bg-red-300 hover:bg-red-700 rounded-full absolute py-1 px-[10px] -right-4 -top-4 text-white">X</button>
    </div>
  `
  popUpPlace.innerHTML = popup

  const exitButton = document.querySelector('.popupClose')
  exitButton.addEventListener('click',(e) => {
    popUpPlace.classList.add('none')
  })

  const deleteFile = document.querySelector('.deleteFile')
  deleteFile.addEventListener('click', () => {
    fetch('http://localhost:3000/api/deleteFile', {
      method: 'post',
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({filename: filename})
    })
      .then(res => res.json())
      .then(res => {
        if (res.error === 'none') {
          popUpPlace.classList.add('none')
          generateFiles()
        } else {
          console.log(res);
        }
      })
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
