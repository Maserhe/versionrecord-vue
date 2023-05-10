const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
            target: "http://localhost:8080/",//代理的api地址，就是要跨域的地址
            changeOrigin: true,// 这个参数可以让target参数是域名
            ws: false,//是否启用websockets，用不到可设为false
            pathRewrite: {//对路径匹配到的字符串重写
              "^/api": "",
          },
        },
      },
    },
  },
  
})
