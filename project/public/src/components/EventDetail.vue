<template>
	<div>

		<transition-group name="component-fade" mode="in-out">
			<event-list-summary 
				v-if="!mode.edit" 
				v-bind:event="event" 
				v-bind:key="event.id"
			>
			</event-list-summary>
			
			<edit-event 
				v-if="mode.edit" 
				v-bind:event="event" 
				v-bind:key="event.id"
			>
			</edit-event>
		</transition-group>

		<btn 


			v-bind:key="event.id"
			v-on:click="mode.edit = !mode.edit" 
		>
			{{ editMode }}
		</btn>


		<btn
			v-bind:key="event.id"
			v-on:click="detailClick"
		>
			{{ detailMode }}
		</btn>


		<btn size='small' type='danger' 

			v-bind:key="event.id"
			v-on:click="deleteEvent" 
		>
			Delete
		</btn>

	

		<transition-group name="component-fade" mode="in-out">
		<!-- 	<add-ticket 
				v-if="mode.detail && event.comments"
				v-bind:event="event"
				v-bind:key="event.id"
			>
			</add-ticket> -->

			<ul 
				v-if="mode.detail"
				v-bind:key="event.id"
			>
			
			</ul>
		
		</transition-group> 
	</div>
</template>

<script>
export default {
	name: 'event-list-item',
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

			if (this.mode.detail && !Object.hasOwnProperty.call(this.event, "comments")){
				this.$store.dispatch("loadComments", {
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