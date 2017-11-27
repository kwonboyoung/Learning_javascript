function alertRest(){ 
    var time = new Date();
    console.log(time);
    var hour = time.getHours();
    console.log(hour);
    if(hour == 17)
    {
        alert("잘가용");
    }
    else
    {
        alert("열공해용");
    }
}

//setInterval(alertRest, 5000);
