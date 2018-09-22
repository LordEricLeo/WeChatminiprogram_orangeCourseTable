#!/usr/bin/env python3
import urllib
import urllib.request

file = open('ngrokurl.txt','r')
ngroktempurl = file.readline()
coursetable_json_url = ngroktempurl + '/coursetable.json'
file.close()
header = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:62.0) Gecko/20100101 Firefox/62.0'
    #随便一个用户头防止服务器拦截非用户访问
    }
request = urllib.request.Request(coursetable_json_url,headers = header)
response = urllib.request.urlopen(request)
file = open('user.txt','r')
username = file.readline()
file.close()
username = username[0:len(username)-1]
filename = 'json/' + username + '.json'
file = open(filename,'w')
file.write(response.read().decode('utf-8'))
file.close()
