var is_widescreen_display = true;
var network_col = null;
var jobs_col = null;
function responsive() {
	$(window).resize(function() {
		if($(window).width() < 1050 && $(window).width() > 800 && is_widescreen_display == true) {
			network_col = $(".network-col");
			jobs_col = $(".new-job-col");
			$(".network-col").remove();
			$(".new-job-col").remove();
			$(".left-col-responsive").append(jobs_col).append(network_col);
			is_widescreen_display = false;
		}
		if($(window).width()> 1050 && is_widescreen_display == false ) {
			network_col = $(".network-col");
			jobs_col = $(".new-job-col");
			$(".left-col-responsive").empty();
			$(".contentrow").prepend(jobs_col);
			$(".contentrow").append(network_col);
			is_widescreen_display = true;
		}
		if($(window).width() < 800) {
			window.resizeTo(801, $(window).height());
		}
		
	});
}
function new_post() {
	$(".create-new-kind").click(function() {
		$(".create-new-kind").each(function() {
			$(this).css("text-decoration", "");
		});
		$(this).css("text-decoration", "underline");
		if($(this).text() == "New Post") {
			$(".post-content").remove();
			$(".new-post-kind").after('<div class="row post-content"><textarea rows="2" id="create-new-text" placeholder="Whats on your mind?" cols="50"></textarea></div>');
		}
		if($(this).text() == "Photos/Videos") {
			$(".post-content").remove();
			$(".new-post-kind").after('<div class="row post-content" style="margin: 10px;padding: 5px;"><input type="file" name="photos"></div>');
		}
		if($(this).text() == "Share Links") {
			$(".post-content").remove();
			$(".new-post-kind").after('<div class="row post-content" style="border: 1px solid #cccccc; margin: 10px;padding: 5px;"><div>Copy Link Here:</div><input type="text" name="" style="margin:0;padding:0;width:355px;border-radius: 2%;box-shadow: none;border: none;"></div>');
		}

	});
}
function create_new_post() {
	$("#post-this-message").click(function() {
		content = $(".post-content textarea").val();
		if(!content) {
			$(".post-content textarea").attr("placeholder", "You cannot create empty post.");
			return;
		}
		$("#create-new-post").after('<div class="column a-post">'+
			'<div class="row userprofile">'+
			'<img src="static/profilephoto.png" class="userimg">'+
			'<div class="column post-user">'+
			'<p class="username">Amy Alexander</p>'+
			'<p class="posttime">seconds ago</p>'+
			'</div>'+
			'</div>'+
			'<div class="row postcontent">'+
			'<p>' + content + '</p>'+
			'</div><div class="post-functions">'+
			'<div class="row likes">'+
			'<img class="function-icon like-icon" src="static/like.svg">'+
			'<p class="like-text">like</p>'+
			'<div class="people-who-liked">'+
			'</div>'+
			'</div>'+
			'<div class="row comments">'+
			'<img src="static/comment.svg" class="function-icon comment-icon">'+
			'<p class="comment-text">comment</p>'+
			'</div>'+
			'<div class="row sharelink">'+
			'<img class="function-icon share-icon" src="static/share.svg">'+
			'<p class="share-text">share</p>'+
			'</div>'+
			'</div>'+
			'</div>');
		$(".post-content textarea").val("");
		$(".post-content textarea").attr("placeholder", "What's on your mind?");
	});
	$(".post-content textarea").click(function() {
		$(this).attr("placeholder", "What's on your mind?")
	});
}
function like() {
	$(document).on("click", ".likes p", function() {
		if($(this).parent().find(".like-icon").attr("src") == "static/liked.svg") return;
		text = $(this).text();
		if(text == "like") text = "0 liked";
		likenumber = parseInt(text) + 1;
		$(this).parent().find("div").append('<img class="people-who-liked-photo" src="static/profilephoto.png" style="left:' + 15 * (likenumber - 1) +'px">');
		$(this).parent().find(".like-icon").remove();
		$(this).parent().prepend('<img class="function-icon like-icon" src="static/liked.svg">');
		$(this).text(likenumber + " liked")
	});
}

$(document).ready(function() {
	is_widescreen_display = ($(window).width()>1050) ? true : false;
	responsive();
	new_post();
	create_new_post();
	like();
});