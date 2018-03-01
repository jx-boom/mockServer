 运行依赖  
    **node： ^8.9.1**  
    **npm： ^5.6.0**    
    
 开始  
   
  **`npm install`**  
    
  **`npm start`**
      
   #    前后端同步开发工具，mock server
   ##   可添加逻辑返回JSON数据，用于项目开发前期，前后台同步开发 
   ##   通过添加配置文件生成假接口
   
  * 输入框 第一行 为 url 地址栏 ｛｝ 内为变量名
  * 输入框 第二行 为 设置返回 contentType 方式
  * 输入框 第三行 为 设置请求方式
  * 输入框 第四行 为 设置处理逻辑 ，search字段对应 url 中变量，body字段对应请求数据，
  * 菜单栏 对应 逻辑中 content 字段
  
  ## 例
    地址 : {a}/b/{c}  
    返回格式: application/json     
    请求方式: get     
    处理逻辑: if(search['a']===test){ return content[0]}else{ return content[1]}  
    菜单栏:   | 0   | 1   | 2   |  3  |
             |{a:1}|{b:2}|{c:3}|{d:4}|
            
   `$.get('/test/b/tes')`  
    `response: {a:1}`  
    `------------------`  
    `$.get('/test1/b/tes')`  
       `response: {b:1}`
       
  ## 支持上传文件 
   ### 点狗屁股添加JSON格式文件, 点狗鼻子上传
   ### 文件格式
  ``` 
  [
  {
      "href": "/{api}/test1/{arg}",  
      "logic": "if(search['api']=='api'){return content[0]}",
      "contentType": "text/plain;charset=UTF-8",
      "method": "get",
      "content": [
       {"a":1},
       {"b":1}
      ]
     }] 
  ``` 