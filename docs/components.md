## Parallax Background

Khai báo một thẻ sử dụng parallax.

```html
<div data-init="parallax" data-parallax-image="path/to/file.jpg"></div>
```

VD parallax với toàn bộ settings:

```html
<div data-init="parallax" data-parallax-image="path/to/file.jpg" data-speed="2" data-parallax-fadeout="true"></div>
```

## Cân bằng chiều cao column

Thêm class `row-eq-height` vào row cần cân bằng chiều cao column:

```html
<div class="row row-eq-height">
  <div class="col-md-4"></div>
  <div class="col-md-4"></div>
  <div class="col-md-4"></div>
</div>
```

## Full-height một thẻ

Thêm `data-height="full"` vào thẻ cần full-height:

```html
<div data-height="full"></div>
```

Lưu ý: Full-height khác với fullscreen và chỉ chạy với thẻ đầu tiên được gọi trong một trang.
Để sử dụng fullscreen với một thẻ sử dụng: `data-height="fullscreen"`:

```html
<div data-height="fullscreen"></div>
```

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


Các style có sẵn: `grayscale`, `ultra-light`, `shades-of-grey`, `blue-water`, `pale-dawn`, `light-dream`, `light-monochrome`


