<template>
	<div class="content">
	    <h1></h1>
	    <div class="login-box">
	    	<p class="lsolid"></p>
	        <div class="login">
	        	<router-link to="/user-login">登录</router-link>
	        </div>
	        <p class="rsolid"></p>
	    </div>
	    <ul>
	        <li class="lifirst">
	        	<input type="text" value="" v-model="username"/>
	            <span>帐号：</span>
	        </li>
	        <li>
	        	<input type="password" value="" v-model="password"/>
	            <span>密码：</span>
	        </li>
	    </ul>
	    <div class="footbox">
	        <input type="button" value="登 录" class="login-btn" @click="login"/>
	    </div>
	</div>
</template>

<script>

	import { mapActions } from 'vuex';
	import { Toast } from 'mint-ui';
	export default {
		data(){
			return {
				username: 'admin',
				password: 'admin'
			}
		},
		methods: {
			login(){
				this.$http({method: 'post', url: '/api/service/login', params:{username: this.username, password: this.password},
				}).then((res) =>{
					if(res.data.success == true){
						 Toast({ message: res.data.detail , position: 'bottom', duration: 2000 });
						 this.setToken(res.data.token); this.setUsername(res.data.username);
						 window.localStorage.setItem('ppvserver-token', res.data.token);
						 this.$router.push('/user-info');
					}else{
						this.setToken(null);
						window.localStorage.removeItem('ppvserver-token');
						Toast({ message: res.data.detail , position: 'bottom', duration: 2000 });
					}
				})
			},
			...mapActions(['setToken', 'setUsername'])
		},
		mutations() {
			
		},
		mounted(){

		}
	}
</script>

<style scoped>
	body{ background:#f2f4f5;}
	.content{max-width:6.4rem; margin:0 auto;}
	.content .fhbtn{ padding-top:0.27rem;}
	.content .fhbtn a{ display:block;width:0.23rem;height:0.25rem; background:url(../../static/img/history1.png) no-repeat 0 0; background-size:100%; margin-left:0.3rem;}
	.content h1{width:2.18rem;height:1.35rem; background:url(../../static/img/logo.png) no-repeat 0 0; background-size:100%; margin:0 auto; margin-top:1.22rem;}
	.content .login{width:2.0rem;height:0.38rem; margin:0 auto; margin-top:0.85rem; text-align: center;}
	.login a{width:0.97rem;height:0.38rem; font-size:0.35rem; line-height:0.38rem; color:#4c4f50; text-align:center;}
	.login span{ float:left;height:0.38rem; border-left:1px solid #4c4f50;}
	.content .login-box{ position:relative;}
	.content .login-box .lsolid{width:2.5rem;height:0.18rem; border-bottom:1px solid #4c4f50; position:absolute;top:0;left:0.1rem;}
	.content .login-box .rsolid{width:2.5rem;height:0.18rem; border-bottom:1px solid #4c4f50; position:absolute;top:0;right:0.1rem;}
	.content ul{width:5.78rem;height:1.92rem; border:1px solid #e5e7e8; background:#fff; margin:0 auto; margin-top:0.68rem;}
	.content ul li{height:0.95rem; position:relative;}
	.content ul li.lifirst{border-bottom:1px solid #e5e7e8;}
	.content ul li input{ padding-left:1.3rem; width:4.54rem; height:100%; font-size:0.25rem; padding-top: 0.05rem;}
	.content ul li span{width:1.28rem;height:0.49rem; position:absolute;top:0.26rem;left:0; color:#676868; font-size:0.25rem; line-height:0.49rem; text-align:center;}
	.content .footbox{width:4.65rem;height:0.65rem;margin:0 auto; }
	.content .login-btn{width:4.65rem;height:0.65rem; background:#00b7ff; color:#fff; text-align:center; line-height:0.65rem; border-radius:8px; display:block; margin-top:0.62rem; font-size:0.28rem;}
	.content .tishi{width:1.4rem; font-size:0.25rem; margin-top:0.28rem; display:block;}
</style>