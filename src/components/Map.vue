<template>
    <div class="amap-page-container">
      <el-amap
        vid="amap"  
        :center="center"
        :zoom="zoom"
        :events="events"
        :rotateEnable="false"
        :resizeEnable="true"
        :zoomEnable="true"
        :expandZoomRange="true"
        :scrollWheel="true"
        :plugin="plugin">
      </el-amap>
      <div class="toolbar">
        <span v-if="loaded">
        </span>
      </div>
      <div class="ppv_toolbar">
			<div @click="zoomIn()"><span class="iconfont icon-jia2"></span></div>
			<div @click="zoomOut()"><span class="iconfont icon-jian2"></span></div>
		</div>
  </div>
</template>

<script>
//6e0f03dfaf84f14778eb981b0620906c

import Vue from 'vue';
// 引入vue-amap
import AMap from 'vue-amap';
Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: '6e0f03dfaf84f14778eb981b0620906c',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation','Geocoder']
});

export default {
    data: function() {
        let self = this;
        return {
            lng: 0.0,
            lat: 0.0,
          zoom: 12,
          center: [121.59996, 31.197646],
          address: '',
          events: {
            click(e) {
             let {lng, lat} = e.lnglat;
             self.lng = lng;
             self.lat = lat;
             console.log(e);
              // 这里通过高德 SDK 完成。
            //   var geocoder = new AMap.Geocoder({
            //     radius: 1000,
            //     extensions: "all"
            //   });        
            //   geocoder.getAddress([lng, lat], function(status, result) {
            //     if (status === 'complete' && result.info === 'OK') {
            //       if (result && result.regeocode) {
            //         self.address = result.regeocode.formattedAddress;
            //         self.$nextTick();
            //       }
            //     }
            //   });        
            }
          },
          plugin: [{
            pName: 'Geolocation',
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                    self.lng = result.position.lng;
                    self.lat = result.position.lat;
                    self.center = [self.lng, self.lat];
                    self.loaded = true;
                    self.$nextTick();
                  }
                });
              }
            }
          }]
        };
    },
    mounted() {
        setTimeout(() => {
            var orderHeight = document.body.clientHeight;
            $('.amap-page-container').height(orderHeight - $('#footBar').height());
        }, 500);
        this.resizeMap();
    },
    methods: {
        resizeMap(){
            $(window).resize(function(){
                var orderHeight = document.body.clientHeight;
                $('.amap-page-container').height(orderHeight - $('#footBar').height()); 
            }).resize();
        },
        zoomIn(){
            if(this.zoom < 19){
                this.zoom ++;
            }
        },
        zoomOut(){
            if(this.zoom > 3){
                this.zoom --;
            }
        }
        
    }
}
</script>

<style scoped>
    #map_content{
        height: 100%;
        width: 100%;
    }
     #amap {
      height: 100%;
    }
   .amap-logo{
        right:0 !important;
        left:auto !important;
        display: none !important;
    }
    .amap-copyright{
        right:70px !important;
        left:auto !important;
        display: none!important;
    }
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


</style>
