(function($){ 

	"use strict";

	/*=========================================================================

    When window load finish, loader will fadeout / hide

	=========================================================================*/

	$(window).on('load', function() {

        $('.cs-loader').fadeOut();

    });



    /*=========================================================================

    Typed plugin Active

	=========================================================================*/	

	$("#typed1 .typed").typed({

	    strings: ["Website under the construction!", "Stay tune for a while...", "Subscribe to get our latest offer!"],

	    typeSpeed: 120,

	    cursorChar: "|",

	    loop: true

	});



	

	$('.message').on('click', function(){

		$('.contact').addClass('opencontact');

	});





	$('.close a').on('click', function(){

		$('.contact').removeClass('opencontact');

		$('p.notif').text("").fadeOut();

	});



	/*=========================================================================

    Email Validation

	=========================================================================*/

	function isValidEmailAddress(emailAddress) {

		    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

		    return pattern.test(emailAddress);

	};



	

	/*=========================================================================

    Form Contact Validation

	=========================================================================*/

	$('#form1').on('submit', function(){

		var check = false;

		var name = $('#fname').val();

		var email = $('#femail').val();

		var message = $('#fmessage').val();



		//check name field

		if (name == ""){

			$('p.notif').text("Field name cannot be empty!").fadeIn();

			check = false;

			return false;

		}else{

			check = true;

		}



		//check email field

		if (email == ""){

			$('p.notif').text("Field email cannot be empty!").fadeIn();

			check = false;

			return false;

		}else{

			if( !isValidEmailAddress( email ) ) {

				$('p.notif').text("Email must be correct format!").fadeIn();

				check = false;

				return false;

			}else{

				check = true;

			}

		}



		//check message field

		if (message == ""){

			$('p.notif').text("Field message cannot be empty!").fadeIn();

			check = false;

			return false;

		}else{

			check = true;

		}



		if (check == true){

			$("#btncontactsend").prop('disabled', true);

			$("#btncontactsend").prop('value', 'Sending in progress...'); 

			$.ajax({

				type: "POST",

				url: "postcontact.php",

				data: $('#form1').serialize(),

				success: function(data){

					$('p.notif').html('<label>'+ data +'</label>').fadeIn();

					$("#btncontactsend").prop('disabled', false);

					check = false;

					name = $('#fname').val("");

					email = $('#femail').val("");

					message = $('#fmessage').val("");

					$("#btncontactsend").prop('value', 'SEND'); 

				}

			});

			return false;

		}



	});



	/*=========================================================================

    Form Subscribe validation

	=========================================================================*/

	

	$('#formsubscribe').on('submit', function(){

		var check = false;

		var email = $('#semail').val();



		//check email field

		if (email == ""){

			$('p.notifsubscribe').text("Field email cannot be empty!").fadeIn();

			check = false;

			return false;

		}else{

			if( !isValidEmailAddress( email ) ) {

				$('p.notifsubscribe').text("Email must be correct format!").fadeIn();

				check = false;

				return false;

			}else{

				check = true;

			}

		}



		if (check == true){

			$("#btnsubscribe").prop('disabled', true);

			$("#btnsubscribe").prop('value', 'Sending in progress...'); 

			$.ajax({

				type: "POST",

				url: "postsubscriber.php",

				data: "semail=" + email,

				success: function(data){		

					$('p.notifsubscribe').html('<label>'+ data +'</label>').fadeIn();

					$("#btnsubscribe").prop('disabled', false);

					check = false;

					email = $('#semail').val("");

					$("#btnsubscribe").prop('value', 'SUBSCRIBE NOW'); 

				}

			});

			return false;

		}

	});



	/*=========================================================================

    Slider on index2.html

	=========================================================================*/

	$('.bxslider').bxSlider({

	  mode: 'fade',

	  controls: false,

	  pager: false,

	  captions: false,

	  auto: true,

	  pause: 8000

	});



	/*=========================================================================

    Count Down Timer

	=========================================================================*/

	var countDownDate = new Date("Aug 5, 2018 08:37:25").getTime();

	// Update the count down every 1 second

	var x = setInterval(function() {



	    // Get todays date and time

	    var now = new Date().getTime();

	    

	    // Find the distance between now an the count down date

	    var distance = countDownDate - now;

	    

	    // Time calculations for days, hours, minutes and seconds

	    var days = Math.floor(distance / (24 * 60 * 60 * 24));

	    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

	    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

	    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	    

	    // Output the result in an element with id="demo"

	    document.getElementById("timer").innerHTML = "<div class=\"box\"><label id=\"day\" class=\"dinamic\">" + days + "</label> <label class=\"static\">Days</label> </div>" + "<div class=\"box\"><label id=\"hour\" class=\"dinamic\">" +hours + "</label> <label class=\"static\">Hour </label></div>" + " <div class=\"box\"><label id=\"minutes\" class=\"dinamic\"> " + minutes + "</label> <label class=\"static\">Minutes</label> </div>" + "<div class=\"box\"><label id=\"day\" class=\"dinamic\">" + seconds + "</label> <label class=\"static\">Second</label></div> ";

	    

	    // If the count down is over, write some text 

	    if (distance < 0) {

	        clearInterval(x);

	        document.getElementById("timer").innerHTML = "EXPIRED";

	    }

	}, 1000);



	/*=========================================================================

    Creative background on index3.html

	=========================================================================*/

    var movementStrength = 25;

    var height = movementStrength / $(window).height();

    var width = movementStrength / $(window).width();

    $(".main3").mousemove(function(e){

        var pageX = e.pageX - ($(window).width() / 2);

        var pageY = e.pageY - ($(window).height() / 2);

        var newvalueX = width * pageX * -1 - 25;

        var newvalueY = height * pageY * -1 - 50;

        $('.main3').css("background-position", newvalueX+"px     "+newvalueY+"px");

    });





})(jQuery);

