let token = localStorage.getItem('token')

if (token) {
  fetch('http://localhost:3000/api/checkAuth',{
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