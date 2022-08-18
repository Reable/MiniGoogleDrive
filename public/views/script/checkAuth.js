let url = location.href.split('/').slice(0,-1).join('/')
let token = localStorage.getItem('token')

if (token) {
  fetch(url+'/api/checkAuth',{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(async (res) => {
      if (!res || res.message) {
        localStorage.clear()
        location.href = '/'
        return;
      }
      redirectPage()
    })

  function redirectPage() {
    const pathname = location.pathname

    switch(pathname){
      case '/':
        location.href = '/personal-area'
        break
    }
  }
}