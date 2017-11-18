import axios from "axios";

axios.defaults.baseURL = '/api/v0/event-management';
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
	getTickets: function(eventId){
		return axios({
			method: 'get',
			url: '/events/' + eventId + '/tickets'
		})
	},
	// getPostComments: function(postId){
	// 	return axios({
	// 		method: 'get',
	// 		url: '/posts/' + postId + '/comments'
	// 	});
	// },
	// getCommentComments: function(commentId){
	// 	return axios({
	// 		method: 'get',
	// 		url: '/comments/' + commentId + '/comments'
	// 	});
	// },
	createEvent: function(data){
		return axios({
			method: 'post',
			url: '/events',
			data: data
		});
	},
	deleteEvent: function(eventId){
		console.log(eventId)
		return axios({
			method: 'delete',
			url: '/events/' + eventId
		});
	},
	editEvent: function(eventId, data){
		console.log(eventId)
		console.log(data)
		console.log("chillin")
		return axios({
			method: 'put',
			url: '/events/' + eventId,
			data: data
		});
	},
	createTicket: function(eventId, data){
		console.log(eventId)
		return axios({
			method: 'post',
			url: '/events/' + eventId + '/tickets',
			data: data
		});
	}
	// addCommentComment: function(commentId, data){
	// 	return axios({
	// 		method: 'post',
	// 		url: '/comments/' + commentId + "/comments",
	// 		data: data
	// 	});
	// },
	// editComment: function(commentId, data){
	// 	return axios({
	// 		method: 'put',
	// 		url: '/comments/' + commentId,
	// 		data: data
	// 	});
	// }
}