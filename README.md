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


1. 댓글달기 -> ajax

2. 좋아요 -> ajax

3. infinite scroll

   ​

## 1. 댓글달기

```ruby
# gemfile.rb
gem 'faker'
gem 'kaminari'
gem 'devise'
gem 'bootstrap-sass'
```

```ruby
$ bundle install
$ rails g devise:install
$ rails g scaffold posts title contents:text
$ rails g devise user
$ rails g model comments post:references body:text
$ rake db:migrate
```

```ruby
# app >> assets >> stylesheets >> application.css 를 application.scss로 파일명 바꾸고
@import 'bootstrap';
```

```ruby
# views >> application.html.erb
  <%if user_signed_in? %>
    <%= link_to "SIGN OUT", destroy_user_session_path, class: "btn btn-danger", method: :delete, data: {confirm:"정말 로그아웃하시겠습니까?"}%>
  
  <%else%>
    <%= link_to "SIGN IN", new_user_session_path, class: "btn btn-info" %>
  
  <%end%>
  
  <%= link_to "HOME", root_path, class: "btn btn-success"%>
  
<div class="container">
<%= yield %>
</div>
```

```ruby
# routes.rb
root 'posts#index'
```

```ruby
# models >> post.rb
has_many :comments
```

```ruby
# views >> posts >> show.html.erb
<%= form_tag do %>
  <%= text_field_tag :body%>
  <%= submit_tag "댓글달기"%>
<%end%>
```

```ruby
# routes.rb
resources :posts do
  member do # member라고 함으로써 route가 /posts/:id라고 일일이 명시하지 않아도 됨
    post '/create_comment' => 'posts#create_comment', as: 'create_comment_to'
  end
end

	# rake routes 했을 때 아래 생성됨 확인 가능
create_comment_to_post POST   /posts/:id/create_comment(.:format) posts#create_comment
```

```ruby
# controllers >> posts_controller.rb
def create_comment
  puts "created comment"
end
```

```ruby
# views >> show.html.erb
<%= form_tag create_comment_to_post_path, id: "comment" do %>
  <%= text_field_tag :body%>
  <%= submit_tag "댓글달기"%>
<%end%>
  
<script>
  $(function(){
    var form = $('#comment');
  	form.on('click', function() {
    	alert("댓글 등록해");
    })
  
  	form.on('submit', function(e){
      e.preventDefault(); # url 날라가는 연결을 끊는다. 고로 alert가 뜨는 것만 확인가능.
      var contents = $('#body').val();
      alert(contents+" 라고 등록할꺼?");
    })
  })
</script>
```



Q. 댓글 달기 + ajax로 구현하기

1. input태그에 값(댓글내용)을 입력한다.

   1-0. submit 버튼을 클릭한다. (이벤트 발생)

   1-1. input태그에 있는 값을 가져온다.

   1-2. 값이 유효한지 확인한다. (빈칸?)

   1-3. 값이 없으면 값을 넣으라는 안내메시지를 뿌린다.

2. ajax로 처리한다.

   2-0. 현재 글은 어딘지, 작성자는 누군지 파악한다.

   2-1. db에 댓글을 저장한다.

3. 서버에서 처리가 완료되면 화면에 댓글을 출력한다.


```ruby
# views >> posts >> show.html.erb
<script>
  $(function(){
    var form = $('#comment');
    form.on('click', function() {
      /*alert("댓글 등록해");*/
    })
    # e는 submit에서 일어난 event를 말함
    form.on('submit', function(e){
      e.preventDefault();
      var contents = $('#body').val();
      alert(contents+" 라고 등록할꺼?");
      $.ajax({
        url: "<%= create_comment_to_post_path%>",
        method: "POST",
        data: {body: contents}
      })
    })
  })
</script>
```

```ruby
# views >> posts >> create_comment.js.erb 생성 # <script></script>라고 안해도 됨
alert("댓글이 등록됨");
```

```ruby
# controllers >> posts_controller.rb
before_action :set_post, only: [:show, :edit, :update, :destroy, :create_comment]

  
def create_comment
  unless user_signed_in?
    # respond_to is a rails specific method that defines how requests for different formats (like xml and html) are responded to
    respond_to do |format| 
      format.js {render 'please_login.js.erb'}
    end
  end
  @c = @post.comments.create(body: params[:body])
end
```

```ruby
# views >> posts >> please_login.js.erb 생성
if(confirm("로그인이 필요합니다. \n로그인 페이지로 이동하시겠습니까?"))
{
    location.href="<%= new_user_session_path%>";
}
```

```ruby
# views >> posts >> show.html.erb
<table class="table" id="comment_table">
  <thead>
    <tr>
      <th>댓글</th>  
    <tr>
  </thead>
  <tbody>
    <% @post.comments.each do |p|%>
      <tr>
        <td><%= p.body%><td>
      </tr>
    <%end%>
  </tbody>
</table>
    
# views >> posts >> create_comment.js.erb
alert("댓글이 등록됨");
$('#body').val("");
# append대신 prepend하면 방금 등록한 댓글을 맨 위로
$('#comment_table tbody').append(
`<tr>
    <td><%= @c.body%></td>
 </tr>`);
```



Q. 댓글 구현하기 (ajax를 통해서)

1. form 태그 안에 input 태그 만들기

2. submit 이벤트가 발생했을 경우에

3. form 태그 동작하지 않게 하기

4. input 태그 안에 있는 값 가져오기

   4-1. 빈칸인 경우 알림주기

5. jquery ajax를 이용해서 원하는 url로 데이터 보내기

   5-1. 로그인하지 않은 경우 알림주기

 undefined서버에서 댓글 등록하기

 undefined댓글이 등록됐다고 알림주기

8. 페이지 refresh없이 댓글 이어주기



## 2. 댓글 좋아요

```ruby
# views >> show.html.erb
<%= link_to 'Like', like_to_post_path, class: "btn btn-info", id: "like_button" %>

# routes.rb
post '/like_post' => 'posts#like_post', as: 'like_to'
```

Q. 좋아요 버튼 + ajax 구현

1. 좋아요 버튼을 누릅니다.

2. 버튼을 누른 경우

   2-1. 기존에 좋아요를 이미 누른 경우

   2-2. 기존에 좋아요를 누르지 않은 경우

   3-1. 이미 누른 경우에는 좋아요 취소

   3-2. 

```ruby
$ rails g model Like user:references post:references
$ rake db:migrate db:seed
```

```ruby
# models >> post.rb
has_many :likes

# models >> users.rb
has_many :likes
```

```ruby
# views >> show.html.erb
<%= link_to "Like(<span id='like_count'>#{@post.likes.count}</span>)".html_safe, like_to_post_path, class: "btn btn-info", id: "like_button" %>
```

```ruby
# posts_controller.rb
def like_post
  puts "Like post success"
end
```

```ruby
# views >> show.html.erb
$(function(){
    $('#like_button').on('click', function(e){
      e.preventDefault();
      console.log("Like button Clicked");
      $.ajax({
        method: "POST",
        url: "<%= like_to_post_path%>"
      })
    })
})
```

```ruby
# views >> like_post.js.erb 생성
alert("좋아요");
```

```ruby
# posts_controller.rb
before_action :set_post, only: [:show, :edit, :update, :destroy, :create_comment, :like_post]

def like_post
  unless user_signed_in?
    respond_to do |format|
      format.js {render 'please_login.js.erb'}
    end
  else
    # 기본적인 형태가 배열. 그러므로 first라고 해야 함.
    if Like.where(user_id: current_user.id, post_id: @post.id).first.nil?
      current_user.likes.create(post_id: @post.id)
    else
      current_user.likes.find_by(post_id: @post.id).destroy
    end
  end
end
```

```ruby
# posts_controller.rb
def show
  @like = current_user.likes.find_by(post_id: @post.id).nil?
end
```

```ruby
# views >> show.html.erb
<% if @like %>
  <%= link_to "Like".html_safe, like_to_post_path, class: "btn btn-info", id: "like_button" %>
<%else%>
  <%= link_to "DisLike".html_safe, like_to_post_path, class: "btn btn-danger", id: "like_button" %>
<%end%>
(<span id='like_count'><%=@post.likes.count%></span>)
```

```ruby
# posts_controller.rb
def like_post
  unless user_signed_in?
    respond_to do |format|
      format.js {render 'please_login.js.erb'}
    end
  else
    # 기본적인 형태가 배열. 그러므로 first라고 해야 함.
    if Like.where(user_id: current_user.id, post_id: @post.id).first.nil?
      @result = current_user.likes.create(post_id: @post.id)
    else
      @result = current_user.likes.find_by(post_id: @post.id).destroy
    end
  end
  # 메모리에는 있지만, db에는 남아있는 않는 상태 = freeze
  @result = @result.frozen?
end 
```

```ruby
# views >> posts >> like_post.js.erb
# @result가 freeze되어 nil일 경우
if(<%= @result%>){
    $('#like_button').text("Like").addClass("btn-info").removeClass("btn-danger");
}
else
{
    $('#like_button').text("DisLike").addClass("btn-danger").removeClass("btn-info");
}
$('#like_count').text(<%=@post.likes.count%>);
```

