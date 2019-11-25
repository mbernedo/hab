$('#carouselHabilidades').on('slide.bs.carousel', (e) => {
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

$('#carouselCursos').on('slide.bs.carousel', (e) => {
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

$(() => {
  $('[data-toggle="tooltip"]').tooltip()
})
