var _closeKey = 27;//esc
var _draggable = true;//默认可以拖动
var _content = "我的头像是不是很好看？";

function initMyAlert(arg)
{
	if(arg.hasOwnProperty("closeKey"))
		_closeKey = arg["closeKey"];
	if(arg.hasOwnProperty("draggable"))
		_draggable = arg["draggable"];
}

var _Alert = new Object(); 

var p_x = document.documentElement.clientWeight/2 + 150;

_Alert = { 
	generalStyle: 
	{
		position: "fixed", 
		top: "10%",
		left: "40%",
		width: "300px", 
		height: "100px", 
		background: "white", 
		border: "thick solid grey", 
		zIndex: 0
	}, 

	txtStyle: 
	{
		textAlign: "center" 
	}, 

	btnStyle: 
	{
		outlineColor:"grey", 
		outlineWidth:"1px", 
		position: "absolute", 
		left: "45%", 
		top: "65%", 
		innerHTML: "是"
	}, 

	exist: false 
}

_Alert.createComponent = function() 
{ 
	var component = document.createElement(arguments[0]); 
	var styles = arguments[1]; 
	for (var property in styles) 
	{ 
		if (styles[property] != null) 
		{
			try
			{ 
				component.style[property] = styles[property]; 
			}
			catch(_error)
			{ 
				document.write(_error.name + ":" + property + "<br/>");
			} 
		} 
	} 
	return component; 
} 

_Alert.show = function() 
{ 
	if(!this.exist)
	{ 
		this.exist = true;
		var _body = document.body; 
		_body.style.zIndex = -1; 
		_body.style.background = " "; 
		var _div = this.createComponent("div", this.generalStyle); 
		var _txt = this.createComponent("p", this.txtStyle); 
		var _btn = this.createComponent("button", this.btnStyle); 
		_txt.innerHTML = arguments[0]; 
		_btn.innerHTML = this.btnStyle.innerHTML; 
		_btn.onclick = function()
		{ 
			_Alert.exist = false;
			_body.style.zIndex = 0; 
			_body.style.background =" ";
			_body.removeChild(_div); 
		}
		document.onkeydown = function(event)
		{
			var e = event||window.event||arguments.callee.caller.arguments[0];
			if(e && e.keyCode == _closeKey)
			{
				_Alert.exist = false;
				_body.style.zIndex = 0; 
				_body.style.background =" ";
				_body.removeChild(_div); 
			}
		}
		if(_draggable)
		{
			var x = 0, y = 0;
			window.onload = function ()
			{
				_div.onmousedown = function(_event)
				{
					var _e = _e || window.event;
					x = e.clientX - _div.offsetLeft;
					y = e.clientY - _div.offsetTop;
					_div.onmousemove = function()
					{
						var _e = _e || window.event;
						_div.style.left = (e.clientX - x) + 'px';
		            	_div.style.top = (e.clientY - y) + 'px';
					}
					_div.onmouseup = function()
					{
						document.onmousemove = null;
		           		document.onmouseup = null;
					}
				}
				
			}
		}
		_div.appendChild(_txt); 
		_div.appendChild(_btn); 
		_body.appendChild(_div); 
		
	} 
} 


function myAlert(para)
{ 
	if(typeof para == 'undefined')
	{
		_Alert.show(_content);
	}
	else
	{
		_Alert.show(para); 
	}
} 

