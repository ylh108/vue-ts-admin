<template>
    <div>
        <div class="map">
            <div id="district" style="height: 100%;"></div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import echarts from 'echarts'

@Component({
    components: {}
})
export default class District extends Vue {
    myChart: any = ''
    option: any = {
        title: {
            text: '攸县',
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
                map: '攸县',
                roam: true,
                data: [
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
        ]
    }
    districtClick (params: any) {
        console.log(params.name)
    }
    async getData () {
        let map = await require('@/assets/json/youxian.json')
        echarts.registerMap('攸县', map)
        let id: any = document.getElementById('district')
        this.myChart = echarts.init(id)
        this.myChart.setOption(this.option)
        this.myChart.on('click', this.districtClick)
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
