var bg,bgImg,player,playerImg,alien1,alien2,alien1Img,alien2Img,ufo,ufoImg,bulletImg,alien3,alien4,s1,s2,s3,s4,s5,shelterImg
var alienGroup,bulletGroup,shelterGroup,alienBulletImg,blastImg,gameOverImg
var edges;
var counter=0
var score=0
var gameState="play";
var bgSound, shootSound

function preload(){
   bgImg = loadAnimation("wallpaper.jpg")
   playerImg=loadAnimation("player.png")
   alien1Img=loadImage("alien.png")
   alien2Img=loadImage("alien_on_spaceship.png")
   ufoImg=loadImage("ufo.png")
   bulletImg=loadImage("bullet.png")
   shelterImg=loadImage("shelter.png")
   alienBulletImg=loadImage("alienbullet.png")
   blastImg=loadAnimation("blast.png")
   gameOverImg=loadAnimation("gameover.png")
   bgSound=loadSound("backgroundSound.mp3")
   shootSound= loadSound("shooting.mp3")
}



function setup(){
   createCanvas(1500,900);
   bg=createSprite(750,450);
   bg.addAnimation("back",bgImg);
   bg.addAnimation("die",gameOverImg)


   player=createSprite(750,850);
   player.addAnimation("play",playerImg);
   player.addAnimation("end",blastImg)
   player.scale=0.2;

   alienGroup=createGroup();
   shelterGroup=createGroup();
   bulletGroup=createGroup();
   alienBulletGroup=createGroup()

   for(var i=100; i<1450 ; i=i+100){
      alien1=createSprite(i,80);
      alien1.addImage(alien1Img);
      alien1.scale=0.1;
      alienGroup.add(alien1);

      ufo=createSprite(i,220)
      ufo.addImage(ufoImg)
      ufo.scale=0.05
      alienGroup.add(ufo)

      alien3=createSprite(i,290);
      alien3.addImage(alien1Img);
      alien3.scale=0.1;
      alienGroup.add(alien3);
      
   }
   
   for(var i=50; i<1450; i=i+100){
      alien2=createSprite(i,150);
      alien2.addImage(alien2Img);
      alien2.scale=0.1;
      alienGroup.add(alien2)

      alien4=createSprite(i,360);
      alien4.addImage(alien2Img);
      alien4.scale=0.1;
      alienGroup.add(alien4)
   }
   alienGroup.setVelocityXEach(2)
   edges=createEdgeSprites();
   
   s1=createSprite(150,740)
   s1.addImage(shelterImg)
   s1.scale=0.6;
   shelterGroup.add(s1);

   s2=createSprite(150+300,740)
   s2.addImage(shelterImg)
   s2.scale=0.6;
   shelterGroup.add(s2);

   s3=createSprite(150+600,740)
   s3.addImage(shelterImg)
   s3.scale=0.6;
   shelterGroup.add(s3);

   s4=createSprite(150+900,740)
   s4.addImage(shelterImg)
   s4.scale=0.6;
   shelterGroup.add(s4);

   s5=createSprite(150+1200,740)
   s5.addImage(shelterImg)
   s5.scale=0.6;
   shelterGroup.add(s5);

   bgSound.play()
   bgSound.volume=0.08;

}


function draw(){

   background('BLACK')
   drawSprites();
   textSize(30)
   fill('WHITE')
   text("SCORE : "+ score,  70,40)
   
   if(gameState == "play"){
   
      
      bg.changeAnimation("back",bgImg);

      player.changeAnimation("play",playerImg);
      alienShoot()

      textSize(50);
      fill(rgb(random(0,255),random(0,255),random(0,255)));
      text ("SPACE INVADERS", 550,50);

      if(keyDown(LEFT_ARROW)){
         player.x = player.x-5
      }

      if(keyDown(RIGHT_ARROW)){
         player.x = player.x+5
      }

      if(keyWentDown("space")){
         shoot();
         shootSound.play()
      }

      //when the bullet hits the enemy (use them as groups) then that enemy  gets delete.
      for(var i=0; i<alienGroup.length ; i++){
         for(var j=0; j<bulletGroup.length ; j++){
            if(bulletGroup[j].isTouching(alienGroup[i])){
               alienGroup[i].destroy();
               bulletGroup[j].destroy();
               score=score+2
            }
         }
      }

      //when the bulletgroup touches the sheltergroup, bullet gets destroy.

      for(var a=0; a<bulletGroup.length;a++){
         if(bulletGroup[a].isTouching(shelterGroup)){
            bulletGroup[a].destroy();
         }
      }

      if(frameCount % 100 == 0){
         counter++;
         alienGroup.setVelocityYEach(0.2);
      }
      

      if(counter % 2 == 0){
         alienGroup.setVelocityXEach(2)
      }
      else{
         alienGroup.setVelocityXEach(-3);
      }

      if(alienBulletGroup.isTouching(player)){
         gameState="end";
      }

      if(alienBulletGroup.isTouching(shelterGroup)){
         alienBulletGroup.destroyEach()


   
      }




   }
   if(gameState == "end"){
      bg.changeAnimation("die",gameOverImg)
      bg.scale=3;
      alienBulletGroup.setVelocityEach(0,0)
      alienGroup.setVelocityEach(0,0)
      bulletGroup.setVelocityEach(0,0)
      player.changeAnimation("end",blastImg);
      player.velocityX=0;
      alienBulletGroup.destroyEach();
      bulletGroup.destroyEach();
      alienGroup.destroyEach();
      shelterGroup.destroyEach();
      
   }
   
}

function shoot(){

   var bullet=createSprite(player.x,player.y,10,20)
   bullet.addImage(bulletImg)
   bullet.scale=0.02
   bullet.velocityY= -30
   bulletGroup.add(bullet)

}

function alienShoot(){

   if(frameCount % 30 ==0 ){
      var alienBullet=createSprite(player.x, 50, 15,30);
      alienBullet.addImage(alienBulletImg)
      alienBullet.scale=0.02
      alienBullet.velocityY= 30;
      alienBulletGroup.add(alienBullet)
   }
   
   
}




