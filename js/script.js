
    ymaps.ready(init);

    function init() {
        // Стоимость за километр.
        var DELIVERY_TARIFF = 25,
        // Минимальная стоимость.
            MINIMUM_COST = 500,
            myMap = new ymaps.Map('map', {
                center: [60.906882, 30.067233],
                zoom: 9,
                controls: []
            }),
        // Создадим панель маршрутизации.
            routePanelControl = new ymaps.control.RoutePanel({
                options: {
                    // Добавим заголовок панели.
                    showHeader: true,
                    maxWidth: '300px',
                    position: {
                        top: 5,
                        left: 5
                    },
                    title: 'Расчёт стоимости проезда'
                    
                }
            }),
            zoomControl = new ymaps.control.ZoomControl({
                options: {
                    size: 'small',
                    float: 'none',
                    position: {
                        bottom: 145,
                        right: 10
                    }
                }
            });
            
        // Пользователь сможет построить только автомобильный маршрут.
        routePanelControl.routePanel.options.set({
            types: {auto: true}
        });

        
    
        // Если вы хотите задать неизменяемую точку "откуда", раскомментируйте код ниже.
        /*routePanelControl.routePanel.state.set({
            fromEnabled: false,
            from: 'Москва, Льва Толстого 16'
         });*/
    
        myMap.controls.add(routePanelControl).add(zoomControl);
    
        // Получим ссылку на маршрут.
        routePanelControl.routePanel.getRouteAsync().then(function (route) {
    
            // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
            route.model.setParams({results: 1}, true);
    
            // Повесим обработчик на событие построения маршрута.
            route.model.events.add('requestsuccess', function () {
    
                var activeRoute = route.getActiveRoute();
                if (activeRoute) {
                    // Получим протяженность маршрута.
                    var length = route.getActiveRoute().properties.get("distance"),
                    // Вычислим стоимость доставки.
                        price = calculate(Math.round(length.value / 1000)),
                    // Создадим макет содержимого балуна маршрута.
                        balloonContentLayout = ymaps.templateLayoutFactory.createClass(
                            '<span>Расстояние: ' + length.text + '.</span><br/>' +
                            '<span style="font-weight: bold; font-style: italic">Стоимость поездки: ' + price + ' р.</span>');
                    // Зададим этот макет для содержимого балуна.
                    route.options.set('routeBalloonContentLayout', balloonContentLayout);
                    // Откроем балун.
                    activeRoute.balloon.open();
                }
            });
    
        });
        // Функция, вычисляющая стоимость доставки.
        function calculate(routeLength) {
            return Math.max(routeLength * DELIVERY_TARIFF + 300, MINIMUM_COST);
        }
    }

    // let suggest1;
    // var suggestView1

    // const inputSagest1 = document.querySelector('#suggest1')
    // const buttonSag1 = document.querySelector('#sugest1but')
    // let route1;
    // let route2;

    // function init(){
    //     // Создание карты.
    //     var myMap = new ymaps.Map("map", {
    //         // Координаты центра карты.
    //         // Порядок по умолчанию: «широта, долгота».
    //         // Чтобы не определять координаты центра карты вручную,
    //         // воспользуйтесь инструментом Определение координат.
    //         center: [44.9572, 34.1108],
    //         // Уровень масштабирования. Допустимые значения:
    //         // от 0 (весь мир) до 19.
    //         zoom: 9


    //     });
        
    //         // Создаем выпадающую панель с поисковыми подсказками и прикрепляем ее к HTML-элементу по его id.
    //     suggestView1 = new ymaps.SuggestView('suggest1');

    //     buttonSag1.addEventListener('click', e => {
    //         route1 = inputSagest1.value
    //         console.log(route1)

    //         var multiRoute = new ymaps.multiRouter.MultiRoute({
    //             referencePoints: [
    //                 route1,
    //                 "Москва"
    //             ],
    //             // Параметры маршрутизации.
    //             params: {
    //                 results: 1
    //             }
    //         }, {
    //             boundsAutoApply: true
    //         });
            

    //         console.log(multiRoute)
    //     })

        
    // }

    

    

    