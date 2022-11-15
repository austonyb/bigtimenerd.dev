const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const submitBtn = document.querySelector('#submit-btn')
const loginURL = '/user/login'


const sendLogin = body => {
    axios.post(loginURL, body)
    .then((res) => {
      const { firstName, lastName, emailAddress, accountCreatedAt } = res.data
      if (res.data.success) {
        document.cookie = `name=${firstName}; path=/; max-age=${60 * 60};`
        alert('login successful')
        window.location.href = '/'
      } else {
        console.log('no axios error, but login not successful: bad username or password')
        alert('bad username or password')
      }
    })
    .catch(err => {
      console.log('axios error:')
      console.log(err)
    })
  }
  
  function submitHandler(event) {
      event.preventDefault()
  
      let body = {
          email: emailInput.value,
          password: passwordInput.value
      }
  
      emailInput.value = ""
      passwordInput.value = ""
  
      sendLogin(body)
  }

submitBtn.addEventListener('click', submitHandler)