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

    $('.loading').removeClass('active')

    new WOW().init();
    selectOptionCustom()

    Menu()
    OpenMenu()
    CloseMenu()

    Block8Slider()
    PopupNews()

    questionForm()
});

$(window).on("resize", function () {

});

$(window).on('scroll', function () {
    activeItemMenu()
});
let selectOptionCustom = function () {
    $('.form-select').addClass('no-select')
    $('.form-select').change(function () {
        // console.log($(this).val());
        let value = $(this).val()
        if (value == '' || value == 0) {
            $(this).addClass('no-select')
        } else {
            $(this).removeClass('no-select')
        }
    })
}
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
    console.log({ dataQuestion });
    $('.question--form').html('')
    // is_orther: 1: yes, 0: no
    // is_required: 1: yes, 0: no
    // type: 
    // 1: text, 
    // 2: image, 
    // 3: radio, 
    // 4: checkbox, 
    // 5: selected

    let result = null, array = []

    for (let i = 0; i < dataQuestion.length; i++) {
        const question = dataQuestion[i];
        let stringQuestion = JSON.stringify(question)

        switch (question.type) {
            case 2: //image
                result = ` <div class="question--item" >
                    <span class="hidden d-none">` + stringQuestion + ` </span>
                    <label class="question--label">`+ question.title + `</label>
                    <div class="question--input-file">
                        <span class="text">Tải lên</span>
                        <input type="file" data-field="">
                    </div>
                    <div class="question--image-list">
                        <div class="question--image">
                            <img class="" src="https://via.placeholder.com/280x270">
                        </div>
                        <div class="question--image">
                            <img class="" src="https://via.placeholder.com/280x270">
                        </div>
                    </div>
                </div>`
                break;

            case 3://radio
                let radios = '';
                for (let j = 0; j < question.option.length; j++) {
                    const label = question.option[j];
                    radios += ` <div class="question--radio">
                            <input name=`+ question.title.replaceAll(' ', '_') + `  type="radio" id=` + 'radio_' + j + '' + i + ` data-label=` + label.replaceAll(' ', '_') + `>
                           <label for=`+ 'radio_' + j + '' + i + `>` + label + `</label>
                        </div>`
                }
                result = ` <div class="question--item">
                        <span class="hidden d-none">` + stringQuestion + ` </span>
                        <span class="data-field d-none"></span>
                        <label class="question--label">`+ question.title + `</label>
                        `+ radios + `
                </div>`
                break;

            case 4://checkbox
                let checkboxs = '';
                for (let j = 0; j < question.option.length; j++) {
                    const label = question.option[j];
                    checkboxs += ` <div class="question--checkbox" data-number=` + `checkbox_` + i + `>
                            <input name=` + 'checkbox_0' + i + ` type="checkbox" id=` + 'checked_' + j + '' + i + ` data-label=` + label.replaceAll(' ', '_') + `>
                            <label for=`+ 'checked_' + j + '' + i + `>` + label + `</label>
                        </div>`
                }
                result = ` <div class="question--item">
                        <span class="hidden d-none">` + stringQuestion + ` </span>
                        <span class="data-field d-none"></span>
                        <label class="question--label">`+ question.title + `</label>
                       `+ checkboxs + `
                </div>`
                break;

            case 5://selected
                let options = null;
                for (let i = 0; i < question.option.length; i++) {
                    const option = question.option[i];
                    options += '<option value=' + option.replaceAll(' ', '_') + '>' + option + '</option>'
                }
                result = ` <div class="question--item">
                        <span class="hidden d-none">` + stringQuestion + ` </span>
                        <span class="data-field d-none"></span>
                        <label class="question--label">`+ question.title + `</label>
                        <div class="question--select">
                            <select class="question--select">
                                `+ options + `
                            </select>
                        </div>
                    </div>`
                break;

            default: //input
                result = ` <div class="question--item">
                    <span class="hidden d-none">` + stringQuestion + ` </span>
                    <span class="data-field d-none"></span>
                    <label class="question--label">`+ question.title + `</label>
                    <input type="text" class="question--input">
                </div>`
                break;
        }
        array.push(result)
        $('.question--form').append(result)
    }

    // change-----------------------------
    // input
    $('.question--input').keyup(function () {
        let value = $(this).val()
        $(this).closest('.question--item').find('.data-field').attr('data-field', value)
    });

    // select 
    $('.question--select').change(function () {
        let value = $(this).val()
        value = value.replaceAll('_', ' ')
        $(this).closest('.question--item').find('.data-field').attr('data-field', value)
    })

    // radio 
    $('.question--radio input').on('change', function () {
        let id = $(this).attr('id')
        let value = $('input[id=' + id + ']:checked').attr('data-label')
        value = value.replaceAll('_', ' ')
        $(this).closest('.question--item').find('.data-field').attr('data-field', value)
    });

    // checkbox 
    $('.question--checkbox input').on('change', function () {
        let arr = []
        let label = $(this).attr('data-label')
        let value_checked = $(this)[0].checked;

        if (value_checked === true) {
            $(this).closest('.question--checkbox').attr('data-checked', label)
        } else {
            $(this).closest('.question--checkbox').removeAttr('data-checked')
        }

        $(this).closest('.question--item').find('.question--checkbox').each(function () {
            let text = $(this).attr('data-checked')
            if (text) {
                text = text.replaceAll('_', ' ')
                arr.push(text)
            }
        })
        $(this).closest('.question--item').find('.data-field').attr('data-field', arr)
    })


    // submit button 
    $('.question--submit').click(function () {
        let arr_submit = []
        $('.question--item').each(function (value, index) {
            let object_origin = JSON.parse($(this).find('.hidden').html())
            let value_field = $(this).find('.data-field').attr('data-field')

            let resutl = {
                ...object_origin,
                anwser: value_field
            }
            arr_submit.push(resutl)
        })
        console.log({ arr_submit });
    })



}