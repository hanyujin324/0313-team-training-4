const http = require('http');
const formTag = `
<form method="GET" action="/login">
<input type="text" name="id">
<input type="submit">
</form>
`;

function greet(fromSubmitString) { //백틱을 쓰는 이유:문자열을 가져오고 중간에 변수를 넣을 수 있다.
return `<h1>${fromSubmitString}</h1>`;
}

function firstPage(data) {
return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
${data}
</body>
</html>
`;
}

const server = http.createServer(function(request, response){
// 최초접속
if(request.method === 'GET' && request.url === '/') { //$$연산자는 논리곱으로 A&&B일때, A와 B가 참이어야 if문이 실행이 된다
//response.writeHead(200, {'Content-Type': 'text/html'}); 
response.writeHead(200, {'Content-Type':'text/html'}); //200은 http응답코드 ok라는 뜻으로 요청이 성공적으로 수행되었다는 뜻 
let page = firstPage(formTag); //firstPage에 formTag가 들어있다
response.write(page);
response.end();
}

// 제출
if(request.method === 'GET' && request.url.startsWith('/login')) { //GET이 되고, url이 /login으로 실행이 되어야 if문 실행
console.log(request.url);
const name = request.url.split('=')[1]; //split은 문자열을 나눠주는 것, split(separator, limit) sparator는 문자열을 잘라줄 구분자로 여기서는 =으로 나누어 준다. 뒤에 만약 1이면 [0]값 하나만 보이지만 여기에는 [1]이므로 [1]값이 보이게 된다.
console.log(name); //브라우저 콘솔에 보이지 않고 터미널에 '/login?id=OO' 가 보인다
response.writeHead(200, {'Content-Type': 'text/html'});
let page = firstPage(greet(name)) //위에 firstPage(formTag);안에 로그인해서 나온 name값 const name = request.url.split('=')[1];이 보이게 된다. 즉, 들어가면 /login?=OO (OO는 내가 입력한 값)
response.write(page);

response.end();
}
});

// 서버 포트 설정
server.listen(2080, function(error) {
if(error) { console.error('서버 안돌아감') } else { console.log('서버 돌아감'); }
});
// 한글이 보이게 시도해보았으나 안됨