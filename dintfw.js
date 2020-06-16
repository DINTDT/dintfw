//FRAMEWORK VARIABLES
var keyPress=new Array(233);
var ActorList=[];
var SCREEN_HEIGHT;
var SCREEN_WIDTH;
var SCENE_HEIGHT=144;
var SCENE_WIDTH=160;
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

/*get(ID) returns the HMTLElement that has the id ID. Mostly used by other functions as shorthand for
	document.getElementByID(). NOTE: Direct HTMLElement manipulation is not recommended*/
function get(str){return document.getElementById(str);}

/*rescale() sets the SCREEN_HEIGHT and SCREEN_WIDTH values according to the window size and aspect ratio. Also sets
	the sizes and positions of the margin boxes (the black boxes at the sides)*/
function rescale(){
	//Set SCREEN_HEIGHT and SCREEN_WIDTH to actual window size.
	SCREEN_HEIGHT=window.innerHeight;
	SCREEN_WIDTH=window.innerWidth;
	//Find the smallest of the two, and scale the other to the correct aspect ratio.
	if(SCREEN_HEIGHT>SCREEN_WIDTH){
		SCREEN_HEIGHT=SCREEN_WIDTH*(SCENE_HEIGHT/SCENE_WIDTH);
	} else {
		SCREEN_WIDTH=SCREEN_HEIGHT*(SCENE_WIDTH/SCENE_HEIGHT);
	}
	//Find the scene scale
	SCALE=SCREEN_HEIGHT/SCENE_HEIGHT;
	//Set SCREEN_HEIGHT and SCREEN_WIDTH to size of the scene, but scaled.
	SCREEN_HEIGHT=SCENE_HEIGHT*SCALE;
	SCREEN_WIDTH=SCENE_WIDTH*SCALE;
	//Find width of margins
	MARGIN={
		LEFT:(window.innerWidth/2)-(SCREEN_WIDTH/2),
		RIGHT:(window.innerWidth/2)-(SCREEN_WIDTH/2)
	}
	//Position margins.
	get("leftBar").style.left=0;
	get("leftBar").style.width=MARGIN["LEFT"];
	get("leftBar").style.height=SCREEN_HEIGHT;
	get("rightBar").style.right=0;
	get("rightBar").style.width=MARGIN["RIGHT"];
	get("rightBar").style.height=SCREEN_HEIGHT;
	//Reset each Actor's position, size and spritePosition to accommodate new scale.
	ActorList.forEach(function(item, index){
		item.setSpritePosition();
		item.setPosition();
		item.setSize();
	});
}

/*an Atlas object loads a given spritesheet. The spritesheets width in pixels is required
	for the scale to work properly.
		url: Location of the spritesheet image file.
		width: width in pixels of the spritesheet image file.*/
function Atlas(url, w){
	this.url=url;
	this.width=w;
}

/*an Actor object is any element of the game that is independent from the background.
		name: 		String		A string that identifies the actor.
		element: 	HTMLElement	The html element that represents the actor in the scene.
		x:			Integer		Horizontal position from the left side of the scene. Counted in scaled pixels.
		y:			Integer		Vertical position form the top of the scene. Counted in scaled pixels.
		spriteX:	Integer		Horizontal position of the sprite (to be shown) in the atlas.
		spriteY:	Integer		Vertical position of the sprite (to be shown) in the atlas.
		width:		Integer		Width of the actor in scaled pixels.
		height:		Integer		Height of the actor in scaled pixels.
		active:		Boolean		A deactivated actor is not shown an cannot be interacted with by other actors.
		atlas:		Atlas		Atlas object that contains the actor's spritesheet.
		angle:		Float		Clockwise angle of rotation of the actor.
		
		onClick(f):				Meant to be user-defined. Calls the given function F when the actor is clicked.
		setSize(W,H):			Sets the width and height of the actor to W and H scaled pixels, respectively.
									Setting W or H to null will keep the previous value.
		setPosition(X,Y):		Sets the position of the actor in the scene to X and Y in scaled pixels.
									Setting X or Y to null will keep the previous value.
		setY(Y):				Sets the y position of the actor in the scene to Y.
		setX(X):				Sets the x position of the actor in the scene to X.
		setAtlas(Atlas):		Sets the Atlas object of the actor.
		setSpritePosition(X,Y):	Changes the current sprite to the one at position X,Y in the current Atlas.
		spawn(X,Y):				Activates the actor and places it at the position X,Y in the scene.
		despawn():				Deactivates the actor.
		setAngle(A):			Sets the current angle of rotation to A.
		rotate(A):				Changes the current angle of rotation by A.
		hide():					Makes the actor invisible.
		show():					Makes the actor visible.
		*/
function Actor(name){
	this.id=name;
	this.element=document.createElement("div");
		this.element.className="actor";
		this.element.setAttribute("id",name);
		get("screen").appendChild(this.element);
		ActorList.push(this);
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
		this.width=w==null?this.width:w;
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

/*a Textbox is a special actor, meant to display text.*/
function Textbox(name){
	Actor.call(this,name);
		//TODO: finish this object!
		//Most likely, this will have a variable called "content", that contains the text to be displayed.
		//Maybe, a special kind of textbox that allows for a cursor and options will be available, and it
		//will return the chosen option when a specific function is called. Or maybe one where the
		//player may input text directly, using an input element or something. I dunno.
}

/*areColliding(ACT1,ACT2) returns whether two actors' bounding boxes are overlapping. */
function areColliding(act1, act2){
	if(act1.active && act2.active)
		return !(act1.x>act2.x+act2.width||
			act1.x+act1.width<act2.x||
			act1.y>act2.y+act2.height||
			act1.y+act1.height<act2.y);
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

//Prepare the page to work with the framework - FRAMEWORK
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

//This function provides the heartbeat for a main loop function, which is user-defined. - FRAMEWORK
function runGame(func){
	f = function(){
		func();
		counter+=1;
	}
	gameID = setInterval(f,1000/30);
}

//When this function is called, the main game loop stops. - FRAMEWORK
function stopGame(){
	clearInterval(gameID);
}

window.onresize = function(){
	rescale();
}
