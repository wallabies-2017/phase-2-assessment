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
				edit: false,
			}
		}
	},
	computed: {
		editMode: function(){
			return this.mode.edit ? "Hide":"Change Status";
		},
	}
	
};
</script>