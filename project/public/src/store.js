"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import api from './api/events';


Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true,
	state: {
		events: [],
	},
	mutations: {
		createEvent: function(state, payload){
			state.events.push(payload)
		},
		loadEvents: function(state, payload){
			Vue.set(state, 'events', payload.data);
		},
		loadComments: function(state, payload){
			Vue.set(payload.obj, 'comments', payload.data);
		},
		editEvent: function(state, payload){
			Object.assign(payload.obj, payload.data);
		},
		addComment: function(state, payload){
			payload.obj.comments.push(payload.data);
		},
		editComment: function(state, payload){
			Object.assign(payload.obj, payload.data);
		},

		deleteEvent: function(state, payload){
			for (let idx = 0; idx < state.events.length; idx++){
				if (state.events[idx].id === payload.target.id){
					state.events.splice(idx, 1);
					return;
				}
			}
		}
	},
	actions: {
		createEvent: function(context, payload){
			api.createEvent(payload.data).then(function({request,data}){
				context.commit("createEvent", data);
			});
			
		},
		editEvent: function(context, payload){
			api.editEvent(payload.event.id, payload.data).then(function({request, data}){
				context.commit("editEvent", {
					obj: payload.event,
					data: data
				});
			});
		},
		addComment: function(context, payload){
			if (payload.event){
				api.addEventComment(payload.event.id, payload.data).then(function({request, data}){
					context.commit("addComment", {
						obj: payload.event,
						data: data
					});
				});
			} else if (payload.comment){
				api.addCommentComment(payload.comment.id, payload.data).then(function({request, data}){
					context.commit("addComment", {
						obj: payload.comment,
						data: data
					});
				});
			}
		},
		editComment: function(context, payload){
			api.editComment(payload.comment.id, payload.data).then(function({request, data}){
				context.commit("editComment", {
					obj: payload.comment,
					data: data
				});
			});
		},

		deleteEvent: function(context, payload){
			api.deleteEvent(payload.event.id).then(function(){
				context.commit("deleteEvent", {
					target: payload.event
				});
			});
		},
		loadEvents: function(context){
			api.getEvents().then(function({data,request}){
				context.commit("loadEvents", {
					"data": data
				});
			});
		},
		loadComments: function(context, payload){
			if(payload.event){
				// load comments for a post
				var comments = api.getEventComments(payload.event.id);
				comments.then(function({data, request}){
					context.commit("loadComments", {
						"obj": payload.event,
						"data": data
					});
				});
			} else if (payload.comment){
				// load comments for a comment
				var comments = api.getCommentComments(payload.comment.id);
				comments.then(function({data, request}){
					context.commit("loadComments", {
						"obj": payload.comment,
						"data": data
					});
				});
			}
		}
	},
	getters: {
		getEvents: function(state, getters){
			return state.events;
		},
		getEvent: function(state, getters){
			return function(eventId){
				var viewEvent = state.events;
				return viewEvent.find(function(element){
					if (element._id === eventId){
						return element;
					}
				})
			}
		},
		getComment: function(state, getters){
			return function(eventId, commentId){
				var event = getters.getEvent(eventId);
				if (event){
					return event.comments.find(function(element){
						if (element._id === commentId){
							return element;
						}
					});
				}
			}
		},
		getComments: function(state, getters){
			return function(eventId){
				var comment = getters.getEvent(eventId);
				if (comment){
					return event.comments
				}
			}
		},
	}
});

export default store;