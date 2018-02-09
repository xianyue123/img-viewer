<template>
	<div id="home" class="content">
	    <div id="ppv_container" class="ppv_container">
        <div id="ppv">
            <div id="history_container"> </div>
			
        </div>
		<div class="ppv_toolbar">
			<div @click="play()"><span :class="{'iconfont icon-bofang1': isPlay, 'iconfont icon-tingzhi1': !isPlay}"></span></div>
			<div @click="forwardUp()"><span class="iconfont icon-jia2"></span></div>
			<div @click="forwardDown()"><span class="iconfont icon-jian2"></span></div>
		</div>
	    </div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				msg: '123',
				ppv: null,
				isPlay: true,
			}
		},
		mounted(){
       setTimeout(() => {
        var orderHeight = document.body.clientHeight;
        $('#home').height(orderHeight - $('#footBar').height());
        this.createPPV();
       }, 500);
       this.resizePPV();
		},
		methods:{
			play(){
				if(this.isPlay){
					console.log('play');
					this.ppv.play();
					this.isPlay = false;
				}else{
					console.log('stop');
					this.ppv.stop();
					this.isPlay = true;
				}
			},
			forwardUp(){
			  this.ppv.step(1);
			},
			forwardDown(){
			  this.ppv.step(-1);
			},
			createPPV(){
				this.ppv = new PP.PPV('ppv');
				this.ppv.setPref({
            //bgcolor:0x000000,//'rgb(255,255,255)',
            bgcolor:'rgb(83, 89, 93, 0.9)',
            fullView: 4,//照片是否填满div，不管是否会被裁剪
            enableArrow:false,
            enableHistory:false,
				    enableSurfaceDetection:false,     //禁止探面前进
				    enableDeviceOrientation:false,    //启用陀螺仪
            scope:50,//可视范围
            thumb:'Small',//缩略图尺寸，可选'Middle'，缺省'Middle'
            magnifier:{
                size:256,
                zoom:5.0,
                fix:false,//是否启动放大镜后，固定位置不变。另一个方式是，放大镜随鼠标移动
            },
            key:{
                play:32,		//播放	space
                fforward:33,	//快进	page up
                fbackward:34,	//快退	page down
                forward:38,		//前进	up
                backward:40,	//后退	down
                fullscreen:120,	//全屏	f9
            },
            arrows:{ //方向箭头位置
                forward:5,//向前
                below:1.8,//降低
                lean:18,//前倾
            },
            label:{
                fontface:'微软雅黑',	//字体
                fontsize:11,			//字高
                textColor:'#ffffff',	//文字颜色
                borderThickness:1,		//边框线宽，如果取0值，将禁用边框
                borderFillet:4,			//边框圆角
                borderColor:'rgba(19,182,232,1)',		//边框颜色
                backgroundColor:'rgba(81,198,234,0.9)',	//背景颜色
            },
				});
				// 2 ppvision服务地址
        //this.ppv.setServer("http://192.168.11.46:8013/PPVServer.asmx");
        this.ppv.setServer("http://47.94.22.143:8088/PPVServer.asmx");
        this.ppv.locate(4, 116.400322, 39.948607, '6MaPPMsBGdgxUqCVULFACSyXlnFENs7GaQSnJfin');
      },
      resizePPV(){
          $(window).resize(function(){
              var orderHeight = document.body.clientHeight;
              $('#home').height(orderHeight - $('#footBar').height()); 
          }).resize();
      }
		}
	}

</script>

<style scoped>

	.ppv_toolbar{
		position:absolute;/*在ppv内部定位*/
		/* background-color: rgba(53, 52, 52, 0.6); */
		border-radius: 4px;
		padding:4px;
		margin-top:5px;
		float: right; 
		right: 10px;
		bottom: 1rem;
		z-index: 1000;
	}
	.ppv_toolbar div{
		background: #fff;
		border-radius: 50%;
		width: 25px;
		height: 25px;
		margin-top: 10px;
		padding: 8px;
		box-shadow:0px 2px 2px #888888;
		text-align: center;
		cursor: pointer;
		color: rgb(70, 70, 70);
	}

	.ppv_toolbar div span{
		line-height: 25px;
		font-size: 20px;
	}

	.ppv_toolbar ul{
		background-color: #fff;
		width: 50px;
	}
	.ppv_toolbar ul li {
		color: #fff;
		list-style: none;
		float: right; 
		margin-right: 10px;
		/* background: rgb(37, 37, 37);     */
		padding: 2px 10px 2px 0px;
		/* border-right: 1px dashed #eaeaea; */
		cursor: pointer;
	}

    .container {
      margin: 5px;
    }

    .map_container {
      margin-left: 100%;
      height: 100%;
      /*margin: 2px;*/
      border: 1px solid #888888;
    }

    .ppv_container {
      width: 100%;
      height: 100%;
      margin: auto;
      height: 100%;
      margin: auto;
      /*水平居中*/
      float: left;
      /*margin: 2px;*/
      border: 1px solid #888888;
    }

    #ppv {
      position: relative;
      /*作为内部子元素的定位基准*/
      width: 100%;
      height: 100%;
      /*background-image: url(scripts/distribute/icon/error-imaj.jpg);*/
      background-color: #414141;
      /* 子水平居中 flex layout*/
      display: -webkit-flex;
      /* Safari */
      display: flex;
      justify-content: center;
    }

    .ppv_toolbar > span {
      margin: 8px;
    }

    .ppv_button {
      height: 32px;
      background-color: transparent;
    }

    .ppv_button:hover {
      background-color: lightgray;
    }

    #history_container {
      position: absolute;
      /*在ppv内部定位*/
      width: 100%;
      height: 100%;
      /* 子垂直居中 flex layout*/
      display: -webkit-flex;
      /* Safari */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #history {}

    .history_item {
      height: 128px;
      margin: 10px;
    }

    .history_item:hover {
      border: 1px solid #00F;
    }

    #lrs {}

    .lrs_item {
      margin: 5px;
    }
</style>
