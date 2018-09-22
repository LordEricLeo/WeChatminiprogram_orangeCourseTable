<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>coursetable</title>
</head>

<body>
    <form action="user.asp">
        <input name="username" type="text">
        <input name="password" type="password">
        <input name="randomcode" type="text">
        <img src="randomcode.png" alt="验证码无法显示"/>
        <input type="submit">
    </form>
    <% 
    dim username
    username = request.querystring("username")
    dim password
    password = request.querystring("password")
    dim randomcode 
    randomcode = request.querystring("randomcode")
    set filesystem = server.CreateObject("Scripting.FileSystemObject")
    set file = filesystem.CreateTextFile(server.MapPath("user.txt"), True)
    file.WriteLine(username)
    file.WriteLine(password)
    file.WriteLine(randomcode)
    file.close()
    %>
</body>

</html>