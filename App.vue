<script>
	export default {
		
		onLaunch: function() {
			this.bgAudioManager=uni.createInnerAudioContext()
			this.bgAudioManager.autoplay=true
			// console.log(this.bgAudioManager)
			
			this.a='56'
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style scoped>
	/*每个页面公共css */
	.container{ width:100%; height:calc(100vh - 75px); overflow: hidden;}
	.container scroll-view{height:100%;}
	.fixbg{width: 100%;height: 100vh;position: fixed;
	background-size: cover;background-position: center 0; filter: blur(20px); transform: scale(1.2);}

</style>
