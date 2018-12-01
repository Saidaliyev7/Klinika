$(document).ready(function () {
  var firstSubslider = $('.slider-owl-carousel-item').owlCarousel({
    items: 1,
    mouseDrag: false,
  });
  var secondSlider = $('.slider-owl-carousel-item-2').owlCarousel({
    items: 1,
    mouseDrag: false,
  })
  //init slider
  $('#home .homepage-slider .slider-holder').owlCarousel({
    items: 1,
    onInitialized: function (e) {
      var items = e.item.count;
      var activeIndex = e.item.index;
      var dotsFrame = $('.homepage-slider .dot-numbers');
      var paginationSlider = $('.homepage-slider .pagination-slider .progress');
      $(' #home .featured-items:first').fadeIn();
      //append paginaiton numbers
      firstSubslider.trigger('next.owl.carousel');
      secondSlider.trigger('to.owl.carousel', 2);
      dotsFrame.html('');
      for (var i = 0; i < items; i++) {
        $(`<li data-index="${i}" class='${i==activeIndex?'active':''}'>
              <span class="fs-12">${i+1}</span>
            </li>`).on('click', function (item) {
          dotsFrame.children('li').removeClass('active');
          $(this).addClass('active');
          $(e.target).trigger('to.owl.carousel', [($(item.target).text() - 1), 500, true])
        }).appendTo(dotsFrame);
      }
      //set pagination slider progressbar 
      paginationSlider.css({
        height: 100 / items + '%',
        top: 100 * activeIndex / items + '%'
      })
    },
    onTranslated: function (e) {
      var items = e.item.count;
      var activeIndex = e.item.index;
      var dotsFrame = $('.homepage-slider .dot-numbers');
      var paginationSlider = $('.homepage-slider .pagination-slider .progress');
      var activeItem = parseInt(activeIndex) + 2;
      console.log(activeIndex)
      //set active index on paginaiton list on change  
      dotsFrame.children('li').removeClass('active');
      dotsFrame.children('li').eq(activeIndex).addClass('active');
      if (activeIndex == 0) {
        firstSubslider.trigger('to.owl.carousel', 1);
        secondSlider.trigger('to.owl.carousel', 2);
      } else if (activeIndex == 1) {
        firstSubslider.trigger('to.owl.carousel', 2);
        secondSlider.trigger('to.owl.carousel', 0);
      } else if (activeIndex == 2) {
        firstSubslider.trigger('to.owl.carousel', 0);
        secondSlider.trigger('to.owl.carousel', 1);
      }
      //set pagination slider position on change
      paginationSlider.css({
        top: 100 * activeIndex / items + '%'
      })
    }
  })
  $('#news  .slider-holder').owlCarousel({
    items: 1,
    onInitialized: function (e) {
      var activeSlider = $(this);
      var items = e.item.count;
      var activeIndex = e.item.index;
      var dotsFrame = $('#news .dot-numbers');
      var paginationSlider = $('#news .pagination-slider .progress');
      // $('#news  .slider-holder').trigger('refresh.owl.carousel');
      //append paginaiton numbers
      dotsFrame.html('');
      console.log(activeIndex)
      for (var i = 0; i < items; i++) {
        $(`<li data-index="${i}" class='${i==activeIndex?'active':''}'>
              <span class="fs-12">${i+1}</span>
            </li>`).on('click', function (item) {
          dotsFrame.children('li').removeClass('active');
          $(this).addClass('active');
          $(e.target).trigger('to.owl.carousel', [($(item.target).text() - 1), 500, true])
        }).appendTo(dotsFrame);
      }
      //set pagination slider progressbar 
      paginationSlider.css({
        height: 100 / items + '%',
        top: 100 * activeIndex / items + '%'
      })
    },
    onTranslated: function (e) {
      var items = e.item.count;
      var activeIndex = e.item.index;
      var dotsFrame = $('#news .dot-numbers');
      var paginationSlider = $('#news .pagination-slider .progress');

      //set active index on paginaiton list on change  
      dotsFrame.children('li').removeClass('active');
      dotsFrame.children('li').eq(activeIndex).addClass('active');

      //set pagination slider position on change
      paginationSlider.css({
        top: 100 * activeIndex / items + '%'
      })
    },

  })

  $('.history-carousel').owlCarousel({
    items: 1,
    loop: true,
  })
  //selectbox 
 $(document).on('click','.selectbox .selectbox-value',function (e) {

    var listContainer = $(this).siblings('.selectbox-list');
    if ($(this).hasClass('active')) {
      listContainer.hide();
      listContainer.removeClass('active');
      $(this).removeClass('active');
    } else {
      $('.selectbox .selectbox-value').removeClass('active');
      $('.selectbox .selectbox-value').siblings('.selectbox-list').removeClass('active');
      $('.selectbox .selectbox-value').siblings('.selectbox-list').hide()
      listContainer.show();
      
      listContainer.addClass('active');
      $(this).addClass('active');

    }
  })

  $(document).click(function (e) {
    if (!$(event.target).closest('.selectbox').length) {
      $('.selectbox .selectbox-value').removeClass('active');
      $('.selectbox .selectbox-value').siblings('.selectbox-list').removeClass('active');
      $('.selectbox .selectbox-value').siblings('.selectbox-list').hide()
    }
  })
  $(document).on('click','.selectbox .selectbox-list .value',function () {
    var listContainer = $(this).closest('.selectbox-list');
    var valueHolder = $(this).closest('.selectbox').find('.selectbox-value');
    var valueInput = $(this).closest('.selectbox').find('.selectbox-value-holder');
    valueHolder.find('.value').text($(this).text());
    valueHolder.find('input').val($(this).data('value'));
    $('.selectbox .selectbox-list .value').removeClass('selected');
    $(this).addClass('selected');
    // valueInput.val($(this).attr('data-value'));
    valueHolder.removeClass('active');

    if (valueHolder.find('.value').text().includes('Digər')) {
      $('.another-type-active').fadeIn();
    } else {
      $('.another-type-active').fadeOut();
    }
    valueHolder.addClass('activeSelected');
    listContainer.hide();
    // 
  })

  //news accordion 
  $('#news .accordion-top .accordion-name').click(function () {
    if (!$(this).hasClass('accordion-active')) {
      var indexOfCLicked = parseInt($(this).parent().index()) + 1;
      $('#news .accordion-top .accordion-name').removeClass('accordion-active');
      $(this).addClass('accordion-active');
      $('#news .accordion-bottom .accordion-ul').removeClass('accordion-ul-active');
      $('#news .accordion-bottom .accordion-ul:nth-child(' + indexOfCLicked + ')').addClass('accordion-ul-active');
    }
  })

  //doctor-profile-accordion
  $('#doctor-profile .accordion-items .accordion-title').click(function () {
    var accardionDesc = $(this).next();
    var icon = $(this).find('.title-icon');
    console.log(icon)
    $('#doctor-profile .accordion-items .accordion-title .title-icon i').removeClass('fa-minus').addClass('fa-plus');
    $('#doctor-profile .accordion-items .accordion-desc').slideUp('400');
    if (accardionDesc.css('display') == 'none') {
      icon.find('i').attr('class', 'fas fa-minus');
      accardionDesc.slideDown('400');
    }
  })


  //cv-inputs
  jQuery.fn.extend({
    cvPlusCLick: function cvPlusCLick() {
      $(this).click(function () {
        var element = $(this).closest('.clicked-element')
        var addedMinus=$(this).closest('.education-about').siblings('.education-content')
        var clonedElement = element.find('.added-element').first().find('>:last-child').clone();
        // clonedElement.
        var icon=element.find('.about-icon').clone()
      //  console.log(clonedElement.find('input.cv-input')[1]) 
      clonedElement.find('input').each( function(){
        var elementNumber=$(this).attr('name').match(/\d/g).join('')
        var nextNumber=(parseInt(elementNumber)+1).toString()
       
        $(this).attr('name').replace(elementNumber,nextNumber);
        $(this).val('');
        $(this).attr('name',$(this).attr('name').replace(elementNumber,nextNumber))
      } )
        icon.find('i').attr('class','fas fa-minus');
        console.log(addedMinus)
        element.find('.added-element').first().append(clonedElement);
        addedMinus.find('.row:last-child').css('margin-top','30px');
        addedMinus.find('.row:last-child').append(icon);
      })
    }
  });
  $('#cv .education-about .about-icon i').cvPlusCLick();
  //minus function

  $(document).on('click','.fas.fa-minus',function(){ 
   var thisRow= $(this).closest('.row').prevAll().length;
   $(this).closest('.added-element').find('.row').eq(thisRow).remove();
  })
  //cvInputTypeFile
  $('#cv .cv-file-input').click(function (e) {
    e.preventDefault();
    $('#cv .cv-file-input-none').click();
  })


  /* navbar */

  $('.btn-menu').click(function () {


    if ($(this).hasClass('active')) {
      $('body').addClass('body-scrool')
      $(this).removeClass('active').addClass('responsive')
      $('.menu-links').slideDown();
    } else if ($(this).hasClass('responsive')) {
      $('body').removeClass('body-scrool')
      $(this).removeClass('responsive').addClass('active')
      $('.menu-links').slideUp();
    }
  })


  //dropdown
  if ($(window).width() > 1100) {
    $('.dropdown').hover(function () {
      $(this).find('.dropdown-content').fadeToggle();
    })
    $('.dropdown-content .content').hover(function () {
      $(this).find('.dropdown-sub-content').fadeToggle();
    })


  }
  if ($(window).width() < 1100) {
    $('.dropdown').click(function () {
      if ($(this).hasClass('active')) {
        if (!$(this).find('.content').hasClass('active')) {
          $(this).find('.dropdown-content').fadeOut();
          $(this).removeClass('active');
        }
      } else {
        $('.dropdown').find('.dropdown-content').fadeOut()
        $(this).find('.dropdown-content').fadeIn();
        $(this).addClass('active');
      }

    })
    $('.dropdown-content .content').click(function () {


      if ($(this).hasClass('active')) {
        $('.dropdown').find('.dropdown-sub-content').fadeOut()
        $(this).removeClass('active');
      } else {
        $('.dropdown').find('.dropdown--sub-content').fadeOut()
        $(this).find('.dropdown-sub-content').fadeIn();
        $(this).addClass('active');
      }


    })
  }






  //service hover 
  if ($(window).width() > 1100) {

    $('#services .service').hover(function () {
      if (!$(this).hasClass('medium')) {
        $(this).addClass('diagnostic');
        $(this).find('.featured-item').slideDown();
        $(this).find('.service-icon').slideUp(300);
        $(this).find('.service-title').slideUp(300);
        // return $(this).removeClass('flex').removeClass('flex-col').removeClass('flex-middle').removeClass('flex-center');
      }

    })
    $('#services .service').mouseleave(function () {
      if (!$(this).hasClass('medium')) {
        $(this).removeClass('diagnostic');
        $(this).find('.featured-item').slideUp();
        $(this).find('.service-icon').slideDown(300);
        $(this).find('.service-title').slideDown(300);
      }

    })
  }

  $('[data-fancybox="galleryImage"]').fancybox({

    thumbs: {
      autoStart: true,
    }
  })
  $('#organizations .organization-image').hover(function () {
    $(this).next().toggleClass('organization-active')
  })

  //search input
  $('.search-bar i').click(function () {
    $('.search-bar-element').fadeIn();
  })
  $('.exit-element').click(function (e) {
    $('.search-bar-element').fadeOut();
  })


  //question accordion 
  $('#question .news-content').click(function () {
    $('#question .news-content').find('.question-content').slideUp();
    if ($(this).find('.question-content').css('display') == 'none') {
      $(this).find('.question-content').slideDown();
    } else {
      $(this).find('.question-content').slideUp();
    }


  })

  //form validation 

  $('#form-element-anket').validate({
    rules: {
      'muesse[]': {
        required:true
      },
      name: {
        required: true
      },
      surname: {
        required: true
      },
      number: {
        required: true
      },
      comment: {
        maxlength: 500
      },
      quality: {
        maxlength: 500
      },
      message: {
        maxlength: 500,
        required: true
      },
      email: {
        required: true
      },
    },
  
  })

  //language
  if ($(window).width() > 1100) {
    $('.languages').hover(function () {
      $(this).find('.languages-list').slideToggle();
    })
  } else {
    $('.languages').click(function () {
      $(this).find('.languages-list').slideToggle();
    })
  }
  $('.languages .languages-list li').click(function () {
    console.log($(this).find('a').text());
  });


  //form-submit 

  // $("#form-element").submit(function(e){
  //   e.preventDefault();
  //   var muesse=[]['name'];
  //   $("input[name='muesse[]['name']']").each(function() {
  //     console.log($(this).val())
  //     // muesse.push([])
  //   });
  //  console.log(muesse)
  // })

})
