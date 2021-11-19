
import Message from '@/components/Message'

/**
 * 使用方法
 * import Vue from 'vue'
 * import Msg from 'wiliam/message'
 * Vue.use(Msg)
 */

const Msg = {}
Msg.install = (Vue) => {
  const vue = Vue
  const MessageClass = vue.extend(Message) // 将组件变成一个类
  const instance = new MessageClass()
  instance.$mount(document.createElement('div')) // 把这个实例化后的对象挂载到新建的 div 上
  document.body.appendChild(instance.$el) // 在 body 上添加这个 div

  let timer

  const MessageMain = {
    showMessage (text, duration, type) {
      clearTimeout(timer)
      if (duration) {
        timer = setTimeout(() => {
          instance.visible = false
        }, duration)
      }
      instance.text = text
      instance.type = type
      instance.duration = duration
      instance.visible = true
    },
    success (text, duration = 3000, type = 'success') {
      this.showMessage(text, duration, type)
    },
    fail (text, duration = 3000, type = 'fail') {
      this.showMessage(text, duration, type)
    }
  }

  vue.prototype.$feedback = MessageMain
}

export default Msg
