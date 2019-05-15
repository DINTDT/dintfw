//FRAMEWORK VARIABLES
var keyPress=new Array(233);
var ObjList=[];
var SCREEN_HEIGHT;
var SCREEN_WIDTH;
var SCALED_HEIGHT=394;
var SCALED_WIDTH=512;
var MARGIN;
var SCALE;
var counter=0;
var state="STARTUP";

var VERTICAL=0;
var HORIZONTAL=1;

var Z_KEY=90;
var X_KEY=88;
var NUM1_KEY=49;

//FRAMEWORK FUNCTIONS
function get(str){return document.getElementById(str);}

function rescale(){
	SCREEN_HEIGHT=window.innerHeight;
	SCREEN_WIDTH=window.innerWidth;
	if(SCREEN_HEIGHT>SCREEN_WIDTH){
		SCREEN_HEIGHT=SCREEN_WIDTH*(SCALED_HEIGHT/SCALED_WIDTH);
	} else {
		SCREEN_WIDTH=SCREEN_HEIGHT*(SCALED_WIDTH/SCALED_HEIGHT);
	}
	SCALE=SCREEN_HEIGHT/SCALED_HEIGHT;
	SCREEN_HEIGHT=SCALED_HEIGHT*SCALE;
	SCREEN_WIDTH=SCALED_WIDTH*SCALE;
	MARGIN={
		LEFT:(window.innerWidth/2)-(SCREEN_WIDTH/2),
		RIGHT:(window.innerWidth/2)-(SCREEN_WIDTH/2)
	}
	get("leftBar").style.left=0;
	get("leftBar").style.width=MARGIN["LEFT"];
	get("leftBar").style.height=SCREEN_HEIGHT;
	get("rightBar").style.right=0;
	get("rightBar").style.width=MARGIN["RIGHT"];
	get("rightBar").style.height=SCREEN_HEIGHT;
	ObjList.forEach(function(item, index){
		item.setPosition(item.x,item.y);
		item.setSize();
		item.setSpritePosition(-1,-1);
	});
}

function Atlas(url, w){
	this.url=url;
	this.width=w;
}

function Obj(name){
	this.id=name;
	this.element=document.createElement("div");
		this.element.className="object";
		this.element.setAttribute("id",name);
		get("screen").appendChild(this.element);
		ObjList.push(this);
	this.x;
	this.y;
	this.spriteX;
	this.spriteY;
	this.width;
	this.height;
	this.active;
	this.atlas;
	this.angle;

	this.onClick = function(f){this.element.onclick=f;}

	this.setSize = function(w, h){
		this.widht=w==null?this.width:w;
		this.height=h==null?this.height:h;
		this.element.style.height=SCALE*this.height;
		this.element.style.width=SCALE*this.width;
		if(this.atlas!=null) this.element.style.backgroundSize=((this.atlas.width/this.width)*100)+"%";}
	this.setPosition = function(x, y){
		this.x=x==null?this.x:x;
		this.y=y==null?this.y:y;
		this.element.style.top=SCALE*this.y;
		this.element.style.left=MARGIN["LEFT"]+(SCALE*this.x);}
	this.setY = function(y){
		this.y=y==null?this.y:y;
		this.element.style.top=(this.y*SCALE)+"px";}
	this.setX = function(x){
		this.x=x==null?this.x:x;
		this.element.style.left=(MARGIN["LEFT"]+(this.x*SCALE))+"px";}
	this.setAtlas = function(a){
		this.atlas=a;
		this.element.style.background='url("'+a.url+'")';
		this.element.style.backgroundSize=Math.round(a.width*SCALE)+"px";}
	this.setSpritePosition = function(x, y){
		this.spriteY=y==null?this.spriteY:y;
		this.spriteX=x==null?this.spriteX:x;
		this.element.style.backgroundPosition=Math.round(-SCALE*this.spriteX)+"px "+Math.round(-SCALE*this.spriteY)+"px";}
	this.spawn = function(x,y){
		this.angle=0;
		this.active=true;
		this.setPosition(x,y);
		this.element.style.visibility="visible";	}
	this.despawn = function(){
		this.active=false;
		this.element.style.visibility="hidden";	}
	this.setAngle = function(ang){
		this.angle=ang;
		this.element.style.transform="rotate("+ang+"deg)";	}
	this.rotate = function(ang){
		this.angle+=ang;
		this.element.style.transform="rotate("+this.angle+"deg)";	}
	this.hide = function(){this.element.style.visibility="hidden";}
	this.show = function(){this.element.style.visibility="visible";}
}

function Textbox(name){
	Obj.call(this,name);
		//TODO: finish this object!
}

function areColliding(obj1, obj2){
	if(obj1.active && obj2.active)
		return !(obj1.x>obj2.x+obj2.width||
			obj1.x+obj1.width<obj2.x||
			obj1.y>obj2.y+obj2.height||
			obj1.y+obj1.height<obj2.y);
	else return false;
}

//Key listeners - FRAMEWORK
window.onkeydown = function (e) {
	var code = e.keyCode ? e.keyCode : e.which;
	keyPress[code]=1;
};

window.onkeyup = function (e) {
	var code = e.keyCode ? e.keyCode : e.which;
	keyPress[code]=0;
};

window.onload=function(){
	var s = document.createElement("div");
	var r = document.createElement("div");
	var l = document.createElement("div");
	s.setAttribute("id","screen");
	l.setAttribute("id","leftBar");
	r.setAttribute("id","rightBar");
	document.body.appendChild(s);
	document.body.appendChild(l);
	document.body.appendChild(r);
	rescale();
}

function runGame(func){
	f = function(){
		func();
		counter+=1;
	}
	gameID = setInterval(f,1000/30);
}

function stopGame(){
	clearInterval(gameID);
}

window.onresize = function(){
	rescale();
}
