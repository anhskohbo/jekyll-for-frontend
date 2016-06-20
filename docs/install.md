# Cài đặt

**Jekyll For Frontend** yêu cầu trên máy cần có `jekyll`, `nodejs` và `gulp` để hoạt động.

## Cài đặt trên Windows

### Cài đặt GIT

Tải git cho Windows tại địa chỉ: https://git-scm.com/download/win

Document về jekyll: https://jekyllrb.com/docs/home

### Cài đặt Chocolatey

[Chocolatey](https://chocolatey.org) là một `Software Management` cho Windows, bạn có thể dễ dàng cài một hoặc nhiều phần mềm chỉ với một dòng lệnh.

Mở CMD với quyền admin và chạy dòng lệnh:

```
@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
```

### Cài đặt các gói phụ thuộc:

Cài đặt [jekyll](https://jekyllrb.com/docs/windows/):

1. Cài đặt Ruby qua Choco: `choco install ruby -y`
2. Tắt và mở lại CMD (với quyền admin) và cài jekyll: `gem install jekyll`

Cài đặt `nodejs` và `gulp`:

```
choco install nodejs -y
npm install -g gulp
```

### Chạy Jekyll For Frontend

Clone jekyll-for-frontend về máy và tiến hành cài đặt các packages:

```
cd HTML
git clone https://github.com/anhskohbo/jekyll-for-frontend.git

cd jekyll-for-frontend
npm install
npm run clean
```

Sau khi quá trình cài đặt packages hoàn tất, bạn có thể chạy `jekyll-for-frontend` bất cứ lúc nào với dòng lệnh:

```
gulp
```
