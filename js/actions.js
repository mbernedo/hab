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

$('#addSkill').click(function() {
  $('#skills').append(
    '<li type="circle" style="margin-top: 15px;">' +
      '<div class="row">' +
      '<select class="form-control col-10">' +
      '<option class="selected"></option>' +
      '<option>HTML</option>' +
      '<option>CSS</option>' +
      '<option>JS</option>' +
      '</select>' +
      '<a class="col-2" id="deleteSkill" href="javascript:void(0);"><i class="far fa-trash-alt fa-2x"></i></a>' +
      '</div>' +
      '</li>'
  )
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
