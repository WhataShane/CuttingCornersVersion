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
var score = 0
var scoreText
var begun = false


var lane = width / 4;
var centerOfLane = lane / 2;
var xPosLane1 = centerOfLane;
var xPosLane2 = centerOfLane +lane;
var xPosLane3 = centerOfLane +lane+lane;
var xPosLane4 = centerOfLane +lane+lane+lane;

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
  this.input.addPointer(3);
  cursors = this.input.keyboard.createCursorKeys();
  aKey = this.input.keyboard.addKey('A');
  dKey = this.input.keyboard.addKey('D');
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
//1 dy
//.055 normal


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
           randLaneXPos = xPosLane2;
         }
         else if  (randLane == 3){
           randLaneXPos = xPosLane3;
         }
         else if  (randLane == 4){
           randLaneXPos = xPosLane4;
         }

         pokeArray.push(this.physics.add.sprite(randLaneXPos, -60, 'mons', 'mon_'+pngCounter+'.png').setCollideWorldBounds(false).setScale(scale).play('walk_'+x).setOrigin(0.5﻿﻿))
         pngCounter += 2;
     }



     scoreText = this.add.text(10, 10, score+'/807 will return', { fontFamily: '"Press Start 2P"', stroke:"#000000", strokeThickness:2 })

     for (var monster = 0; monster < pokeArray.length; monster++){
            this.physics.add.overlap(ball, pokeArray[monster], col, function(){return true}, this);
     }

     for (var x = 0; x < pokeArray.length; x++){
        randomSpeeds.push(Math.floor((Math.random()*25)+250))
     }

     for (var x = 4; x < pokeArray.length; x++){
        randomSpeeds[x]= (Math.floor((Math.random()*50)+270))
     }

     for (var x = 10; x < pokeArray.length; x++){
        randomSpeeds[x]= (Math.floor((Math.random()*75)+370))
     }







}

function col(ball, creature){
  score++;
  creature.x = -10000;
  scoreText.setText(''+score+'/807 will return', { fontFamily: '"Press Start 2P"', stroke:"#000000", strokeThickness:2 });

//  if (score == 5){
  //  var congrats = this.add.text(width/2, height/2, "Dynamax Unlocked!", { fontFamily: '"Press Start 2P"' }).setOrigin(.5)
  //  ball.setScale(1)
//  }

  if (score == 8){
    //var congrats = this.add.text(width/2, height/2, "Dynamax Unlocked!", { fontFamily: '"Press Start 2P"' }).setOrigin(.5)
    ball.setScale(.055)
  }




}

function onEvent(){

  if ((currentMon + 2) < pokeArray.length){

    if ((currentMon > 8)){

      var randLaneFinale = Math.floor((Math.random()*4)+1);
      var randLaneFinale2 = Math.floor((Math.random()*4)+1);
      var randLaneFinale3 = Math.floor((Math.random()*4)+1);

      var XposFinale = 0;
      var XposFinale2 = 0;
      var XposFinale3 = 0;

      if(randLaneFinale == 1){
        XposFinale = xPosLane1;
      }
      else if (randLaneFinale == 2) {
        XposFinale = xPosLane2;
      }
      else if  (randLaneFinale == 3){
        XposFinale = xPosLane3+40;
      }
      else if  (randLaneFinale == 4){
        XposFinale = xPosLane4+40;
      }

      if(randLaneFinale2 == 1){
        XposFinale2 = xPosLane1-40;
      }
      else if (randLaneFinale2 == 2) {
        XposFinale2 = xPosLane2+10;
      }
      else if  (randLaneFinale2 == 3){
        XposFinale2 = xPosLane3-20;
      }
      else if  (randLaneFinale2 == 4){
        XposFinale2 = xPosLane4+20;
      }

      if(randLaneFinale3 == 1){
        XposFinale3 = xPosLane1-40;
      }
      else if (randLaneFinale3 == 2) {
        XposFinale3 = xPosLane2;
      }
      else if  (randLaneFinale3 == 3){
        XposFinale3 = xPosLane3;
      }
      else if (randLaneFinale3 == 4){
        XposFinale3 = xPosLane4+15;
      }

      this.physics.moveTo(pokeArray[currentMon],XposFinale,height+50, randomSpeeds[currentMon])
      this.physics.moveTo(pokeArray[currentMon+1],XposFinale2,height+50, randomSpeeds[currentMon+1])
      this.physics.moveTo(pokeArray[currentMon+2],XposFinale3,height+50, randomSpeeds[currentMon+2])

    } else {
      this.physics.moveTo(pokeArray[currentMon],pokeArray[currentMon].x,height+50, randomSpeeds[currentMon])
      this.physics.moveTo(pokeArray[currentMon+1],pokeArray[currentMon+1].x,height+50, randomSpeeds[currentMon+1])
      this.physics.moveTo(pokeArray[currentMon+2],pokeArray[currentMon+2].x,height+50, randomSpeeds[currentMon+2])

    }
    currentMon++;

  } else if (currentMon == 148){
    currentMon++
    this.time.addEvent({ delay: 4000,
                         callback: secondary,
                         callbackScope: this,
                         loop: false
                       });
  }

}

function secondary(){

   ending = this.add.text(width/2, height - (height*.75), "So here's the deal", { fontFamily: '"Press Start 2P"', stroke:"#000000", strokeThickness:2 }).setOrigin(.5)

  this.time.addEvent({ delay: 1500,
                       callback: tertiary,
                       callbackScope: this,
                       loop: false
                     });
}

function tertiary(){
   ending2 = this.add.text((width/2)+20, height - (height*.75) + 20, "(boy, how do I put this)", { fontFamily: '"Press Start 2P"', fontSize: 11, stroke:"#000000", strokeThickness:2 }).setOrigin(.5)

  this.time.addEvent({ delay: 1250,
                       callback: four,
                       callbackScope: this,
                       loop: false
                     });
}

function four(){
  ending.destroy();
  ending2.destroy();

   ending3 = this.add.text((width/2)-40, height - (height*.75) + 20, "WE", { fontFamily: '"Press Start 2P"', fontSize: 46, stroke:"#000000", strokeThickness:2 }).setOrigin(.5)


  this.time.addEvent({ delay: 300,
                       callback: five,
                       callbackScope: this,
                       loop: false
                     });

}

function five(){

   ending4 = this.add.text((width/2), height - (height*.75) + 70, "RAN", { fontFamily: '"Press Start 2P"', fontSize: 46, stroke:"#000000", strokeThickness:2 }).setOrigin(.5)


    this.time.addEvent({ delay: 300,
                         callback: six,
                         callbackScope: this,
                         loop: false
                       });
}

function six(){

   ending5 = this.add.text((width/2)+40, height - (height*.75) + 120, "OUT", { fontFamily: '"Press Start 2P"', fontSize: 46, stroke:"#000000", strokeThickness:2 }).setOrigin(.5)


  this.time.addEvent({ delay: 1000,
                       callback: seven,
                       callbackScope: this,
                       loop: false
                     });

}

function seven(){

  ending6 = this.add.text((width/2), height - (height*.75) + 160, "of time and resources to\nimplement the other Pokemon", { fontFamily: '"Press Start 2P"', fontSize: 11, stroke:"#000000", strokeThickness:2, align:"center"}).setOrigin(.5)

  this.time.addEvent({ delay: 3000,
                       callback: eight,
                       callbackScope: this,
                       loop: false
                     });

}

function eight() {
  ending7 = this.add.text((width/2), height - (height*.75) + 185, "Sorry...", { fontFamily: '"Press Start 2P"', fontSize: 11, stroke:"#000000", strokeThickness:2, align:"center"}).setOrigin(.5)

  this.time.addEvent({ delay: 7000,
                       callback: nine,
                       callbackScope: this,
                       loop: false
                     });

}

function nine() {

//  scoreText.destroy();
//  score--;
//  scoreText = this.add.text(10, 10, score+'/807 remain', { fontFamily: '"Press Start 2P"' })
ending3.destroy()
ending4.destroy()
ending5.destroy()
ending6.destroy()
  ending7.destroy()
   ending8 = this.add.text((width/2), height/2 - 30, "What are you\nlingering here for?", { fontFamily: '"Press Start 2P"', fontSize: 11, stroke:"#000000", strokeThickness:2, align:"center"}).setOrigin(.5)

  this.time.addEvent({ delay: 5000,
                       callback: ten,
                       callbackScope: this,
                       loop: false
                     });

}

function ten(){
ending8.destroy()
   ending9 = this.add.text((width/2), (height/2) - 30, "Shoo, off with you.\nGame's over. You got Kanto.\nToo hard to code\nthe rest of 'em.", { fontFamily: '"Press Start 2P"', fontSize: 11, stroke:"#000000", strokeThickness:2, align:"center"}).setOrigin(.5)

  this.time.addEvent({ delay: 7000,
                       callback: eleven,
                       callbackScope: this,
                       loop: false
                     });
}

function eleven(){
   ending9.destroy()
   ending10 = this.add.text((width/2), height/2 - 30, "Close this tab in 10 seconds\nor I'll do something terrible", { fontFamily: '"Press Start 2P"', fontSize: 11, stroke:"#000000", strokeThickness:2, align:"center"}).setOrigin(.5)

  this.time.addEvent({ delay: 10000,
                       callback: twelve,
                       callbackScope: this,
                       loop: false
                     });
}

function twelve(){
  ending10.destroy()
  ending11 = this.add.text((width/2), height/2 - 30, "That's it, pal.\nCheck your upper left.", { fontFamily: '"Press Start 2P"', fontSize: 11, stroke:"#000000", strokeThickness:2, align:"center"}).setOrigin(.5)

  scoreText.destroy();
  score = 0;
  scoreText = this.add.text(10, 10, score+'/807 remain', { fontFamily: '"Press Start 2P"', strokeThickness:2, align:"center", stroke:"#000000" })

  this.time.addEvent({ delay: 5000,
                       callback: thirteen,
                       callbackScope: this,
                       loop: false
                     });
}

function thirteen(){

  ending11.destroy()
  ending12 = this.add.text((width/2), height/2 - 30, "No National Dex Pkmn\nin Sword & Shield.\n ZIP. ZILCH. ZIPPO.\nAnd it's all your fault.", { fontFamily: '"Press Start 2P"', fontSize: 11, stroke:"#000000", strokeThickness:2, align:"center"}).setOrigin(.5)

  this.time.addEvent({ delay: 9000,
                       callback: fourteen,
                       callbackScope: this,
                       loop: false
                     });

}

function fourteen(){
  ending12.destroy()
  scoreText.destroy();
  score = 0;
  scoreText = this.add.text(10, 10, '807/807 remain', { fontFamily: '"Press Start 2P"', strokeThickness:2, align:"center", stroke:"#000000" })
  ending13 = this.add.text((width/2), height/2 - 30, "I'm just messing with ya.\nThanks for playing.\n#BringBackNationalDex", { fontFamily: '"Press Start 2P"', fontSize: 11, stroke:"#000000", strokeThickness:2, align:"center"}).setOrigin(.5)
  grassSpeed = 0;
  ball.destroy();
}


function update (time, delta)
{

  if ((cursors.right.isDown || cursors.left.isDown || aKey.isDown || dKey.isDown || this.input.activePointer.isDown) && begun == false) {

    begun = true
    this.time.addEvent({ delay: 250,
                         callback: onEvent,
                         callbackScope: this,
                         loop: true
                       });
  }


  if (this.input.activePointer.isDown) {

//if pointer is to left of ball
    if ((this.input.activePointer.x < ball.x) && (ball.x > 0)) {
      ball.x -= 4;
    }

//if pointer is to right of ball
    if ((this.input.activePointer.x > ball.x) && (ball.x < width-10)) {
      ball.x += 4;
    }


    //var touchX = pointer.x;

  //  this.physics.moveTo(ball,touchX, ball.y, 100)
}

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

  if ((cursors.left.isDown && (ball.x >10)) || ((aKey.isDown && (ball.x >10))) ) {
    ball.x -= 4;
  }

  if ((cursors.right.isDown && (ball.x < width-10)) || (dKey.isDown && (ball.x < width-10)) ) {
    ball.x += 4;
  }




}

$(document).on('click', 'canvas', function() {
    $('.log').fadeOut()
})

$(document).on('touchstart', 'canvas', function() {
  console.log('yes')
    $('.log').fadeOut()
})


$(window).keypress(function(e) {
    console.log('yes')
  if (e.keyCode == 0 || e.keyCode == 32) {
    $('.log').fadeOut()
  }
});
