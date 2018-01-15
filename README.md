# mini-ls

一个js和css的本地localstorage的管理工具

<img width="350"  src="https://github.com/liberties/mini-ls/blob/master/assets/1.jpg"/>

<img width="350"  src="https://github.com/liberties/mini-ls/blob/master/assets/2.jpg"/>

第一张图片是第一次进入网页的时候，会通过我的小工具来下载js和css，然后只要资源不更新都不会重新下载js和css，每次会默认都从缓存里面读取。写了一个webpack插件，可以搭配我这个库，实现所以js本地缓存的效果。

写这个东西的主要原因是最近在做首屏加速，确实发现本地存储js在移动端会快不少，因为http缓存真的太容易失效了。

其实饿了么也有一个库做了相同的事，叫做bowl，最开始用这个库，发现了挺多的问题，这里就不一一吐槽了。。。

我这个小工具有几个优点：（这也是我用bowl出现的一些问题）

- 1、并行下载js或者css，根据放入数组的优先级来确定依赖关系
- 2、自动降级处理，如果js或者css下载失败或者跨域等，会自动重试1次，若还失败，则直接通过往页面打入script或者link标签来降级处理。
- 3、异常的抛出，用了promise的语法，可以直接在末尾catch，来处理自己想要的异常逻辑。不支持promise的浏览器可能gg，我的是移动端微信开发，所以还不用考虑这个，可以配合我的webpack插件来直接连接我这个库和webpack插件，并有自动的降级方案。
- 4、爆localStorage空间的处理方案

```javascript

Pawn.add([
 {"url":"https://m.baidu.com/se/static/js/service/index_polymer_fbd2fce.js","key":'kuayujs'},//跨域js,发现跨域，自动降级jsonp处理
 {"url":"https://gss0.bdstatic.com/5bd1bjqh_Q23odCf/static/wiseindex/js/package/newsActivity_f6d3b0f.js","key":"bukuayujs"}//不跨域js，走本地存储
    ]).catch((e)=>{
      console.log(e)
    })
```

我比较喜欢打英雄联盟，所以取了这个名字，希望Pawn将军不要介意，哈哈。。。

目前更新策略是如果key相同，url不同的话，就会重新下载资源，覆盖本地，因为讲道理来说，做了更改，webpack打包的jschunk的md5就会改变，所以用这个更新方案感脚没有什么问题。公司项目已正常使用。