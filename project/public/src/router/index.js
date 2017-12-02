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
				"header": { "template": '<h2>Jimmy Sucks</h2>'},
				"aside": { "template": "<default-navbar></default-navbar>"},
				"main": { 
					"template": '<event-detail :event="event"></event-detail>', 
					"props": {
						"event": {
							"required": true, 
							"type": Object
						}
					}
				}
			},
			props: { 
				main : function(route){
					event = DataStore.getters.getEvent(parseInt(route.params.id));
					if (event){
						return {"event": event};
					} else {
						console.log("error");
						return {"event": {"id": 7}};
					}
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