import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)

    // 先判斷用戶是否存在
    // 判斷帳號密碼是否對應
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首頁',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall/index'
            },
            {
              path: '/user',
              name: 'user',
              label: '用戶管理',
              icon: 'user',
              url: 'user/index'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: '頁面1',
                  icon: 'setting',
                  url: 'other/pageOne.vue'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '頁面2',
                  icon: 'setting',
                  url: 'other/pageTwo.vue'
                }
              ]
            },
          ],
          token: Mock.Random.guid(),
          message: '獲取成功'
        }
      }
    } else if (username === 'userone' && password === '123456') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/',
              name: 'home',
              label: '首頁',
              icon: 's-home',
              url: 'home/index'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'mall/index'
            },
          ],
          token: Mock.Random.guid(),
          message: '獲取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密碼錯誤'
        }
      }
    }
  }
} 