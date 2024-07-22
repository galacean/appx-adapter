# AppX Adapter

帮助 Galacean Effects 框架适配支付宝和微信小程序/小游戏等，抹平 DOM API 和小程序 API 的差异。

## 使用步骤

> 以下以微信小游戏为例

### 1、安装依赖

``` bash
# 安装 Galacean Effects 的小程序/小游戏适配器
$ npm i @galacean/appx-adapter --save
# 安装 Galacean Effects
$ npm i @galacean/effects --save
```

### 2、在微信小程序中使用

``` html
<view style="width: 375px; height: 375px; background-color: black">
  <canvas type="webgl" id="webgl" style="width: 100%; height: 100%;"></canvas>
</view>
```

``` ts
import { registerCanvas } from '@galacean/appx-adapter/weapp';
import { Player } from '@galacean/effects/weapp';

// 1. 使用 adapter 方法注册 canvas
const canvas = await registerCanvas({ id:'#webgl' });
// 2. 通过创建的 canvas 对象实例化一个 Galacean Effects 播放器
const player = new Player({
  canvas,
  pixelRatio: 2,
  renderFramework: 'webgl',
});

// 3. 加载资源并执行播放
void this.player.loadScene('url');
```

