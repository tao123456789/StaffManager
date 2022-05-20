<template>
  <div>
    <h2>网络已连接</h2>
    <div v-if="mask" class="offline-mask">
      <h2 class="offline-mask-title"> {{ offlineTitle }} </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "netStatus",
  props: {
    offlineTitle: {
      type: String,
      default: '网络已断开，请检查网络'
    },
    onlineTitle: {
      type: String,
      default: '网络已连接'
    }
  },
  data () {
    return {
      mask: false
    }
  },
  mounted () {
    window.addEventListener('offline', this.eventHandler)
    window.addEventListener('online', this.eventHandler)
  },
  beforeDestroy () {
    window.removeEventListener('offline', this.eventHandler)
    window.removeEventListener('online', this.eventHandler)
  },
  methods: {
    eventHandler (event) {
      let { offlineTitle, onlineTitle } = this
      const type = event.type === 'offline' ? 'error' : 'success'
      const title = type === 'error' ? offlineTitle : onlineTitle
      // element 的提示， UI不同这里换下
      this.$message({
        message: title,
        type: type
      })
      setTimeout(() => {
        this.mask = event.type === 'offline'
      }, 1500)
    }
  }
}
</script>

<style scoped lang="less">
.offline-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  z-index: 999;
  transition: position 2s;
  display: flex;
  align-items: center;
  justify-content: center;

  .offline-mask-title {
    color: rgba(0, 0, 0, .8);
  }
}
</style>
