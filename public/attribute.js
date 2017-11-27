var btn = document.getElementById('setAttribute');
btn.onclick = function(){
    setWidth();
}

function setWidth(){
    var tb = document.getElementById('mytable');
    var size = prompt("원하는 사이즈를 입력하세요 : ");
    tb.setAttribute('style','width:'+size+'%');
}
