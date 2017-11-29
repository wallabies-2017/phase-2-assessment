<!-- http://element.eleme.io/#/en-US/component/tabs -->

<!-- http://element.eleme.io/#/en-US/component/pagination -->
<template>	
	<el-row>
		<el-col :offset="6" :span="12">
			<ul>
				<li 
					is="event-summary" 
					v-for="item in events" 
					v-bind:event="item">
				</li>
			</ul>
			<el-pagination
				v-model="current"
				:page-count="totalPages"
				:page-size="perPage"
				layout="prev, pager, next"
				v-on:current-change="currentChange"
			>
			</el-pagination>
		</el-col>
	</el-row>
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
	methods: {
		"currentChange": function(newPage){
			this.$set(this, "current", newPage);
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