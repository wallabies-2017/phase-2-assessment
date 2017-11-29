<!-- https://chenz24.github.io/vue-blu/#/en/components/form -->

<template>
	<form v-on:submit.prevent="createEvent($event, title, description, location)">
		<label class="label">Title:</label>
		<p class="control">
			<input class="input" type="text" placeholder="Event Title" v-model="title">
		</p>

		<label class="label">Description:</label>
		<p class="control">
			<textarea class="textarea" placeholder="Event Description" v-model="description"></textarea>
		</p>

		<label class="label">Location:</label>
		<p class="control">	
			<input class="input" type="text" placeholder="Event Location" v-model="location">
		</p>
		
		<p class="control">
			<button class="button is-primary is-outlined is-fullwidth">Create Event</button>
		</p>
			
	</form>
</template>


<script>
export default {
	name: 'create-event',
	data: function(){
		return {
			title:'',
			description:'',
			location: ''
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