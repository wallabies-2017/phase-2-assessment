<template>
	
	<form v-on:submit.prevent="createTicket($event, status)">
		<label>	Status:
			<input type="text" name="status" v-model="status">
		</label>

		<button type="submit">Create Ticket</button>
			
	</form>
</template>


<script>

export default {
	name: 'create-ticket',
	props:{
		event: Object,
		ticket: Object
	},
	data: function(){
		return {
			status:''

		};
	},
	methods:{
		createTicket: function(event, status){
			console.log(this.event)
			this.$store.dispatch("createTicket", {
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