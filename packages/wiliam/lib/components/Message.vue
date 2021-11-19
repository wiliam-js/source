<template>
  <div v-show="visible" class="message-container">
    <div class="mask"></div>
    <div class="message-content">
      <!-- <svgIcon icon="#iconsuccess" :zStyle="{ width: '21px', height: '21px' }" /> -->
      <span class="text">{{text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      visible: false,
      text: ''
    }
  }
}
</script>

<style lang="less" scoped>
.message-container {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
  }

  .message-content {
    position: fixed;
    z-index: 1000;
    background: #31394C;
    border-radius: 2px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .svg-icon {
      vertical-align: middle;
    }

    .text {
      margin-left: 10px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.85);
    }
  }
}
</style>
