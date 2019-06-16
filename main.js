if (window.innerWidth > 390) {
  var width = 390
} else {
  var width = window.innerWidth;
}

var height = window.innerHeight;

var config = {
    type: Phaser.Canvas,
    width: width,
    height: height,
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


  if (window.innerWidth < 400) {
    var grass = this.load.image('grass', 'images/grass2.png')
    grass.width = window.innerWidth;
  } else {
    var grass = this.load.image('grass', 'images/grass2.png');
  }

  this.load.multiatlas('cityscene', 'images/monsR/here.json', 'monsR');

}

function create ()
{

  this.cameras.main.backgroundColor.setTo(0, 233, 75)

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
      ball = this.add.sprite(50, height - 40, 'ball1').setScale(.10).play('roll');

}

function update ()
{
  var grassSpeed = 2;
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

  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown && (ball.x >21)) {
    ball.x -= 7;
  }



  if (cursors.right.isDown && (ball.x < width-21)) {
    ball.x += 7;
  }




}
