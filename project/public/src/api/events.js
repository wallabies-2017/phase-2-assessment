import axios from "axios";

axios.defaults.baseURL = '/api/v0/eventmanager';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const STATUSES = {
	"Attending": "A",
	"Not Attending": "N",
	"Maybe": "M"
};

export default {
	getEvents: function(){
		return axios({
			method: 'get',
			url: '/events'
		});
	},
	getEvent: function(eventId){
		return axios({
			method: 'get',
			url: '/events/' + eventId
		});
	},
	getEventAttendees: function(eventId){
		return axios({
			method: 'get',
			url: '/events/' + eventId + '/attendees'
		});
	},
	createEvent: function(data){
		return axios({
			method: 'post',
			url: '/events',
			data: data
		});
	},
	editEvent: function(eventId, data){
		return axios({
			method: 'put',
			url: '/events/' + eventId,
			data: data
		});
	},
	deleteEvent: function(eventId){
		return axios({
			method: 'delete',
			url: '/events/' + eventId
		});
	},
	createAttendee: function(eventId, data){
		data.status = STATUSES[data.status];
		return axios({
			method: 'post',
			url: '/events/' + eventId + "/attendees",
			data: data
		});
	},
	editAttendee: function(attendeeId, data){
		data.status = STATUSES[data.status];
		return axios({
			method: 'put',
			url: '/attendees/' + attendeeId,
			data: data
		});
	}
}