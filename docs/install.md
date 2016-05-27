# Cài đặt 

**Jekyll For Frontend** yêu cầu trên máy cần có `nodejs`, `jekyll` và `gulp` để hoạt động.

Để đơn giản hóa phần cài đặt jekyll trên Windows, bạn sẽ chạy jekyll for frontend qua Vagrant, Vagrant sẽ cung cấp cho bạn một môi trường ảo Linux và do đó việc sử dụng các công cụ bên Linux sẽ hết sức dễ dàng.

## Cài đặt trên Windows

### Cài đặt GIT

Tải git cho Windows tại địa chỉ: https://git-scm.com/download/win

## Cài đặt Vagrant

Bạn cần có Virtualbox để Vagrant có thể hoạt động, tải và cài tại địa chỉ: https://www.virtualbox.org/wiki/Downloads

Tải và cài đặt Vagrant tại địa chỉ: https://www.vagrantup.com/downloads.html

Restart lại máy khi cài xong.

Bạn sẽ cần cài thêm plugin `Vagrant::Hostsupdater`:

```
vagrant plugin install vagrant-hostsupdater
```

## Setup Homestead 

Homestead là một "box" của Vagrant với lượng người dùng lớn và nhiều tính năng hữu ích.

### Cài đặt Homestead Vagrant Box

Một khi bạn cài đặt thành công Git, Virtualbox và Vagrant, bạn cần cài homestead box để máy ảo có thể hoạt động. Mở CMD lên và gõ dòng lệnh sau để cài:

```
vagrant box add laravel/homestead
```

Quá trình này sẽ mất một khoảng thời gian tùy thuộc vào tốc độ mạng của bạn.

### Cài đặt Homestead 

```
cd ~
git clone https://github.com/laravel/homestead.git Homestead
cd Homestead
bash init.sh
```

Tìm hiêu thêm về cơ chế hoạt động của Homestead tại: https://laravel.com/docs/master/homestead

### Setup SSH Key

Mở Git bash lên và gõ:

```
ssh-keygen -t rsa -C "nobody@homestead"
```

### Chạy Homestead Vagrant 

Mỗi khi mở máy bạn chỉ cần chạy dòng lệnh:

```
cd ~/Homestead && vagrant up
```

### Chạy Jekyll For Frontend 

Lưu ý: Các dòng lệnh dưới đây phải được chạy thông qua môi trường máy ảo vagrant, do đó bạn cần login vào máy ảo để làm việc với nó:

```
cd ~/Homestead && vagrant ssh
```

Clone jekyll-for-frontend về máy và tiến hành cài đặt các packages:

```
cd HTML
git clone https://github.com/anhskohbo/jekyll-for-frontend.git

cd jekyll-for-frontend
npm install
```

Sau khi quá trình cài đặt packages hoàn tất, bạn có thể chạy jekyll-for-frontend bất cứ lúc nào với dòng lệnh:

```
gulp
```

Lưu ý: Việc cài đặt packages chỉ dùng trong lần đầu cài đặt, sau khi đã cài đặt xong mỗi khi muốn build bạn chỉ cần gõ: `gulp`

Document về jekyll: https://jekyllrb.com/docs/home
