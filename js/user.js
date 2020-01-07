var url = "https://habapi.herokuapp.com/api"

$("#saveUser").click(() => {
  register()
})

$("#login").click(() => {
  login()
})

$(document).keypress(e => {
  if (e.which === 13) {
    if (
      window.location.pathname === "/hab/login.html" ||
      window.location.pathname === "/login.html"
    ) {
      login()
    } else if (
      window.location.pathname === "/hab/registro.html" ||
      window.location.pathname === "/registro.html"
    ) {
      register()
    }
  }
})

function login() {
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
      window.location.href = "home.html"
    })
    .catch(error => {
      Swal.fire("Error", "Credenciales incorrectas", "error")
      console.log(error)
    })
    .finally(() => {})
}

function register() {
  const name = $("#name").val()
  const email = $("#email").val()
  const password =
    $("#password").val() === $("#confirmPassword").val()
      ? $("#password").val()
      : Swal.fire("Error", "Contraseñas no coinciden", "error")
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
          window.location.href = "home.html"
        })
        .catch(error => {
          Swal.fire("Error", "Ocurrió un error", "error")
          console.log(error)
        })
        .finally(() => {})
    })
    .catch(error => {
      Swal.fire("Error", "Ocurrió un error", "error")
    })
    .finally(() => {})
}
