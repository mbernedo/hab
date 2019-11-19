var url = 'https://habapi.herokuapp.com/api'

const getJobs = () => {
  axios
    .get(url + '/jobs')
    .then((response) => {
      // handle success
      for (var data of response.data) {
        $('#job').append('<option value="' + data.id + '">' + data.name + '</option>')
      }
      // console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {})
}

const getSkills = () => {
  axios
    .get(url + '/skills')
    .then((response) => {
      for (var data of response.data) {
        $('#skill').append('<option value="' + data.id + '">' + data.name + '</option>')
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {})
}

getJobs()
getSkills()

var selectId = 0
$('#addSkill').click(() => {
  $('#skills').append(
    '<li type="circle" style="margin-top: 15px;">' +
      '<div class="row">' +
      '<select class="form-control skill col-10" id="' +
      selectId +
      '">' +
      '<option class="selected">---Seleccionar---</option>' +
      '</select>' +
      '<a class="col-2 deleteSkill" href="javascript:void(0);"><i' +
      ' class="far fa-trash-alt fa-2x"></i></a>' +
      '</div>' +
      '</li>'
  )
  axios
    .get(url + '/skills')
    .then((response) => {
      for (var data of response.data) {
        $('#' + selectId).append('<option value="' + data.id + '">' + data.name + '</option>')
      }
      selectId++
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {})
})

$('#registro').click(() => {
  if ($('#defaultCheck1').prop('checked')) {
    const job = $('#job').val()
    console.log(check)
    var skills = []
    $('.skill').map((index, data) => {
      skills.push(data.value)
    })
    const res = {
      job,
      skills
    }
    console.log(res)
  } else {
    alert('Aceptar TyC')
  }
})
