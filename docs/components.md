## Google Maps

Nhúng js map bằng cách thêm `load_gmaps: true` vào front-master của page cần chạy map, VD:

```
---
title: Home
layout: default

load_gmaps: true
---
```

Khởi tạo map:

```html
<div id="map" data-lat="21.0227358" data-lng="105.8194541" data-zoom="13" data-style="light-monochrome" style="height: 350px;">
  <div data-map="marker"></div>
  <div data-map="marker" data-lat="21.0042555" data-lng="105.823159">Click me!</div>
</div>

<script>$(function() { JFFUtils.gMapInit('#map'); })</script>
```

![screenshot from 2016-06-21 15-24-18](https://cloud.githubusercontent.com/assets/1529454/16222957/057bb878-37c5-11e6-8c38-2b8da1a41efa.png)

