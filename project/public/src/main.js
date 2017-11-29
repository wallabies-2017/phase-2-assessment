
import Vue from 'vue';
import VueBlu from 'vue-blu';
import VueRouter from 'vue-router';
import 'vue-blu/dist/css/vue-blu.min.css';

Vue.use(VueBlu)
Vue.use(VueRouter);


import EventCollection from './components/EventCollection.vue'
import EventSummary from './components/EventSummary.vue';
import EventDetail from './components/EventDetail.vue';
import CreateEvent from './components/CreateEvent.vue';
import EditEvent from './components/EditEvent.vue';
import AttendeeList from './components/AttendeeList.vue';
import AttendeeDetail from './components/AttendeeDetail.vue';
import CreateAttendee from './components/CreateAttendee.vue';
import EditAttendee from './components/EditAttendee.vue';

import DataStore from './store.js'

Vue.component("event-collection", EventCollection)
Vue.component("event-summary", EventSummary);
Vue.component("event-detail", EventDetail);
Vue.component("create-event", CreateEvent);
Vue.component("edit-event", EditEvent);
Vue.component("attendee-list", AttendeeList);
Vue.component("attendee-detail", AttendeeDetail);
Vue.component("create-attendee", CreateAttendee);
Vue.component("edit-attendee", EditAttendee);


const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: EventCollection
		},
		{
			path: '/events/:id',
			name: 'event',
			component: EventDetail,
			props: true,
			beforeEnter: function(to, from, next){
				console.log(to);
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
			component: {template: '<p>Not Found</p>'}
		}
	]
});

router.beforeEach(function(to, from, next){
	if (DataStore.getters.getEvents.length){
		next();
	} else {	
		DataStore.dispatch('loadEvents').then(function(){
			next();
		});
	}
});

var app = new Vue({
	el: '#app',
	store: DataStore,
	router: router
});