오늘의 목표

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
    <td><%= link_to "삭제", destroy_comment_to_posts_path(@c.id), method: :delete, data:{confirm:"정말 삭제하시겠습니까?"}, class: "btn btn-warning", remote: true%><td>
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

```ruby
# posts_controller.rb
def create_comment
  @c = @post.comments.create(comment_params)
end
	
def comment_params
  params.require(:comment).permit(:body)
end
```

```ruby
# views >> posts >> show.html.erb
<%= form_tag create_comment_to_post_path, id: "comment" do %>
  <%= text_field_tag "comment[body]"%>
  <%= submit_tag "댓글달기"%>
<%end%>
  
$(document).on('submit','#comment', function(e){
  e.preventDefault();
  var contents = form.serialize(); # form에 들어있는 모든 input tag를 가져오는 것.
  // var contents = $('#comment_body').val();
  alert(contents[comment][body]+" 라고 등록할꺼?");
  $.ajax({
    url: "<%= create_comment_to_post_path%>",
    method: "POST",
    data: {body: contents}
  })
})
```

- 댓글 삭제 기능 추가

  ```ruby
  # routes.rb
    # /posts/:id
    # /posts/:id/edit
    resources :posts do
      # /posts/:id/{내가 설정한 url}
      member do
        post '/create_comment' => 'posts#create_comment', as: 'create_comment_to'
        post '/like_post' => 'posts#like_post', as: 'like_to'
      end
      # /posts/{내가 설정한 url}
      collection do
        delete '/:comment_id/destroy_comment' => 'posts#destroy_comment', as: 'destroy_comment_to'
      end
    end
  ```

  ```ruby
  # views >> posts >> show.html.erb
  <tbody>
      <% @post.comments.reverse.each do |c|%>
        <tr id="comment-<%= c.id %>">
          <td><%= c.body%><td>
          <td><%= link_to "삭제", destroy_comment_to_posts_path(c.id), method: :delete, data:{confirm:"정말 삭제하시겠습니까?"}, class: "btn btn-warning", remote: true%><td>
        </tr>
      <%end%>
  </tbody>
  ```

  ```ruby
  # posts_controllers.rb
  before_action :is_login?, only: [:create_comment, :like_post, :destroy_comment]
  # 로그인한 유저만 삭제 가능
  def destroy_comment
    @c = Comment.find(params[:comment_id]).destroy
  end
  ```

  ```ruby
  # views >> posts >> destroy_comment.js.erb 생성
  $('#comment-<%= @c.id %>').fadeOut();
  ```

  ​


## 3. infinite scroll

```ruby
# views >> posts >> index.html.erb
<td class="content"><%= truncate post.content, length: 20 %></td>
  
  # 하단에 추가
  <%= paginate @posts %>

<script>
  $(function() {
    var page_scroll_index = 1;
    $(document).on('scroll',function(){
      if($(window).scrollTop() == $(document).height() - $(window).height()){
        $.ajax({
          method: "GET",
          url: "<%=scroll_posts_path%>"
          })
        }
    });
  });
</script>
  
```

```ruby
# posts_controllers.rb
def index
  @posts = Post.order("created_at").page(params[:page])
end
```

```ruby
#routes.rb
collection do
      delete '/:comment_id/destroy_comment' => 'posts#destroy_comment', as: 'destroy_comment_to'
      get '/page_scroll' => 'posts#page_scroll', as: 'scroll'
end
```



```html
# document 안에 window가 돌아댕기고, document위부터 돌아댕기는 window창위까지의 길이가 $(window).scrollTop()이다.

$(window).scrollTop()  = $(document).height - $(window).height()
```



```ruby
# posts_controller.rb
def page_scroll
  @posts = Post.order("created_at").page(params[:page])
end
```

```ruby
# views >> posts >> page_scroll.js.erb 생성
console.log("무한스크롤");
```

```ruby
# index.html.erb 에서 table에 id를 mytable이라고 준 다음(id="mytable")
# views >> posts >> page_scroll.js.erb
alert("무한스크롤");

<% @posts.each do |post|%>
    $('#mytable tbody').append(
    `
    <tr>
        <td><%= post.id %></td>
        <td class="title"><%= post.title %></td>
        <td class="content"><%= truncate post.content, length: 20 %></td>
        <td><%= link_to 'Show', post %></td>
        <td><%= link_to 'Edit', edit_post_path(post) %></td>
        <td><%= link_to 'Destroy', post, method: :delete, data: { confirm: 'Are you sure?' } %></td>
    </tr>
    `);
<%end%>
```

```ruby
# views >> posts >> index.html.erb
<script>
  $(function() {
    var page_scroll_index = 1;
    $(document).on('scroll',function(){
      if($(window).scrollTop() == $(document).height() - $(window).height()){
        $.ajax({
          method: "GET",
          url: "<%=scroll_posts_path%>",
          data:{
            page: page_scroll_index++
          }
        })
      }
    });
  });
</script>
```

- 새로운 게시물이 위로 뜨도록

  ```ruby
  # posts_controller.rb
  def index
    @posts = Post.order("created_at DESC").page(params[:page])
  end

  def page_scroll
    @posts = Post.order("created_at DESC").page(params[:page])
  end

  ```

- scroll이 40개씩 뜨도록

  ```ruby
  # model >> post.rb
  class Post < ActiveRecord::Base
      has_many :comments
      has_many :likes
      
      paginates_per 40
  end
  ```

- method를 부르는 횟수가 적어야 효율적인 코드이다. $('#mytable').append()를 자꾸하면 안조아

  ```ruby
  # views >> posts >> page_scroll.js.erb
  $('#mytable tbody').append(
    `
  <% @posts.each do |post|%>
  <tr>
  	<td><%= post.id %></td>
  	<td class="title"><%= post.title %></td>
      <td class="content"><%= truncate post.content, length: 20 %></td>
      <td><%= link_to 'Show', post %></td>
      <td><%= link_to 'Edit', edit_post_path(post) %></td>
      <td><%= link_to 'Destroy', post, method: :delete, data: { confirm: 'Are you sure?' } %></td>
  </tr>
  <%end%>
  `);
  ```



## 4. 유효성 검사 (validation)

우리가 원하는 길이인지?

우리가 원하는 형태인지?



=> 검사

front / back

```ruby
# views >> posts >> show.html.erb
# keypress => 키를 누르는 즉시, keyup => 키에서 손을 떼는 즉시
$('#comment').on('keyup',function(){
  var text_length = $('#comment_body').val().length;
  $('#word_count').text(text_length);
})

# 댓글다는 form tag 근처에 추가
<h3><span id="word_count">0</span>/50</h3>
```

- max_length를 넘으면 안되도록

  ```ruby
  # views >> posts >> show.html.erb
  var max_text_length = 50;
  $('#comment').on('keyup',function(){
    var text_length = $('#comment_body').val().length;
    $('#word_count').text(text_length);
    $('#word_count').addClass('text-success').removeClass('text-danger');
    if(text_length > max_text_length){
      alert("최대 길이 넘음");
      $('#word_count').addClass('text-danger').removeClass('text-success');
      // max_length를 넘은 글은 삭제된다
      $('#comment_body').val($('#comment_body').val().substr(0, max_text_length));
      text_length = $('#comment_body').val().length;
      $('#word_count').text(text_length);
    }
  })
  ```

```ruby
# model >> comment.rb
class Comment < ActiveRecord::Base
  belongs_to :post
  validates :body, length: {maximum: 40}, presence: true
  # return값이 40
  def self.MAX_LENGTH   
    40
  end
end
```

```ruby
# views >> posts >> show.html.erb
var max_text_length = <%=Comment.MAX_LENGTH %>;

<h3><span id="word_count">0</span>/<%= Comment.MAX_LENGTH%></h3>
```

