<template>
	<form v-on:submit.prevent="editAttendee($event, status)">
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
	name: 'edit-attendee',
	props:{
		attendee: Object
	},
	data: function(){
		return {
			status: this.attendee.status
		};
	},
	methods: {
		editAttendee: function(event, status){
			this.$store.dispatch("editAttendee", {
				attendee: this.attendee,
				data: {
					status: status
				}
			});
			
		}
	}
};
</script>