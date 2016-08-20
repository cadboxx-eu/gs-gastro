(function () {
    'use strict';

    function validateForm(e) {
        e.preventDefault();
        var $name_input = $('#name'),
            $email_input = $('#email'),
            $tel_input = $('#phone'),
            $info_input = $('#msg'),
            invalid_email;

        if ($name_input.val() === '') {
            $name_input.prev('label').text('Jméno a příjmení: (prosím vyplňte jméno)').addClass('validation-error');
        } else {
            $name_input.prev('label').text('Jméno a příjmení:').removeClass('validation-error');
        }
        invalid_email = !$email_input.val().match(/^[\-a-z0-9~!$%\^&*_=+}{\\'?]+(\.[\-a-z0-9~!$%\^&*_=+}{\\'?]+)*@([a-z0-9_][\-a-z0-9_]*(\.[\-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);

        if (invalid_email) {
            $email_input.prev('label').text('E-mail: (prosím zadejte platný e-mail)').addClass('validation-error');
        } else {
            $email_input.prev('label').text('E-mail:').removeClass('validation-error');
        }

        if ($tel_input.val() === '') {
            $tel_input.prev('label').text('Telefon: (prosím vyplňte své telefonní číslo)').addClass('validation-error');
        } else {
            $tel_input.prev('label').text('Telefon:').removeClass('validation-error');
        }

        if ($name_input !== '' && !invalid_email && $tel_input.val() !== '') {
            $.ajax({
                method: "POST",
                url: '/send',
                data: {
                    name: $name_input.val(),
                    email: $email_input.val(),
                    tel: $tel_input.val(),
                    msg: $info_input.val()
                }
            });
        }
    }

    $('#form-submit').on('click', validateForm);
}());
