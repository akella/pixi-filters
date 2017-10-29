import 'pixi.js';
import 'pixi-filters';
import { TimeliMax } from 'gsap';

var app = new PIXI.Application(window.innerWidth, window.innerHeight, {
  backgroundColor: 0x000000
});
document.body.appendChild(app.view);
app.stage.interactive = true;

var container = new PIXI.Container();
var TextContainer = new PIXI.Container();
var BgContainer = new PIXI.Container();
app.stage.addChild(container);
container.addChild(BgContainer);
container.addChild(TextContainer);

var bg = PIXI.Sprite.fromImage('img/bg.jpg');
bg.width = 1280;
bg.height = 853;
bg.position.x = 0;
bg.position.y = 0;
BgContainer.addChild(bg);


var bg1 = PIXI.Sprite.fromImage('img/bg1.jpg');
bg1.width = 1280;
bg1.height = 853;
bg1.position.x = 0;
bg1.position.y = 0;
bg1.alpha = 0;
BgContainer.addChild(bg1);


// TEXT
var basicText = new PIXI.Text('Morning guys!', {
  fontFamily: 'Arial Narrow',
  fontSize: 136,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fill: '#ffffff',
  wordWrap: true,
  wordWrapWidth: 440
});
basicText.x = -400;
basicText.y = 90;
basicText.alpha = 0;
TextContainer.addChild(basicText);
// END TEXT

// displacement map
var displacementSprite = PIXI.Sprite.fromImage('img/displacement.png');
var displacementFilter = new PIXI.filters.DisplacementFilter(
  displacementSprite
);
app.stage.addChild(displacementSprite);
displacementFilter.scale.x = 200;
displacementFilter.scale.y = 300;
TextContainer.filters = [displacementFilter];
// end of displace




// shockwave
let shock = new PIXI.filters.ShockwaveFilter();

// end shockwave

let twist = new PIXI.filters.TwistFilter();
twist.angle = 0;
twist.radius = 0;
twist.offset.x = window.innerWidth/2;
twist.offset.y = window.innerHeight/2;

container.filters = [shock,twist];


// pinch
let pinch = new PIXI.filters.BulgePinchFilter();
pinch.radius = 50;
pinch.strength = 0.1;
pinch.center.x = 0.5;
pinch.center.y = 0.5;
BgContainer.filters = [pinch];
// 


// AsciiFilter
// let ascii = new PIXI.filters.AsciiFilter();
// ascii.size = 5;
// BgContainer.filters = [ascii];
//


app.ticker.add(function(delta) {
  app.renderer.render(container);

  // console.log(​PIXI.interaction.InteractionData﻿.data);
});



let tl = new TimelineMax();
tl
  .to(shock,1,{time: 1})
  .to(displacementFilter.scale, 1, { x: 0.1, y: 0.1 },0)
  .to(basicText.position, 1, { x: 100 },0)
  .to(basicText, 1, { alpha: 1 },0);

document.body.addEventListener('click', () => {
  let tl = new TimelineMax();
  tl
    .to(displacementFilter.scale, 1, { x: 300, y: 200 })
    .to(basicText.position, 1, { x: 400 },0)
    .to(basicText, 1, { alpha: 0 },0)
    .to(twist,1,{angle: 60,radius: 800})
    .to(bg,1,{alpha:0})
    .to(bg1,1,{alpha:1},'-=1')
    .to(twist,2,{angle: 0,radius: 0},'-=1');
});



// WHY!?
app.stage
  .on('mousemove', onPointerMove)
  .on('touchmove', onPointerMove);
function onPointerMove(eventData) {
  pinch.center.x = eventData.data.global.x/window.innerWidth;
  pinch.center.y = eventData.data.global.y/window.innerHeight;
}
