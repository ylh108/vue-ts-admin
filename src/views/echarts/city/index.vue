<template>
    <div>
        <div class="map">
            <div id="city" style="height: 100%;"></div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import echarts from 'echarts'

@Component({
    components: {}
})
export default class City extends Vue {
    myChart: any = ''
    option: any = {
        title: {
            text: '株洲市',
            x: 'center',
            top: 0,
            textStyle: {
                fontSize: 30,
                color: '#9c0505'
            }
        },
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
        series: [
            {
                type: 'map',
                map: '株洲',
                roam: true,
                data: [
                    { name: '攸县', value: 99 },
                    { name: '株洲县', value: 299 }
                ],
                label: {
                    show: true,
                    color: 'black',
                    fontSize: 12
                },
                zoom: 1,
                itemStyle: {
                    borderColor: '#000'
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
            }
        ],
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
    areaClick (params: any) {
        console.log(params.name)
    }
    async getData () {
        let map = await require('@/assets/json/zhuzhou.json')
        echarts.registerMap('株洲', map)
        let id: any = document.getElementById('city')
        this.myChart = echarts.init(id)
        this.myChart.setOption(this.option)
        this.myChart.on('click', this.areaClick)
        window.addEventListener('resize', () => {
            this.myChart.resize()
        })
    }
    mounted () {
        this.getData()
    }
}
</script>

<style lang="stylus" scoped>
.map {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;

    #chart {
        margin: 0 auto;
    }
}
</style>
