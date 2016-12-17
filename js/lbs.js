$(function () {
    lbsSearch.loadMap();
});
var lbsSetting = {};
lbsSetting.key = 'q6j5bdLbTUII9GHTfre1x0hY';
lbsSetting.bdMap = null;
lbsSetting.mapZoom = 18;
lbsSetting.geotable_id = 116417;
lbsSetting.currentCity = '深圳市';
lbsSetting.currentLng = 114.066112;
lbsSetting.currentLat = 22.548515;
lbsSetting.geoPoint = null;
lbsSetting.geoRadius = 30;
lbsSetting.pointChange = true;
lbsSetting.polyline = null;
var lbsCloud = {
    postLBS: function (url, type, data, callback) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function () {

            }
        });
    },
    createGeo: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/geotable/create';
        var data = {
            name: 'geotest',
            geotype: 1,
            is_published: 1,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'post', data, function (json) {
            console.log(json);
        })
    },
    listGeo: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/geotable/list';
        var data = {
            name: 'poitest',
            ak: lbsSetting.key
        };
        this.postLBS(url, 'get', data, function (json) {
            console.log(json);
        })
    },
    detailGeo: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/geotable/detail';
        var data = {
            id: 116417,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'get', data, function (json) {
            console.log(json);
        })
    },
    updateGeo: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/geotable/update';
        var data = {
            name: 'geotest',
            geotype: 1,
            is_published: 1,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'post', data, function (json) {
            console.log(json);
        })
    },
    deleteGeo: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/geotable/delete';
        var data = {
            id: 116417,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'post', data, function (json) {
            console.log(json);
        })
    },
    createColumn: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/column/create';
        var data = {
            name: '名称',
            key: 'name',
            type: 3,
            default_value: '',//默认值
            max_length: 255,//文本最大长度
            is_sortfilter_field: 1,//是否检索引擎的数值排序筛选字段
            is_search_field: 1,//是否检索引擎的文本检索字段
            is_index_field: 1,//是否存储引擎的索引字段
            is_unique_field: 1,//是否云存储唯一索引字段，方便更新，删除，查询
            geotable_id: 116417,//所属于的geotable_id
            ak: lbsSetting.key
        };
        this.postLBS(url, 'post', data, function (json) {
            console.log(json);
        })
    },
    listColumn: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/column/list';
        var data = {
            name: 'poitest',
            key: 'name',
            geotable_id: 116417,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'get', data, function (json) {
            console.log(json);
        })
    },
    detailColumn: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/column/detail';
        var data = {
            id: 11,
            geotable_id: 116417,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'get', data, function (json) {
            console.log(json);
        })
    },
    updateColumn: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/column/update';
        var data = {
            id: 11,
            name: '名称',
            type: 3,
            default_value: '',//默认值
            max_length: 255,//文本最大长度
            is_sortfilter_field: 1,//是否检索引擎的数值排序筛选字段
            is_search_field: 1,//是否检索引擎的文本检索字段
            is_index_field: 1,//是否存储引擎的索引字段
            is_unique_field: 1,//是否云存储唯一索引字段，方便更新，删除，查询
            geotable_id: 116417,//所属于的geotable_id
            ak: lbsSetting.key
        };
        this.postLBS(url, 'post', data, function (json) {
            console.log(json);
        })
    },
    deleteColumn: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/column/delete';
        var data = {
            id: 11,
            geotable_id: 116417,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'post', data, function (json) {
            console.log(json);
        })
    },
    createPoi: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/poi/create';
        var data = {
            title: '',//poi名称
            address: '',//地址
            tags: '',//标签
            latitude: '',//纬度
            longitude: '',//经度
            coord_type: 3,//坐标的类型
            geotable_id: 11,//记录关联的geotable的标识	
            ak: lbsSetting.key
        };
        this.postLBS(url, 'post', data, function (json) {
            console.log(json);
        })
    },
    listPoi: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/poi/list';
        var data = {
            title: '',//poi名称
            tags: '',//标签
            bounds: '',//查询的矩形区域
            page_index: 1,//分页索引
            page_size: 10,//分页数目
            geotable_id: 11,//记录关联的geotable的标识	
            ak: lbsSetting.key
        };
        this.postLBS(url, 'get', data, function (json) {
            console.log(json);
        })
    },
    detailPoi: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/poi/detail';
        var data = {
            id: 11,
            geotable_id: 116417,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'get', data, function (json) {
            console.log(json);
        })
    },
    updatePoi: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/poi/update';
        var data = {
            id: 12,
            title: '',//poi名称
            address: '',//地址
            tags: '',//标签
            latitude: '',//纬度
            longitude: '',//经度
            coord_type: 3,//坐标的类型
            geotable_id: 11,//记录关联的geotable的标识	
            ak: lbsSetting.key
        };
        this.postLBS(url, 'post', data, function (json) {
            console.log(json);
        })
    },
    deletePoi: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/poi/delete';
        var data = {
            id: 11,
            geotable_id: 116417,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'post', data, function (json) {
            console.log(json);
        })
    },
    uploadPoi: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/poi/upload';
        var data = {
            poi_list: '',//输入的poi列表名称(.csv)
            geotable_id: 116417,
            timestamp: 1438856570,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'post', data, function (json) {
            console.log(json);
        })
    },
    listimportdataJob: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/job/listimportdata';
        var data = {
            job_id: 11,//导入接口返回的job_id
            page_index: 1,
            page_size: 10,
            timestamp: 1438856570,
            geotable_id: 116417,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'get', data, function (json) {
            console.log(json);
        })
    },
    listJob: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/job/list';
        var data = {
            type: 1,//job类型	
            status: 3,//job状态
            ak: lbsSetting.key
        };
        this.postLBS(url, 'get', data, function (json) {
            console.log(json);
        })
    },
    detailJob: function () {
        var url = 'http://api.map.baidu.com/geodata/v3/job/detail';
        var data = {
            id: 11,
            ak: lbsSetting.key
        };
        this.postLBS(url, 'get', data, function (json) {
            console.log(json);
        })
    }

};
var lbsSearch = {
    ajaxLBS: function (url, data, callback) {
        $.ajax({
            type: 'GET',
            url: url,
            data: data,
            dataType: 'jsonp',
            success: function (data) {
                if (typeof callback === 'function') {
                    callback(data);
                }
            },
            error: function () {

            }
        });
    },
    loadMap: function () {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + lbsSetting.key + '&callback=lbsSearch.initMap';
        document.body.appendChild(script);
    },
    initMap: function () {
        lbsSetting.bdMap = new BMap.Map('J_bdMap', { enableMapClick: false });
        var point = new BMap.Point(lbsSetting.currentLng, lbsSetting.currentLat);
        lbsSetting.bdMap.centerAndZoom(point, lbsSetting.mapZoom);
        lbsSetting.bdMap.enableScrollWheelZoom();
        this.getLocation();
        this.lbsEvent();
    },
    //高精度IP定位
    getLocation: function () {
        var url = 'http://api.map.baidu.com/highacciploc/v1?ak=' + lbsSetting.key + '&qterm=pc&coord=bd09ll&extensions=1&callback_type=jsonp';
        this.ajaxLBS(url, {}, function (data) {
            console.log(data);
            var result = data.result.error;
            if (result == 161) {
                var content = data.content;
                var location = content.location;
                lbsSetting.currentCity = content.address_component.city;
                lbsSetting.currentLng = location.lng;
                lbsSetting.currentLat = location.lat;
                var point = new BMap.Point(lbsSetting.currentLng, lbsSetting.currentLat);
                lbsSetting.bdMap.centerAndZoom(point, lbsSetting.mapZoom);
                lbsSetting.geoPoint = point;
                lbsSetting.geoRadius = content.radius;
                lbsSearch.geoMarker();
                lbsSearch.nearbyGeo();
                // lbsSearch.localGeo('国际');
                // lbsSearch.boundGeo('大厦');
            }
        });
    },
    geoMarker: function () {
        lbsSetting.bdMap.clearOverlays();
        var opts = {
            position: lbsSetting.geoPoint,
            offset: new BMap.Size(-8, -6)
        }
        var label = new BMap.Label('<span class="geo-marker"></span>', opts);
        label.setStyle({
            border: 0,
            width: '13px',
            height: '13px',
            'background-color': 'transparent'
        });
        lbsSetting.bdMap.addOverlay(label);
        var circle = new BMap.Circle(lbsSetting.geoPoint, lbsSetting.geoRadius);
        circle.setStrokeWeight(1);
        lbsSetting.bdMap.addOverlay(circle);
    },
    nearbyGeo: function () {
        var url = 'http://api.map.baidu.com/geosearch/v3/nearby';
        var data = {
            location: lbsSetting.currentLng + ',' + lbsSetting.currentLat,
            radius: 500,
            page_index: 0,
            page_size: 1000,
            geotable_id: lbsSetting.geotable_id,
            ak: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
            if (json.status == '0') {
                lbsSearch.renderHtml(json.contents);
            }
        })
    },
    localGeo: function (key) {
        var url = 'http://api.map.baidu.com/geosearch/v3/local';
        var data = {
            q: key,
            region: lbsSetting.currentCity,
            page_index: 0,
            page_size: 10,
            geotable_id: lbsSetting.geotable_id,
            ak: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
        })
    },
    boundGeo: function (key) {
        var url = 'http://api.map.baidu.com/geosearch/v3/bound';
        var lng = parseFloat(lbsSetting.currentLng).toFixed(2);
        var lat = parseFloat(lbsSetting.currentLat).toFixed(2);
        var offset = 1;
        var bounds = (parseFloat(lng) - offset) + ',' + (parseFloat(lat) - offset) + ';' + (parseFloat(lng) + offset) + ',' + (parseFloat(lat) + offset);
        var data = {
            q: key,
            bounds: bounds,
            page_index: 0,
            page_size: 10,
            geotable_id: lbsSetting.geotable_id,
            ak: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
        })
    },
    cloudrgcGeo: function () {
        var url = 'http://api.map.baidu.com/cloudrgc/v1';
        var data = {
            location: encodeURIComponent(lbsSetting.currentLat + ',' + lbsSetting.currentLng),
            extensions: 'pois',
            geotable_id: lbsSetting.geotable_id,
            ak: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            console.log(json);
        });
    },
    //html
    renderHtml: function (data) {
        lbsSetting.bdMap.clearOverlays();
        lbsSearch.geoMarker();
        $.each(data, function (i, json) {
            var location = json.location;
            var point = new BMap.Point(location[0], location[1]);
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
            label.setTitle(json.address + '|' + json.title);
            label.removeEventListener('click');
            label.addEventListener('click', function () { 
                var pos = this.getPosition();
                //lbsSearch.direction(pos.lng, pos.lat);
                lbsSearch.transit(pos.lng, pos.lat);
            });
            lbsSetting.bdMap.addOverlay(label);
        });
    },
    lbsEvent: function () {
        var bdMap = lbsSetting.bdMap;
        bdMap.addEventListener('dragend', function () {
            if (lbsSetting.pointChange) {
                var center = bdMap.getCenter();
                lbsSetting.currentLng = center.lng;
                lbsSetting.currentLat = center.lat;
                lbsSearch.nearbyGeo();
            }
        });
        bdMap.addEventListener('resize', function () {
            if (lbsSetting.pointChange) {
                var center = bdMap.getCenter();
                lbsSetting.currentLng = center.lng;
                lbsSetting.currentLat = center.lat;
                lbsSearch.nearbyGeo();
            }
        });
        bdMap.addEventListener('zoomend', function () {
            if (lbsSetting.pointChange) {
                var center = bdMap.getCenter();
                lbsSetting.currentLng = center.lng;
                lbsSetting.currentLat = center.lat;
                lbsSearch.nearbyGeo();
            }
        });
        $("#J_geolocation").click(function () {
            if (lbsSetting.geoPoint == null) return;
            lbsSetting.bdMap.centerAndZoom(lbsSetting.geoPoint, lbsSetting.mapZoom);
            lbsSearch.nearbyGeo();
        });
    },
    direction: function (lng, lat) {
        var url = 'http://api.map.baidu.com/direction/v1';
        var glng = parseFloat(lbsSetting.currentLng).toFixed(6);
        var glat = parseFloat(lbsSetting.currentLat).toFixed(6);
        lng = parseFloat(lng).toFixed(6);
        lat = parseFloat(lat).toFixed(6);
        var data = {
            origin: glat + ',' + glng,
            destination: lat + ',' + lng,
            mode: 'walking',
            region: lbsSetting.currentCity,
            output: 'json',
            ak: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            if (json.status == '0') {
                lbsSetting.bdMap.clearOverlays();
                console.log(json);
                var result = json.result;
                var routes = result.routes;
                var steps = routes[0].steps;
                $.each(steps, function (i, data) {
                    var stepOriginLocation = data.stepOriginLocation;
                    var stepDestinationLocation = data.stepDestinationLocation;
                    var pointA = new BMap.Point(stepOriginLocation.lng, stepOriginLocation.lat);
                    var pointB = new BMap.Point(stepDestinationLocation.lng, stepDestinationLocation.lat);
                    var polyline = new BMap.Polyline([pointA, pointB], {
                        strokeColor: 'blue',
                        strokeWeight: 3,
                        strokeOpacity: 0.5
                    });

                    polyline.disableMassClear();
                    lbsSetting.bdMap.addOverlay(polyline);
                });
            }
        })
    },
    transit: function (lng, lat) {
        var url = 'http://api.map.baidu.com/direction/v2/transit';
        var glng = parseFloat(lbsSetting.geoPoint.lng).toFixed(6);
        var glat = parseFloat(lbsSetting.geoPoint.lat).toFixed(6);
        lng = parseFloat(lng).toFixed(6);
        lat = parseFloat(lat).toFixed(6);
        var data = {
            origin: glat + ',' + glng,
            destination: lat + ',' + lng,
            output: 'json',
            ak: lbsSetting.key
        };
        this.ajaxLBS(url, data, function (json) {
            if (json.status == '0') {
                lbsSetting.bdMap.clearOverlays();
                console.log(json);
                var result = json.result;
                var routes = result.routes;
                var steps = routes[0].steps;
                $.each(steps, function (i, data) {
                    var path = data.path;
                    var polyline = new BMap.Polyline({
                        strokeColor: 'blue',
                        strokeWeight: 3,
                        strokeOpacity: 0.5
                    });

                    polyline.setPath(path);
                    lbsSetting.bdMap.addOverlay(polyline);
                });
            }
        })
    }
}