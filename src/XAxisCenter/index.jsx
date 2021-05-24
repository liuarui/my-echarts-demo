import * as echarts from 'echarts'
import ReactECharts from 'echarts-for-react'
import dayjs from 'dayjs'

// 生成数据
let data = []
const oneDay = 1000 * 60 * 60 * 24
let baseTime = new Date().setHours(0, 0, 0, 0)
for (let i = 0; i < 30; i++) {
    data.push([baseTime - i * oneDay, Math.ceil(i / 10)])
}
// 打印生成的数据 调试
console.log(data.reverse().map(v => dayjs(v[0]).format(`YYYY-MM-DD`)))

function getOption() {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {}
        },
        xAxis: {
            type: 'time',
            minInterval: 3600 * 24 * 1000,
            maxInterval: 3600 * 24 * 1000,
            axisTick: {
                show: false,
            },
            axisLabel: {
                showMinLabel: true,
                showMaxLabel: true,
                interval: 0,
                align: 'center',
                formatter: (value, index) => {
                    const formatValue = dayjs(value).format(`YYYY-MM-DD`)
                    if (index === 0) {
                        // 第一个 label
                        return `{first|${formatValue}}`
                    } else if (index === Math.ceil(data.length / 2)) {
                        // 中间的label
                        return `{middle|${formatValue}}`
                    } else if (index === data.length + 1) {
                        return `{last|${formatValue}}`
                    }
                    // 其他不展示
                    return ''
                },
                rich: {
                    first: {
                        // 此处有坑 需添加width，align才生效
                        align: 'left',
                        color: 'red',
                        width: 1
                    },
                    middle: {
                        align: 'center'
                    },
                    last: {
                        width: 1,
                        color: 'red',
                        align: 'right'
                    }
                }
            },
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: data.reverse(),
            type: 'line',
            smooth: true
        }]
    }
}
function App() {
    return <ReactECharts echarts={echarts} option={getOption()} />

}

export default App
