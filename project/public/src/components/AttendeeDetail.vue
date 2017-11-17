<template>
	<div>
		<attendee-list 
			v-if="!mode.edit"
			v-bind:attendee="attendee"
		>
		</attendee-list>

		<edit-attendee 
			v-if="mode.edit"
			v-bind:attendee="attendee"
		>
		</edit-attendee>
		<button 
			v-bind:key="attendee.id"
			v-on:click="mode.edit = !mode.edit" 
		>
			{{ editMode }}
		</button>
	</div>
</template>


<script>
export default {
	name: 'attendee-detail',
	props:{
		parent: Object,
		attendee: Object
	},
	data: function(){
		return {
			mode: {
				detail: false,
				edit: false
			}
		}
	},
	methods: {
		detailClick: function(event){
			this.$set(this.mode, "detail", !this.mode.detail);

			if (this.mode.detail && !Object.hasOwnProperty.call(this.attendee, "attendees")){
				this.$store.dispatch("loadAttendees", {
					attendee: this.attendee
				});
			}
		}
	},
	computed: {
		editMode: function(){
			return this.mode.edit ? "Hide":"Change Status";
		},
		detailMode: function(){
			return this.mode.detail ? "Hide":"Detail";
		},
	}
	
};
</script>