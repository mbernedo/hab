var url = "https://habapi.herokuapp.com/api"
var customerId = localStorage.getItem("customerId")
var token = localStorage.getItem("token")

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
      for (var data of response.data.skills) {
        const icono = data.icon
        $("#skills").append(
          '<div class="carousel-item cursos col-3 active centrado">' +
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
    .get(url + "/jobs/skills", { headers: { Authorization: token } })
    .then(response => {
      let cont = 1
      for (var data of response.data) {
        cont++
        console.log(data.hasIt)
        const icono = data.icon
        $("#jobSkills").append(
          `<div class="carousel-item habilidades col-md-3 active centrado">
          <div
              style="border: lightblue solid 2px; padding: 5px; border-radius: 10px;">
              <div style="margin-bottom: 7px;">
                  <img class="img-fluid imgJobs" data-toggle="tooltip"
                      data-placement="right" title="<div style='padding: 25px; font-size: 13px; background-color: blue; width: 350px; color: white;'>
                      <div>
                          <p>Habilidades más relacionadas</p>
                      </div>
                      <div>
                          <img class='img-fluid' src='images/jquery.png' />
                          <label>JQUERY</label>
                      </div>
                  </div>" data-html="true" src="${icono}" />
              </div>
          </div>
          <div>
              <label class="letraW" style="font-size: 10px;">${
                data.name
              }</label>
          </div>
          <div>
              <label class="letraW" style="font-size: 10px;">${
                cont % 2 === 0
                  ? 'Estudialo aqui: <img class="img-fluid imgCaca" src="https://www.seekpng.com/png/detail/222-2223575_udemy-logo-png-transparent-udemy-logo-png.png"'
                  : 'Estudialo aqui: <img class="img-fluid imgCaca" src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-logo-square.png?auto=format%2Ccompress&dpr=1" />'
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
      $("body").tooltip({
        selector: "[rel=tooltip]"
      })
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {})
}

getAllCustomerInfo()
getAllCustomerJobsSkills()
