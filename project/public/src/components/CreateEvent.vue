<template>
	<form v-on:submit.prevent="createEvent($event, title, description, location)">
		<label> Title:
			<input type="text" name="title" v-model="title">
		</label>
		<label>	Description:
			<input type="text" name="description" v-model="description">
		</label>
		<label>	Location:
			<input type="text" name="location" v-model="location">
		</label>
		
			<button type="submit">Create Event</button>
			
	</form>
</template>


<script>
export default {
	name: 'create-event',
	data: function(){
		return {
			title:'',
			description: '',
			location: '',

		};
	},
	methods:{
		createEvent: function(event, title, description, location){
			this.$store.dispatch("createEvent", {
				data: {
					title: title,
					description: description,
					location: location
				}
			});
			this.$set(this, "title", "");
			this.$set(this, "description", "");
			this.$set(this, "location", "");
			
		}
	}
}
</script>