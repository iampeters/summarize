$(() => {
    $('#contact-form').on('submit', (e) => {
        var username = $('#username').val(),
            email = $('#email').val(),
            password = $('#password').val();
        
            //Ajax request
            $.ajax({
                type: 'post',
                url: '/register',
                data: {
                    username: username,
                    email: email,
                    password: password
                }
            }).done((data) => {
                $('#username').val('')
                $('#email').val('')
                $('#password').val('')
                $('#reg').hide();

                window.location = `profile/${data}`;
                
                // $('form').hide()

                // var tag = '<li>Thanks for signing up</li> <br>'
                //     tag += `<li>Your username is ${data.username}</li> <br>`
                //     tag += `<li> Your password is ${data.password} </li>`
                //     tag += '<br><a href="/signin" class="btn btn-primary">Sign in</a>'

                // $('#reg').prepend(tag)
                // $('#reg').fadeIn(600)
            })
        
        return false
    })

    //login
    $('#login').on('submit', (e) => {

        // return false;
    })
})