function isValidForm(form) {
    isValid = true;

    form.forEach(function (input) {
        var value = $(input.name).val();
        input.validators.forEach(function (validator) {
            switch (validator) {
                case 'required':
                    if (value === '') {
                        isValid = false;
                    }
                    break;
                case 'isNumber':
                    if (REX_IS_NUMBER.test(value) === false) {
                        isValid = false;
                    }
                    break;
                case 'min':
                    if (+value < input.min) {
                        isValid = false;
                    }
                    break;
                case 'max':
                    if (+value > input.max) {
                        isValid = false;
                    }
                    break;
                case 'minLength':
                    if (value.length < input.minLength) {
                        isValid = false;
                    }
                    break;
                case 'maxLength':
                    if (value.length > input.maxLength) {
                        isValid = false;
                    }
                    break;
                case 'email':
                    if (REX_EMAIL.test(value) === false) {
                        isValid = false;
                    }
                    break;
            }
        });
    });

    return isValid;
}
function validateForm($submit, form) {

    function updateView() {
        $($submit).attr("disabled", !isValidForm(form));
    }

    var arrElement = [];
    form.forEach(function (element) {
        arrElement.push(element.name);
    });

    $(arrElement.join(",")).on("change keyup", function () {
        updateView();
    });
    updateView();
}
$(window).on("load", function () {

    var REX_IS_NUMBER = new RegExp('^[0-9]*$');
    var REX_LOWERCASE = new RegExp('(?=.*[a-z])');
    var REX_UPPERCASE = new RegExp('(?=.*[A-Z])');
    var REX_NUMBER = new RegExp('(?=.*[0-9])');
    var REX_SPECIAL = new RegExp('(?=.[!@#\$%\^&])');
    var REX_INTERGER = new RegExp('^[0-9]*$');
    var REX_PHONE = new RegExp('^(0|84)[0-9]*$');
    var REX_EMAIL = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var REX_URL = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i);

    new WOW().init();
    $('.loading').removeClass('active')
    Menu()
    OpenMenu()
    CloseMenu()
});

$(window).on("resize", function () {

});

$(window).on('scroll', function () {
    activeItemMenu()
});

let PopupValidateForm = function () {
    var form = [{
        name: '.PopupName',
        validators: ['required']
    }, {
        name: '.PopupPhone',
        validators: ['required', 'isNumber', 'minLength', 'maxLength'],
        minLength: 10,
        maxLength: 10,
    }, {
        name: '.PopupEmail',
        validators: []
    }, {
        name: '.PopupNote',
        validators: []
    }]
    var $submit = ".popup__button button";
    validateForm($submit, form);
}

function goToByScroll(echo) {
    $('html,body').animate({
        scrollTop: $("#" + echo).offset().top,
    }, 'slow');
}

let Menu = function () {
    $('.menu__nav-item a').click(function (e) {
        e.preventDefault();

        let link = $(this).attr('link')

        $('.menu__nav-item a').removeClass('active');
        $('.menu__nav-item a[link="' + link + '"]').addClass('active');


        if (link != '' && link != undefined) {
            goToByScroll(link);
        }
    })
}

let OpenMenu = function () {
    $('.menu__text_toggle').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            $('.menu__absolute').removeClass('active')
        } else {
            $(this).addClass('active')
            $('.menu__absolute').addClass('active')
        }
    })
}
let CloseMenu = function () {
    $('.menu__toggle_close').click(function () {
        $('.menu__text_toggle').removeClass('active')
        if ($('.menu__absolute').hasClass('active')) {
            $('.menu__absolute').removeClass('active')
        } else {
            $('.menu__absolute').addClass('active')
        }
    })
}


var sections = $('section')
    , nav = $('.menu__absolute')
    , nav_height = nav.outerHeight();



function activeItemMenu() {
    var cur_pos = $(this).scrollTop();

    sections.each(function () {
        var top = $(this).offset().top - 50,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            sections.removeClass('active');

            $(this).addClass('active');
            nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
    });
}