import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import * as uiv from 'uiv';

import EventCollection from './components/EventCollection.vue'
import EventList from './components/EventList.vue';
import EventDetail from './components/EventDetail.vue';
import CreateEvent from './components/CreateEvent.vue';
import EditEvent from './components/EditEvent.vue';
import AttendeeList from './components/AttendeeList.vue';
import AttendeeDetail from './components/AttendeeDetail.vue';
import CreateAttendee from './components/CreateAttendee.vue';
import EditAttendee from './components/EditAttendee.vue';

import DataStore from './store.js'

Vue.component("event-collection", EventCollection)
Vue.component("event-list", EventList);
Vue.component("event-detail", EventDetail);
Vue.component("create-event", CreateEvent);
Vue.component("edit-event", EditEvent);
Vue.component("attendee-list", AttendeeList);
Vue.component("attendee-detail", AttendeeDetail);
Vue.component("create-attendee", CreateAttendee);
Vue.component("edit-attendee", EditAttendee);

Vue.use(uiv);

var app = new Vue({
	el: '#app',
	template: '<event-collection></event-collection>',
	store: DataStore,
	created: function(){
		this.$store.dispatch('loadEvents');
	}
});