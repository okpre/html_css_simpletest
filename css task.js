$('.menu__button').on('click', function(e) {
    e.preventDefault();
    let menubtn = $('.menu__button_active');
    let menu = $('<div id="menu_container">\n' +
        '        <ul>\n' +
        '            <li class="menu_list"><a href="#">Главная</a></li>\n' +
        '            <li class="menu_list"><a href="#">Политика</a></li>\n' +
        '            <li class="menu_list"><a href="#">Общество</a></li>\n' +
        '            <li class="menu_list"><a href="#">Экономика</a></li>\n' +
        '            <li class="menu_list"><a href="#">В мире</a></li>\n' +
        '            <li class="menu_list"><a href="#">Происшествия</a></li>\n' +
        '            <li class="menu_list"><a href="#">Спорт</a></li>\n' +
        '            <li class="menu_list"><a href="#">Наука</a></li>\n' +
        '            <li><a href="#">Туризм</a></li>\n' +
        '        </ul>\n' +
        '    </div>')
    if (menubtn.length==0){
        $('.Header_menu').after(menu);
        $('body').css({'overflow' : 'hidden'});
        $('.Header_container').hide();
    }
    else {
        $('#menu_container').remove();
        $('body').css({'overflow' : 'auto'});
        $('.Header_container').show();
    }
    $(this).toggleClass('menu__button_active');
});

$(document).ready(function () {
    let date = $('#mHeader_date');
    let time = $('#mHeader_time');
    let monthNames = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
    let dayNames= ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];
    let newDate = new Date();
    newDate.setDate(newDate.getDate());
    date.text(newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ', ' + dayNames[newDate.getDay()]);
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    time.text(( hours < 10 ? "0" : "" ) + hours + ':' + ( minutes < 10 ? "0" : "" ) + minutes);
    $('.Header_date').text(( hours < 10 ? "0" : "" ) + hours + ':' + ( minutes < 10 ? "0" : "" ) + minutes + ' '
        + (newDate.getDate() < 10 ? "0" : "") + newDate.getDate() + '.' + ((newDate.getMonth() + 1) < 10 ? "0" : "") +
        (newDate.getMonth() + 1) + '.' + newDate.getFullYear());
    setInterval(function () {
        let hours = new Date().getHours();
        let minutes = new Date().getMinutes();
        time.text(( hours < 10 ? "0" : "" ) + hours + ':' + ( minutes < 10 ? "0" : "" ) + minutes);
        $('.Header_date').text(( hours < 10 ? "0" : "" ) + hours + ':' + ( minutes < 10 ? "0" : "" ) + minutes + ' '
        + (newDate.getDate() < 10 ? "0" : "") + newDate.getDate() + '.' + ((newDate.getMonth() + 1) < 10 ? "0" : "") +
            (newDate.getMonth() + 1) + '.' + newDate.getFullYear());
    },1000)
})

$('.menu_search_button').on('click', function (e) {
    let menu = $('.menu_search');
    if ($(window).width() <= '690' && menu.is(':hidden')){
        e.preventDefault();
        menu.show().focus();
        $('.menu_search_button').css({
            'background-color':'rgba(0,0,0,0)',
            'right':'15px',
            'top':'15px',
            'position':'absolute'
        });
        $('#search').css({
            'margin':'0',
            'position':'relative'
        });
        $('.menu_logo').hide();
    }

});

$('.menu_search').on('focusout',function () {
    let menu = $('.menu_search');
    if ($(window).width() <= '690'){
        menu.hide();
        $('.menu_logo').show();
        $('.menu_search_button').css({
            'position':'unset'
        });
        $('#search').css({
            'margin-top':'12px',
            'position':'relative'
        });
    }
})

$(window).resize(function () {
    if ($(window).width() > '673' && $('.menu_search').is(':hidden')){
        $('.menu_search').show();
        $('.menu_search_button').css({
            'position':'absolute'
        });
        $('#search').css({
            'margin-top':'40px'
        });
    }
    else if ($(window).width() <= '673' && $('.menu_search').is(':visible')){
        $('.menu_search').hide();
        $('.menu_search_button').css({
            'position':'unset'
        });
        $('#search').css({
            'margin-top':'12px',
            'position':'relative'
        });
    }
})

$(document).ready(function slider() {
    var multiItemSlider = (function () {
        return function (selector, config) {
            var
                _mainElement = document.querySelector(selector), // основный элемент блока
                _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
                _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
                _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
                _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
                _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
                _wrapperWidth = 250, // ширина обёртки
                _itemWidth = 250, // ширина одного элемента
                _positionLeftItem = 0, // позиция левого активного элемента
                _transform = 0, // значение транфсофрмации .slider_wrapper
                _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
                _items = []; // массив элементов
            // наполнение массива _items
            _sliderItems.forEach(function (item, index) {
                _items.push({ item: item, position: index, transform: 0 });
            });

            var position = {
                getMin: 0,
                getMax: _items.length - 1,
            }

            var _transformItem = function (direction) {
                if (direction === 'right') {
                    if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
                        return;
                    }
                    if (!_sliderControlLeft.classList.contains('slider__control_show')) {
                        _sliderControlLeft.classList.add('slider__control_show');
                    }
                    if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
                        _sliderControlRight.classList.remove('slider__control_show');
                    }
                    _positionLeftItem++;
                    _transform -= _step;
                }
                if (direction === 'left') {
                    if (_positionLeftItem <= position.getMin) {
                        return;
                    }
                    if (!_sliderControlRight.classList.contains('slider__control_show')) {
                        _sliderControlRight.classList.add('slider__control_show');
                    }
                    if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
                        _sliderControlLeft.classList.remove('slider__control_show');
                    }
                    _positionLeftItem--;
                    _transform += _step;
                }
                _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
            }

            // обработчик события click для кнопок "назад" и "вперед"
            var _controlClick = function (e) {
                if (e.target.classList.contains('slider__control')) {
                    e.preventDefault();
                    var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
                    _transformItem(direction);
                }
            };

            var _setUpListeners = function () {
                // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
                _sliderControls.forEach(function (item) {
                    item.addEventListener('click', _controlClick);
                });
            }

            // инициализация
            _setUpListeners();

            return {
                right: function () { // метод right
                    _transformItem('right');
                },
                left: function () { // метод left
                    _transformItem('left');
                }
            }

        }
    }());

    var slider = multiItemSlider('.slider')
})
