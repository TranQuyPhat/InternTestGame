game.player = {
  x: 54,
  y: 0,
  height: 24,
  highestY: 0,
  direction: "left",
  isInAir: false,
  startedJump: false,
  moveInterval: null,
  fallTimeout: function (startingY, time, maxHeight, count) {
    return setTimeout(
      function () {
        if (!(count == 1 && this.doubleJump)) {
          if (this.isInAir) {
            this.y = startingY - maxHeight + Math.pow(-time / 3 + 11, 2);

            if (this.y < this.highestY) {
              this.highestY = this.y;
            }
            if (time > 37) {
              this.startedJump = false;
              this.doubleJump = false;
              game.checkCollisions();
            }
            if (time < 150) {
              time++;
              this.fallTimeout(startingY, time, maxHeight, count);
            } else {
              game.isOver = true;
            }
            if (this.y > 40) {
              game.isOver = true;
            }
            game.requestRedraw();
          }
        }
      }.bind(this, startingY, time, maxHeight, count),
      12
    );
  },

  animationFrameNumber: 0,
  collidesWithGround: true,
  animations: {
    // Describe coordinates of consecutive animation frames of objects in textures
    left: [
      { tileColumn: 0, tileRow: 2 },
      { tileColumn: 1, tileRow: 2 },
      { tileColumn: 2, tileRow: 2 },
      { tileColumn: 3, tileRow: 2 },
    ],
    right: [
      { tileColumn: 0, tileRow: 3 },
      { tileColumn: 1, tileRow: 3 },
      { tileColumn: 2, tileRow: 3 },
      { tileColumn: 3, tileRow: 3 },
    ],
  },

  jump: function (type, count) {
    console.log(this.doubleJump);

    if (!this.isInAir || (this.doubleJump && count != 0)) {
      game.sounds.jump.play();
      this.isInAir = true;
      this.startedJump = true;
      var startingY = this.y;
      console.log(`:: STARTING Y : ${startingY}`);

      var time = 1;
      maxHeight = 121;
      if (type == "fall") {
        time = 30;
        maxHeight = 0;
      }
      return this.fallTimeout(startingY, time, maxHeight, count);
    }
  },
};
