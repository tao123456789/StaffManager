// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import allMaterial from './allMaterial'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#allMaterial',
  components: { allMaterial },
  template: '<allMaterial/>'
})
