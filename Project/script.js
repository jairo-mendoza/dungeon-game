let knight
let bullets
let knightDirection
let knightHealth
let img
let bruh
let icon
let buttton
var song

/*function preload(){
  song = loadSound("music.mp3")
}*/


function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20)
  img = loadImage('background.png')
  bruh = loadImage('dungeon background.jpg')
  icon = loadImage('icon image.png')
  song = createAudio('music.mp3')
  createSprite()
  //song.play()
  knight = createSprite(width-120,height-390,50,50) 
  enemy = createSprite(10, 10, 70, 70)

  
  slime = createSprite(350, 350, 50, 50)


  bulletImage = loadImage('bireball.png');

  button = createButton('Menu');
  button.position(windowWidth - 80, windowHeight - 550)
  knightHealth = 1000

  let myAnimation = knight.addAnimation('floating','sprite sheet/spritestand.png')
  enemy.addAnimation('idle', 'sprite sheet/Skeleton Enemy/skeleton002.png')
  knight.addAnimation('moving', 'sprite sheet/sprite1.0.png','sprite sheet/sprite2.0.png', 'sprite sheet/sprite3.0.png')
  knight.addAnimation('swoard', 'sprite sheet/sword1.png', 'sprite sheet/sword2.png', 'sprite sheet/sword2.png')
  enemy.addAnimation('follow', 'sprite sheet/Skeleton Enemy/skeleton001.png', 'sprite sheet/Skeleton Enemy/skeleton002.png', 'sprite sheet/Skeleton Enemy/skeleton003.png')
  enemy.addAnimation('followUp', 'sprite sheet/Skeleton Enemy/skeletonUp001.png', 'sprite sheet/Skeleton Enemy/skeletonUp002.png', 'sprite sheet/Skeleton Enemy/skeletonUp003.png')
  enemy.addAnimation('followDown', 'sprite sheet/Skeleton Enemy/skeletonDown001.png', 'sprite sheet/Skeleton Enemy/skeletonDown002.png', 'sprite sheet/Skeleton Enemy/skeletonDown003.png')
  slime.addAnimation(
    'moverkiderUp', 'sprite sheet/slime1.png','sprite sheet/slime2.png' 
  )
  slime.addAnimation(
    'moverkiderSide', 'sprite sheet/slime3.png','sprite sheet/slime4.png' 
  )
  slime.addAnimation(
    'moverkiderDown', 'sprite sheet/slime5.png','sprite sheet/slime6.png' 
  )

  
  bullets = new Group()
  skeleton = new Enemy()
  freddy = new Slime()
  iconc = new Text() 
  
}



function draw() {
  background(0, 255, 255)
 
  image(bruh,0,0)

  
  tint(0, 153, 204, 126)
  image(img,width/2-350,height/2-250)
  
  
  
  //song.play()
  noTint()
  skeleton.draw()
  skeleton.attacked()
  skeleton.move()
  freddy.move()
  freddy.attacked()
  freddy.draw()
  iconc.draw()

  //if key is to the left
  if(keyIsDown(LEFT_ARROW)) {
    knight.changeAnimation('moving')
    knightDirection = 180
    //flip horizontally
    enemy.mirrorX(-1)
    knight.mirrorX(1)
    //negative x velocity: move left
    knight.velocity.x = -2
  }
  else if(keyIsDown(RIGHT_ARROW)) {
    knight.changeAnimation('moving')
    knightDirection = 0
    //unflip
    enemy.mirrorX(1)
    knight.mirrorX(-1)
    knight.velocity.x = 2
  }
  else if(keyIsDown(UP_ARROW)) {
    knight.changeAnimation('moving')
    // enemy animation change
    enemy.changeAnimation('followUp')
    knightDirection = 270
    //unflip
    enemy.mirrorX(-1)
    knight.mirrorX(-1)
    knight.velocity.y = -2
  }
  else if(keyIsDown(DOWN_ARROW)) {
    knight.changeAnimation('moving')
    // enemy animation change
    enemy.changeAnimation('followDown')
    knightDirection = 90
    //unflip
    enemy.mirrorX(-1)
    knight.mirrorX(-1)
    knight.velocity.y = 2
  }

  else {
    //if close to the mouse, don't move
    knight.changeAnimation('floating')
    knight.velocity.x = 0
    knight.velocity.y = 0
  }


  if (keyCode === 86){
    knight.changeAnimation('swoard')
  }


  if(keyWentDown('x'))
  {
    var bullet = createSprite(knight.position.x, knight.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(10+knight.getSpeed(), knightDirection);
    
    bullet.life = 30;
    bullets.add(bullet);
  }

  // boundary
  if(knight.position.x < 0 + (knight.width/2)) {
    knight.position.x = 0 + (knight.width/2)
  }
  if(knight.position.x > width - (knight.width/2)) {
    knight.position.x = width - (knight.width/2)
  }
  if(knight.position.y < 0 + (knight.height/2)) {
    knight.position.y = 0 + (knight.height/2)
  }
  if(knight.position.y > height - (knight.height/2)) {
    knight.position.y = height - (knight.height/2)
  }

  if(knight.collide(enemy) || knight.collide(slime)){
    console.log('hit')
    knightHealth-=200
  }

  if(knightHealth == 0){
    console.log('dead')
    knight.remove()
  }
  
  fill(4, 255, 0)
  rect(width/2-500,20,knightHealth,20)

  drawSprites()
}  
//function drawSprites

class Enemy {
  constructor(){
    this.health = 300
  }

  draw() {
    if(this.health != 0) {
      fill(255)
      text(this.health, enemy.position.x, enemy.position.y - enemy.width/2)
    }
  }

 

  attacked() {
    // setting colliders
    enemy.setCollider('rectangle', enemy.position.x, enemy.position.y, enemy.width, enemy.height)
    knight.setCollider('rectangle', knight.position.x, knight.position.y, knight.width, knight.height)
    //bullets.setCollider('circle', bullets.position.x, bullets.position.y, bullets.width/2)

    let hitBySword = enemy.collide(knight) && keyCode == 86
    //let hitByBullets = enemy.collide(bullets)
    

    if(hitBySword) {
      this.health -= 5
    }

  

    //if(hitByBullets) {
      //this.health -= 10
    //}

    if(this.health == 0) {
      enemy.remove()
    }
  }
  
  move() {
    if(knight.position.x < width/2){
    enemy.changeAnimation('follow')
    
    enemy.velocity.x = (knight.position.x - enemy.position.x) / 30
    enemy.velocity.y = (knight.position.y - enemy.position.y) / 30
    } else if (knight.position.x > width/2){
      enemy.changeAnimation('follow')
      enemy.velocity.x=width/2
      enemy.velocity.y=width/2
      

      
    }
    
  }
}

class Slime{
  constructor(){
    this.health = 250
  }

  draw() {
    if(this.health != 0) {
      fill(255)
      text(this.health, slime.position.x, slime.position.y - slime.width/2)
    }
  }

  attacked() {
    // setting colliders
    slime.setCollider('rectangle', slime.position.x, slime.position.y, slime.width, slime.height)
    knight.setCollider('rectangle', knight.position.x, knight.position.y, knight.width, knight.height)
    //bullet.setCollider('circle', bullet.position.x, bullet.position.y, bullet.width/2)

    let hitBySword = slime.collide(knight) && keyCode == 86
    //let hitByBullet = enemy.collide(bullet)

    if(hitBySword) {
      this.health -= 5
    }

    //if(hitByBullet) {
      //this.health -= 10
    //}

    if(this.health == 0) {
      slime.remove()
    }
  }
  
  move() {
    if(knight.position.x < width/2){
    
    
    slime.velocity.x = (knight.position.x - slime.position.x) / 30
    slime.velocity.y = (knight.position.y - slime.position.y) / 30
    } else if (knight.position.x > width/2){
      
      slime.velocity.x=width/2
      slime.velocity.y=width/2
      

      
    }
    
  }
}


class Text {
  
  draw(){
    image(icon,width-150,height-550)
    textSize(15)
    fill(255,255,255)
    text('instructions:', width-150,height-480)
    text('←→↑↓ keys to move',width-150,height-460)
    text('x=fireballs', width-150,height-440)
    text('v=sword', width-150,height-420)
  }

  
}


