var mapKey = 'q6j5bdLbTUII9GHTfre1x0hY';
var bdMap;
var currentCity = '深圳市';
var currentLng = 114.066112;
var currentLat = 22.548515;
var getNumPages = 0;
var pageCapacity = 10;
var getPageIndex = 1;
function loadMap() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + mapKey + '&callback=init';
    document.body.appendChild(script);
};
function init() {
    bdMap = new BMap.Map('J_bdMap');
    var point = new BMap.Point(currentLng, currentLat);
    bdMap.centerAndZoom(point, 18);
    bdMap.enableScrollWheelZoom();
    getLocation();

    bdMap.addEventListener('dragend', function () {
        var center = bdMap.getCenter();
        console.log('地图中心点变更为：' + center.lng + ', ' + center.lat);
        geoCoder(center.lng, center.lat)

    });
    bdMap.addEventListener('resize', function () {
        var center = bdMap.getCenter();
        console.log('地图中心点变更为：' + center.lng + ', ' + center.lat);
        geoCoder(center.lng, center.lat)

    });
    var ac = new BMap.Autocomplete({
        location: bdMap,
        input: 'iSearch',
        onSearchComplete: function (results) {
            console.log(results);
        }
    });
    ac.addEventListener('onconfirm', function (e) {
        console.log(e);
    });
    $('#iSearch').on('click', function () {
        var $this = $(this);
        var key = $.trim($(this).val());
        if (key!=''){
            ac.show();
        }
    })
};
function getLocation() {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (result) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var point = result.point;
            bdMap.panTo(point);
            console.log(result);
            currentCity = result.address.city;
            geoCoder(point.lng, point.lat);
        }
        else {
            console.log('failed' + this.getStatus());
        }
    }, { enableHighAccuracy: true });
};
function localSearch(key) {
    var local = new BMap.LocalSearch(bdMap, { pageCapacity: pageCapacity });
    local.search(key);
    local.setSearchCompleteCallback(function (results) {
        var data = results;
        console.log(data);
        var searchObject = {};
        var searchArray = [];
        getNumPages = data.getNumPages();
        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            for (var i = 0; i < data.getCurrentNumPois(); i++) {
                var getPoi = data.getPoi(i);
                var point = getPoi.point;
                var poiObject = {};
                poiObject.title = getPoi.title;
                poiObject.address = getPoi.address;
                poiObject.lng = point.lng;
                poiObject.lat = point.lat;
                searchArray.push(poiObject);
            }
            searchObject.list = searchArray;

            console.log(searchObject);
            var html = template('J_listTmpl', searchObject);
            $('#J_bdResult').children('.listview').html(html);
        }
    });
};
function geoCoder(lng, lat) {
    var gc = new BMap.Geocoder();
    gc.getLocation(new BMap.Point(lng, lat), function (result) {
        if (result) {
            console.log(result);
            var addressComponents = result.addressComponents;
            localSearch(addressComponents.street + addressComponents.streetNumber)
        }
    });
};
function searchNearby(key, lng, lat) {
    var local = new BMap.LocalSearch(bdMap, { pageCapacity: pageCapacity });
    local.searchNearby(key, new BMap.Point(lng, lat), 3000);
    local.setSearchCompleteCallback(function (results) {
        var data = results;
        console.log(data);
        var searchObject = {};
        var searchArray = [];
        getNumPages = data.getNumPages();
        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            for (var i = 0; i < data.getCurrentNumPois(); i++) {
                var getPoi = data.getPoi(i);
                var point = getPoi.point;
                searchObject.title = getPoi.title;
                searchObject.address = getPoi.address;
                searchObject.lng = point.lng;
                searchObject.lat = point.lat;
                searchArray.push(searchObject);
            }
            console.log(searchArray);
            searchObject.list = searchArray
            var html = template('J_listTmpl', searchObject);
            $('#J_bdResult').children('.listview').html(html);
        }
    });
};
$(function () {
    loadMap();
});