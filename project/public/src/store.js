"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import api from './api/events.js'

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
		loadAttendees: function(state, payload){
			Vue.set(payload.obj, 'attendees', payload.data);
		},
		editEvent: function(state, payload){
			Object.assign(payload.obj, payload.data);
		},
		createAttendee: function(state, payload){
			payload.obj.attendees.push(payload.data);
		},
		editAttendee: function(state, payload){
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
		deleteEvent: function(context, payload){
			api.deleteEvent(payload.event.id).then(function(){
				context.commit("deleteEvent", {
					target: payload.event
				});
			});
		},
		createAttendee: function(context, payload){
				api.createAttendee(payload.event.id, payload.data).then(function({request, data}){
					context.commit("createAttendee", {
						obj: payload.event,
						data: data
					});
				});
		},
		editAttendee: function(context, payload){
			api.editAttendee(payload.attendee.id, payload.data).then(function({request, data}){
				context.commit("editAttendee", {
					obj: payload.attendee,
					data: data
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
		loadAttendees: function(context, payload){
			var attendees = api.getEventAttendees(payload.event.id);
			attendees.then(function({data, request}){
				context.commit("loadAttendees", {
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
		getAttendee: function(state, getters){
			return function(eventId, attendeeId){
				var event = getters.getEvent(eventId);
				if (event){
					return event.attendees.find(function(element){
						if (element._id === attendeeId){
							return element;
						}
					});
				}
			}
		},
		getAttendees: function(state, getters){
			return function(eventId){
				var event = getters.getEvent(eventId);
				if (event){
					return event.attendees
				}
			}
		},
	}
});

export default store;