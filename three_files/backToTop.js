function createButton(_object, _ev, _fn)
{
	if(_object.attachEvent)
	{
		_object.attachEvent('on' + _ev, _fn);
	}
	else
	{
		_object.addEventListener(_ev, _fn,false);
	}
}

var b = new createButton(window,'load', 
function ()
{
	var btn = document.getElementById('btn');
	var timer = null;
	var scrollTop;
	window.onscroll = function()
	{
		scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollTop >= 100)//滚动距离大于100时显示返回顶部按钮
		{
			btn.style.display = 'block';
		}
		else
		{
			btn.style.display = 'none';
		}
		return scrollTop;
	};

	btn.onclick = function()
	{
		clearInterval(timer);
		timer = setInterval(
		function()
		{
			var current = scrollTop;
			var speed = (0 - current) / 10;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(scrollTop == 0)
			{
				clearInterval(timer);
			}
			document.documentElement.scrollTop = scrollTop + speed;
			document.body.scrollTop = scrollTop + speed;
		}, 30);
	}
});


createButton.prototype.init = function(_position) 
{
	var _btn = document.getElementById('btn');
	//alert(_btn);
	if(_position.hasOwnProperty("LeftUp"))
	{
		_btn.style.left = '10px';
		_btn.style.top = '10px';
	}
	else if(_position.hasOwnProperty("LeftDown"))
	{
		_btn.style.left = '10px';
		_btn.style.bottom = '10px';
	}
	else if(_position.hasOwnProperty("RightUp"))
	{
		//alert('2');
		_btn.style.right = '10px';
		_btn.style.top = '10px';
	}

	else if(_position.hasOwnProperty("RightDown"))
	{
		_btn.style.right = '10px';
		_btn.style.bottom = '10px';
	}

	else if(_position.hasOwnProperty("x") && _position.hasOwnProperty("y"))
	{
		//alert(_position["x"]+'px');
		_btn.style.left = _position["x"] + 'px';
		_btn.style.top = _position["y"] + 'px';
	}
	//alert('2');
	return this;
};

document.onkeydown = function(event)
{
	var e = event||window.event||arguments.callee.caller.arguments[0];
	if(e && e.keyCode == 37)//Home键
	{
		var btnt = document.getElementById('btn');
		btnt.onclick = true;
	}
};
