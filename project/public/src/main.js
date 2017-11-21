
import Vue from 'vue';
import * as uiv from 'uiv';

Vue.use(uiv);


import EventItem from './components/EventItem.vue'
import EventSummary from './components/EventSummary.vue'
import CreateEvent from './components/CreateEvent.vue'
import EditEvent from './components/EditEvent.vue'
import CreateTicket from './components/CreateTicket.vue'
import TicketItem from './components/TicketItem.vue'
import TicketSummary from './components/TicketSummary.vue'

import DataStore from './store.js'

Vue.component("event-item", EventItem);
Vue.component("event-summary", EventSummary);
Vue.component("create-event", CreateEvent);
Vue.component("edit-event", EditEvent);
Vue.component("create-ticket", CreateTicket);
Vue.component("ticket-item", TicketItem);
Vue.component("ticket-summary", TicketSummary);



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
