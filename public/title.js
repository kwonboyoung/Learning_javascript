function setTitle(){
    var titles = document.getElementsByClassName('title');
    for(var i = 0; i < titles.length; i++){
        titles[i].innerHTML = "배가 아프다....."
    }
}

var btn = document.getElementById('setTitle');
btn.onclick = function(){
    alert("Done");
    setTitle();
};

