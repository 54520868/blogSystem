//对比日期过去了多久
function getDateDiff(dateTimeStamp) {
    var minute = 1000 * 60; //分钟
    var hour = minute * 60; //小时 
    var day = hour * 24; //天
    var halfamonth = day * 15; //半个月
    var month = day * 30; //一个月
    var year = month * 12;
    var now = new Date().getTime();  //获取当前的时间戳
    var diffValue = now - dateTimeStamp; // 将时间戳与当前时间相差得到的时间差  
    if (diffValue < 0) { return; } // 如果时间戳小于当前的一个时间戳 则为刚刚发布的
    //用相差的时间戳去除以相差的时间 拿到的则是对应时候的一个时间差 在对进行转换
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var yearc = diffValue / year;
    // console.log('yearc-年',yearc);
    // console.log('monthC-月',monthC);
    // console.log('weekC-周',weekC);
    // console.log('dayC-天',dayC);
    // console.log('hourC-小时',hourC);
    // console.log('minC-分钟',minC);
    // console.log('yearc-分钟',yearc);
    //排序方法是按 年-月-日-小时-分钟-秒 来排序的 如果当前表达式成立的话 则会直接返回对应的结果 不在进行判断转换
    if((yearc >= 1)) {
        result = parseInt(yearc) + "年前";
    }else if (monthC >= 1) {
        result = parseInt(monthC) + "月前";
    }else if (weekC >= 1) {
        result = parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = parseInt(minC) + "分钟前";
    } else {
        result = "刚刚";
    }
    return result;
}
//转换标准时间为时间戳：
function getDateTimeStamp(dateStr) {
    //获取传进来的时间 使用 Date.parse 转化为时间戳 将时间戳返回出去调用 getDateDiff 方法
    return Date.parse(dateStr.replace(/-/gi, "/"));
}
//传入时间返回对比的一个结果
function reducedResult(time) {
    timeStamp = getDateTimeStamp(time);
    return getDateDiff(timeStamp)
}

console.log(reducedResult('2022-01-16 15:02:20'));