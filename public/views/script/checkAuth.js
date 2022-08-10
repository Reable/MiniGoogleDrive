let token = localStorage.getItem('token')
let user;

if (token) {
  fetch('http://localhost:3000/api/checkAuth',{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(async (res) => {
      console.log(res)
      if (!res || res.message) {
        localStorage.clear()
        console.log('1111111111')
        location.href = '/'
        return;
      }
      redirectPage()
    })

  function redirectPage() {
    const pathname = location.pathname

    switch(pathname){
      case '/':
        console.log('222222222')
        location.href = '/personal-area'
        break
    }
  }
}