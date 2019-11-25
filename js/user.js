var url = 'https://habapi.herokuapp.com/api'

$('#saveUser').click(() => {
  const name = $('#name').val()
  const lastName = $('#lastname').val()
  const email = $('#email').val()
  const password =
    $('#password').val() === $('#confirmPassword').val() ? $('#password').val() : alert('Contraseñas no coinciden')
  const sex = 'M'
  const phoneNumber = $('#phoneNumber').val()
  const req = {
    name,
    lastName,
    email,
    password,
    sex,
    phoneNumber
  }
  axios
    .post(url + '/customers', req, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((response) => {
      const req = {
        email,
        password
      }
      axios
        .post(url + '/customers/login', req, {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then((response) => {
          localStorage.setItem('customerId', response.data.userId)
          localStorage.setItem('token', response.data.id)
          window.location.href = 'skills.html'
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {})
      console.log(response)
      alert('Registro correcto')
    })
    .catch((error) => {
      console.log(error)
      alert(error.message)
    })
    .finally(() => {})
})

$('#login').click(() => {
  const email = $('#emailL').val()
  const password = $('#passwordL').val()
  const req = {
    email,
    password
  }
  axios
    .post(url + '/customers/login', req, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((response) => {
      localStorage.setItem('customerId', response.data.userId)
      localStorage.setItem('token', response.data.id)
      window.location.href = 'skills.html'
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {})
})
