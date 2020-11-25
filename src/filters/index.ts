import Vue from 'vue'
import parseTime from './parseTime'
import parseNumber from './parseNumber'
import parseMoney from './parseMoney'

Vue.filter('parseTime', parseTime)
Vue.filter('parseNumber', parseNumber)
Vue.filter('parseMoney', parseMoney)
