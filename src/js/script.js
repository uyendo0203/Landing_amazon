function isValidForm(form) {
    isValid = true;
    var REX_IS_NUMBER = new RegExp('^[0-9]*$');
    var REX_LOWERCASE = new RegExp('(?=.*[a-z])');
    var REX_UPPERCASE = new RegExp('(?=.*[A-Z])');
    var REX_NUMBER = new RegExp('(?=.*[0-9])');
    var REX_SPECIAL = new RegExp('(?=.[!@#\$%\^&])');
    var REX_INTERGER = new RegExp('^[0-9]*$');
    var REX_PHONE = new RegExp('^(0|84)[0-9]*$');
    var REX_EMAIL = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var REX_URL = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i);

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
    new WOW().init();
    $('.loading').removeClass('active')

    Menu()
    OpenMenu()
    CloseMenu()

    Block8Slider()
    PopupNews()

    // questionForm()
});

$(window).on("resize", function () {

});

$(window).on('scroll', function () {
    activeItemMenu()
});

function goToByScroll(echo) {
    $('html,body').animate({
        scrollTop: $("#" + echo).offset().top,
    }, 'slow');
}
let Menu = function () {
    $('.menu__absolute a').click(function (e) {
        e.preventDefault();

        $('.menu__absolute a').removeClass('active');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active')
        }

        goToByScroll($(this).attr('link'));

        let name = $(this).attr('name');
        $('.menu__dots_text').text(name)

    })


    $('.menu__dots_circle a').click(function (e) {
        e.preventDefault();

        $('.menu__dots_circle a').removeClass('active');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active')
        }

        $('.menu__absolute a').removeClass('active');
        $('.menu__absolute a[link="' + $(this).attr('link') + '"]').addClass('active')

        goToByScroll($(this).attr('link'));

        let name = $(this).attr('name');
        $('.menu__dots_text').text(name)

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
    $('.menu__absolute .close').click(function () {
        $('.menu__text_toggle').removeClass('active')
        if ($('.menu__absolute').hasClass('active')) {
            $('.menu__absolute').removeClass('active')
        } else {
            $('.menu__absolute').addClass('active')
        }
    })
}
var sections = $('section')
    , nav = $('.menu__absolute-list')
    , nav_dots = $('.menu__dots_circle')
    , nav_height = nav.outerHeight();

function activeItemMenu() {
    var cur_pos = $(this).scrollTop();

    sections.each(function () {
        var top = $(this).offset().top - 50,
            bottom = top + $(this).outerHeight();

        if (cur_pos >= top && cur_pos <= bottom) {
            nav.find('a').removeClass('active');
            nav_dots.find('a').removeClass('active');
            sections.removeClass('active');

            $(this).addClass('active');
            nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            nav_dots.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
    });
}

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

let Block8Slider = function () {
    if ($(".block8__slider").length === 0) {
        return false
    }

    $(".block8__slider").slick({
        arrows: false,
        dots: true,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });
}

let PopupNews = function () {
    $(".popup-news__close").on("click", function () {
        $(".popup-news").removeClass("active");
    });
}


let questionForm = function () {
    // let data = $('#question-data').val()
    console.log(1, dataQuestion);

    // is_orther: 1: yes, 0: no
    // is_required: 1: yes, 0: no
    // type: 1: text, 2: image, 3: radio, 4: checkbox, 5: selected

    let type = function () {
        let html = null;
        if (type == 1) {
            html = `<input type="text" class="question--input" />`
        } else if (type == 2) {
            `<img src="" />`
        } else if (type == 3) {
            html = `
                <div class="radio">
                    <input type="radio" id="male" name="gender" value="male">
                    <label for="male">Male</label>
                </div>
                `

        } else if (type == 3) {
            html = `
                <div class="checkbox">
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                    <label for="vehicle1"> I have a bike</label>
                </div>
                `

        } else {
            html = `
                <select class="select">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="vw">VW</option>
                    <option value="audi" selected>Audi</option>
                </select>
                `
        }
        return html
    }

    let question_item = function (title, type) {
        let item = `<div class="question--item">
        <label class="question--label">`+ title + `</label>
        `+ type(type) + `         
        </div>`
        console.log({ item });
        return item
    }

    for (let i = 0; i < dataQuestion.length; i++) {
        const question = dataQuestion[i];

        console.log(question);

        question_item(question.title, question.type)

    }


    // $('.question--form')

}