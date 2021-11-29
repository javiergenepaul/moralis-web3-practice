/** Connect to Moralis server */
const serverUrl = "https://6f4ol6yo4dww.usemoralis.com:2053/server";
const appId = "GFIJSjWfunIp0PkxIhfDRLRYCfgEQdSPRGG0IAIn";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    try {
      user = await Moralis.authenticate({
        signingMessage: "Hello World!",
      });
      console.log(user);
      console.log(user.get("ethAddress"));
    } catch (error) {
      console.log(error);
    }
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

var config = {
  type: Phaser.AUTO,
  // pixel size
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var platforms;
var player;
var cursors;

// Loading assets
function preload() {
  this.load.image("background", "assets/BG.png");
  this.load.image("ground", "assets/Tiles/Tile (2).png");
  this.load.image("player", "assets/Player.png");
}

// initial setup
function create() {
  this.add.image(400, 300, "background").setScale(0.55); // background

  platforms = this.physics.add.staticGroup(); // initialize physics

  platforms.create(470, 400, "ground").setScale(0.5).refreshBody();
  platforms.create(535, 400, "ground").setScale(0.5).refreshBody();
  platforms.create(600, 400, "ground").setScale(0.5).refreshBody();
  platforms.create(665, 400, "ground").setScale(0.5).refreshBody();

  player = this.physics.add
    .sprite(500, 250, "player")
    .setScale(0.3)
    .refreshBody();
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player, platforms);

  cursors = this.input.keyboard.createCursorKeys();
}

// Frame per seconds
function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    // player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    // player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    // player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

/** Useful Resources  */

// https://docs.moralis.io/moralis-server/users/crypto-login
// https://docs.moralis.io/moralis-server/getting-started/quick-start#user
// https://docs.moralis.io/moralis-server/users/crypto-login#metamask

/** Moralis Forum */

// https://forum.moralis.io/
