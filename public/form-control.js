$(function(){
    $('#post_title').val("야호야호");
    $('#post_title').on("chage", function(){
        var text = $('#post_title').val();
        alert(text);
    })
})