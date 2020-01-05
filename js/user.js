var url = "https://habapi.herokuapp.com/api"

$("#saveUser").click(() => {
  const name = $("#name").val()
  const email = $("#email").val()
  const password =
    $("#password").val() === $("#confirmPassword").val()
      ? $("#password").val()
      : alert("Contraseñas no coinciden")
  const req = {
    name,
    email,
    password
  }
  axios
    .post(url + "/customers", req, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(response => {
      const req = {
        email,
        password
      }
      axios
        .post(url + "/customers/login", req, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(response => {
          localStorage.setItem("customerId", response.data.userId)
          localStorage.setItem("token", response.data.id)
          Swal.fire("Success", "Registro correcto", "success")
          window.location.href = "home.html"
        })
        .catch(error => {
          Swal.fire("Error", "Ocurrió un error", "wrong")
          console.log(error)
        })
        .finally(() => {})
    })
    .catch(error => {
      Swal.fire("Error", "Ocurrió un error", "wrong")
      alert(error.message)
    })
    .finally(() => {})
})

$("#login").click(() => {
  const email = $("#emailL").val()
  const password = $("#passwordL").val()
  const req = {
    email,
    password
  }
  axios
    .post(url + "/customers/login", req, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(response => {
      localStorage.setItem("customerId", response.data.userId)
      localStorage.setItem("token", response.data.id)
      Swal.fire("Success", "Login correcto", "success")
      window.location.href = "home.html"
    })
    .catch(error => {
      Swal.fire("Error", "Credenciales incorrectas", "wrong")
      console.log(error)
    })
    .finally(() => {})
})
