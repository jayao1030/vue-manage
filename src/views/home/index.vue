<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超級管理員</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次登入時間:
            <span>2022-04-04</span>
          </p>
          <p>
            上次登入地點:
            <span>彰化</span>
          </p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px;">
        <el-table :data="tableData">
          <el-table-column v-for="(val, key) in tabLabel" :key="key" :prop="key" :label="val"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">${{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px;">
        <!-- <div style="height: 280px" ref="echarts"></div> -->
        <Echart :chartData="echartData.order" style="height: 280px" />
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->
          <Echart :chartData="echartData.user" style="height: 240px" />
        </el-card>
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
          <Echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px" />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../api/data.js'
// import * as echarts from 'echarts'
import Echart from '../../components/ECharts.vue'

export default {
  name: 'home',
  components: {
    Echart
  },
  data () {
    return {
      userImg: require('../../assets/images/user.png'),
      tableData: [],
      tabLabel: {
        name: '課程',
        todayBuy: '今日購買',
        monthBuy: '本月購買',
        totalBuy: '總購買'
      },
      countData: [
        {
          name: '今日支付訂單',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏訂單',
          value: 220,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付訂單',
          value: 333,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付訂單',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏訂單',
          value: 155,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付訂單',
          value: 333,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  mounted () {
    getData().then(res => {
      const { code, data } = res.data
      if (code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        // const option = {
        //   xAxis: {
        //     data: xData
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray
        //   },
        //   series
        // }
        this.echartData.order.xData = xData
        this.echartData.order.series = series
        // const E = echarts.init(this.$refs.echarts)
        // E.setOption(option)

        // 用戶圖
        // const userOption = {
        //   legend: {
        //     // 圖利文字顏色
        //     textStyle: {
        //       color: '#333',
        //     },
        //   },
        //   grid: {
        //     left: '20%',
        //   },
        //   // 提示框
        //   tooltip: {
        //     trigger: 'axis',
        //   },
        //   xAxis: {
        //     type: 'category',
        //     data: data.userData.map(item => item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: '#17b3a3',
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: '#333',
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: 'value',
        //       axisLine: {
        //         lineStyle: {
        //           color: '#17b3a3'
        //         },
        //       },
        //     },
        //   ],
        //   color: ['#2ec7c9', '#b6a2de'],
        //   series: [
        //     {
        //       name: '新增用戶',
        //       data: data.userData.map(item => item.new),
        //       type: 'bar'
        //     },
        //     {
        //       name: '活躍用戶',
        //       data: data.userData.map(item => item.active),
        //       type: 'bar'
        //     },
        //   ]
        // }

        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
          {
            name: '新增用戶',
            data: data.userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活躍用戶',
            data: data.userData.map(item => item.active),
            type: 'bar'
          },
        ]
        // const U = echarts.init(this.$refs.userEcharts)
        // U.setOption(userOption)

        // 餅圖
        // const videoOption = {
        //   tooltip: {
        //     trigger: 'item',
        //   },
        //   color: [
        //     '#0f78f4',
        //     '#dd536b',
        //     '#9462e5',
        //     '#a6a6a6',
        //     '#e1bb22',
        //     '#39c362',
        //     '#3ed1cf',
        //   ],
        //   series: [
        //     {
        //       data: data.videoData,
        //       type: 'pie'
        //     }
        //   ],
        // }

        this.echartData.video.series = [
          {
            data: data.videoData,
            type: 'pie'
          }
        ]
        // const V = echarts.init(this.$refs.videoEcharts)
        // V.setOption(videoOption)
      }
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  img {
    width: 100px;
    height: 100px;
  }
  .userInfo {
    margin-left: 20px;

    .name {
      margin-bottom: 10px;
      font-size: 24px;
    }
    .access {
      color: #999;
    }
  }
}
.login-info {
  font-size: 14px;

  p {
    margin-bottom: 10px;
    color: #999;
  }
  span {
    margin-left: 10px;
    color: black;
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  min-width: 150px;

  .icon {
    color: #fff;
    height: 100%;
    padding: 33px;
    font-size: 30px;
  }
  .detail {
    padding: 20px;
    .num {
      margin-bottom: 10px;
      font-size: 30px;
    }
    .txt {
      color: #999;
    }
  }
}

.graph {
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
  }
}
.el-card {
  margin-bottom: 20px;
}
</style>