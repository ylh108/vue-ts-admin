<template>
    <div>
        <el-button class="btn" @click="back" v-show="currentLevel !== 'china' && currentLevel">返回</el-button>
        <div class="map">
            <div id="cascade" style="height: 100%;"></div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
import { filterRepeat } from '@/utils'

@Component({
    components: {}
})
export default class Cascade extends Vue {
    currentLevel = 'china' // 默认china
    recordList: any = [] // 记录
    // 地图默认配置项
    config = {
        areaColor: '#EFF7FF',
        borderColor: '#96C2F1'
    }
    map: any = null
    myChart: any = ''
    option: any = {
        // title: {
        //     text: '中国地图',
        //     x: 'center',
        //     top: 50,
        //     textStyle: {
        //         fontSize: 30,
        //         color: '#9c0505'
        //     }
        // },
        tooltip: {
            trigger: 'item',
            // formatter: "{c}"
            formatter: function (item: any, name: string) {
                if (!item.value) return
                const tipHtml =
                    '<div style="background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
                    '<div style="padding:5px 10px">' +
                    '<div style="color:#fff;font-size:12px;">' +
                    item.name +
                    '：<span style="color:#f48225;margin-left: 6px;">' +
                    item.value +
                    '</span></div></div></div>'
                return tipHtml
                // return item.value ? (`${item.name}：${item.value}`) : ''
            }
        },
        series: [],
        visualMap: {
            type: 'piecewise',
            show: true,
            bottom: 0,
            left: '20%',
            textStyle: {
                fontSize: 12,
                color: '#333',
                fontWeight: 'bolder'
            },
            pieces: [
                { min: 0, max: 10, color: '#ddebf7' },
                { min: 10, max: 100, color: '#bdd7ee' },
                { min: 100, max: 200, color: '#9bc2e6' },
                { min: 200, max: 300, color: '#2f75b5' },
                { min: 301, label: '300+', color: '#1f4e78' },
                { value: 'NAN', label: 'NA', color: '#808080' }
            ],
            itemWidth: 30,
            itemHeight: 20,
            symbolSize: 20
        }
    }
    // 生成地图
    async createMap ({ id, name, level }: any) {
        const { list, mapName }: any = await this.getMap(this.currentLevel || 'china', id)
        this.recordList.push({
            id,
            name,
            level
        })
        list.unshift({
            name: '南海诸岛', // 不显示在地图上
            itemStyle: {
                normal: { opacity: 0, label: { show: false } }
            },
            label: {
                normal: {
                    show: false
                }
            }
        })
        if (list.length > 7) {
            // 假数据
            list[1].value = 100
            list[5].value = 300
            list[7].value = 300
        }
        // 配置
        let _id: any = document.getElementById('cascade')
        this.myChart = echarts.init(_id)
        this.myChart.clear() // 清楚缓存
        this.myChart.setOption({
            ...this.option,
            ...{
                series: [
                    this.getMapSeriesConfig({
                        map: mapName,
                        data: list
                    })
                ]
            }
        })
        this.myChart.on('click', this.mapClick)
        window.addEventListener('resize', () => {
            this.myChart.resize()
        })
    }
    // 点击地图
    mapClick ({ data }: any) {
        this.toMap(data)
        console.log(data)
    }
    // 切换地图
    toMap (data: any) {
        this.currentLevel = data.level
        this.createMap(data)
    }
    // 获取 base config
    getMapSeriesConfig (options = {}) {
        return Object.assign(
            {
                type: 'map',
                roam: true,
                zoom: this.currentLevel && this.currentLevel !== 'china' ? 1.2 : 2.5,
                scaleLimit: {
                    min: 1,
                    max: 20
                },
                label: {
                    show: true,
                    color: '#333',
                    fontSize: 12
                },
                itemStyle: {
                    areaColor: this.config.areaColor,
                    borderType: 'dotted',
                    borderColor: this.config.borderColor
                },
                emphasis: {
                    label: {
                        color: '#fff',
                        fontSize: 18
                    },
                    itemStyle: {
                        areaColor: '#9c0505'
                    }
                }
            },
            options
        )
    }
    // 根据level获取地图
    async getMap (level: any, id?: any) {
        switch (level) {
        case 'china':
            this.map = await require('@/assets/map/china.json')
            break
        case 'province':
            this.map = await require(`@/assets/map/province/${id}_full.json`)
            break
        case 'city':
            this.map = await require(`@/assets/map/city/${id}_full.json`)
            break
        case 'district':
            this.map = {
                type: 'FeatureCollection',
                features: this.map.features.filter(
                    (i: any) => i.properties.adcode === id
                )
            }
            break
        }
        const mapName = id ? `${level}-${id}` : level
        const list = []

        for (let i of this.map.features) {
            const name = i.properties.name
            const id = i.properties.adcode
            const level = i.properties.level
            list.push({ id, name, level })
        }
        // 注册地图
        echarts.registerMap(mapName, this.map)
        return { mapName, list }
    }
    back () {
        if (this.recordList.length) {
            this.recordList = filterRepeat(this.recordList, 'id')
            this.recordList.pop()
            const item = this.recordList.pop()
            this.toMap(item || {})
        } else {
            this.toMap({})
        }
    }
    mounted () {
        this.createMap({})
    }
}
</script>

<style lang="stylus" scoped>
.map {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;

    #chart {
        margin: 0 auto;
    }
}
.btn {
    position: relative;
    z-index: 1;
}
</style>
