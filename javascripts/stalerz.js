window.stalerz = (function() {
	var ctx,
		canvasRect,
		canvasW, canvasH,
		tileW, tileL, tileH, tileLHRatio, tileG,
		tiles, numTiles,
		offsetX, offsetY,
		debugMode, map = [],
		mouse = {
			isDown: false,
			x: 0, y: 0,
			mapX: 0, mapY: 0,
			tileX: 0, tileY: 0, tileZ: 0, face: ''
		},
		tilesBeneathMouse;

	function onMouseDown(e) {
		mouse.isDown = true;
	}
	function onMouseUp(e) {
		mouse.isDown = false;
	}
	function onMouseMove(e) {
		mouse.x = e.clientX-canvasRect.left;
		mouse.y = e.clientY-canvasRect.top;

		if(mouse.isDown) {
			offsetX += (mouse.x-mouse.prevX);
			offsetY += (mouse.y-mouse.prevY);
		}

		mouse.mapX = mouse.x-offsetX;
		mouse.mapY = mouse.y-offsetY;

		mouse.prevX = mouse.x;
		mouse.prevY = mouse.y;

		tilesBeneathMouse = [];
		for(var z=0, zlen=map.length;z<zlen;z++) {
			for(var y=0, ylen=map[z].length;y<ylen;y++) {
				for(var x=0, xlen=map[z][y].length;x<xlen;x++) {
					if(map[z][y][x].containsMouse() && map[z][y][x].id!==0) {
						tilesBeneathMouse.push(map[z][y][x]);
						mouse.tileX = x;
						mouse.tileY = y;
						mouse.tileZ = z;
						if(map[z][y][x].topFaceContainsMouse()) {
							mouse.face = 'top';
						} else if(map[z][y][x].leftContainsMouse()) {
							mouse.face = 'left';
						} else if(map[z][y][x].rightContainsMouse()) {
							mouse.face = 'right';
						}
					}
				}
			}
		}

		for(var tile=0, tiles=tilesBeneathMouse.length;tile<tiles;tile++) {	//Override the tileY to the most upfront tile
			if(tilesBeneathMouse[tile].y>mouse.tileY) {
				mouse.tileY = tilesBeneathMouse[tile].y;
			}
		}

		stalerz.updateCanvas();

		if(debug) {
			log('pixel pos  ('+Math.floor(mouse.x)+', '+Math.floor(mouse.y)+')', 'line1');
			log('map pos  ('+Math.floor(mouse.mapX)+', '+Math.floor(mouse.mapY)+')', 'line2');
			log('tileZ: '+mouse.tileZ+'   tileY: '+mouse.tileY+'   tileX: '+mouse.tileX, 'line3');
			log('tileFace: '+mouse.face, 'line4');
		}
	}
	function loadTiles(callback) {
		numTiles = tiles.length;
		var loadedTileImages = 0;

		for(var tile=0;tile<numTiles;tile++) {
			tiles[tile].img = new Image();
			tiles[tile].img.onload = function() {
				loadedTileImages++;
				if(loadedTileImages>=numTiles) {
					callback();
				}
			};
			tiles[tile].img.src = tiles[tile].source;
			delete tiles[tile].source;
		}
	}
	function log(text, display) {
		if(debug) {
			if(display==='console') {
				console.info('[Stalerz]: '+text);
			} else {
				var lineNum = parseInt(display.charAt(4));
				ctx.textAlign='left';
				ctx.fillStyle = '#fff';
				ctx.font = '18px Arial';
				ctx.fillText(text, 0, 20*lineNum);
			}
		}
	}
	function Tile(id, x, y, z) {
		this.id = id;
		this.img = tiles[this.id].img;
		this.walkable = tiles[this.id].walkable;
		this.x = x;
		this.y = y;
		this.z = z;

		if(y%2===0) { x-=-0.5; }
		this.centerX = (x*tileW)                               + (tileW/2) + (x*tileGap) + offsetX;
		this.centerY = (y*tileL) - y*((tileL)/2) + ((tileL)/2) + (tileH/2) + (y*tileGap) + offsetY - (z*tileH);
	}
	Tile.prototype.containsMouse = function() {
		var dx = Math.abs(mouse.mapX-this.centerX),
			dy = Math.abs(mouse.mapY-this.centerY);

		if(dx>(tileW/2)) {return false;}
		return (dx/(tileW*0.5) + (dy/(tileL*0.5)) < (1+tileHLRatio));
	};
	Tile.prototype.topFaceContainsMouse = function() {
		var topFaceCenterY = this.centerY - (tileH/2);
		var dx = Math.abs(mouse.mapX-this.centerX),
			dy = Math.abs(mouse.mapY-topFaceCenterY);

		return ((dx/(tileW*0.5) + dy/(tileL*0.5) < 1));
	};
	Tile.prototype.leftContainsMouse = function() {
		var dx = mouse.mapX-this.centerX;
		if(dx<0) { return true; } else { return false; }
	};
	Tile.prototype.rightContainsMouse = function() {
		var dx = mouse.mapX-this.centerX;
		if(dx>0) { return true; } else { return false; }
	};
	function placeTile(id, tileX, tileY, tileZ) {
		var x = tileX;
		var y = tileY;
		var img = tiles[id].img;

		if(y%2===0) { x-=-0.5; }
		var imgdx = (x*tileW)+(x*tileGap)+offsetX;
		var imgdy = (y*(tileL))-y*((tileL)/2)+(y*tileGap)+offsetY;
		ctx.drawImage(img, imgdx, imgdy+(tileZ*-tileH), tileW, tileL+tileH);

		if(debug && id!==0) {
			writeToTile('['+tileZ+']['+tileY+']['+tileX+']', tileX, tileY, tileZ, -3);
			writeToTile('('+map[tileZ][tileY][tileX].centerX+', '+map[tileZ][tileY][tileX].centerY+')', tileX, tileY, tileZ, 7);
		}
	}
	function writeToTile(text, tileX, tileY, tileZ, lineOffset) {
		var x = tileX;
		var y = tileY;
		var z = tileZ;
		lineOffset-=tileZ*tileH;

		if(y%2===0) { x-=-0.5; }
		var dx = (x*tileW)+(x*tileGap)+offsetX+(tileW/2);
		var dy = (y*(tileL))-y*((tileL)/2)+(y*tileGap)+offsetY+((tileL)/2);

		ctx.textAlign = 'center'; ctx.fillStyle ='#f00'; ctx.font = '10px Arial';
		ctx.fillText(text, dx, dy+lineOffset);
	}

	var stalerz = {
		init: function(canvas, tileWidth, tileLength, tileHeight, tileGap, tileData, debugMode, callback) {
			ctx = canvas.getContext('2d');
			canvasRect = canvas.getBoundingClientRect();
			canvasW = canvas.width;
			canvasH = canvas.height;
			tileW = tileWidth;
			tileL = tileLength;
			tileH = tileHeight;
			tileHLRatio = tileH/tileL;
			tileG = tileGap;
			tiles = tileData;
			tiles.unshift({id:0, source:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', walkable:false});
			offsetX = 0;
			offsetY = 0;
			debug = debugMode;

			loadTiles(function() {
				log('Loaded tiles.', 'console');
				canvas.addEventListener('mousedown', onMouseDown, false);
				canvas.addEventListener('mouseup', onMouseUp, false);
				canvas.addEventListener('mouseout', onMouseUp, false);
				canvas.addEventListener('mousemove', onMouseMove, false);
				log('Loaded Mouse Listeners.', 'console');
				callback();
			});
		},
		updateMapData: function(data) {
			map = [];
			for(var z=0, zlen=data.length;z<zlen;z++) {
				map.push([]);
				for(var y=0, ylen=data[z].length;y<ylen;y++) {
					map[z].push([]);
					for(var x=0, xlen=data[z][y].length;x<xlen;x++) {
						var id = data[z][y][x];
						map[z][y].push(new Tile(id, x, y, z));
					}
				}
			}
		},
		updateCanvas: function() {
			canvasW = canvas.width;
			canvasH = canvas.height;

			ctx.fillStyle = '#000';
			ctx.fillRect(0,0,canvasW,canvasH);
			for(var z=0, zlen=map.length;z<zlen;z++) {
				for(var y=0, ylen=map[z].length;y<ylen;y++) {
					for(var x=0, xlen=map[z][y].length;x<xlen;x++) {
						placeTile(map[z][y][x].id, map[z][y][x].x, map[z][y][x].y, map[z][y][x].z);
					}
				}
			}
		},
		ascii: function() {
			var concat = '[\n';
			for(var z=0, zlen=map.length;z<zlen;z++) {
				if(z===0) { concat+='\t'; }
				concat+='[\n';
				for(var y=0, ylen=map[z].length;y<ylen;y++) {
					concat+='\t\t';
					if(y%2===0) { concat+='  '; }
					concat+='[';
					for(var x=0, xlen=map[z][y].length;x<xlen;x++) {
						if(map[z][y][x].id.toString().length===1) { concat+='  '; }
						if(map[z][y][x].id.toString().length===2) { concat+=' '; }
						concat+=(map[z][y][x].id);
						if(x!==xlen-1) { concat+=','; }
					}
					concat+=']';
					if(y!==ylen-1) { concat+=','; } concat+='\n';
				}
				concat+='\t]';
				if(z!==zlen-1) { concat+=','; }
			}
			concat+='\n]';
			return concat;
		},
		get map() { return map; },
		get Tile() { return Tile; },
		get mouse() { return mouse; }
	};
	return stalerz;
})();