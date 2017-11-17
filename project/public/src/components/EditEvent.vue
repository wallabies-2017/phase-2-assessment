<template>
	<form v-on:submit.prevent="editEvent($event, title, description, location)">
		<label> Title:
			<input type="text" name="title" v-model="title">
		</label>
		<label>	Description:
			<input type="text" name="description" v-model="description">
		</label>
		<label>	Location:
			<input type="text" name="location" v-model="location">
		</label>		
			<button type="submit">Edit Event</button>
			
	</form>
</template>


<script>
export default {
	name: 'edit-event',
	props:{
		event: Object
	},
	data: function(){
		return {
			title: this.event.title,
			description: this.event.description,
			location: this.event.location
		};
	},
	methods: {
		editEvent: function(event, title, description, location){
			this.$store.dispatch("editEvent", {
				event: this.event,
				data: {
					title: title,
					description: description,
					location: location
				}
			});
			
		}
	}
};
</script>