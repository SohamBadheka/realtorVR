$(document).ready(function() {
	
    $('#password').keyup(function() {
        // keyup code here
        var password = $(this).val();
		var userId = $('#userId').val();
		var length=0;
		var letter=0;
		var capital=0;
		var number=0;
		var special=0;
		var space = 1;
		var userIdMatch=1;
	//validate the length
        if ( password.length < 7 ) {
            $('#length').removeClass('valid').addClass('invalid');
			length=1;
        } else {
            $('#length').removeClass('invalid').addClass('valid');
			length=0;
        }
    
	//validate one low case letter
        if ( password.match(/[a-z]/) ) {
            $('#letter').removeClass('invalid').addClass('valid');
			letter =1;
        } else {
            $('#letter').removeClass('valid').addClass('invalid');
			letter=0;
        }

	//validate upper case letter
        if ( password.match(/[A-Z]/) ) {
            $('#capital').removeClass('invalid').addClass('valid');
			capital=1;
        } else {
            $('#capital').removeClass('valid').addClass('invalid');
			capital=0;
        }

	//validate number
        if ( password.match(/\d/) ) {
            $('#number').removeClass('invalid').addClass('valid');
			number=1;
        } else {
            $('#number').removeClass('valid').addClass('invalid');
			number=0;
        }
		
	//special character
        if ( password.match(/[!#$%]/) ) {
            $('#special').removeClass('invalid').addClass('valid');
			special=1;
        } else {
            $('#special').removeClass('valid').addClass('invalid');
			special=0;
        }
	
	//space validation
		if ( password.match(/\ /) ) {
            $('#space').removeClass('valid').addClass('invalid');
			space=0;
        } else {
            $('#space').removeClass('invalid').addClass('valid');
			space=1;
        }
		
	//validate check with username
		if(password==userId){
            $('#userIdMatch').removeClass('valid').addClass('invalid');
			userIdMatch=0;
        } else {
            $('#userIdMatch').removeClass('invalid').addClass('valid');
			userIdMatch=1;
        }
		
		var total = length+letter+capital+number+special+space+userIdMatch;
		if(total<=3)
		{
			document.getElementById("low").style.display = "block";
			document.getElementById("medium").style.display = "none";
			document.getElementById("high").style.display = "none";
		}
		else if(total>3 && total<=5)
		{
			document.getElementById("low").style.display = "none";
			document.getElementById("medium").style.display = "block";
			document.getElementById("high").style.display = "none";
		}
		else
		{
			document.getElementById("low").style.display = "none";
			document.getElementById("medium").style.display = "none";
			document.getElementById("high").style.display = "block";
		}
		
    }).focus(function() {
        $('#pswd_info').show();
    }).blur(function() {
        $('#pswd_info').hide();
    });
	
    $("#vPassword").keyup(function () {
        var password = $('#password').val();
        console.log(password)
        var vPassword = $('#vPassword').val();
			console.log(vPassword)
        if(password == vPassword){
            $('#validate_stat').removeClass('invalid').addClass('valid').text("Password matches");
        } else {
            $('#validate_stat').removeClass('valid').addClass('invalid').text("Password does not matches");
        }
    }).focus(function() {
        $('#validate_stat').show();
    }).blur(function() {
        $('#validate_stat').hide();
    });

    $("#email").focus(function() {
        var email = $('#email').val();
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if(regex.test(email)) {
            $('#validate_email').removeClass('invalid').addClass('valid').text("Email Valid");
        } else{
            $('#validate_email').removeClass('valid').addClass('invalid').text("Email invalid");

        }
    }).focus(function() {
        $('#validate_email').show();
    }).blur(function() {
        $('#validate_email').hide();
    });

});