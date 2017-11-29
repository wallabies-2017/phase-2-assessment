import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import DefaultNavBar from './DefaultNavBar.vue';
import EventCollection from './EventCollection.vue';
import EventSummary from './EventSummary.vue';
import EventDetail from './EventDetail.vue';
import CreateEvent from './CreateEvent.vue';
import EditEvent from './EditEvent.vue';
import AttendeeList from './AttendeeList.vue';
import AttendeeDetail from './AttendeeDetail.vue';
import CreateAttendee from './CreateAttendee.vue';
import EditAttendee from './EditAttendee.vue';


Vue.component(DefaultNavBar.name, DefaultNavBar);
Vue.component(EventCollection.name, EventCollection);
Vue.component(EventSummary.name, EventSummary);
Vue.component(EventDetail.name, EventDetail);
Vue.component(CreateEvent.name, CreateEvent);
Vue.component(EditEvent.name, EditEvent);
Vue.component(AttendeeList.name, AttendeeList);
Vue.component(AttendeeDetail.name, AttendeeDetail);
Vue.component(CreateAttendee.name, CreateAttendee);
Vue.component(EditAttendee.name, EditAttendee);