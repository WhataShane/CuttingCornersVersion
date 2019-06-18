if (window.innerWidth > 390) {
  var width = 390
} else {
  var width = window.innerWidth;
}

var height = window.innerHeight;

var FrameNamesArray = []
var pokeArray = []
var randomSpeeds = []
var scale = 2.5;
var walkSpeed = 7;
var tick = 0;
var currentMon = 0;

var lane = width / 4;
var centerOfLane = lane / 2;
var xPosLane1 = centerOfLane;

var config = {
    type: Phaser.Canvas,
    width: width,
    height: height,
    pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      },
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.path = '/';
  //TO-DO: condense into a spritesheet
  this.load.image('ball1', 'images/ball/1.png');
  this.load.image('ball2', 'images/ball/2.png');
  this.load.image('ball3', 'images/ball/3.png');
  this.load.image('ball4', 'images/ball/4.png');
  this.load.image('ball5', 'images/ball/5.png');
  this.load.image('ball6', 'images/ball/6.png');
  this.load.image('ball7', 'images/ball/7.png');
  this.load.image('ball8', 'images/ball/8.png');
  this.load.image('ball9', 'images/ball/9.png');
  this.load.image('ball10', 'images/ball/10.png');
  this.load.image('ball11', 'images/ball/11.png');
  this.load.image('ball12', 'images/ball/12.png');
  this.load.image('ball13', 'images/ball/13.png');
  this.load.image('ball14', 'images/ball/14.png');
  this.load.image('ball15', 'images/ball/15.png');
  this.load.image('ball16', 'images/ball/16.png');
  this.load.image('ball17', 'images/ball/17.png');
  this.load.image('ball18', 'images/ball/18.png');
  this.load.image('ball19', 'images/ball/19.png');
  this.load.image('ball20', 'images/ball/20.png');
  this.load.image('ball21', 'images/ball/21.png');
  this.load.image('ball22', 'images/ball/22.png');
  this.load.image('ball23', 'images/ball/23.png');
  this.load.image('ball24', 'images/ball/24.png');
  this.load.image('ball25', 'images/ball/25.png');
  this.load.image('ball26', 'images/ball/26.png');
  this.load.image('ball27', 'images/ball/27.png');
  this.load.image('ball28', 'images/ball/28.png');
  this.load.image('grass', 'images/grass2.png')
  this.load.multiatlas('mons', 'images/monsR/here.json', 'images/monsR');


}

function create ()
{

 this.physics.world.setBoundsCollision(false,false,false,false)


  var tick = this.time.now;
  cursors = this.input.keyboard.createCursorKeys();

  this.cameras.main.backgroundColor.setTo(0, 233, 75)


  //hardcoded in 301, 301 b/c there are 300 total frames (150 Pokemon, two frames per Pokemon). Each Pokemon has two sequential frames.
  // make that 301 + 9, for frames skipped in between
  for (var frame = 1; frame < 301 + 9; frame+=2){
    if (!(frame > 160 && frame < 171)){
      FrameNamesArray.push(
        this.anims.generateFrameNames('mons', {
                         start: frame, end: frame+1,
                         prefix: 'mon_', suffix: '.png'
                     })
      )
    }
  }

  for (var pkmn = 0; pkmn < FrameNamesArray.length; pkmn++ ){
    this.anims.create({ key: 'walk_' + (pkmn + 1),
                        frames: FrameNamesArray[pkmn],
                        frameRate: walkSpeed,
                        repeat: -1 });

  }

  this.anims.create({
          key: 'roll',
          frames: [
              { key: 'ball1', frame: null },
              { key: 'ball2', frame: null },
              { key: 'ball3', frame: null },
              { key: 'ball4', frame: null },
              { key: 'ball5', frame: null },
              { key: 'ball6', frame: null },
              { key: 'ball7', frame: null },
              { key: 'ball8', frame: null },
              { key: 'ball9', frame: null },
              { key: 'ball10', frame: null },
              { key: 'ball11', frame: null },
              { key: 'ball12', frame: null },
              { key: 'ball13', frame: null },
              { key: 'ball14', frame: null },
              { key: 'ball15', frame: null },
              { key: 'ball16', frame: null },
              { key: 'ball17', frame: null },
              { key: 'ball18', frame: null },
              { key: 'ball19', frame: null },
              { key: 'ball20', frame: null },
              { key: 'ball21', frame: null },
              { key: 'ball22', frame: null },
              { key: 'ball23', frame: null },
              { key: 'ball24', frame: null },
              { key: 'ball25', frame: null },
              { key: 'ball26', frame: null },
              { key: 'ball27', frame: null },
              { key: 'ball28', frame: null},
          ],
          frameRate: 20,
          repeat: -1
      });

      grassy = this.add.sprite(0, 0, 'grass').setOrigin(0, 0);
      offstageGrassy = this.add.sprite(0, -494, 'grass').setOrigin(0, 0);
      remainderGrassy = this.add.sprite(0, 494, 'grass').setOrigin(0, 0);

      if (window.innerWidth < 400) {
        grassy.width = window.innerWidth;
        offstageGrassy.width = window.innerWidth;
        remainderGrassy.width = window.innerWidth;
      }

     ball = this.physics.add.sprite(50, height - 40, 'ball1').setScale(.055).play('roll').setCollideWorldBounds(true);
//.1 dynamax


     var graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });

     var pngCounter = 1;

     for (var x = 1; x < 151; x++){
         if (pngCounter == 161){
           pngCounter = 171
         }

         var randLane = Math.floor((Math.random()*4)+1);
         var randLaneXPos = 0
         if(randLane == 1){
           randLaneXPos = xPosLane1;
         }
         else if (randLane == 2) {
           randLaneXPos = xPosLane1 + lane;
         }
         else if  (randLane == 3){
           randLaneXPos = xPosLane1 + lane + lane;
         }
         else if  (randLane == 4){
           randLaneXPos = xPosLane1 + lane + lane + lane;
         }

         pokeArray.push(this.physics.add.sprite(randLaneXPos, -60, 'mons', 'mon_'+pngCounter+'.png').setCollideWorldBounds(false).setScale(scale).play('walk_'+x).setOrigin(0.5﻿﻿))
         pngCounter += 2;
     }



     for (var monster = 0; monster < pokeArray.length; monster++){
            this.physics.add.overlap(ball, pokeArray[monster], col);
     }

     for (var x = 0; x < pokeArray.length; x++){
        randomSpeeds.push(Math.floor((Math.random()*5)+3))
     }

     for (var x = 4; x < pokeArray.length; x++){
        randomSpeeds[x]= (Math.floor((Math.random()*7)+3))
     }

     for (var x = 10; x < pokeArray.length; x++){
        randomSpeeds[x]= (Math.floor((Math.random()*9)+3))
     }


     this.time.addEvent({ delay: 1000,
                          callback: onEvent,
                          callbackScope: this,
                          loop: true });

}

function col(ball, creature){
  console.log("Remains in the PokeDex!");
  creature.destroy();
}

function onEvent(){
  this.physics.moveTo(pokeArray[0],xPosLane1,height+30, 400)
}


function update (time, delta)
{

/*  if ((currentMon + 6) < pokeArray.length){


//  pokeArray[currentMon].y += randomSpeeds[currentMon]
//  pokeArray[currentMon+1].y += randomSpeeds[currentMon+1]
//  pokeArray[currentMon+2].y += randomSpeeds[currentMon+2]
//  pokeArray[currentMon+3].y += randomSpeeds[currentMon+3]
//  pokeArray[currentMon+4].y += randomSpeeds[currentMon+4]
  pokeArray[currentMon+5].y += randomSpeeds[currentMon+5]
  pokeArray[currentMon+6].y += randomSpeeds[currentMon+6]
  pokeArray[currentMon+7].y += randomSpeeds[currentMon+7]

  if (time > tick + 1000 && pokeArray[currentMon].y > height + 50) {
    tick = time;

    if (currentMon < pokeArray.length - 1){
      currentMon++;
    }

  }

}
*/


  var grassSpeed = 1.2;
  grassy.y += grassSpeed;
  offstageGrassy.y += grassSpeed;
  remainderGrassy.y += grassSpeed;

  if (remainderGrassy.y > window.innerHeight) {
    remainderGrassy.y = -494;
  }


  if (offstageGrassy.y > window.innerHeight) {
    offstageGrassy.y = -494;
  }

  if (grassy.y > window.innerHeight) {
    grassy.y = -494;
  }

  if (cursors.left.isDown && (ball.x >22)) {
    ball.x -= 7;
  }

  if (cursors.right.isDown && (ball.x < width-21)) {
    ball.x += 7;
  }




}
