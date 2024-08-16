// The spaghetti code masterpiece
var game = {
  canvas: document.getElementById("canvas"),
  context: this.canvas.getContext("2d", { alpha: false }),
  counter: document.getElementById("counter"),
  playerTexture: new Image(),
  groundTexture: new Image(),
  drawPending: false,
  backgrounds: {
    sky: {
      image: new Image(),
      loaded: false,
    },
    trees: {
      image: new Image(),
      loaded: false,
    },
  },
  sounds: {
    jump: new Audio("sounds/jump.wav"),
  },
  options: {
    playerOptions: {
      playerPath: "mew.png",
      tileWidth: 48,
      tileHeight: 48,
    },
    groundPath: "textures.png",
    tileWidth: 24,
    tileHeight: 24,
    canvasWidth: window.innerWidth / 3,
    canvasHeight: window.innerHeight / 3,
  },
  pressedKeys: {},
  init: function (onInit) {
    this.canvas.width = this.options.canvasWidth;
    this.canvas.height = this.options.canvasHeight;
    this.context.imageSmoothingEnabled = false;

    this.backgrounds["sky"].image.src = "background.png";
    this.backgrounds["trees"].image.src = "trees.png";

    for (var key in this.backgrounds) {
      this.backgrounds[key].image.onload = function (currentKey) {
        this.backgrounds[currentKey].loaded = true;
      }.bind(this, key);
    }
    this.playerTexture = new Image();
    this.playerTexture.src = this.options.playerOptions.playerPath;
    this.groundTexture = new Image();
    this.groundTexture.src = this.options.groundPath;

    Promise.all([
      new Promise((resolve) => (this.playerTexture.onload = resolve)),
      new Promise((resolve) => (this.groundTexture.onload = resolve)),
    ]).then(onInit);
  },
  map: {
    structures: [],
  },
  isOver: false,
};
