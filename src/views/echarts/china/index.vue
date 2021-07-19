<template>
    <div>
        <div class="map">
            <div id="china" style="height: 100%;"></div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import echarts from 'echarts';
import 'echarts/map/js/china';

@Component({
    components: {},
})
export default class China extends Vue {
    myChart: any = '';
    option: any = {
        title: {
            text: '中国地图',
            x: 'center',
            top: 50,
            show: false,
            textStyle: {
                fontSize: 30,
                color: '#9c0505',
            },
        },
        // tooltip: {
        //     trigger: 'item',
        //     // formatter: "{c}"
        //     formatter: function (item: any, name: string) {
        //         if (!item.value) return
        //         const tipHtml =
        //             '<div style="background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
        //             '<div style="padding:5px 10px">' +
        //             '<div style="color:#fff;font-size:12px;">' +
        //             item.name +
        //             '：<span style="color:#f48225;margin-left: 6px;">' +
        //             item.value +
        //             '</span></div></div></div>'
        //         return tipHtml
        //         // return item.value ? (`${item.name}：${item.value}`) : ''
        //     }
        // },
        series: [
            {
                type: 'map',
                mapType: 'china',
                roam: true,
                scaleLimit: {
                    min: 1,
                    max: 20,
                },
                data: [
                    {
                        name: '南海诸岛',
                        itemStyle: {
                            normal: { opacity: 0, label: { show: false } },
                        },
                        label: {
                            normal: {
                                show: false,
                            },
                        },
                    },
                    // { name: '北京', value: 200 },
                    // { name: '四川', value: 2000 },
                    // { name: '湖北', value: 20000 }
                ],
                label: {
                    normal: {
                        show: true,
                        color: '#000',
                        textStyle: {
                            fontSize: 10,
                        },
                    },
                },
                zoom: 0.5,
                itemStyle: {
                    borderColor: '#000',
                    areaColor: '#fff',
                },
                emphasis: {
                    label: {
                        color: '#fff',
                        fontSize: 5,
                    },
                    itemStyle: {
                        areaColor: '#9c0505',
                        fontSize: 5,
                    },
                },
            },
        ],
        visualMap: {
            type: 'piecewise',
            show: false,
            bottom: 0,
            left: '20%',
            textStyle: {
                fontSize: 12,
                color: '#333',
                fontWeight: 'bolder',
            },
            pieces: [
                { min: 0, max: 10, color: '#ddebf7' },
                { min: 10, max: 100, color: '#bdd7ee' },
                { min: 100, max: 200, color: '#9bc2e6' },
                { min: 200, max: 300, color: '#2f75b5' },
                { min: 301, label: '300+', color: '#1f4e78' },
                { value: 'NAN', label: 'NA', color: '#808080' },
            ],
            itemWidth: 30,
            itemHeight: 20,
            symbolSize: 20,
        },
    };
    areaClick(params: any) {
        console.log(params.name);
    }
    async createMap() {
        // let map = await require('@/assets/map/china.json')
        // echarts.registerMap('china', map)
        let id: any = document.getElementById('china');
        this.myChart = echarts.init(id);
        this.myChart.setOption(this.option);
        this.myChart.on('click', this.areaClick);
        this.myChart.on('mouseover', () => {
            this.myChart.dispatchAction({
                type: 'mapSelect',
            });
        });
        window.addEventListener('resize', () => {
            this.myChart.resize();
        });
    }

    mounted() {
        this.createMap();
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
