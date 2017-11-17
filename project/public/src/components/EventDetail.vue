<template>
	<div>
		<transition-group name="component-fade" mode="in-out">
			<event-list 
				v-if="!mode.edit" 
				v-bind:event="event" 
				v-bind:key="event.id"
			>
			</event-list>
			
			<edit-event 
				v-if="mode.edit" 
				v-bind:event="event" 
				v-bind:key="event.id"
			>
			</edit-event>
		</transition-group>
		<button 
			v-bind:key="event.id"
			v-on:click="mode.detail = !mode.detail"
		>
			{{ detailMode }}
		</button>
		<button
			v-bind:key="event.id"
			v-on:click="attendeesClick"
		>
			{{ attendeesMode }}
		</button>
		<button 
			v-bind:key="event.id"
			v-on:click="mode.edit = !mode.edit" 
		>
			{{ editMode }}
		</button>
		
		<button 
			v-bind:key="event.id"
			v-on:click="deleteEvent" 
		>
			Delete
		</button>
		

		<transition-group name="component-fade" mode="in-out">
			<create-attendee 
				v-if="mode.detail"
				v-bind:event="event"
				v-bind:key="event.id"
			>
			</create-attendee>

			<ul 
				v-if="mode.attendees"
				v-bind:event="event"
				v-bind:key="event.id"
			>
				<li 
					is="attendee-detail"
					v-for="attendee in event.attendees"
					v-bind:attendee="attendee"
					v-bind:key="attendee.id"
				></li>
			
			</ul>
		
		</transition-group> 
	</div>
</template>

<script>
export default {
	name: 'event-detail',
	props:{
		event: Object
	},
	data: function(){
		return {
			mode: {
				detail: false,
				edit: false,
				attendees: false,
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

			if (this.mode.detail && !Object.hasOwnProperty.call(this.event, "attendees")){
				this.$store.dispatch("loadAttendees", {
					event: this.event
				});
			}
		},
		attendeesClick: function(event){
			this.$set(this.mode, "attendees", !this.mode.attendees);

			if (this.mode.attendees && !Object.hasOwnProperty.call(this.event, "attendees")){
				this.$store.dispatch("loadAttendees", {
					event: this.event
				});
			}
		},
	},	
	computed: {
		editMode: function(){
			return this.mode.edit ? "Hide":"Edit";
		},
		detailMode: function(){
			return this.mode.detail ? "Hide":"Going?";
		},
		attendeesMode: function(){
			return this.mode.attendees ? "Hide":"Attendee List";
		},
	}	
};
</script>