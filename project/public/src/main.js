import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue'


import * as uiv from 'uiv'



import CreateEvent from './components/CreateEvent.vue'
import EventDetail from './components/EventDetail.vue'
import EventList from './components/EventList.vue'
import EventCollection from './components/EventCollection.vue'
import EditEvent from './components/EditEvent.vue'


import DataStore from './store.js'


Vue.component("create-event", CreateEvent);
Vue.component("event-list-item", EventDetail);
Vue.component("event-list-summary", EventList);
Vue.component("events-collection", EventCollection);
Vue.component("edit-event", EditEvent);



Vue.use(uiv)



const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<events-collection></events-collection>' }
const About = { template: '<p>about page</p>' };

const routes = {
  '/': Home,
  '/about': About
};

var app = new Vue({
	el: '#app',
	data: {
		privateState: {
			mode: {
				edit: false,
				detail: false
			}
		},
		sharedState: DataStore.state
	},
	store: DataStore,
	created: function(){
		this.$store.dispatch('loadEvents');
	}
});