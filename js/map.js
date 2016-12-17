$(function () {
    mapHandler.setHtmlFont();
    mapHandler.loadMap();
});
var mapSetting = {};
mapSetting.bdMap = null;
mapSetting.mapKey = 'WTUGwWr44DaWWNHZWUYWeVRUzGubGHx0';
mapSetting.mapZoom = 18;
mapSetting.currentCity = '深圳市';
mapSetting.currentLng = 114.066112;
mapSetting.currentLat = 22.548515;
mapSetting.geoPoint = null;
mapSetting.numPages = 0;
mapSetting.pageSize = 20;
mapSetting.pageIndex = 1;
mapSetting.pointChange = true;
mapSetting.jnbKey = 'jnbmap';
mapSetting.jnbKeyArray = [];
var mapHandler = {
    loadMap: function () {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + mapSetting.mapKey + '&callback=mapHandler.initMap';
        document.body.appendChild(script);
    },
    initMap: function () {
        mapSetting.bdMap = new BMap.Map('J_bdMap', { enableMapClick: false });
        var point = new BMap.Point(mapSetting.currentLng, mapSetting.currentLat);
        mapSetting.bdMap.centerAndZoom(point, mapSetting.mapZoom);
        mapSetting.bdMap.enableScrollWheelZoom();
        this.getLocation();
        this.mapEvent();
    },
    JsonpMap: function (url, callback) {
        $.ajax({
            type: 'get',
            //async: false,
            url: url,
            dataType: 'jsonp',
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function () {
                mapSetting.currentLng = 114.066112;
                mapSetting.currentLat = 22.548515;
                var point = new BMap.Point(mapSetting.currentLng, mapSetting.currentLat);
                mapSetting.bdMap.centerAndZoom(point, mapSetting.mapZoom);
            }
        });
    },
    pc: function () {
        var ua = navigator.userAgent.toLowerCase();
        var arr = ['android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod'];
        var flag = true;
        for (var v = 0; v < arr.length; v++) {
            if (ua.indexOf(arr[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    wx: function () {
        return /micromessenger/.test(navigator.userAgent.toLowerCase)
    },
    preventDefault: function (e) {
        if (e && e.preventDefault) e.preventDefault();
        else window.event.returnValue = false;
        return false;
    },
    /*设置html的fontSize值*/
    setHtmlFont: function () {
        var $html = $('html');
        var docEl = document.documentElement,
            dpr = Math.min(window.devicePixelRatio, 2)
            ,
            baseWidth = 640,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth,
                    clientHeight = docEl.clientHeight;
                if (!clientWidth) { return; }
                if (clientWidth > baseWidth) {
                    clientWidth = baseWidth;
                }
                if (!mapHandler.pc()) {
                    if (clientWidth > clientHeight) {
                        clientWidth = clientHeight;
                    }
                }
                else {
                    dpr = 1.5;
                }
                $html.css('font-size', 100 * dpr * (clientWidth / baseWidth) + 'px').attr('data-dpr', dpr);
            }
        recalc();
        if (!document.addEventListener) { return; }
        window.addEventListener(resizeEvt, recalc, false);
    },
    //高精度IP定位
    getLocation: function () {
        var qterm = 'mb';
        if (this.pc()) {
            qterm = 'pc';
        }
        var url = 'http://api.map.baidu.com/highacciploc/v1?ak=' + mapSetting.mapKey + '&qterm=' + qterm + '&extensions=3&coord=bd09ll&callback_type=jsonp';
        this.JsonpMap(url, function (data) {
            var result = data.result.error;
            if (result == 161) {
                var content = data.content;
                var location = content.location;
                mapSetting.currentLng = location.lng;
                mapSetting.currentLat = location.lat;
                var point = new BMap.Point(mapSetting.currentLng, mapSetting.currentLat);
                mapSetting.geoPoint = point;
                mapSetting.bdMap.centerAndZoom(point, mapSetting.mapZoom);
                mapSetting.bdMap.clearOverlays();
                var opts = {
                    position: point,
                    offset: new BMap.Size(-8, -8)
                }
                var label = new BMap.Label('<span class="geo-marker"></span>', opts);
                label.setStyle({
                    border: 0,
                    width: '13px',
                    height: '13px',
                    'background-color': 'transparent'
                });
                mapSetting.bdMap.addOverlay(label);
                var locationData = {};
                locationData.addressComponent = content.address_component;
                locationData.location = content.location;
                locationData.pois = content.pois;
                mapHandler.renderHtml(locationData, true, 'J_listTmpl', $('#J_bdResult').children('.listview'), false, 'location');
            }
        });
    },
    //检索
    localSearch: function (key) {
        var url = 'http://api.map.baidu.com/place/v2/suggestion?ak=' + mapSetting.mapKey + '&query=' + encodeURI(key) + '&region=' + encodeURI(mapSetting.currentCity) + '&city_limit=true&output=json';
        this.JsonpMap(url, function (data) {
            if (data.status == '0') {
                mapHandler.renderHtml(data.result, false, 'J_listTmpl', $('#J_searchResult').children('.listview'), false, 'search');
            }
        });
    },
    //逆地理编码
    reGeocode: function (lng, lat, storeData) {
        var location = lat + ',' + lng;
        var url = 'http://api.map.baidu.com/geocoder/v2/?ak=' + mapSetting.mapKey + '&callback=renderReverse&location=' + encodeURI(location) + '&output=json&pois=1';
        this.JsonpMap(url, function (data) {
            if (data.status == 0) {
                var result = data.result;
                if (storeData == '') {
                    mapHandler.renderHtml(result, true, 'J_listTmpl', $('#J_bdResult').children('.listview'), false, 'geocode');
                }
                else {
                    var searchObject = {};
                    searchObject.name = storeData.name;
                    searchObject.address = storeData.address;
                    searchObject.lng = storeData.lng;
                    searchObject.lat = storeData.lat;
                    searchObject.city = result.addressComponent.city;
                    searchObject.pois = result.pois;
                    mapHandler.renderHtml(searchObject, true, 'J_listTmpl', $('#J_bdResult').children('.listview'), false, 'select');
                }
            }
            $('#J_bdResult').animate({ scrollTop: 0 });
        });
    },
    //html
    renderHtml: function (data, active, tmpl, $result, isAdd, type) {
        var searchObject = {};
        var listArray = [];
        var listObject = {};
        var currentName = '';
        if (active) {
            var name = '';
            var address = '';
            var lng = 0;
            var lat = 0;
            var city = '';
            if (type == 'select') {
                name = data.name;
                address = data.address;
                lng = data.lng;
                lat = data.lat;
                city = data.city;
                currentName = name;
            }
            else {
                var addr = data.addressComponent;
                var point = data.location;
                city = addr.city;
                name = addr.street + addr.street_number;
                address = city + addr.district;
                lng = point.lng;
                lat = point.lat;
            }
            listObject.name = name;
            listObject.address = address;
            listObject.lng = lng;
            listObject.lat = lat;
            listObject.active = ' active';
            listArray.push(listObject);
            mapSetting.currentCity = city;
            mapSetting.currentLng = lng;
            mapSetting.currentLat = lat;
        }
        var results = null;
        if (type == 'search' || type == 'store') {
            results = data;
        }
        else {
            results = data.pois;//周边POI信息
        }
        $.each(results, function (i, json) {
            var name = '';
            var address = '';
            var lng = 0;
            var lat = 0;
            if (type == 'geocode' || type == 'select') {
                name = json.name;
                if (type == 'select' && currentName == name) {
                    return;
                }
                address = json.addr;
                var p = json.point;
                lng = p.x;
                lat = p.y;
            }
            else if (type == 'location') {
                name = json.name;
                address = json.address;
                var p = json.location;
                lng = p.lng;
                lat = p.lat;
            }
            else if (type == 'search') {
                name = json.name;
                address = json.city + json.district;
                var p = json.location;
                if (p == undefined) {
                    return;
                }
                lng = p.lng;
                lat = p.lat;
            }
            else if (type == 'store') {
                var arr = json.split('|');
                name = arr[0];
                address = arr[1];
                lng = arr[2];
                lat = arr[3];
            }
            listObject = {};
            listObject.name = name;
            listObject.address = address;
            listObject.lng = lng;
            listObject.lat = lat;
            listObject.active = '';
            listArray.push(listObject);
        });
        searchObject.list = listArray;
        var html = template(tmpl, searchObject);
        if (isAdd) {
            $result.append(html);
        }
        else {
            $result.html(html);
        }
        if (type == 'store') {
            if (listArray.length > 0) {
                if ($result.find('.clear').length == 0) {
                    $result.append('<a class="clear">清空历史记录</a>');
                }
                $result.find('.clear').off('click').on('click', function () {
                    $result.empty().html('<div class="no-item">暂无数据</div>');
                    mapHandler.clearStore();
                })
            }
        }
        $result.children('.item').off('click').on('click', function (e) {
            mapHandler.preventDefault(e);
            var $this = $(this);
            var name = $this.children('.name').text();
            var address = $this.children('.address').text();
            var lng = $this.attr('data-lng');
            var lat = $this.attr('data-lat');
            if (type == 'search' || type == 'store') {
                mapSetting.currentLng = lng;
                mapSetting.currentLat = lat;
                mapSetting.pointChange = true;
                var point = new BMap.Point(mapSetting.currentLng, mapSetting.currentLat);
                mapSetting.bdMap.centerAndZoom(point, mapSetting.mapZoom);
                var storeData = {};
                storeData.name = name;
                storeData.address = address;
                storeData.lng = lng;
                storeData.lat = lat;
                mapHandler.reGeocode(lng, lat, storeData);
                mapHandler.setStore(name, address, lng, lat);
                $('#J_searchSection').hide();
                $('#iSearch').val('');
            }
            else {
                var point = new BMap.Point(lng, lat);
                mapSetting.bdMap.centerAndZoom(point, mapSetting.mapZoom);
            }
        })
    },
    mapEvent: function () {
        var bdMap = mapSetting.bdMap;
        bdMap.addEventListener('dragend', function () {
            if (mapSetting.pointChange) {
                var center = bdMap.getCenter();
                mapHandler.reGeocode(center.lng, center.lat, '');
            }
        });
        bdMap.addEventListener('resize', function () {
            if (mapSetting.pointChange) {
                var center = bdMap.getCenter();
                mapHandler.reGeocode(center.lng, center.lat, '');
            }
        });
        bdMap.addEventListener('zoomend', function () {
            if (mapSetting.pointChange) {
                var center = bdMap.getCenter();
                mapHandler.reGeocode(center.lng, center.lat, '');
            }
        });
        var $searchSection = $('#J_searchSection');
        var $searchResult = $searchSection.find('#J_searchResult');
        var $searchRecord = $searchSection.find('#J_searchRecord');
        $("#iSearch").click(function () {
            mapSetting.pointChange = false;
            $searchSection.show();
            mapHandler.getStore();
            if ($(this).val() == '') {
                var jnbKeyArray = mapSetting.jnbKeyArray;
                if (jnbKeyArray.length > 0) {
                    $searchRecord.show();
                    $searchResult.hide().find('.listview').empty();
                    mapHandler.renderHtml(jnbKeyArray, false, 'J_listTmpl', $searchRecord.children('.listview'), false, 'store');
                }
            }
        });
        $("#iSearch").jnbInput({
            success: function ($this) {
                var key = $.trim($this.val());
                $searchRecord.hide();
                $searchResult.show();
                mapHandler.localSearch(key);
            },
            emptyCallback: function () {
                mapHandler.getStore();
                mapHandler.renderHtml(mapSetting.jnbKeyArray, false, 'J_listTmpl', $searchRecord.children('.listview'), false, 'store');
                $searchRecord.show();
                $searchResult.hide().find('.listview').empty();
            },
            equalCallback: function ($this) {

            }
        });
        $("#J_cancle").click(function () {
            if ($searchSection.css('display') != 'none') {
                $searchSection.hide();
                mapSetting.pointChange = true;
            }
            else {
            }
        });
        $("#J_geolocation").click(function () {
            if (mapSetting.geoPoint == null) return;
            mapSetting.bdMap.centerAndZoom(mapSetting.geoPoint, mapSetting.mapZoom);
            mapHandler.reGeocode(mapSetting.geoPoint.lng, mapSetting.geoPoint.lat, '');
        });
    },
    setStore: function (name, address, lng, lat) {
        if (lng != '') {
            var str = name + '|' + address + '|' + lng + '|' + lat;
            var jnbKeyArray = mapSetting.jnbKeyArray;
            if (jnbKeyArray.contain(str)) {
                jnbKeyArray.remove(jnbKeyArray.index(str));
            }
            else {
                if (jnbKeyArray.length == 10) {
                    jnbKeyArray.pop();
                }
            }
            mapSetting.jnbKeyArray.unshift(str);
            if (store.enabled) {
                store.set(mapSetting.jnbKey, jnbKeyArray);
            }
        }
    },
    getStore: function () {
        if (store.enabled) {
            var mapStore = store.get(mapSetting.jnbKey);
            if (mapStore != null && mapStore != '') {
                mapSetting.jnbKeyArray = mapStore;
            }
        }
    },
    clearStore: function () {
        if (store.enabled) {
            store.remove(mapSetting.jnbKey);
        }
        mapSetting.jnbKeyArray = [];
    }
};
(function ($) {
    $.fn.jnbInput = function (options) {
        options = options || {};
        var defaults = {
            time: 4,
            clear: false,
            success: null,
            emptyCallback: null,
            equalCallback: null,
            clearCallback: null
        },
            opts = $.extend(defaults, options),
            time = opts.time,
            $self = $(this);
        return $self.each(function () {
            var inputTimer,
                oldVal = '';
            $(this).off('focus change keyup paste input propertychange').on('focus change keyup paste input propertychange', function () {
                var $this = $(this),
                    val = $.trim($this.val());
                if (opts.clear) {
                    var $parent = $this.parent();
                    if ($parent.find('.clear').length == 0) {
                        $parent.append('<div class="i-right clear"><a class="icon i-cross"></a></div>');
                    }
                    var $clear = $parent.find('.clear');
                    if (val == '') {
                        $clear.hide();
                    }
                    else {
                        $clear.show();
                        $clear.off('click').on('click', function (e) {
                            stanUI.stopPropagation(e);
                            $this.val('');
                            $clear.hide();
                            if (typeof opts.clearCallback === 'function') {
                                opts.clearCallback($this);
                            }
                        })
                    }
                }
                if (val == '') {
                    if (inputTimer) {
                        clearTimeout(inputTimer);
                        inputTimer = null;
                    }
                    if (typeof opts.emptyCallback === 'function') {
                        opts.emptyCallback($this);
                    }
                }
                else {
                    if (val === oldVal) {
                        if (inputTimer) {
                            clearTimeout(inputTimer);
                            inputTimer = null;
                        }
                        if (typeof opts.equalCallback === 'function') {
                            opts.equalCallback($this);
                        }
                        return false;
                    }
                    if (time > 0) {
                        if (inputTimer) {
                            clearTimeout(inputTimer);
                            inputTimer = null;
                        }
                        inputTimer = setTimeout(function () {
                            oldVal = val;
                            if (typeof opts.success === 'function') {
                                opts.success($this);
                            }
                        }, time * 100);
                    }
                    else {
                        if (typeof opts.success === 'function') {
                            opts.success($this);
                        }
                    }
                }
            });
        });
    }
})(jQuery);
/*数组值是否存在*/
Array.prototype.contain = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};
/*删除数组元素*/
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) return false;
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1;
};
/*在数组中获取指定值的元素索引*/
Array.prototype.index = function (value) {
    var index = -1;
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) {
            index = i;
            break;
        }
    }
    return index;
};