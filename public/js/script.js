
$('#btnRegister').on('click', (e) => {
    e.preventDefault();

    let username = $('input[name=username]').val();

    let email = $('input[name=email]').val();

    let password = $('input[name=password]').val();

    let fullname = $('input[name=fullname]').val();

    let confirmPassword = $('input[name=confirmPassword]').val();

    if (username == '' || password == '' || confirmPassword == '') {
        if (username == '') {
            $('#danger1').css("display", "block");
        } else {
            $('#danger1').css("display", "none");
        }

        if (password == '') {
            $('#danger2').css("display", "block");
        } else {
            $('#danger2').css("display", "block");
        }

        if (confirmPassword == '') {
            $('#danger3').css("display", "block");
        } else {
            $('#danger3').css("display", "block");
        }
        return;
    }

    $.ajax({
        url: 'api/register',
        method: 'POST',
        data: {
            username: username,
            email: email,
            password: password,
            fullname: fullname,
            confirmPassword: confirmPassword
        }
    }).done((result) => {
        console.log(result);
        if (result.usernameExists) {
            console.log(result.usernameExists);
            $('#danger1_1').css("display", "block");
            $('#failUsername').text(result.username);
            return;
        }
        $('#danger1_1').css("display", "none");
        $('#failUsername').css("display", "none");

        if (result.requestConfirmPwd) {
            $('#danger4').css("display", "block");
            $('#danger3').css("display", "none");
            return;
        }
        window.location.href = '/test2/userlist';
    });


});

$('#btnLogin').on('click', (e) => {
    e.preventDefault();

    let username = $('input[name=username]').val();

    let password = $('input[name=password]').val();

    if (username == '' || password == '') {
        if (username == '') {
            $('#loginDanger1').css("display", "block");
        } else {
            $('#loginDanger1').css("display", "none");
        }

        if (password == '') {
            $('#loginDanger2').css("display", "block");
        } else {
            $('#loginDanger2').css("display", "block");
        }
        return;
    }

    $.ajax({
        url: 'api/login',
        method: 'POST',
        data: {
            username: username,
            password: password
        }
    }).done((result) => {
        window.location.href = '/test2/userlist';
    });

});

$('#btnSearch').on('click', (e) => {
    e.preventDefault();

    let searchUsername = $('input[name=searchUser]').val();
    console.log(searchUsername);
    $.ajax({
        url: 'api/userlist',
        method: 'POST',
        data: {
            username: searchUsername
        }
    });
});

$('#btnGenerate').on('click', (e) => {
    e.preventDefault();

    var pascaltriangle = $('input[name=pascaltriangle]').val();

    $.ajax({
        url: 'test1/api/generate',
        method: 'POST',
        data: {
            pascaltriangle: pascaltriangle
        }
    }).done((result) => {
        console.log(result);
    });
});