        var a = {
            "dbInfo": {
                "host": "102.24.32.626",
                "username": "root",
                "password": "dfdf!",
                "database": "dfdf",
                "port": 3306
            },
            "crawlerInfo": {
                "delay": "10000",
                "headers": {
                    "Accept": "text/plain, */*; q=0.01",
                    "X-Requested-With": "XMLHttpRequest"
                },
                "dataInfo": [{
                        "name": "SSE Composite Index",
                        "symbol": "12121",
                        "dbTable": "ax_ti121211",
                        "mark": "0",
                        "tag": "China"
                    }, {
                        "name": "Growth Enterprise Index",
                        "symbol": "399006",
                        "dbTable": "121212",
                        "mark": "1",
                        "tag": "China"
                    }]
            }
        };
 
        var b = {
            "dbInfo": {
                "host": "127.0.0.1",
                "username": "root",
                "password": "sogo12345",
                "database": "fffff",
                "port": 3306
            },
            "crawlerInfo": {
                "delay": "5000",
                "headers": {
                    "Accept": "text/plain, */*; q=0.01333333",
                    "X-Requested-With": "XMLHttpRequest"
                },
                "dataInfo": []
            }
        };
 
        function is(type, obj) {
            var clas = Object.prototype.toString.call(obj).slice(8, -1);
            return obj !== undefined && obj !== null && clas === type;
        }
 
        function multi_array_merge(json1, json2) {
            if (is('Object', json2)) {
                for (var key in json2) {
                    if (is('Object', json2[key]))
                        json1[key] = multi_array_merge(json1[key], json2[key]);
                    else
                        json1[key] = json2[key];
                }
            } else {
                json1 = json2;
            }
            return json1;
        }
 
 
        console.log(multi_array_merge(a, b));
