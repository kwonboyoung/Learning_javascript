### 변수명 작성법

캐멀케이스(startName)

스네이크케이스(start_name)

헝가리언케이스(str_start_name)



### 코딩스타일

BSD 스타일이 퍼포먼스가 더 좋고, 많이 쓰인다.

<BSD>

for(조건문)

{

}



## javascript

```ruby
# gemfile
gem 'bootstrap-sass'
```

```ruby
# app << assets << stylesheets << application.scss
@import 'bootstrap';
```

```html
<script type="text/javascript">
  var el = 10;
  var el2 = 11;
  for(var a = 1; a < 10; a++)
  {
    console.log("HELLO");
    console.dir(console);
  }
</script>
```

```ruby
# Q. 오늘 출석한 사람 중에서 가장 키가 큰 사람은?
# 1. 배열을 만든다. 배열에 모든 사람의 키를 입력한다.
# 2. 첫번째 사람의 키를 알아낸다. 이 사람이 가장 큰 사람이라고 가정한다.
# 3. 두번째 사람....세번째 사람..... 돌면서 가장 큰 사람과의 키를 비교한다.
# 4. 가장 큰 사람보다 더 큰 사람이 나타나면 그 사람이 가장 큰 사람이라고 다시 가정한다.
# 5. 모든 사람의 키를 비교하면 가장 큰 사람의 키를 알 수 있다.

# Q. 홈페이지에 가입할 때 아이디 중복체크 하는 과정
# 1. 아이디를 폼에 입력한다.
# 2. 중복확인 버튼(이벤트 리스너)을 클릭한다. (이벤트)
# 3. 폼이 빈칸인지 확인. 안내메시지 출력. (메소드)
# 4. 빈칸이 아닌지 확인 후 db에 쿼리를 날린다.
# 5. row가 존재하는지 확인.
# 6. 결과값을 출력한다. 0이면 계정 없음. 1이면 중복.


# app >> assets >> javascripts >> posts.js
# Q. 50분마다 잠시 쉬는 시간을 가지는 안내메시지를 출력
# 17시는 마지막 시간이므로 수고하셨습니다. 메시지 출력
# 그 전에는 열공합니다 메시지 출력

# 1. 현재 시간을 가져온다.
# 2. 현재 시간 중에서 " 시"에 해당하는 부분을 가져온다.
# 3. " 시"에 해당하는 부분이 17 이상일 경우 "잘가용" 아닐 경우 "열공해용" 메시지를 출력한다. (alert)
# 4. 1,2,3에 해당하는 내용에 50분에 한번씩만 출력할 수 있도록 한다.

setInterval(function(){ 
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
}, 1*1000*60*60);
```

```ruby
# 미리 선언하지 않았더라고 어느 위치에서든 사용 가능
function 함수이름(파라미터){
  
}

# 미리 선언하지 않았을 경우, 사용 불가
var 함수이름 = function(파라미터){
  
}

# app >> assets >> javascripts >> posts.js
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

setInterval(alertRest, 5000);
  
# public >> title.js
# Q.모든 타이틀 들을 내가 원하는 이름으로 바꾸기
# (버튼을 눌렀을 때)
# 1. 버튼이 눌린다.
# 1-1. 버튼의 내용을 가져온다.
# 1-2. 버튼에 onClickListener를 달아준다.
# 1-3. 버튼을 눌렀을 때 메소드를 실행시킨다.
# 2. 타이틀에 해당하는 HTML ELEMENT들을 가져온다. 
# 3. 각각을 순환하며 내용을 바꾼다.
 
function setTitle(){
    var titles = document.getElementsByClassName('title');
    for(var i = 0; i < titles.length; i++){
        titles[i].innerHTML = "배가 아프다....."
    }
}

var btn = document.getElementsByTagName('button')[0];
btn.onclick = function(){
    alert("Done");
    setTitle();
};
  
# views >> posts >> index.html.erb
<button>setTitle</button>
<script src="./title.js"></script>

<td class="title"><%= post.title %></td>
<td class="content"><%= post.content %></td>
  
# 자바스크립트로 html 내용물 가져오기
document.getElementsById(ID명);
document.querySelectorAll(css selector명);
document.getElementsByClassName(class명);
document.getElementsByTagName(tag명);
```

```ruby
# views >> posts >> index.html.erb
<table id="mytable" class="table">
    
# views >> layouts >> application.html.erb
<div class="container">
<%= yield %>
</div>
  
# public >> class.js
# Q. 버튼을 눌렀을 때, table 태그에 class를 추가/삭제한다.
# 1. 버튼을 누른다.
# 1-1. 버튼 요소를 가지고 온다.
# 1-2. 버튼 요소에 eventListener(click)를 달아준다.
# 1-3. 버튼을 눌렀을 때 실행시킬 메소드를 작성한다.
# 2. table태그 요소를 가지고 온다.
# 3. table태그에 내가 원하는 class(table-hover)가 있는지 확인한다.
# 3-1. class가 있으면 제거한다.
# 3-2. class가 없으면 추가한다.

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
    // tb.classList.toggle('table-hover');
}

  
# views >> posts >> index.html.erb
<button id="setClass">setClass</button>
<script src="./class.js"></script>
    
<table id="mytable" class="table table-hover">
```

```ruby
# public >> attribute.js
# Q. table의 크기를 내가 원하는 만큼으로 설정하기
# style width -> 그때 그때 원하는 만큼으로
# 1. 버튼을 누른다.
# 1-1. 버튼 요소를 가지고 온다.
# 1-2. 버튼 요소에 eventListener(click)를 달아준다.
# 1-3. 버튼을 눌렀을 때 실행시킬 메소드를 작성한다.
# 2. table태그 요소를 가지고 온다.
# 2-1. prompt 창을 띄운다.
# 2-2. prompt 창에 내가 원하는 사이즈를 입력한다.
# 2-3. table의 style속성 중 width 속성을 바꾼다.

var btn = document.getElementById('setAttribute');
btn.onclick = function(){
    setWidth();
}

function setWidth(){
    var tb = document.getElementById('mytable');
    var size = prompt("원하는 사이즈를 입력하세요 : ");
    tb.setAttribute('style','width:'+size+'%');
}
```



- jQuery

  ```ruby
  # 다 같은 의미 (어떤 것이 load가 먼저 될지 보장하지 못할 때)
  $(document).on('ready',function(){
      
  });

  $(document).ready(function(){
      
  })

  $(function(){
      
  })
  ```

  ```ruby
  # _form.html.erb
  <div class="field">
      <%= f.label :title %><br>
    <%= f.text_field :title, class: 'form-control' %>
  </div>
    <div class="field">
        <%= f.label :content %><br>
      <%= f.text_area :content, class: 'form-control' %>
  </div>
      <div class="actions">
          <%= f.submit "작성", class: 'btn btn-success'%>
  </div>
        
  <script src="/form-control.js"></script>
        
  # public >> form-control.js
  # Q. post_title의 내용물이 바뀌면 alert를 통해 내용물을 확인한다.
  # 1. #post_title 요소를 가지고 온다.
  # 1-1. 요소에 onChangeListener를 달아준다.
  # 1-2. 요소의 바뀐 값을 추출한다.
  # 1-3. 값을 변수에 저장한다.
  # 2. 변수에 저장된 값을 alert한다.
        
  $(function(){
      $('#post_title').val("야호야호");
      $('#post_title').on("chage", function(){
          var text = $('#post_title').val();
          alert(text);
      })
  })
  ```

  



#Learning_javascript
