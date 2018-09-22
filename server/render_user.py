#!/usr/bin/env python3
import urllib
import urllib.request

file = open('ngrokurl.txt','r')
ngroktempurl = file.readline()
file.close()
header = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:62.0) Gecko/20100101 Firefox/62.0'
    #随便一个用户头防止服务器拦截非用户访问
    }
file = open('user.txt','r')
username = file.readline()
username = username[0:len(username)-1]
password = file.readline()
password = password[0:len(password)-1]
randomcode = file.readline()
randomcode = randomcode[0:len(randomcode)-1]
user_asp_url = ngroktempurl + '/user.asp?' + 'username=' + username +'&password=' +password+'&randomcode=' + randomcode
request = urllib.request.Request(user_asp_url,headers = header)
urllib.request.urlopen(request)
