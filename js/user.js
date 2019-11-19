var url = 'https://habapi.herokuapp.com/api'

$('#saveUser').click(() => {
  const name = $('#name').val()
  const lastName = $('#lastname').val()
  const email = $('#email').val()
  const password =
    $('#password').val() === $('#confirmPassword').val() ? $('#password').val() : alert('Contraseñas no coinciden')
  const sex = 'M'
  const phoneNumber = '123123123'
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
      console.log(response)
      alert('Registro correcto')
    })
    .catch((error) => {
      console.log(error)
      alert(error.message)
    })
    .finally(() => {})
})
