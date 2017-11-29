<!-- http://element.eleme.io/#/en-US/component/tabs -->

<!-- https://chenz24.github.io/vue-blu/#/en/components/pagination -->
<template>	
	<div class="columns">
		<div class="column">
			<el-tabs type="toggle" :is-full-width="true">
				
				<el-tab-pane label="Events" icon="image">
					<ul>
						<li 
							is="event-summary" 
							v-for="item in events" 
							v-bind:event="item">
						</li>
					</ul>
					<el-pagination
						v-model="current"
						:total="totalPages"
						layout="prev, pager, next"
					>
					</el-pagination>
				</el-tab-pane>
				
				<el-tab-pane label="Profile" icon="music">
					<p>Placeholder</p>
				</el-tab-pane>
				
				<el-tab-pane label="Create Event" icon="film">
					<div class="columns">
						<div class="column is-6" is="create-event"></div>
					</div>
				</el-tab-pane>
			
			</el-tabs>
		</div>
	</div>
</template>


<script>
export default {
	name: "event-collection",
	data: function(){
		return {
			current: parseInt(this.$route.query.page) || 1,
			perPage: 3
		}
	},
	computed: {
		totalPages: function(){
			return Math.ceil(this.$store.getters.getEvents.length  / this.perPage);
		},
		events: function(){
			var events, chunkStart, chunkEnd;
			events = this.$store.getters.getEvents;
			chunkStart = (this.current - 1) * this.perPage;
			chunkEnd = chunkStart + this.perPage;
			return events.slice(chunkStart, chunkEnd);
		}
	},
	watch: {
		"$route": function(newRoute, oldRoute){
			this.$set(this, "current", parseInt(newRoute.query.page));
		},
		"current": function(newPage, oldPage){
			this.$router.push({"path": location.path, "query": {"page": newPage}});
		}
	}
};
</script>