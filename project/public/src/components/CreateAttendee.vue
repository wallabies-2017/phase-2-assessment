<template>
	<form v-on:submit.prevent="createAttendee($event, status)">
		<select v-model="status">
			<option>Attending</option>
			<option>Not Attending</option>
			<option>Maybe</option>
		</select>	

		<button type="submit">Submit</button>	
	</form>
</template>


<script>

export default {
	name: 'create-attendee',
	props:{
		event: Object
	},
	data: function(){
		return {
			status:'Not Attending'
		};
	},
	methods:{
		createAttendee: function(event, status){
			this.$store.dispatch("createAttendee", {
				event: this.event,
				data: {
					status: status
				}
			});
			this.$set(this, "status", "");
		}
	}
};
</script>