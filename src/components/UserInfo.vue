<template>
	<div class="content">
		<div class="header">
	    	<h2><img src="../../static/img/headimg.png" alt=""/></h2>
	        <ul class="clear">
	        	<li>
	                <p>{{username}}</p>
	            </li>
	            <li>
	                <router-link to="/user-login" ><p class="end">退出</p></router-link>
	            </li>
	        </ul>
	    </div>
	    <div class="docList">
	    	<ul>
	            <li class="gk-text">
	            	<i></i>
	                <p>公开博文</p>
	                <b></b>
	                <span>0</span>
	            </li>
	            <li class="mm-text">
	            	<i></i>
	                <p>秘密博文</p>
	                <b></b>
	                <span>0</span>
	            </li>
	            <li class="cg-text">
	            	<i></i>
	                <p>草稿箱</p>
	                <b></b>
	                <span>0</span>
	            </li>
	            <li class="sc-text">
	            	<i></i>
	                <p>收藏夹</p>
	                <b></b>
	                <span>0</span>
	            </li>
	        </ul>
	    </div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return {

			}
		},
		computed:{
			...mapGetters(['username'])
		},
		methods: {

		}
	}	
</script>
<style scoped>
	@import '../../static/css/mydoc.css';
</style>