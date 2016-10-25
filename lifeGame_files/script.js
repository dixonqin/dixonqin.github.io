var matrix = new Array();//mark the nodes
var size_x = 50;
var size_y = 50;
var gameState = 0;
var scence = document.getElementById("sc");//the game's area
var timeId;
var time = 300;

//init matrix
function init(){
	for(var i = 0; i < size_x; i++){
		var temp = new Array();
		for(var j = 0; j < size_y; j++){
			temp[j] = 0;
		}
		matrix[i] = temp;
	}
	createNode();
};
//console.log(matrix);

function createNode(){
	for(var i =0; i < size_x;i++){
		for(var j = 0; j < size_y; j++){
			var t = document.createElement("div");
			t.setAttribute("class", "node");
			t.setAttribute("id", i.toString()+ "-"+ j.toString());
			t.setAttribute("onclick", "bcmLive(this);");
			scence.appendChild(t);
			//console.log(t);
		}
	}
};

function bcmLive(node){//the cell is reborn
	//console.log(node);
	node.style.background = "#ffff00";
	var t_id = node.id;
	var t_pos = t_id.split("-");
	//console.log(t_pos);
	matrix[parseInt(t_pos[0])][parseInt(t_pos[1])] = 1;
	return node;
	//console.log(matrix[parseInt(t_pos[0])][parseInt(t_pos[1])]);
};

function bcmDead(node){//the cell die
	//console.log(node);
	node.style.background = "#888888";
	var t_id = node.id;
	var t_pos = t_id.split("-");
	//console.log(t_pos);
	matrix[parseInt(t_pos[0])][parseInt(t_pos[1])] = 0;
	return node;
	//console.log(matrix[parseInt(t_pos[0])][parseInt(t_pos[1])]);
};

function randomClick(){
	//init matrix
	if(gameState == 0)	{
		clear();
		var tem = Math.random();
		for(var i = 0; i < size_x; i++){
			var temp = new Array();
			for(var j = 0; j < size_y; j++){
				var ttt = Math.random();
				//console.log(ttt);
				temp[j] = 0;
				if(ttt < tem){
					var tnode = document.getElementById(i.toString()+"-"+j.toString());
					bcmLive(tnode);
					temp[j] = 1;
				}
			}
			matrix[i] = temp;
		}
		//console.log(scence);
	}
};

function countMatrix(i, j){//get number of living cells nearby
	var count = 0;
	//console.log("normal");
	var ni = (i + 1 ) % (size_x);//next i
	var nj = (j + 1 ) % (size_y);//next j
	var pi = (i - 1 + size_x) % (size_x);//previous i
	var pj = (j - 1 + size_y) % (size_y);//previous j
	//console.log(nj, pj, ni, pi);
	//to make sure the index between 0 and size-1
	if(matrix[ni][nj] == 1){
		count++;
		//console.log(1);
	}
	if(matrix[ni][j] == 1){
		count++;
		//console.log(2);
	}
	if(matrix[ni][pj] == 1){
		count++;
		//console.log(3);
	}
	if(matrix[i][nj] == 1){
		count++;
		//console.log(4);
	}
	if(matrix[i][pj] == 1){
		count++;
		//console.log(5);
	}
	if(matrix[pi][nj] == 1){
		count++;
		//console.log(6);
	}
	if(matrix[pi][j] == 1){
		count++;
		//console.log(7);
	}
	if(matrix[pi][pj] == 1){
		count++;
		//console.log(8);
	}
	//console.log(count);
	//console.log("--");
	return count;
};

function updateFunc(){//rt
	var liveNode = new Array();
	var deadNode = new Array();
	for(var i = 0; i < size_x; i++){
		for(var j = 0; j < size_y; j++){
			var state = countMatrix(i, j);
			if(matrix[i][j] == 1){
				if(state < 2||state > 3){
					//console.log(state);
					deadNode.push(document.getElementById(i.toString()+"-"+j.toString()));
				}
			}
			if(matrix[i][j] == 0){
				if(state == 3){
					//console.log(state);
					liveNode.push(document.getElementById(i.toString()+"-"+j.toString()));
				}
			}
		}
	}
	//console.log(liveNode);
	//console.log(deadNode);
	for(var i = 0; i < liveNode.length; i++){
		bcmLive(liveNode[i]);
	}
	for(var i = 0; i < deadNode.length; i++){
		bcmDead(deadNode[i]);
	}
};

function clear(){
	var nodeSet = document.getElementsByClassName("node");
	//console.log(nodeSet);
	//console.log(matrix);
	for(var i =0; i < size_x;i++){
		for(var j = 0; j < size_y; j++){
			if(matrix[i][j] == 1){
				var node = document.getElementById(i.toString()+"-"+j.toString());
				//console.log(node);
				bcmDead(node);
			}
		}
	}
	return matrix;
};

function stopClick(){
	//console.log("status",gameState);
	if(gameState == 1){
		clearInterval(timeId);
		clear();
		gameState = 0;
	}
};

function startClick(){
	//console.log("status",gameState);
	if(gameState == 0){
		timeId = setInterval(updateFunc, time);
		//console.log(scence);
		gameState = 1;
	}
};

init();
