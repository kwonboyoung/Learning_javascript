var btn = document.getElementById('setClass');
btn.onclick = function(){
    console.log("button!!!");
    toggleClass();
}

function toggleClass(){
    var tb = document.getElementsByClassName("table")[0];
     console.log(tb.classList);
     console.dir(tb.classList);
     if(tb.classList.contains('table-hover')){
         tb.classList.remove('table-hover');
     }else{
         tb.classList.add('table-hover');
     }
    
    // 위와 같은 코드
    //tb.classList.toggle('table-hover');
}
