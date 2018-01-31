var zons = [
	{"id":1, "name":"中国", "pid":0},
		{"id":2, "name":"大陆", "pid":1},
			{"id":3, "name":"北京", "pid":2},
			{"id":4, "name":"上海", "pid":2},
			{"id":5, "name":"其他", "pid":2},
		{"id":6, "name":"香港", "pid":1},
		{"id":7, "name":"台湾", "pid":1},

	{"id":8, "name":"美国", "pid":0},

	{"id":9, "name":"亚洲", "pid":0},
		{"id":10, "name":"日本", "pid":9},
		{"id":11, "name":"韩国", "pid":9},
		{"id":12, "name":"其他", "pid":9},
];


function print_zons(zons, pid, str, path) {

    var has = false;
    for (var i = 0; i <= zons.length - 1; i++) {
        if (zons[i]['pid'] == pid) {

            has = true;
            path = path + "-" + zons[i]['id'];
            
            str += '<li class="node"> <a data-path=" ' + path + ' " href="">' + zons[i]['name'] + '</a> <ul class="cate_ul">';
            
            str = print_zons(zons, zons[i]['id'], str, path);
            
            if (str.match(/\<ul class=\"cate_ul\"\>$/g))
                str += ' </ul></li>';
            else if (str.match(/\<\/li\>$/g))
                str += ' </ul></li>';
            else
                str += '<i class="leaf">dd</i> </li>';
        }
    };
    if (typeof str === 'undefined')
        return ' ';
    else {
        if (has === false) {
            return str.replace(/\<ul class=\"cate_ul\"\>$/g, '');
        } else {
            return str;

        }

    }

}



$(function() {

    $("#zons_test").html(print_zons(zons, 0, '', ''));
    $("#zons_test ul").hide();
    $("#zons_test a").on("click", function(e) {
        e.preventDefault();
        var $next = $(this).next().first();
        if ($next.is('ul')) {
            $next.toggle();
        }
    });

});


