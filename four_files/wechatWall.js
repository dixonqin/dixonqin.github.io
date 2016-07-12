
var mySocket =  io.connect('https://wall.cgcgbcbc.com');//webSocket variable
var xmlhttp = new XMLHttpRequest();//Ajax variable

//alert(mySocket.readyState);//check websocket

var flag = [0,0,0];

function handleMessage(data){
	if(flag[0] == flag[1] && flag[1] == flag[2] && flag[0] == 1){
		for(var i = 0; i < 3; i++){
			flag[i] = 0;
		}
	}
	if(flag[0] == 0){
		flag[0] = 1;
		document.getElementById("nickname1").innerHTML = data.nickname;
		document.getElementById("img1").setAttribute("src", data.headimgurl);
		document.getElementById("content1").innerHTML = data.content;
		return;
	}
	if(flag[1] == 0){
		flag[1] = 1;
		document.getElementById("nickname2").innerHTML = data.nickname;
		document.getElementById("img2").setAttribute("src", data.headimgurl);
		document.getElementById("content2").innerHTML = data.content;
		return;
	}
	if(flag[2] == 0){
		flag[2] = 1;
		document.getElementById("nickname3").innerHTML = data.nickname;
		document.getElementById("img3").setAttribute("src", data.headimgurl);
		document.getElementById("content3").innerHTML = data.content;
		return;
	}
};

function getHistory(){
	xmlhttp.open("GET", "https://wall.cgcgbcbc.com/api/messages?num=3", true);
	xmlhttp.send(null);
	console.log(xmlhttp.responseText);
	handleMessage(xmlhttp.responseText[0]);
	handleMessage(xmlhttp.responseText[1]);
	handleMessage(xmlhttp.responseText[2]);
};

mySocket.on('connect',function(mySocket){
	console.log("connect ok");
});

mySocket.on('new message', function(event){
	console.log("new message");
	handleMessage(event);//get the message from server
	console.log("handle done");
});

mySocket.on('admin', function(event){
	document.getElementById('adminName').innerHTML = event.nickname;
	document.getElementById('adminContent').innerHTML = event.content;
	document.getElementById('adminmessage').style.display = 'block';
	document.getElementById('message1').style.display = 'none';
	flag[0] = 2;
	setTimeout(function(){
		document.getElementById("adminmessage").style.display = 'none';
		document.getElementById('message1').style.display = 'block';
		flag[0] = 0;
	}, 10000);
});
