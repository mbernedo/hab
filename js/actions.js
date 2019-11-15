var url = 'https://habapi.herokuapp.com/api'

getJobs()
getSkills()

$('#carouselHabilidades').on('slide.bs.carousel', function(e) {
  var $e = $(e.relatedTarget)
  var idx = $e.index()
  var itemsPerSlide = 4
  var totalItems = $('.habilidades').length

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx)
    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction == 'left') {
        $('.habilidades').eq(i).appendTo('.inner-habilidades')
      } else {
        $('.habilidades').eq(0).appendTo('.inner-habilidades')
      }
    }
  }
})

function getJobs() {
  axios
    .get(url + '/jobs')
    .then(function(response) {
      // handle success
      for (var data of response.data) {
        $('#job').append('<option>' + data.name + '</option>')
      }
      // console.log(response.data)
    })
    .catch(function(error) {
      console.log(error)
    })
    .finally(function() {})
}

function getSkills() {
  axios
    .get(url + '/skills')
    .then(function(response) {
      for (var data of response.data) {
        $('#skill').append('<option>' + data.name + '</option>')
      }
    })
    .catch(function(error) {
      console.log(error)
    })
    .finally(function() {})
}
var selectId = 0
$('#addSkill').click(function() {
  $('#skills').append(
    '<li type="circle" style="margin-top: 15px;">' +
      '<div class="row">' +
      '<select class="form-control col-10" id="' +
      selectId +
      '">' +
      '<option class="selected">---Seleccionar---</option>' +
      '</select>' +
      '<a class="col-2" id="deleteSkill" href="javascript:void(0);"><i' +
      ' class="far fa-trash-alt fa-2x"></i></a>' +
      '</div>' +
      '</li>'
  )
  axios
    .get(url + '/skills')
    .then(function(response) {
      for (var data of response.data) {
        $('#' + selectId).append('<option>' + data.name + '</option>')
      }
      selectId++
    })
    .catch(function(error) {
      console.log(error)
    })
    .finally(function() {})
})

$(document).on('click', '#deleteSkill', function() {
  $(this).parent().parent().remove()
})

$('#carouselCursos').on('slide.bs.carousel', function(e) {
  var $e = $(e.relatedTarget)
  var idx = $e.index()
  var itemsPerSlide = 4
  var totalItems = $('.cursos').length

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx)
    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction == 'left') {
        $('.cursos').eq(i).appendTo('.inner-cursos')
      } else {
        $('.cursos').eq(0).appendTo('.inner-cursos')
      }
    }
  }
})

$(function() {
  $('[data-toggle="tooltip"]').tooltip()
})
