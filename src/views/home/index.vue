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
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px"></el-card>
        <el-card style="height: 260px"></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../../api/data.js'
import * as echarts from 'echarts'

export default {
  name: 'home',
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
      ]
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

        const option = {
          xAxis: {
            data: xData
          },
          yAxis: {},
          legend: {
            data: keyArray
          },
          series
        }

        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)
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