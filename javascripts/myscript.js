var canvas = document.getElementById('game');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var tileW = 100;			//100
var tileL = 50;				//50
var tileH = 15;			//15
var tileGap = 0;//Tile gap of -1 suggested for tiles without a height

var debugMode = true;

var tiles = [
	//id:0 is reserved as a void tile. Do not use
	{id:1, source:'img/beach.png', walkable: true},
	{id:2, source:'img/beachCornerES.png', walkable: true},
	{id:3, source:'img/beachCornerNE.png', walkable: true},
	{id:4, source:'img/beachCornerNW.png', walkable: true},
	{id:5, source:'img/beachCornerSW.png', walkable: true},
	{id:6, source:'img/beachE.png', walkable: true},
	{id:7, source:'img/beachES.png', walkable: true},
	{id:8, source:'img/beachN.png', walkable: true},
	{id:9, source:'img/beachNE.png', walkable: true},
	{id:10, source:'img/beachNW.png', walkable: true},
	{id:11, source:'img/beachS.png', walkable: true},
	{id:12, source:'img/beachSW.png', walkable: true},
	{id:13, source:'img/beachW.png', walkable: true},
	{id:14, source:'img/bridgeEW.png', walkable: true},
	{id:15, source:'img/bridgeNS.png', walkable: true},
	{id:16, source:'img/coniferAltShort.png', walkable: true},
	{id:17, source:'img/coniferAltTall.png', walkable: true},
	{id:18, source:'img/coniferShort.png', walkable: true},
	{id:19, source:'img/coniferTall.png', walkable: true},
	{id:20, source:'img/crossroad.png', walkable: true},
	{id:21, source:'img/crossroadESW.png', walkable: true},
	{id:22, source:'img/crossroadNES.png', walkable: true},
	{id:23, source:'img/crossroadNEW.png', walkable: true},
	{id:24, source:'img/crossroadNSW.png', walkable: true},
	{id:25, source:'img/dirt.png', walkable: true},
	{id:26, source:'img/dirtDouble.png', walkable: true},
	{id:27, source:'img/endE.png', walkable: true},
	{id:28, source:'img/endN.png', walkable: true},
	{id:29, source:'img/endS.png', walkable: true},
	{id:30, source:'img/endW.png', walkable: true},
	{id:31, source:'img/exitE.png', walkable: true},
	{id:32, source:'img/exitN.png', walkable: true},
	{id:33, source:'img/exitS.png', walkable: true},
	{id:34, source:'img/exitW.png', walkable: true},
	{id:35, source:'img/grass.png', walkable: true},
	{id:36, source:'img/grassWhole.png', walkable: true},
	{id:37, source:'img/hillE.png', walkable: true},
	{id:38, source:'img/hillES.png', walkable: true},
	{id:39, source:'img/hillN.png', walkable: true},
	{id:40, source:'img/hillNE.png', walkable: true},
	{id:41, source:'img/hillNW.png', walkable: true},
	{id:42, source:'img/hillS.png', walkable: true},
	{id:43, source:'img/hillSW.png', walkable: true},
	{id:44, source:'img/hillW.png', walkable: true},
	{id:45, source:'img/lotE.png', walkable: true},
	{id:46, source:'img/lotES.png', walkable: true},
	{id:47, source:'img/lotN.png', walkable: true},
	{id:48, source:'img/lotNE.png', walkable: true},
	{id:49, source:'img/lotNW.png', walkable: true},
	{id:50, source:'img/lotS.png', walkable: true},
	{id:51, source:'img/lotSW.png', walkable: true},
	{id:52, source:'img/lotW.png', walkable: true},
	{id:53, source:'img/riverBankedES.png', walkable: true},
	{id:54, source:'img/riverBankedEW.png', walkable: true},
	{id:55, source:'img/riverBankedNE.png', walkable: true},
	{id:56, source:'img/riverBankedNS.png', walkable: true},
	{id:57, source:'img/riverBankedNW.png', walkable: true},
	{id:58, source:'img/riverBankedSW.png', walkable: true},
	{id:59, source:'img/riverES.png', walkable: true},
	{id:60, source:'img/riverEW.png', walkable: true},
	{id:61, source:'img/riverNE.png', walkable: true},
	{id:62, source:'img/riverNS.png', walkable: true},
	{id:63, source:'img/riverNW.png', walkable: true},
	{id:64, source:'img/riverSW.png', walkable: true},
	{id:65, source:'img/road.png', walkable: true},
	{id:66, source:'img/roadES.png', walkable: true},
	{id:67, source:'img/roadEW.png', walkable: true},
	{id:68, source:'img/roadHill2E.png', walkable: true},
	{id:69, source:'img/roadHill2N.png', walkable: true},
	{id:70, source:'img/roadHill2S.png', walkable: true},
	{id:71, source:'img/roadHill2W.png', walkable: true},
	{id:72, source:'img/roadHillE.png', walkable: true},
	{id:73, source:'img/roadHillN.png', walkable: true},
	{id:74, source:'img/roadHillS.png', walkable: true},
	{id:75, source:'img/roadHillW.png', walkable: true},
	{id:76, source:'img/roadNE.png', walkable: true},
	{id:77, source:'img/roadNS.png', walkable: true},
	{id:78, source:'img/roadNW.png', walkable: true},
	{id:79, source:'img/roadSW.png', walkable: true},
	{id:80, source:'img/treeAltShort.png', walkable: true},
	{id:81, source:'img/treeAltTall.png', walkable: true},
	{id:82, source:'img/treeShort.png', walkable: true},
	{id:83, source:'img/treeTall.png', walkable: true},
	{id:84, source:'img/water.png', walkable: true},
	{id:85, source:'img/waterCornerES.png', walkable: true},
	{id:86, source:'img/waterCornerNE.png', walkable: true},
	{id:87, source:'img/waterCornerNW.png', walkable: true},
	{id:88, source:'img/waterCornerSW.png', walkable: true},
	{id:89, source:'img/waterE.png', walkable: true},
	{id:90, source:'img/waterES.png', walkable: true},
	{id:91, source:'img/waterN.png', walkable: true},
	{id:92, source:'img/waterNE.png', walkable: true},
	{id:93, source:'img/waterNW.png', walkable: true},
	{id:94, source:'img/waterS.png', walkable: true},
	{id:95, source:'img/waterSW.png', walkable: true},
	{id:96, source:'img/waterW.png', walkable: true},
	{id:97, source:'img/beachFlat.png', walkable: true},
	{id:98, source:'img/roadFlat.png', walkable: true}
];

var mapData = [
  [
      [35,35,77,35,35,35,35,35,35,35,35,35,65,65, 1, 1, 1, 1, 1, 1],
    [35,35,35,77,35,35, 0, 0, 0,35,35,35,65,65, 1, 1, 1, 1, 1, 1],
      [35,35,35,77,35, 0, 0, 0, 0,35,35,65,65, 1, 1, 1, 1, 1, 1, 1],
    [35,35,35,35,69,35, 0, 0, 0, 0,35,65,65, 1, 1, 1, 1, 1, 1, 1],
      [35,35,35,35,35, 0, 0, 0, 0,35,65,65, 1, 1, 1, 1, 1, 1, 1, 1],
    [65,35,35,35,35, 0, 0, 0, 0,35,65,65, 1, 1, 1, 1, 1, 1, 1, 1],
      [65,35,35,35,35, 0, 0,35,35,65,65, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [65,65,35,35,35,35,35,35,35,65,65, 1, 1, 1, 1,84,84,84,84,84],
      [65,65,35,35,35,35,35,35,65,65, 1, 1, 1, 1,84,84,84,84,84,84],
    [35,65,65,65,65,65,65,65,65,65, 1, 1, 1, 1,84,84,84,84,84,84],
      [35,65,65,65,65,65,65,65,65, 1, 1, 1, 1,84,84,84,84,84,84,84],
    [35,35,65,65,65,65,65,65,65, 1, 1, 1, 1,84,84,84,84, 1, 1,84],
      [35,35,35,35,35,35,35,35, 1, 1, 1, 1,84,84,84,84, 1, 1,84,84],
    [35,35,35,35,35,35,35,35, 1, 1, 1, 1,84,84,84,84,84,84,84,84],
      [35,35,35,35,35,35,35, 1, 1, 1, 1, 1,84,84,84,84,84,84,84,84]
  ],[
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0,35,35,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0,35, 0, 0,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0,19, 0, 0,35, 0, 0,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0,35, 0, 0,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0,35, 0,35,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0,35,35,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ],[
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0,35,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0,35,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0,35,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0,35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
];

stalerz.init(canvas, tileW, tileL, tileH, tileGap, tiles, debugMode, function() {
	stalerz.updateMapData(mapData);

	(window.onresize = function(event) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		stalerz.updateCanvas();
	}).call();

	canvas.addEventListener('click', function(e) {
		var z = stalerz.mouse.tileZ;
		var y = stalerz.mouse.tileY;
		var x = stalerz.mouse.tileX;
		var face = stalerz.mouse.face;
		var odd=1; if(y%2===0) { odd=0; }
		if(face==='top') {
			stalerz.map[z+1][y][x].id = 26;
		} else if(face==='left') {
			stalerz.map[z][y+1][x-odd].id = 26;
		} else if(face==='right') {
			stalerz.map[z][y+1][x+1-odd].id = 26;
		}
		stalerz.updateCanvas();
	}, false);
});

//What I want a isometric game engine to do:
//1.  Allow me to edit any x,y,z square
//2.  Library must only calculate the mouse information when asked for it!
//3.  Ability to load map by chunks
//4.  Accurate lighting/Change sun direction/Light sources.
//5.  Distance calculation function
//6.  Path finding function
//7.  Where did the click hit the tile? left wall/top/right wall?
//8.  Rotate the map around a certain point.
//9.  Extract/Save map data
//10. Unlimited height ceiling(max height must be declared)
//11. Animated tiles(using sprite strip)
//12. Allow tiles to be X tiles wide, etc... Big houses and such.