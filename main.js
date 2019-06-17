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
    pixelArt: true,
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

  this.cameras.main.backgroundColor.setTo(0, 233, 75)

  var frameNames = this.anims.generateFrameNames('mons', {
                   start: 19, end: 20,
                   prefix: 'images/monsR/mon_', suffix: '.png'
               });

  this.anims.create({ key: 'walk',
                      frames: frameNames,
                      frameRate: 10,
                      repeat: -1 });

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

     ball = this.add.sprite(50, height - 40, 'ball1').setScale(.10).play('roll');

     var graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });

     var lane = width / 4;
     var centerLane = lane / 2;

     for (var x = 0; x < width; x+=lane) {
       graphics.fillRectShape(new Phaser.Geom.Rectangle(centerLane+x, 0, 50, 50));
     }



    var scale = 4;
    bulba = this.add.sprite(40, 40, 'mons', 'mon_19.png').setScale(scale).play('walk');

}



function update ()
{

  bulba.y += 5;


  var grassSpeed = 4;
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
