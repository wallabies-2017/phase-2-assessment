<template>
	<div>
		<transition-group name="component-fade" mode="in-out">
			<event-summary 
				v-if="!mode.edit" 
				v-bind:event="event" 
				v-bind:key="event.id"
			>
			</event-summary>
			
			<edit-event
				v-if="mode.edit" 
				v-bind:event="event" 
				v-bind:key="event.id"
			>
			</edit-event>
		</transition-group>

		<button 
			v-bind:key="event.id"
			v-on:click="mode.edit = !mode.edit" 
		>
			{{ editMode }}
		</button>
		<button 
			v-bind:key="event.id"
			v-on:click="detailClick"
		>
			{{ detailMode }}
		</button>

		<button 
			v-bind:key="event.id"
			v-on:click="deleteEvent" 
		>
			Delete
		</button>

		<create-ticket
			v-bind:event="event"
			v-bind:key="event.id"
		>
			
		</create-ticket>
	</div>
</template>


<script>
export default {
	name: 'event-item',
	props:{
		event: Object
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
		deleteEvent: function(event){
			this.$store.dispatch("deleteEvent", {
				event: this.event
			});
		},
		detailClick: function(event){
			this.$set(this.mode, "detail", !this.mode.detail);

			if (this.mode.detail && !Object.hasOwnProperty.call(this.event, "tickets")){
				this.$store.dispatch("loadTickets", {
					event: this.event
				});
			}
		}
	},	
	computed: {
		editMode: function(){
			return this.mode.edit ? "Summary":"Edit";
		},
		detailMode: function(){
			return this.mode.detail ? "Hide":"Detail";
		},
	}	
};
</script>