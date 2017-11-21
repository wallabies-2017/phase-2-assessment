import axios from "axios";

axios.defaults.baseURL = '/api/v0/events';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


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
	getEventTickets: function(eventId){
		return axios({
			method: 'get',
			url: '/events/' + eventId + '/tickets'
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
	addEventComment: function(eventId, data){
		return axios({
			method: 'post',
			url: '/events/' + eventId + "/comments",
			data: data
		});
	},
	editComment: function(commentId, data){
		return axios({
			method: 'put',
			url: '/comments/' + commentId,
			data: data
		});
	}
}