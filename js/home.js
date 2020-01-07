var url = "https://habapi.herokuapp.com/api"
var customerId = localStorage.getItem("customerId")
var token = localStorage.getItem("token")
let courses = {}
let related = {}
let skillName = {}

$(document).ready(function() {
  if (!token || !customerId) {
    window.location.href = "login.html"
  }
})

const getAllCustomerInfo = () => {
  axios
    .get(url + "/customers/me", { headers: { Authorization: token } })
    .then(response => {
      if (!response.data.skills) {
        window.location.href = "skills.html"
      }
      const name = response.data.name
      const job = response.data.job.name
      $("#curentName").text(name)
      $("#currentJob").text(job)
      let cont = 1
      for (var data of response.data.skills) {
        const active = cont === 1 ? "active" : ""
        const icono = data.icon
        $("#skills").append(
          '<div class="carousel-item cursos col-3 ' +
            active +
            ' centrado">' +
            '<div style="margin-bottom: 7px;">' +
            '<img class="img-fluid imgSkills" src="' +
            icono +
            '"/>' +
            "</div>" +
            "<div>" +
            '<label class="letraW">' +
            data.name +
            "</label>" +
            "</div>" +
            "</div>"
        )
      }
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {})
}

const getAllCustomerJobsSkills = () => {
  axios
    .get(url + "/jobs/skills?limit=5&weight=0.3", {
      headers: { Authorization: token }
    })
    .then(response => {
      let cont = 1
      let hasNot = 0
      for (var data of response.data) {
        if (!data.hasIt) {
          hasNot++
        }
        const active = cont === 1 ? "active" : ""
        courses[data.skillId] = data.courses
        related[data.skillId] = data.related
        skillName[data.skillId] = data.name
        cont++
        const icono = data.icon
        $("#jobSkills").append(
          `<div class="carousel-item habilidades col-md-3 ${active} centrado">
          <div
              style="border: white solid 2px; padding: 5px; border-radius: 10px;">
              <div style="margin-bottom: 7px;">
                  <a href="javascript:void(0)"><img class="img-fluid imgJobs skillDetail" id="${
                    data.skillId
                  }" src="${icono}" />
                  </a>
              </div>
          </div>
          <div>
              <label class="letraW" style="font-size: 10px;">${
                data.name
              }</label>
          </div>
          <div>
              <label class="letraW" style="font-size: 35px;">${
                data.hasIt ? "✓" : ""
              }</label>
          </div>
      </div>`
        )
      }
      $("#learnSkill").html(hasNot)
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {})
}

getAllCustomerInfo()
getAllCustomerJobsSkills()

function getRelated(id) {
  $("#skillSelected").html(skillName[id])
  let relatedChain = ""
  if (related[id].length === 0) {
    relatedChain = "No hay habilidades relacionadas"
  } else {
    for (const relate of related[id]) {
      relatedChain += `<div>
    <img class='img-fluid imgRelated' src='${relate.icon}'/>
    <label>${relate.name}</label>
  </div>`
    }
  }
  $("#relatedSkills").html(relatedChain)
}

function getCourses(id) {
  // $("#skillSelected").html(skillName[id])
  let courseChain = ""
  if (courses[id].length === 0) {
    courseChain = "No hay cursos"
  } else {
    for (const course of courses[id]) {
      courseChain += `<div style="width: 18rem; border: white solid 2px;" class="courseCard">
    <div class="card-body">
        <a target="_blank"
            href='${course.url}'><img
                class='img-fluid imgRelated'
                src='${course.icon}' /></a>
        <label>${course.name}</label>
        <a target="_blank" class="letraW btn btn-dark" href="${course.url}">Ir al curso</a>
    </div>
</div>`
    }
  }
  $("#coursesSkills").html(courseChain)
}

$(document).on("click", ".skillDetail", function() {
  $(".centrado").removeClass("skillSelected")
  $(this)
    .parent()
    .parent()
    .parent()
    .parent()
    .addClass("skillSelected")
  const id = $(this).attr("id")
  getRelated(id)
  getCourses(id)
})
