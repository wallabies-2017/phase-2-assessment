
"use strict";
console.log("sup")
// Uses AJAX functions from Hackernews
var createAJAXForm = function createAJAXForm(options){
	options = options || {};
	var self = {};

	self.getForm = options.getForm || function(){};

	self.errorTemplate = options.errorTemplate || $("#form-error-template").html();


	self.onSubmit = options.onSubmit || function onSubmit($form, onSuccess, onError){
		var self = this;

		$.ajax({
			url: $form.attr("action"),
			method: $form.attr("method"),
			data: $form.serialize(),
			success: onSuccess || self.onSuccess,
			error: onError || self.onError($form)
		});
	};

	self.onSuccess = options.onSuccess || function(){};

	self.onError = options.onError || function onError($form){
		return function(jqXHR, textStatus, errorThrown){
			var 
				rendered = '<p class="text-danger">' + textStatus + '</p>',
				data = {"errors": []};
			
			if (jqXHR.responseJSON){
				let errors = JSON.parse(jqXHR.responseJSON);
				$.each(errors, function(key, value){
					data.errors.push({
						"field": key,
						"errors": value
					});
				});
				rendered = Mustache.render(self.errorTemplate, data);
			}
			$form.find("div.error-display").html(rendered);
		};
	}

	self.parseAction = function parseAction(action, replace){
		var __replace = "/api/" + (replace ?  replace + "/":"");
		return action.replace(/^\/blog\//g, __replace);
	};	

	return self;
};

// <---------------------------------------------------------------->

var mountTweetCreateComponent = function mountTweetCreateComponent($el){

	var createTweetForm = createAJAXForm({
		"getForm": function(action){
			var 
				template = $("#tweet-form-template").html(),
				$el = $(template);
			
			if (action) {
				$el.attr("action", action);
			}
			return $el;
		}
	});

	$el.on("click", "a.tweet-reply-anchor", function(event){
		event.preventDefault();
		var $this = $(this);
		var $tweetFormContainer = $this.parents(".tweet").siblings(".tweet-form-container");
		var action = createTweetForm.parseAction($this.attr("href"));
		var $form = createTweetForm.getForm(action);

		$tweetFormContainer.html($form);
	});

	$el.on("submit", ".tweet-form-container form.tweet-create-form", function(event){
		event.preventDefault();
		var $form = $(this);
		
		createTweetForm.onSubmit(
			$form, 
			function(data){
				var tweetFormContainer = $form.parents(".tweet-form-container");
				tweetFormContainer.empty();
				var template = $("#tweet-detail-template").html();
				var rendered = Mustache.render(template, data);
				tweetFormContainer.siblings("ul").append('<li class="list-group-item">' + rendered + '</li>');
			}
		);
	});
};

// <---------------------------------------------------------------->

var mountTweetDeleteComponent = function mountTweetDeleteComponent($el){	
	var deleteCommentForm = createAJAXForm();

	$el.on("submit", ".tweet form.tweet-delete-form", function(event){
		event.preventDefault();
		var $form = $(this);
		$form.attr("action", deleteTweetForm.parseAction($form.attr("action")));
		deleteTweetForm.onSubmit(
			$form,
			function(data){
				var $tweet = $form.parents("div.tweet");
				$tweet.empty();
				var template = $("#tweet-detail-template"	).html();
				var rendered = Mustache.render(template, data);
				$tweet.html(rendered);
			}
		);
	});
};

// <---------------------------------------------------------------->

$(document).ready(function(){
	var 
		// $tweetDetail = $('.tweet-detail'),
		$tweetTree = $('.tweet-tree');
	
	// // Mount Create Post Component To $postDeatil
	// mountTweetCreateCommentComponent($tweetDetail);

	// Mount Delete Post Component To $postDeatil
	// mountTweetDeleteComponent($tweetDetail);

	// Mount Create Comment Component To $commentDetail
	mountTweetCreateComponent($tweetTree);

	// Mount Delete Comment Component To $commentTree
	mountTweetDeleteComponent($tweetTree);


});