var url = "https://habapi.herokuapp.com/api"
var customerId = localStorage.getItem("customerId")
var token = localStorage.getItem("token")

$(document).ready(function () {
  if (!token || !customerId) {
    window.location.href = "login.html"
  }
})

const getJobs = () => {
  axios
    .get(url + "/jobs")
    .then(response => {
      for (var data of response.data) {
        $("#job").append(
          '<option value="' + data.id + '">' + data.name + "</option>"
        )
      }
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => { })
}

const getSkills = () => {
  axios
    .get(url + "/skills?filter[order]=name ASC")
    .then(response => {
      for (var data of response.data) {
        $("#skill").append(
          '<option value="' + data.id + '">' + data.name + "</option>"
        )
      }
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => { })
}

getJobs()
getSkills()

var selectId = 0
$("#addSkill").click(() => {
  $("#skills").append(
    '<div class="row" style="margin-bottom: 1rem;">' +
    '<select class="form-control skill col-6 " id="' +
    selectId +
    '">' +
    '<option class="selected">---Seleccionar---</option>' +
    "</select>" +
    '<select class="form-control level col-4" id="level">' +
    '<option class="selected">--Nivel--</option>' +
    '<option value="1" class="selected">Básico</option>' +
    '<option value="2" class="selected">Intermedio</option>' +
    '<option value="3" class="selected">Avanzado</option>' +
    '</select>' +
    '<a class="col-2 deleteSkill letraW" href="javascript:void(0);"><i' +
    ' class="far fa-trash-alt fa-2x"></i></a>' +
    "</div>"
  )
  axios
    .get(url + "/skills?filter[order]=name ASC")
    .then(response => {
      for (var data of response.data) {
        $("#" + selectId).append(
          '<option value="' + data.id + '">' + data.name + "</option>"
        )
      }
      selectId++
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => { })
})

$("#saveJobSkill").click(() => {
  if ($("#defaultCheck1").prop("checked")) {
    const jobId = $("#job").val()
    var skills = []
    var levels = []
    var next = true
    var i = 0
    $(".skill").map((index, skill) => {
      skills.push(skill.value)
    })
    $(".level").map((index, level) => {
      levels.push(level.value)
    })
    const resJob = {
      customerId,
      jobId
    }
    axios
      .post(url + "/customer-jobs", resJob, {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(async response => {
        while (next && skills.length > i) {
          const resSkill = {
            customerId,
            skillId: skills[i],
            level: levels[i]
          }
          await axios
            .post(url + "/customer-skills", resSkill, {
              headers: {
                "Access-Control-Allow-Origin": "*"
              }
            })
            .then(response => {
              i++
              if (i === skills.length) {
                Swal.fire(
                  "Success",
                  "Se registró correctamente la información",
                  "success"
                )
                window.location.href = "home.html"
              }
            })
            .catch(error => {
              console.log(error)
              next = false
              Swal.fire("Error", "Ocurrió un error", "error")
            })
        }
      })
      .catch(error => {
        console.log(error)
        Swal.fire("Error", "Ocurrió un error", "error")
      })
      .finally(() => { })
  } else {
    Swal.fire(
      "Error",
      "Debe aceptar los términos y condiciones para poder continuar",
      "error"
    )
  }
})

$(document).on("click", ".deleteSkill", function () {
  $(this)
    .parent()
    .parent()
    .remove()
})

$("#logout").click(function () {
  localStorage.removeItem("customerId")
  localStorage.removeItem("token")
  window.location.href = "login.html"
})
