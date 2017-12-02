import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

function register(component){
	Vue.component(component.name, component);
};

import DefaultNavBar from './DefaultNavBar.vue';
register(DefaultNavBar);

import EventCollection from './EventCollection.vue';
register(EventCollection);

import EventSummary from './EventSummary.vue';
register(EventSummary);

import EventDetail from './EventDetail.vue';
register(EventDetail);

import CreateEvent from './CreateEvent.vue';
register(CreateEvent);

import EditEvent from './EditEvent.vue';
register(EditEvent);

import AttendeeList from './AttendeeList.vue';
register(AttendeeList);

import AttendeeDetail from './AttendeeDetail.vue';
register(AttendeeDetail);

import CreateAttendee from './CreateAttendee.vue';
register(CreateAttendee);

import EditAttendee from './EditAttendee.vue';
register(EditAttendee);