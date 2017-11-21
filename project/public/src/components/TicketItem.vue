<template>
	<div>
		<ticket-summary 
			v-if="!mode.edit"
			v-bind:ticket="ticket"
		>
		</ticket-summary>

		<!-- <edit-comment 
			v-if="mode.edit"
			v-bind:comment="comment"
		>
		</edit-comment>
		<button 
			v-bind:key="comment.id"
			v-on:click="mode.edit = !mode.edit" 
		>
			{{ editMode }}
		</button> -->

		<!-- <button 
			v-bind:key="ticket.id"
			v-on:click="detailClick"
		>
			{{ detailMode }}
		</button> -->
		
		<transition-group name="component-fade" mode="in-out">

			<ul 
				v-if="mode.detail"
			>
				<li 
					is="ticket-item"
					v-bind:event="event"
					v-bind:ticket="ticket"
					
				></li>
			
			</ul>
		
		</transition-group> 
	</div>
</template>


<script>
export default {
	name: 'ticket-item',
	props:{
		event: Object,
		ticket: Object
	},
	data: function(){
		return {
			mode: {
				
				edit: false
			}
		}
	},
	methods: {
		detailClick: function(event){
			this.$set(this.mode, "detail", !this.mode.detail);
			if (this.mode.detail && !Object.hasOwnProperty.call(this.ticket, "tickets")){
				this.$store.dispatch("loadTickets", {
					ticket: this.ticket
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