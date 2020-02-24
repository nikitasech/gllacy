ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [59.939263, 30.329111],
        zoom: 16,
        controls: []
    });

    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    myPlacemarkWithContent = new ymaps.Placemark([59.938635, 30.323118], {}, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'img/map-mark.png',
        iconImageSize: [218, 142],
        iconImageOffset: [-55, -135],
        iconContentOffset: [15, 15],
        iconContentLayout: MyIconContentLayout
    });

    myMap.geoObjects
        .add(myPlacemarkWithContent);

    myMap.behaviors
        .disable(["scrollZoom"])
}