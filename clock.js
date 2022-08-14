function showTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s); 

    var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

    document.getElementById('myClock').innerHTML = h + ":" + m + ":" + s;
    document.getElementById('myDay').innerHTML = days[today.getDay()];
    setTimeout(showTime, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

showTime();