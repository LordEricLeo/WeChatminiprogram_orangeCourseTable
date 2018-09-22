#!/usr/bin/env python3
import urllib
import urllib.request

file = open('ngrokurl.txt','r')
ngroktempurl = file.readline()
file.close()
grabcoursetable_py_url = ngroktempurl + '/grabcoursetable.py'
header = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:62.0) Gecko/20100101 Firefox/62.0'
    #随便一个用户头防止服务器拦截非用户访问
    }
request = urllib.request.Request(grabcoursetable_py_url,headers = header)
urllib.request.urlopen(request)
