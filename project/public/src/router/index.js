import Vue from 'vue';
import VueRouter from 'vue-router';

import DataStore from '../store/index.js';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			name: "events",
			path: "/",
			components: {
				"header": {"template": '<h2 class="align-center">Jimmy Sucks</h2>'},
				"aside": {"template": "<default-navbar></default-navbar>"},
				"main": {"template": "<event-collection></event-collection>"}
			},
			beforeEnter: function(to, from, next){
				if (DataStore.getters.getEvents.length){
					next();
				} else {	
					DataStore.dispatch('loadEvents').then(function(){
						next();
					});
				}
			}
		},
		{
			name: "create-event",
			path: "/create-event",
			components: {
				"header": {"template": '<h2 class="align-center">Jimmy Sucks</h2>'},
				"aside": {"template": "<default-navbar></default-navbar>"},
				"main": {"template": "<create-event></create-event>"}
			}
		},
		{
			name: "profile",
			path: "/profile",
			components: {
				"header": { "template": '<h2 class="align-center">Jimmy Sucks</h2>'},
				"aside": { "template": "<default-navbar></default-navbar>"},
				"main": { "template": "<p>Placeholder</p>" }
			}
		},
		{
			name: "event-detail",
			path: '/events/:id',
			name: 'event',
			components: 
			{
				"header": { "template": '<h2 class="align-center">Jimmy Sucks</h2>'},
				"aside": { "template": "<default-navbar></default-navbar>"},
				"main": { "template": "<event-detail></event-detail>" }
			},
			props: true,
			beforeEnter: function(to, from, next){
				event = DataStore.getters.getEvent(parseInt(to.params.id));
				if (event){
					to.params.event = event;
					if (!Object.hasOwnProperty.call(event, "attendees")){
						DataStore.dispatch("loadAttendees", {
							event: event
						}).then(function(){
							next();
						});
					} else {
						next();
					}
				} else {
					console.log("error");
					// next({name: '404'});
				}
			}
		},
		{
			path: '/error',
			name: '404',
			components: {
				"main": { "template": '<p>Not Found</p>' }
			}
		}
	]
});


export default router;