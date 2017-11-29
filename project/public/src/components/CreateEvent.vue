<!-- https://chenz24.github.io/vue-blu/#/en/components/form -->

<template>
	<el-form ref="form" v-on:submit.prevent="createEvent($event, title, description, location)">
		<el-form-item label="Title:">
			<el-input v-model="title" placeholder="Event Title"></el-input>
		</el-form-item>
		
		<el-form-item label="Description:">
			<el-input type="textarea" v-model="description" placeholder="Event Description"></el-input>
			
		</el-form-item>

		<el-form-item label="Location:">
			<el-input type="text" v-model="location" placeholder="Event Location"></el-input>
		</el-form-item>
		
		<el-form-item>
			<el-button type="primary" v-on:click="onSubmit($event, title, description, location)">Create Event</el-button>
		</el-form-item>
	</el-form>
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
		onSubmit: function(event, title, description, location){
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