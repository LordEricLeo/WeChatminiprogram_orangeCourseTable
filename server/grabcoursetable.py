#!/usr/bin/env python3
import urllib
import urllib.request
import http
import http.cookiejar
import os
#python脚本由刘子豪创建于2018年9月15日 周六下午6:48

print("这个脚本用来代理用户抓取强智教务系统的课表信息，检查是否有依赖文件：user.txt,urlinit.txt,term.txt")
print("user.txt存放用户的用户名密码和验证码，term.txt存放学期信息。换行隔开每条数据")
print("脚本开始工作:")
loginurl = 'http://jwxt.upc.edu.cn/jwxt/Logon.do?method=logon'#登录时表单提交到的地址
url = 'http://jwxt.upc.edu.cn/jwxt/tkglAction.do?method=goListKbByXs'#登录后查询课表表单提交到的地址
header = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:62.0) Gecko/20100101 Firefox/62.0'
    #随便一个用户头防止服务器拦截非用户访问
    }
cookie_file = 'cookie.txt'
cookie = http.cookiejar.MozillaCookieJar()#用cookie构建opener来访问网站
cookie.load(cookie_file, ignore_discard=True, ignore_expires=True)#加载保存的cookie
os.remove('cookie.txt')#删除临时cookie
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cookie))
file = open('user.txt','r')#把用户的登录信息写在user.txt里面,换行隔开。从文件里读取用户信息
username = file.readline()#用户名
username = username[0:len(username)-1]#删去读取到的用户名最后的\n
password = file.readline()#密码
password = password[0:len(password)-1]#删去读取到的密码最后的\n
randomcode = file.readline()#暂时不能实现自动识别，人工识别二维码
file.close()
print("=>用户名密码和验证码读取成功")
os.remove('randomcode.png')#识别完验证码，没必要保留临时文件，删除即可
form = {
    'PASSWORD': password,
    'RANDOMCODE': randomcode,	
    'useDogCode':'',	
    'USERNAME': username,
    'x':	'0',
    'y':	'0'}
data = urllib.parse.urlencode(form)
data = data.encode('utf-8')#登录信息表单编码后的数据
request = urllib.request.Request(loginurl,data = data,headers = header,method = 'POST')#提交用户信息并登录的请求
opener.open(request, timeout = 20)
print("=>登录信息表单已提交")
data = urllib.parse.urlencode('').encode('utf-8')#强智教务系统，需要向下方URL提交一个空POST才能正常登录成功，否则提示没有系统权限
request = urllib.request.Request('http://jwxt.upc.edu.cn/jwxt/Logon.do?method=logonBySSO',data = data,headers = header,method = 'POST')
opener.open(request, timeout = 20)
print("=>登录成功～,你好",username)
file = open('term.txt','r')#把学期信息写在term.txt中，以便改动
term = file.readline()
file.close()
form = {
    'sql': '',
    'xnxqh': term,
    'xs0101id': username,
    'zc': ''}
data = urllib.parse.urlencode(form).encode('utf-8')#查询课表信息表单编码后的数据
request = urllib.request.Request(url,data = data,headers = header)#访问查询课表的请求
response = opener.open(request, timeout = 20)
print("=>课表信息查询成功")
htmlbinary = response.read()
htmltext = htmlbinary.decode('utf-8')
file = open('coursetable.html','w')#保存查询到的课表信息
file.write(htmltext)
file.close()
print("=>成功保存课表信息")
print("=>调用另一python脚本，解析html文件")
os.system("./htmlpraser.py")#html解析脚本
os.remove('coursetable.html')#解析完html文件，没必要保留临时文件，删除即可
print("课表信息抓取脚本工作成功完成,由刘子豪提供技术支持")
