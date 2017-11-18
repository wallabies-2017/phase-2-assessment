"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import api from './api/event';


Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true,
	state: {
		events: [],
	},
	mutations: {
		createEvent: function(state, payload){
			console.log(payload)
			state.events.push(payload)
		},
		loadEvents: function(state, payload){
			Vue.set(state, 'events', payload.data);
		},
		loadTickets: function(state, payload){
			console.log(payload)
			Vue.set(payload.obj, 'tickets', payload.data);
		},
		editEvent: function(state, payload){
			console.log(payload.obj, payload.data)
			Object.assign(payload.obj, payload.data);
		},
		createTicket: function(state, payload){
			
			console.log(payload)
			payload.obj.ticket.push(payload.data);
		},
		// deleteComment: function(state, payload){
		// 	// _.remove(payload.obj.comments, function(value){
		// 	// 	return value._id === payload.target;
		// 	// });
		// },
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
		createTicket: function(context, payload){
			console.log("Weee")
			api.createTicket(payload.event.id, payload.data).then(function({request, data}){
				console.log(payload)
				context.commit("createTicket", {
					obj: payload.event,
					data: data
				});
			});
			
		},
		// editTicket: function(context, payload){
		// 	api.editTicket(payload.tickets.id, payload.data).then(function({request, data}){
		// 		context.commit("editTicket", {
		// 			obj: payload.comment,
		// 			data: data
		// 		});
		// 	});
		// },
		// deleteComment: function(context, payload){
		// 	var comment = context.getters.getPost(payload.post._id)

		// 	if (!comment){
		// 		return false;
		// 	}

		// 	context.commit("deleteComment", {
		// 		obj: comment,
		// 		target: payload.comment._id
		// 	});
		// },
		deleteEvent: function(context, payload){
			console.log(payload.event)
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
		loadTickets: function(context, payload){
			
			// load comments for a post
			console.log(payload)
			var tickets = api.getTickets(payload.event.id);
			console.log(tickets)
			console.log("trying to load tickets")
			tickets.then(function({data, request}){
				
				context.commit("loadTickets", {
					"obj": payload.event,
					"data": data
				});
			});
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
		getTicket: function(state, getters){
			return function(eventId, ticketId){
				var event = getters.getEvent(eventId);
				if (event){
					return event.tickets.find(function(element){
						if (element._id === ticketId){
							return element;
						}
					});
				}
			}
		},
		getTickets: function(state, getters){
			return function(eventId){
				var event = getters.getEvent(eventId);
				if (event){
					return event.tickets
				}
			}
		},
	}
});

export default store;