import Mock from 'mockjs'

let List = []
export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          apple: Mock.Random.float(100, 8000, 0, 0),
          samsung: Mock.Random.float(100, 8000, 0, 0),
          pxie: Mock.Random.float(100, 8000, 0, 0),
          muji: Mock.Random.float(100, 8000, 0, 0),
          dell: Mock.Random.float(100, 8000, 0, 0),
          asus: Mock.Random.float(100, 8000, 0, 0),
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 餅圖
        videoData: [
          {
            name: 'acer',
            value: 2999
          },
          {
            name: 'apple',
            value: 2999
          },
          {
            name: 'samsung',
            value: 2999
          },
          {
            name: 'heineken',
            value: 2999
          },
          {
            name: 'kebuke',
            value: 2999
          },
          {
            name: 'asus',
            value: 2999
          },
        ],
        // 柱狀圖
        userData: [
          {
            date: '周一',
            new: 5,
            active: 200
          },
          {
            date: '周二',
            new: 10,
            active: 500
          },
          {
            date: '周三',
            new: 12,
            active: 600
          },
          {
            date: '周四',
            new: 30,
            active: 800
          },
          {
            date: '周五',
            new: 10,
            active: 900
          },
          {
            date: '周六',
            new: 90,
            active: 700
          },
          {
            date: '周日',
            new: 70,
            active: 400
          },
        ],
        // 折線圖
        orderData: {
          date: ['20220401', '20220402', '20220403', '20220404', '20220405', '20220406', '20220407'],
          data: List
        },
        tableData: [
          {
            name: 'acer',
            todayBuy: 300,
            monthBuy: 3000,
            totalBuy: 8000
          },
          {
            name: 'apple',
            todayBuy: 900,
            monthBuy: 9300,
            totalBuy: 33000
          },
          {
            name: 'asus',
            todayBuy: 100,
            monthBuy: 4000,
            totalBuy: 6000
          },
          {
            name: 'samsung',
            todayBuy: 600,
            monthBuy: 7300,
            totalBuy: 35990
          },
          {
            name: 'heineken',
            todayBuy: 499,
            monthBuy: 5000,
            totalBuy: 19330
          },
          {
            name: 'kebuke',
            todayBuy: 1100,
            monthBuy: 20000,
            totalBuy: 47000
          },
        ],
      }
    }
  }
}