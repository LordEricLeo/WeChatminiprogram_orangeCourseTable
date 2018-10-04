from bs4 import BeautifulSoup#第三方库pip install bs4
import json

file = open('F:\\coursetable\\coursetable.html', 'r')
html_doc = file.read()
file.close()
soup = BeautifulSoup(html_doc, 'html.parser')

first = []#第一大节的课表信息(二维数组)
for i in range(7):
    if(i == 0):
        j = '7'
    else:
        j = str(i)
    ids = '1-' + j + '-2'
    course = soup.find(id=ids).find_all(text=True)
    for i,cs in enumerate(course):
        course[i] = "".join(cs.split())#去掉&nbsp(\xa0)
    if(course == ['']):#如果这节没有课，里面的各种具体信息要用''补齐，否则数组访问越界
        for i in range(5):
            course.append('')
    first.append(course)
second = []#第二大节的课表信息
for i in range(7):
    if(i == 0):
        j = '7'
    else:
        j = str(i)
    ids = '2-' + j + '-2'
    course = soup.find(id=ids).find_all(text=True)
    for i,cs in enumerate(course):
        course[i] = "".join(cs.split())#去掉&nbsp(\xa0)
    if(course == ['']):#如果这节没有课，里面的各种具体信息要用''补齐，否则数组访问越界
        for i in range(5):
            course.append('')
    second.append(course)
third = []#第三大节的课表信息
for i in range(7):
    if(i == 0):
        j = '7'
    else:
        j = str(i)
    ids = '3-' + j + '-2'
    course = soup.find(id=ids).find_all(text=True)
    for i,cs in enumerate(course):
        course[i] = "".join(cs.split())#去掉&nbsp(\xa0)
    if(course == ['']):#如果这节没有课，里面的各种具体信息要用''补齐，否则数组访问越界
        for i in range(5):
            course.append('')
    third.append(course)
forth = []#第四大节的课表信息
for i in range(7):
    if(i == 0):
        j = '7'
    else:
        j = str(i)
    ids = '4-' + j + '-2'
    course = soup.find(id=ids).find_all(text=True)
    for i,cs in enumerate(course):
        course[i] = "".join(cs.split())#去掉&nbsp(\xa0)
    if(course == ['']):#如果这节没有课，里面的各种具体信息要用''补齐，否则数组访问越界
        for i in range(5):
            course.append('')
    forth.append(course)
fifth = []#第五大节的课表信息
for i in range(7):
    if(i == 0):
        j = '7'
    else:
        j = str(i)
    ids = '5-' + j + '-2'
    course = soup.find(id=ids).find_all(text=True)
    for i,cs in enumerate(course):
        course[i] = "".join(cs.split())#去掉&nbsp(\xa0)
    if(course == ['']):#如果这节没有课，里面的各种具体信息要用''补齐，否则数组访问越界
        for i in range(5):
            course.append('')
    fifth.append(course)
sixth = []#第六大节的课表信息
for i in range(7):
    if(i == 0):
        j = '7'
    else:
        j = str(i)
    ids = '6-' + j + '-2'
    course = soup.find(id=ids).find_all(text=True)
    for i,cs in enumerate(course):
        course[i] = "".join(cs.split())#去掉&nbsp(\xa0)
    if(course == ['']):#如果这节没有课，里面的各种具体信息要用''补齐，否则数组访问越界
        for i in range(5):
            course.append('')
    sixth.append(course)

#用json保存和传输一周课表数据,下面是一个json对象
jsonobject = [
    [
        {
            "课程名称":first[0][0],
            "上课班级":first[0][1],
            "授课教师":first[0][2],
            "上课时间":first[0][3],
            "上课地点":first[0][4],
            "选课人数":first[0][5]
        },
        {
            "课程名称":first[1][0],
            "上课班级":first[1][1],
            "授课教师":first[1][2],
            "上课时间":first[1][3],
            "上课地点":first[1][4],
            "选课人数":first[1][5]
        },
        {
            "课程名称":first[2][0],
            "上课班级":first[2][1],
            "授课教师":first[2][2],
            "上课时间":first[2][3],
            "上课地点":first[2][4],
            "选课人数":first[2][5]
        },
        {
            "课程名称":first[3][0],
            "上课班级":first[3][1],
            "授课教师":first[3][2],
            "上课时间":first[3][3],
            "上课地点":first[3][4],
            "选课人数":first[3][5]
        },
        {
            "课程名称":first[4][0],
            "上课班级":first[4][1],
            "授课教师":first[4][2],
            "上课时间":first[4][3],
            "上课地点":first[4][4],
            "选课人数":first[4][5]
        },
        {
            "课程名称":first[5][0],
            "上课班级":first[5][1],
            "授课教师":first[5][2],
            "上课时间":first[5][3],
            "上课地点":first[5][4],
            "选课人数":first[5][5]
        },
        {
            "课程名称":first[6][0],
            "上课班级":first[6][1],
            "授课教师":first[6][2],
            "上课时间":first[6][3],
            "上课地点":first[6][4],
            "选课人数":first[6][5]
        }
    ],
    [
        {
            "课程名称":second[0][0],
            "上课班级":second[0][1],
            "授课教师":second[0][2],
            "上课时间":second[0][3],
            "上课地点":second[0][4],
            "选课人数":second[0][5]
        },
        {
            "课程名称":second[1][0],
            "上课班级":second[1][1],
            "授课教师":second[1][2],
            "上课时间":second[1][3],
            "上课地点":second[1][4],
            "选课人数":second[1][5]
        },
        {
            "课程名称":second[2][0],
            "上课班级":second[2][1],
            "授课教师":second[2][2],
            "上课时间":second[2][3],
            "上课地点":second[2][4],
            "选课人数":second[2][5]
        },
        {
            "课程名称":second[3][0],
            "上课班级":second[3][1],
            "授课教师":second[3][2],
            "上课时间":second[3][3],
            "上课地点":second[3][4],
            "选课人数":second[3][5]
        },
        {
            "课程名称":second[4][0],
            "上课班级":second[4][1],
            "授课教师":second[4][2],
            "上课时间":second[4][3],
            "上课地点":second[4][4],
            "选课人数":second[4][5]
        },
        {
            "课程名称":second[5][0],
            "上课班级":second[5][1],
            "授课教师":second[5][2],
            "上课时间":second[5][3],
            "上课地点":second[5][4],
            "选课人数":second[5][5]
        },
        {
            "课程名称":second[6][0],
            "上课班级":second[6][1],
            "授课教师":second[6][2],
            "上课时间":second[6][3],
            "上课地点":second[6][4],
            "选课人数":second[6][5]
        }
    ],
    [
        {
            "课程名称":third[0][0],
            "上课班级":third[0][1],
            "授课教师":third[0][2],
            "上课时间":third[0][3],
            "上课地点":third[0][4],
            "选课人数":third[0][5]
        },
        {
            "课程名称":third[1][0],
            "上课班级":third[1][1],
            "授课教师":third[1][2],
            "上课时间":third[1][3],
            "上课地点":third[1][4],
            "选课人数":third[1][5]
        },
        {
            "课程名称":third[2][0],
            "上课班级":third[2][1],
            "授课教师":third[2][2],
            "上课时间":third[2][3],
            "上课地点":third[2][4],
            "选课人数":third[2][5]
        },
        {
            "课程名称":third[3][0],
            "上课班级":third[3][1],
            "授课教师":third[3][2],
            "上课时间":third[3][3],
            "上课地点":third[3][4],
            "选课人数":third[3][5]
        },
        {
            "课程名称":third[4][0],
            "上课班级":third[4][1],
            "授课教师":third[4][2],
            "上课时间":third[4][3],
            "上课地点":third[4][4],
            "选课人数":third[4][5]
        },
        {
            "课程名称":third[5][0],
            "上课班级":third[5][1],
            "授课教师":third[5][2],
            "上课时间":third[5][3],
            "上课地点":third[5][4],
            "选课人数":third[5][5]
        },
        {
            "课程名称":third[6][0],
            "上课班级":third[6][1],
            "授课教师":third[6][2],
            "上课时间":third[6][3],
            "上课地点":third[6][4],
            "选课人数":third[6][5]
        }
    ],
    [
        {
            "课程名称":forth[0][0],
            "上课班级":forth[0][1],
            "授课教师":forth[0][2],
            "上课时间":forth[0][3],
            "上课地点":forth[0][4],
            "选课人数":forth[0][5]
        },
        {
            "课程名称":forth[1][0],
            "上课班级":forth[1][1],
            "授课教师":forth[1][2],
            "上课时间":forth[1][3],
            "上课地点":forth[1][4],
            "选课人数":forth[1][5]
        },
        {
            "课程名称":forth[2][0],
            "上课班级":forth[2][1],
            "授课教师":forth[2][2],
            "上课时间":forth[2][3],
            "上课地点":forth[2][4],
            "选课人数":forth[2][5]
        },
        {
            "课程名称":forth[3][0],
            "上课班级":forth[3][1],
            "授课教师":forth[3][2],
            "上课时间":forth[3][3],
            "上课地点":forth[3][4],
            "选课人数":forth[3][5]
        },
        {
            "课程名称":forth[4][0],
            "上课班级":forth[4][1],
            "授课教师":forth[4][2],
            "上课时间":forth[4][3],
            "上课地点":forth[4][4],
            "选课人数":forth[4][5]
        },
        {
            "课程名称":forth[5][0],
            "上课班级":forth[5][1],
            "授课教师":forth[5][2],
            "上课时间":forth[5][3],
            "上课地点":forth[5][4],
            "选课人数":forth[5][5]
        },
        {
            "课程名称":forth[6][0],
            "上课班级":forth[6][1],
            "授课教师":forth[6][2],
            "上课时间":forth[6][3],
            "上课地点":forth[6][4],
            "选课人数":forth[6][5]
        }
    ],
    [
        {
            "课程名称":fifth[0][0],
            "上课班级":fifth[0][1],
            "授课教师":fifth[0][2],
            "上课时间":fifth[0][3],
            "上课地点":fifth[0][4],
            "选课人数":fifth[0][5]
        },
        {
            "课程名称":fifth[1][0],
            "上课班级":fifth[1][1],
            "授课教师":fifth[1][2],
            "上课时间":fifth[1][3],
            "上课地点":fifth[1][4],
            "选课人数":fifth[1][5]
        },
        {
            "课程名称":fifth[2][0],
            "上课班级":fifth[2][1],
            "授课教师":fifth[2][2],
            "上课时间":fifth[2][3],
            "上课地点":fifth[2][4],
            "选课人数":fifth[2][5]
        },
        {
            "课程名称":fifth[3][0],
            "上课班级":fifth[3][1],
            "授课教师":fifth[3][2],
            "上课时间":fifth[3][3],
            "上课地点":fifth[3][4],
            "选课人数":fifth[3][5]
        },
        {
            "课程名称":fifth[4][0],
            "上课班级":fifth[4][1],
            "授课教师":fifth[4][2],
            "上课时间":fifth[4][3],
            "上课地点":fifth[4][4],
            "选课人数":fifth[4][5]
        },
        {
            "课程名称":fifth[5][0],
            "上课班级":fifth[5][1],
            "授课教师":fifth[5][2],
            "上课时间":fifth[5][3],
            "上课地点":fifth[5][4],
            "选课人数":fifth[5][5]
        },
        {
            "课程名称":fifth[6][0],
            "上课班级":fifth[6][1],
            "授课教师":fifth[6][2],
            "上课时间":fifth[6][3],
            "上课地点":fifth[6][4],
            "选课人数":fifth[6][5]
        }
    ],
    [
        {
            "课程名称":sixth[0][0],
            "上课班级":sixth[0][1],
            "授课教师":sixth[0][2],
            "上课时间":sixth[0][3],
            "上课地点":sixth[0][4],
            "选课人数":sixth[0][5]
        },
        {
            "课程名称":sixth[1][0],
            "上课班级":sixth[1][1],
            "授课教师":sixth[1][2],
            "上课时间":sixth[1][3],
            "上课地点":sixth[1][4],
            "选课人数":sixth[1][5]
        },
        {
            "课程名称":sixth[2][0],
            "上课班级":sixth[2][1],
            "授课教师":sixth[2][2],
            "上课时间":sixth[2][3],
            "上课地点":sixth[2][4],
            "选课人数":sixth[2][5]
        },
        {
            "课程名称":sixth[3][0],
            "上课班级":sixth[3][1],
            "授课教师":sixth[3][2],
            "上课时间":sixth[3][3],
            "上课地点":sixth[3][4],
            "选课人数":sixth[3][5]
        },
        {
            "课程名称":sixth[4][0],
            "上课班级":sixth[4][1],
            "授课教师":sixth[4][2],
            "上课时间":sixth[4][3],
            "上课地点":sixth[4][4],
            "选课人数":sixth[4][5]
        },
        {
            "课程名称":sixth[5][0],
            "上课班级":sixth[5][1],
            "授课教师":sixth[5][2],
            "上课时间":sixth[5][3],
            "上课地点":sixth[5][4],
            "选课人数":sixth[5][5]
        },
        {
            "课程名称":sixth[6][0],
            "上课班级":sixth[6][1],
            "授课教师":sixth[6][2],
            "上课时间":sixth[6][3],
            "上课地点":sixth[6][4],
            "选课人数":sixth[6][5]
        }
    ]
]
file = open('F:\\coursetable\\coursetable.json','w')
jsonstring = json.dumps(jsonobject)#把json对象转换为json字符串，以便服务器传输给用户端
file.write(jsonstring)
file.close()
print("=>成功保存json字符串至coursetable.json")
print("html解析脚本工作完成","刘子豪提供技术支持")
