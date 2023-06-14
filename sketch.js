const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var muteButton
var blower
var bg_img;
var food;
var rabbit;
var airSound
var bgSound
var sadSound
var ropeSound,eatingSound
var button;
var button2
var button3
var bunny;
var blink,eat,sad;
var cWidth,cHeight;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 

  bgSound = loadSound('sound1.mp3')
  ropeSound = loadSound('rope_cut.mp3') 
  eatingSound = loadSound('eating_sound.mp3')
  airSound = loadSound('air.wav')
  sadSound = loadSound('sad.wav')
}

function setup() {
  
  var isMobile = /iPhone|iPad|iPod|Andriod/i.test(navigator.userAgent)
  if(isMobile){
    cWidth = displayWidth
    cHeight = displayHeight
    createCanvas(cWidth,cHeight)
  }

  else{
    cWidth = windowWidth
    cHeight = windowHeight
    createCanvas(cWidth,cHeight);
  }

  frameRate(80);
  //bgSound.play()
  bgSound.setVolume(0.3)
  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button1 = createImg('cut_btn.png');
  button1.position(330,40);
  button1.size(50,50);
  button1.mouseClicked(drop1);

  button2 = createImg('cut_btn.png');
  button2.position(50,100);
  button2.size(50,50);
  button2.mouseClicked(drop2); 


  
  rope = new Rope(7,{x:245,y:30});
  rope1 = new Rope(7, {x:330,y:40});
  rope2 = new Rope(7, {x:50,y:100})

  ground = new Ground(200,cWidth,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con1 = new Link(rope1,fruit);
  fruit_con2 = new Link(rope2,fruit);

  blower = createImg('blower.png')
  blower.position(10,250)
  blower.size(150,100)
  blower.mouseClicked(airBlow)

  muteButton = createImg('mute.png')
  muteButton.position(450,20)
  muteButton.size(50,50)
  muteButton.mouseClicked(mute)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,cWidth,cHeight);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope1.show()
  rope2.show()
  
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eatingSound.play()
  }
   
  if(collide(fruit,ground.body)==true )
  {
    mute()
     bunny.changeAnimation('crying');
      sadSound.play()
    }
    

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  ropeSound.play()
}

function drop1()
{
  rope1.break();
  fruit_con1.dettach();
  fruit_con1 = null; 
  ropeSound.play()
}

function drop2()
{
  rope2.break();
  fruit_con2.dettach();
  frit_con2 = null; 
  ropeSound.play()
}


function collide(body,sprite)
{
  
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow(){
airSound.play()
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.09,y:0})
}

function mute(){
if(bgSound.isPlaying()){
  bgSound.stop()
}
else{
  bgSound.play()
}
}