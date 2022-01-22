$(document).ready(function() {
    $(".mobileBtn").click(function(){
        $("body").addClass('openNav');
    });
    $(".overLay").click(function(){
        $("body").removeClass('openNav');
    });
});

if($(window).width() < 1200) {
	$(".hasChild").click(function(){
		if (!$(this).hasClass('openSubMenu')) {
			$(this).addClass('openSubMenu');
			$(this).find('.subMenu').slideDown();
		} else {
			$(this).removeClass('openSubMenu');
			$(this).find('.subMenu').slideUp();
		}
		
	});
}

$(".filterCraptType").click(function(){
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $(this).addClass('active');
    }
});

$(".tabNav li").click(function(){
    $(".tabNav li").removeClass('active');
    $(this).addClass('active');
});

$("body").on('click', '.colorCheck', function(){
    $(this).toggleClass('active');
});
/*$(".productList").on('click', '.colorCheck', function(){
    $(this).toggleClass('active');
});
*/

if($(window).width() < 768) {
    $(window).scroll(function(){
        var sticky = $('.callIcon');
        var scroll = $(window).scrollTop();
        if (scroll >= 1 ) {
            sticky.addClass('fixed');
        } else {
            sticky.removeClass('fixed');
        }
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 70) {
           sticky.css("bottom","65px");
        } else {
            sticky.css("bottom","");
        }
    });
}

$(".searchBtn .icon").click(function(){
  if($(this).parents('.header').hasClass('openSearch')) {
    $(".header").removeClass('openSearch');
  } else {
    $(".header").addClass('openSearch');
    $(".searchBlock input").focus();
  }
});

$(".searchLink").click(function(){
  $(".mobileSearchBlock").show();
  $("body").removeClass('openNav');
});
$(".searchBack").click(function(){
  $(".mobileSearchBlock").hide();
});


$('#homeBanner').owlCarousel({
    loop:true,
    nav:true,
    autoplay: true,
    autoplayTimeout:10000,
    autoplayHoverPause: true,
    margin:0,
    nav: true,
    navText: ["<span class='icon icon-l-arrow'></span><span class='text'>PREV</span>","<span class='icon icon-r-arrow'></span><span class='text'>NEXT</span>"],
    responsive:{
        0:{
            items:1
        }
    }
});

$('#productSlider').owlCarousel({
    loop:true,
    onInitialized  : counter,
    onTranslated : counter, 
    nav:true,
    autoplay: true,
    autoplayTimeout:10000,
    autoplayHoverPause: true,
    margin:0,
    nav: true,
    //touchDrag:false,
    //mouseDrag:false,
    navText: ["<span class='icon icon-l-arrow'></span>","<span class='icon icon-r-arrow'></span>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1024:{
            items:4
        }
    }
});
$('#productSliderB').owlCarousel({
    loop:true,
    onInitialized  : counter,
    onTranslated : counter, 
    nav:true,
    autoplay: true,
    autoplayTimeout:10000,
    autoplayHoverPause: true,
    margin:0,
    nav: true,
    //touchDrag:false,
    //mouseDrag:false,
    navText: ["<span class='icon icon-l-arrow'></span>","<span class='icon icon-r-arrow'></span>"],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1024:{
            items:4
        }
    }
});

/*$('#washingCarpetSlider').owlCarousel({
    loop:true,
    onInitialized  : counter, //When the plugin has initialized.
    onTranslated : counter, //When the translation of the stage has 
    nav:true,
    autoplay: true,
    autoplayTimeout:10000,
    autoplayHoverPause: true,
    margin:0,
    nav: true,
    //touchDrag:false,
    //mouseDrag:false,
    navText: ["<span class='icon icon-l-arrow'></span>","<span class='icon icon-r-arrow'></span>"],
    responsive:{
        0:{
            items:1
        }
    }
});*/
function counter(event) {
    var element = event.target; 
    var items = event.item.count;
    var item = event.item.index + 1;
    if(item > items) {
        item = item - items
    }
    if (event.target.id == "washingCarpetSlider") {
        $('.washngSlideCount').html("<span>0"+item+"</span>/0"+items);    
    } else if (event.target.id == "testmonialSlider") {
        $('.testmonialSlideCount').html("<span>0"+item+"</span>/0"+items);    
    } else {
        $('#'+event.target.id).parent().find('.productSlideCount').html("<span>0"+item+"</span>/0"+items);    
    }
    
}
/*$('#testmonialSlider').owlCarousel({
    loop:true,
    onInitialized  : counter, //When the plugin has initialized.
    onTranslated : counter, //When the translation of the stage has 
    nav:true,
    autoplay: true,
    autoplayTimeout:10000,
    autoplayHoverPause: true,
    margin:0,
    nav: true,
    //touchDrag:false,
    //mouseDrag:false,
    navText: ["<span class='icon icon-l-arrow'></span>","<span class='icon icon-r-arrow'></span>"],
    responsive:{
        0:{
            items:1
        }
    }
});*/


$(window).scroll(function(){
    var sideStickyBtn = $('.side-sticky-btn'),
        scroll = $(window).scrollTop();

    if (scroll >= 300) sideStickyBtn.addClass('show');
    else sideStickyBtn.removeClass('show');
});


/*washing slider*/
var data = [
   {
       "icon":"washing-carpets.svg",
       "heading":"Washing carpets",
       "content":"We at Jansons wash carpets professionally with perfection. The repair and restoration of carpets is truly one of our greatest passions."
   },
   {
       "icon":"carpet-on-sale.svg",
       "heading":"Carpet on sale",
       "content":"We at jansons sell high quality handmade carpets with all it's originality and value. We offer a huge range of carpets."
   },
   {
       "icon":"carpet-repairing.svg",
       "heading":"Carpet repairing",
       "content":"We at Jansons provide long life to your carpet with complete beauty as well as originality. We relieve all your worries towards your carpet"
   },
   {
       "icon":"customised-carpets.svg",
       "heading":"Customised carpets",
       "content":"We also provide customised solutions to our esteemed clients, we make carpet as per clients color combination and design as per their need"
   }
];
$('#washingCarpetSlider').on('initialized.owl.carousel changed.owl.carousel', function(e) {
   if (!e.namespace)  {
     return;
   }
   var carousel = e.relatedTarget;
  
   if(carousel.relative(carousel.current()) == undefined){
      var counter = 0;
   } else {
      var counter = carousel.relative(carousel.current());
   }

   //html("<span>0"+item+"</span>/0"+items);
    $('.washngSlideCount').html("<span>0" + (carousel.relative(carousel.current()) + 1) + '</span>/0' + carousel.items().length);

    $('.sliderText').attr("data-count",counter).addClass('fadeAni');
    setTimeout(function(){
      $('.sliderText img').attr("src", "src/static/img/" + data[counter].icon);  
      $('.sliderText h3').text(data[counter].heading);
      $('.sliderText p').text(data[counter].content);
      $('.sliderText').removeClass('fadeAni');
    },500);
 
 }).owlCarousel({
   items: 1,
   loop:true,
   margin:0,
   nav:true,
   navText: ["<span class='icon icon-l-arrow'></span>","<span class='icon icon-r-arrow'></span>"],
 });

 $('#testmonialSlider').on('initialized.owl.carousel changed.owl.carousel', function(e) {
   if (!e.namespace)  {
     return;
   }
   var carousel = e.relatedTarget;
   $('.testmonialSlideCount').html("<span>0" + (carousel.relative(carousel.current()) + 1) + '</span>/0' + carousel.items().length);
 }).owlCarousel({
   items: 1,
   loop:true,
   margin:0,
   nav:true,
   navText: ["<span class='icon icon-l-arrow'></span>","<span class='icon icon-r-arrow'></span>"],
 });










//popupbox
$(".side-sticky-btn, .contactLink").click(function(){
  $(".popUp").fadeIn().addClass('openPoup');
});
$(".popUp .bgLayer, .popUpClose").click(function(){
  $(".popUp").removeClass('openPoup').fadeOut();
});

$(".contactLink").click(function(){
  if($("body").hasClass('openNav')) {
    $("body").removeClass('openNav');
  }
});



 //custome form validation
var rejexEmail = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
var numbers = /^[0-9]+$/;
$(".customeForm .input").change(function(){
  var $this = $(this);
  formValidation($this);
  //formSubmit();
});
$(".customeForm .input").keydown(function(){
  var $this = $(this);
  setTimeout(function(){
    formValidation($this);
    //formSubmit();
  }, 100);
});
function formValidation($this) {
  if ($this.attr('data-type') == 'email') {
    if (rejexEmail.test($this.val())) {
      $this.parent().find('.error').hide();
    } else {
      $this.parent().find('.error').show();
    }
  } else if ($this.attr('data-type') == 'number') {
    if ($this.val().length == 10 && numbers.test($this.val())) {
      $this.parent().find('.error').hide();
    } else {
      $this.parent().find('.error').show();
    }
  } else {
    if ($this.val() !== '') {
      $this.parent().find('.error').hide();
    } else {
      $this.parent().find('.error').show();
    }
  }
}
$(".customeForm .input").focusout(function(){
  if ($(this).val() !== '') {
    $(this).parent().addClass('fill');
  } else {
    $(this).parent().removeClass('fill');
  }
});

$(".customeForm .submitBtn").click(function(){
  console.log('clcik');
  $(".customeForm .required").each(function(){
    if ($(this).find('.input').val() == '') {
      $(this).find('.error').show();
    } else {
      $(this).find('.error').hide();
    }
  });
});


var cites = [
      {cityName:"Ajmer"},
      {cityName:"Agra"},
      {cityName:"Jaipur"},
      {cityName:"Pune"},
      {cityName:"Gurgon"},
      {cityName:"Udipur"},
      {cityName:"Amritsar"},
      {cityName:"Goa"},
      {cityName:"Delhi"},
      {cityName:"Faridabad"}
      ];
for (var i = cites.length - 1; i >= 0; i--) {
  $(".dataList").append('<li>'+cites[i].cityName+'</li>');
}
$(".selectCity .input").focus(function(){
  $(".popUpContainer").animate({
        scrollTop: $(this).offset().top - 10
    }, 1000);
});
$(".selectCity .input").focusout(function(){
  setTimeout(function(){
    $(".dataList").hide();
  }, 200);
});
$(".selectCity .input").keyup(function(){
  var keyValue = $(this).val().toLowerCase();
  if (keyValue == "") {
    $(".dataList").hide();
  } else {
    $(".dataList").show();
    $(".dataList li").filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(keyValue) > -1);
    });
  }
});
$(".dataList").on('click','li',function(){
  $(".selectCity .input").val($(this).text());
  $(".dataList").hide();
});
