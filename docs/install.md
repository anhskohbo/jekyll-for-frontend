# Cài đặt 

**Jekyll For Frontend** yêu cầu trên máy cần có `nodejs`, `jekyll` và `gulp` để hoạt động.

Một tùy chọn khác đó là git, ruby, python cũng cần phải có trên máy.

## Cài đặt trên Windows

### Cài đặt git

Tải git cho Windows tại địa chỉ: https://git-scm.com/download/win

### Cài đặt nodejs

Tải nodejs v6.x tại địa chỉ: https://nodejs.org/en/ (Chú ý chọn phiên bản 6 mới nhất thay vì v4 LTS)

Mở CMD và gõ dòng lệnh dưới để cài `gulp`:

```
npm install -g gulp
```

### Cài đặt ruby và jekyll

Tải ruby 2.3 và ruby-devkit tại địa chỉ: 

http://rubyinstaller.org/downloads

Xem thêm phần cài đặt Ruby tại đây: http://jekyll-windows.juthilo.com/1-ruby-and-devkit/

Cài đặt jekyll 

Mở CMD và gõ dòng lệch sau:

```
gem install jekyll
```

### Cài đặt python

Tải về python 2.7 cho Windows tại địa chỉ: https://www.python.org/downloads/windows/

Xem thêm phần cài đặt python tại đây: http://www.howtogeek.com/197947/how-to-install-python-on-windows/


## Cài đặt jekyll-for-frontend

Clone jekyll-for-frontend về máy:

```
git clone https://github.com/anhskohbo/jekyll-for-frontend
```

Trỏ đến thư mục chứa source code bằng CMD và gõ: `npm install`

Sau khi cài xong là đã hoàn tất quá trình cài đặt.

Gõ: `gulp` để xem thành quả.


