const firstName = document.getElementById("first-name")
const lastName = document.getElementById("last-name")
const email = document.getElementById("email")
const password1 = document.getElementById("password-1")
const password2 = document.getElementById("password-2")
const submitBtn = document.querySelector('#register-btn')

const registerURL = "/user/register"

const sendRegistration = body => {
    axios.post(registerURL, body)
    .then((res) => {
        if (res.data.success) {
        // alert('registration successful')
        window.location.href = '/login'
      } else {
        console.log('no axios error, but registration not successful: bad username or password')
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

      if (password1.value === password2.value){
        let body = {
            email: email.value,
            password: password2.value,
            firstName: firstName.value,
            lastName: lastName.value
        }

        sendRegistration(body)

    } else {
        alert("Passwords don't match! Try again.")
    }
  
    //   emailInput.value = ""
    //   passwordInput.value = ""
  }

submitBtn.addEventListener('click', submitHandler)