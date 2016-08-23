(function () {
    'use strict';

    function validateForm(e) {
        e.preventDefault();
        var $name_input = $('#name'),
            $name_val = $name_input.val(),
            $email_input = $('#email'),
            $email_val = $email_input.val(),
            $tel_input = $('#phone'),
            $tel_val = $tel_input.val(),
            $info_input = $('#msg'),
            $info_val = $info_input.val(),
            $error_msg = $('#error-msg'),
            $form_wrapper = $('.formular'),
            invalid_email;

        if ($name_val === '') {
            $name_input.prev('label').text('Jméno a příjmení: (prosím vyplňte jméno)').addClass('validation-error');
        } else {
            $name_input.prev('label').text('Jméno a příjmení:').removeClass('validation-error');
        }
        invalid_email = !$email_val.match(/^[\-a-z0-9~!$%\^&*_=+}{\\'?]+(\.[\-a-z0-9~!$%\^&*_=+}{\\'?]+)*@([a-z0-9_][\-a-z0-9_]*(\.[\-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);

        if (invalid_email) {
            $email_input.prev('label').text('E-mail: (prosím zadejte platný e-mail)').addClass('validation-error');
        } else {
            $email_input.prev('label').text('E-mail:').removeClass('validation-error');
        }

        if ($tel_val === '') {
            $tel_input.prev('label').text('Telefon: (prosím vyplňte své telefonní číslo)').addClass('validation-error');
        } else {
            $tel_input.prev('label').text('Telefon:').removeClass('validation-error');
        }

        if ($name_val !== '' && !invalid_email && $tel_val !== '') {
            $.ajax({
                method: "POST",
                url: '/send',
                data: {
                    name: $name_val,
                    email: $email_val,
                    tel: $tel_val,
                    msg: $info_val
                },
                error: function () {
                    $error_msg.text('Omlouváme se, při odesílání došlo k chybě, zkuste to prosím znovu. Pokud by chyba přetrvávala tak to zkuste později nebo využijte objednání po telefonu.');
                },
                success: function () {
                    $form_wrapper.html('<span>Děkujeme, formulář byl úspěšně odeslán. Naše sestřička vás bude brzy kontaktovat pro domluvení termínu Vaší návštěvy.');
                }
            });
        }
    }

    $('#form-submit').on('click', validateForm);
}());
