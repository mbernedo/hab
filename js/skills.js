var url = "https://habapi.herokuapp.com/api"
var customerId = localStorage.getItem("customerId")
var token = localStorage.getItem("token")

$(document).ready(function() {
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
    .finally(() => {})
}

const getSkills = () => {
  axios
    .get(url + "/skills")
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
    .finally(() => {})
}

getJobs()
getSkills()

var selectId = 0
$("#addSkill").click(() => {
  $("#skills").append(
    '<li type="circle" style="margin-top: 15px;">' +
      '<div class="row">' +
      '<select class="form-control skill col-10" id="' +
      selectId +
      '">' +
      '<option class="selected">---Seleccionar---</option>' +
      "</select>" +
      '<a class="col-2 deleteSkill" href="javascript:void(0);"><i' +
      ' class="far fa-trash-alt fa-2x"></i></a>' +
      "</div>" +
      "</li>"
  )
  axios
    .get(url + "/skills")
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
    .finally(() => {})
})

$("#saveJobSkill").click(() => {
  if ($("#defaultCheck1").prop("checked")) {
    const jobId = $("#job").val()
    var skills = []
    var next = true
    var i = 0
    $(".skill").map((index, data) => {
      skills.push(data.value)
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
            skillId: skills[i]
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
                  'Success',
                  'Se registró correctamente la información',
                  'success'
                )
                window.location.href = "home.html"
              }
            })
            .catch(error => {
              console.log(error)
              next = false
              Swal.fire("Error", "Ocurrió un error", "wrong")
            })
        }
      })
      .catch(error => {
        console.log(error)
        Swal.fire("Error", "Ocurrió un error", "wrong")
      })
      .finally(() => {})
  } else {
    alert("Aceptar TyC")
  }
})

$(document).on("click", ".deleteSkill", function() {
  $(this)
    .parent()
    .parent()
    .remove()
})
