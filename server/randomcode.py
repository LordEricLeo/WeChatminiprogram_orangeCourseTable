#!/usr/bin/env python3
import urllib
import urllib.request
import http
import http.cookiejar
#python脚本由刘子豪创建于2018年9月20日 周四下午14:20

randomcodeurl = 'http://jwxt.upc.edu.cn/jwxt/verifycode.servlet'#验证码的地址
header = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:62.0) Gecko/20100101 Firefox/62.0'
    #随便一个用户头防止服务器拦截非用户访问
    }
cookie_file = 'cookie.txt'
cookie = http.cookiejar.MozillaCookieJar(cookie_file)#用cookie构建opener来访问网站
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cookie))
request = urllib.request.Request(randomcodeurl,headers = header)#访问验证码的请求
response = opener.open(request, timeout = 20)
file = open('randomcode.png','wb')#保存验证码到本地，以二进制写入文件即可
file.write(response.read())
file.close()
print("=>验证码图片下载成功")
cookie.save(ignore_discard=True, ignore_expires=True)#保存cookie
print("=>cookie保存成功")
