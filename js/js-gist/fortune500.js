const axios = require('axios');
const cheerio = require("cheerio");
const { isNull, isArray, isUndefined } = require('lodash');
const { stream } = require('assert-plus');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('500.db');
let domain = "http://www.fortunechina.com/fortune500/";

async function parseYearList() {
    try {
        const response = await axios.get(domain + "node_4302.htm");
        let $ = cheerio.load(response.data);
        let dataArr = [];
        $(".fiveH-con a").filter((i, t) => {
            let name = $(t).text();
            return !(name.includes("亏损") || name.includes("新闻") || name.includes("行榜") || name.includes("中国500强"))
        }).each((i, t) => {
            let year = $(t).text();
            let yearLink = $(t).attr('href');
            dataArr.push([year, yearLink]);
        })
        return dataArr;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function parseYearPage(year, yearLink) {
    try {
        const response = await axios.get(domain + yearLink);//1调用的throw reject
        let $ = cheerio.load(response.data);
        let dataArr = [];
        $("#leftdiv a").filter((i, t) => {//12 13
            let name = $(t).text();
            return name.includes("净资产收益率") || name.includes("利润率") || name.includes("亏损公司")
        }).each((i, t) => {
            let name = $(t).text().includes("净资产收益率") ? "净资产收益率" : $(t).text().includes("利润率") ? "利润率" : "亏损";
            let yearLink = $(t).attr('href');
            dataArr.push([year, name, yearLink]);
        })
        return dataArr;//2其余return resolve
    } catch (error) {
        console.error(error);
        throw error;//2手动throw  reject
    }
}

async function parseData(year, rate, rateLink) {
    try {
        const response = await axios.get(domain + rateLink);
        let $ = cheerio.load(response.data);

        let hyear = year.slice(0, 4);
        let hrate = rate.includes("净资产收益率") ? "roe" : rate.includes("利润率") ? "prof" : "loss";
        let dataArr = [];

        $("table").filter((i, t) => {
            return $(t).text().includes("排名") && $(t).text().includes("公司名称")
        }).find("tr").each(function () {
            let tdArr = $(this).children();
            let rank = tdArr.eq(0).text();
            let name = tdArr.eq(1).text();
            let data = tdArr.eq(2).text();
            if (name != "公司名称")
                dataArr.push([rank, name, data])
        });

        let table = hrate + hyear;
        db.serialize(function () {
            db.run("DROP TABLE IF EXISTS " + table + ";");
            db.run("CREATE TABLE " + table + " (rank integer, name text, " + hrate + " text)");

            let stmt = db.prepare("INSERT INTO " + table + " VALUES (?,?,?)");
            for (let i = 0; i < dataArr.length; i++) {
                stmt.run(dataArr[i][0], dataArr[i][1], dataArr[i][2]);
            }
            stmt.finalize();

            db.each("SELECT * FROM " + table, function (err, row) {
                //console.log(row.name + ": " + row[hrate]);
            });
        });
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function crawlToDb() {
    try {
        let yearLinks = await parseYearList();
        console.log(yearLinks);
        let yearRateLinks = await Promise.all(yearLinks.map(item => {
            return parseYearPage(item[0], item[1])
        }));
        console.log(yearRateLinks);

        let yearRoeLinks = yearRateLinks.map(items => {
            for (const key in items) {
                if (items[key][1] == "净资产收益率")
                    return items[key]
            }
        });
        console.log(yearRoeLinks);
        let yearProfLinks = yearRateLinks.map(items => {
            for (const key in items) {
                if (items[key][1] == "利润率")
                    return items[key]
            }
        });
        let yearLossLinks = yearRateLinks.map(items => {
            for (const key in items) {
                if (items[key][1] == "亏损")
                    return items[key]
            }
        });

        yearRateLinks = yearRoeLinks.concat(yearProfLinks).concat(yearLossLinks);
        console.log(yearRateLinks); 

        let result = await Promise.all(yearRateLinks.map(item => {
            return parseData(item[0], item[1], item[2])
        }));

        return result;

    } catch (error) {
        console.error(error);
        throw error;
    }
}



async function unite(rate, year1, year2) {
    try {
        let table1 = rate + year1;
        let table2 = rate + year2;
        let sql1 = "SELECT * FROM " + table1;
        let sql2 = "SELECT * FROM " + table2;

        let p1 = new Promise(function (resolve, reject) {
            db.all(sql1, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
        let p2 = new Promise(function (resolve, reject) {
            db.all(sql2, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        let [t1, t2] = await Promise.all([p1, p2]);
        t1.map(item1 => {
            for (const key in t2) {
                let item2 = t2[key];
                if (item1.name == item2.name) {
                    if (isUndefined(item1['count'])) item1['count'] = 1; else item1['count'] = item1['count'] + 1;
                    if (isArray(item1[rate])) item1[rate] = item1[rate].concat([year2 + "::" + item2[rate]]); else item1[rate] = [year1 + ":" + item1[rate]];
                    t2.splice(key, 1);
                    return item1;
                } else {
                    if (isUndefined(item1['count'])) item1['count'] = 1
                    if (!isArray(item1[rate])) item1[rate] = [year1 + "::" + item1[rate]];
                }
            }
            return item1;
        })
        t1.sort(function (a, b) { return b.count - a.count })
        t2.map((itme2) => {
            if (isUndefined(itme2['count'])) itme2['count'] = 1
            if (!isArray(itme2[rate])) itme2[rate] = [year2 + "::" + itme2[rate]];
        })
        //console.log(t1.concat(t2));
        return t1.concat(t2);
    } catch (error) {
        console.error(error);
        throw error;
    }

}

async function unite2(rate, preData, nextYear) {
    try {
        let nextYearTable2 = rate + nextYear;
        let sql = "SELECT * FROM " + nextYearTable2;

        //let t1 =  Object.assign({}, preData);
        //let t1 = preData;
        //let t1 = [...preData];
        let t1 = JSON.parse(JSON.stringify(preData));//deepClone
        let t2 = await new Promise(function (resolve, reject) {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });

        t1.map(item1 => {
            for (const key in t2) {
                let item2 = t2[key];
                if (item1.name == item2.name) {
                    item1['count'] = item1['count'] + 1;
                    item1[rate] = item1[rate].concat([nextYear + "::" + item2[rate]]);
                    t2.splice(key, 1);
                    return item1;
                }
            }
            return item1;
        })
        t1.sort(function (a, b) { return b.count - a.count })
        t2.map((itme2) => {
            if (isUndefined(itme2['count'])) itme2['count'] = 1
            if (!isArray(itme2[rate])) itme2[rate] = [nextYear + "::" + itme2[rate]];
        })
        //console.log(t1.concat(t2));
        return t1.concat(t2);

    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function uniteRate(rate, end, start) {
    try {
        let arr = [];
        for (let index = end - 1; index >= start; index--) {
            if (index == end - 1)
                arr[rate + end + "_" + index] = await unite(rate, end, index);
            else
                arr[rate + end + "_" + index] = await unite2(rate, arr[rate + end + "_" + (index + 1)], index);
        }
        return arr;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function analyze() {
    try {
        let roe = await uniteRate("roe", 2020, 2010);
        let prof = await uniteRate("prof", 2020, 2010);
        return [roe, prof]
    } catch (error) {
        console.error(error);
        throw error;
    }
}



async function main() {
    try {
        let result = await crawlToDb(); return;
        let data = await analyze();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
main();







async function test() {
    let roe20_19 = await unite('prof', 2020, 2019);
    //console.log("roe20_19", roe20_19);

    let roe20_18 = await unite2('prof', roe20_19, 2018);
    //console.log("roe20_18", roe20_18)

    let roe20_17 = await unite2('prof', roe20_18, 2017);
    console.log("roe20_17", roe20_17)
}
//test()

/*******
 *
 * 2020  2019   2018   2017  2016  2015
 *
 * !!!!!!!!!!! https://www.cnblogs.com/CyLee/p/9320569.html
 * node --inspect-brk get2.js    chrome://inspect/#devices
 *
 * 回调             promise                  [promise] async function{ await [promise] }
 *                    pending
 *                    resolove:value
 *                    rejtct:value
 *回调地狱          单层回调链
 *
 *
 *
 */
