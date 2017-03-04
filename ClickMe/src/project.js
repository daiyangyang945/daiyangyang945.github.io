require=function e(t,i,n){function o(c,r){if(!i[c]){if(!t[c]){var l="function"==typeof require&&require;if(!r&&l)return l(c,!0);if(s)return s(c,!0);var a=new Error("Cannot find module '"+c+"'");throw a.code="MODULE_NOT_FOUND",a}var u=i[c]={exports:{}};t[c][0].call(u.exports,function(e){var i=t[c][1][e];return o(i?i:e)},u,u.exports,e,t,i,n)}return i[c].exports}for(var s="function"==typeof require&&require,c=0;c<n.length;c++)o(n[c]);return o}({Colors:[function(e,t,i){"use strict";cc._RFpush(t,"92a3dnvUH1MPoGm4qXTl2TH","Colors"),t.exports={num1:new cc.color(152,245,255,255),num2:new cc.color(84,255,159,255),num3:new cc.color(0,191,255,255),num4:new cc.color(255,236,139,255),num5:new cc.color(233,233,64,255),num6:new cc.color(255,193,193,255),num7:new cc.color(255,106,106,255),num8:new cc.color(255,20,147,255),num9:new cc.color(218,112,214,255),num10:new cc.color(0,0,238,255),num11:new cc.color(105,105,105,255),num12:new cc.color(144,238,144,255),num13:new cc.color(255,165,0,255),num14:new cc.color(255,140,0,255),num15:new cc.color(255,99,71,255),num16:new cc.color(255,69,0,255),num17:new cc.color(255,48,48,255),num18:new cc.color(238,44,44,255),num19:new cc.color(205,38,38,255),num20:new cc.color(255,0,0,255),nums:new cc.color(238,0,0,255)},cc._RFpop()},{}],Game:[function(e,t,i){"use strict";cc._RFpush(t,"1012cZgm09H/KSpyKFz+oSL","Game");var n=(e("Colors"),e("Global"));cc.Class({"extends":cc.Component,properties:{tilePre:{"default":null,type:cc.Prefab},powerPre:{"default":null,type:cc.Prefab},tiles:{"default":null,type:Array},powers:{"default":null,type:Array},scoreNum:{"default":null,type:cc.Label},tileBg:{"default":null,type:cc.Node},powerBarBg:{"default":null,type:cc.Node},star1:cc.AudioClip,star2:cc.AudioClip,star3:cc.AudioClip,star4:cc.AudioClip,star5:cc.AudioClip,star6:cc.AudioClip,star7:cc.AudioClip,star8:cc.AudioClip,bgMusic:cc.AudioClip,maxNum:0,isCal:!1},onLoad:function(){this.bgId=cc.audioEngine.play(this.bgMusic,!0),this.tiles=[[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null],[null,null,null,null,null]],this.powers=[null,null,null,null,null],this.powerBarBg.width=cc.winSize.width-100,this.powerBarBg.height=this.powerBarBg.width/5/2,this.tileBg.width=cc.winSize.width-100,this.tileBg.height=this.tileBg.width;for(var e=0;e<5;e++){var t=cc.instantiate(this.powerPre);t.width=(this.powerBarBg.width-30)/5,t.height=this.powerBarBg.height-10,this.powerBarBg.addChild(t),t.setPosition(-this.powerBarBg.width/2+(5+t.width)*e+5,5+t.height/2),this.powers[e]=t}var i=new Array;this.maxNum=8;for(var n=0;n<this.maxNum-3;n++)i[n]=this.maxNum-3-n;for(var o=0,n=0;n<i.length;n++)o+=i[n];for(var s=0;s<5;s++)for(var c=0;c<5;c++){var r=cc.instantiate(this.tilePre);r.getComponent("Tile").game=this,r.width=(this.tileBg.width-30)/5,r.height=(this.tileBg.height-30)/5;for(var l=0,a=0;;){l++;var u=new Array,h=new Array;a=Math.random()*o;for(var d=0,m=0,n=0;n<i.length;n++){if(a>=m&&a<=m+i[n]){d=n+1;break}m+=i[n]}if(r.getComponent("Tile").setNum(d,!1,!1),r.setPosition(5+(5+r.width)*c+r.width/2,5+(5+r.height)*s+r.height/2),this.tiles[s][c]=r,this.scanAround(s,c,-1,-1,d,u,h),u.length<3)break}r.getComponent("Tile").setArrPosition(s,c),this.tileBg.addChild(r)}},onDestory:function(){cc.audioEngine.stop(this.bgId)},scanAround:function(e,t,i,n,o,s,c){if(null!=this.tiles[e][t]){var r=!1;if(void 0==c&&(c=new Array),c.indexOf(e+"#"+t)==-1){if(c.push(e+"#"+t),e<4&&(i!=e+1||n!=t)&&null!=this.tiles[e+1][t]){var l=parseInt(this.tiles[e+1][t].getComponent("Tile").numLabel.string);l==o&&(s.indexOf(e+"#"+t)==-1&&s.push(e+"#"+t),this.scanAround(e+1,t,e,t,o,s,c),r=!0)}if(e>0&&(i!=e-1||n!=t)&&null!=this.tiles[e-1][t]){var l=parseInt(this.tiles[e-1][t].getComponent("Tile").numLabel.string);l==o&&(s.indexOf(e+"#"+t)==-1&&s.push(e+"#"+t),this.scanAround(e-1,t,e,t,o,s,c),r=!0)}if(t>0&&(i!=e||n!=t-1)&&null!=this.tiles[e][t-1]){var l=parseInt(this.tiles[e][t-1].getComponent("Tile").numLabel.string);l==o&&(s.indexOf(e+"#"+t)==-1&&s.push(e+"#"+t),this.scanAround(e,t-1,e,t,o,s,c),r=!0)}if(t<4&&(i!=e||n!=t+1)&&null!=this.tiles[e][t+1]){var l=parseInt(this.tiles[e][t+1].getComponent("Tile").numLabel.string);l==o&&(s.indexOf(e+"#"+t)==-1&&s.push(e+"#"+t),this.scanAround(e,t+1,e,t,o,s,c),r=!0)}if(!r&&i!=-1&&n!=-1){var a=parseInt(this.tiles[e][t].getComponent("Tile").numLabel.string);a==o&&s.indexOf(e+"#"+t)==-1&&s.push(e+"#"+t)}}}},operateLogic:function(e,t,i,o){var s=new Array,c=new Array;if(this.scanAround(e,t,-1,-1,i,s,c),s.length>=3){var r=0;for(var l in s){var a=s[l].split("#")[0],u=s[l].split("#")[1];r+=parseInt(10*this.tiles[a][u].getComponent("Tile").numLabel.string),a!=e||u!=t?(this.tiles[a][u].getComponent("Tile").destoryTile(),this.tiles[a][u]=null):(this.tiles[a][u].getComponent("Tile").setNum(i+1,!1,!0),this.maxNum=i+1>this.maxNum?i+1:this.maxNum)}if(this.scoreNum.string=parseInt(this.scoreNum.string)+r,this.scheduleOnce(function(){this.moveAllTileDown()},.1),!o)for(var h=0;h<5;h++)if(null==this.powers[h]){var d=cc.instantiate(this.powerPre);d.width=(this.powerBarBg.width-30)/5,d.height=this.powerBarBg.height-10,this.powerBarBg.addChild(d),d.setPosition(-this.powerBarBg.width/2+5+(5+d.width)*h,5+d.height/2),d.setScale(0),d.runAction(cc.scaleTo(.1,1)),this.powers[h]=d;break}switch(n.combo++,n.combo){case 1:cc.audioEngine.play(this.star1);break;case 2:cc.audioEngine.play(this.star2);break;case 3:cc.audioEngine.play(this.star3);break;case 4:cc.audioEngine.play(this.star4);break;case 5:cc.audioEngine.play(this.star5);break;case 6:cc.audioEngine.play(this.star6);break;case 7:cc.audioEngine.play(this.star7);break;default:cc.audioEngine.play(this.star8)}return!0}return this.isCal=!1,!1},moveAllTileDown:function(){for(var e=0;e<5;e++)for(var t=0;t<5;t++)if(null!=this.tiles[t][e])for(var i=t;i>0;i--)null==this.tiles[i-1][e]&&(this.tiles[i-1][e]=this.tiles[i][e],this.tiles[i][e]=null,this.tiles[i-1][e].getComponent("Tile").moveTo(i-1,e));this.scheduleOnce(function(){for(var e=new Array,t=0;t<this.maxNum-3;t++)e[t]=this.maxNum-3-t;for(var i=0,t=0;t<e.length;t++)i+=e[t];for(var n=0;n<5;n++)for(var o=0;o<5;o++)if(null==this.tiles[o][n]){var s=cc.instantiate(this.tilePre);s.getComponent("Tile").game=this,s.width=(this.tileBg.width-30)/5,s.height=(this.tileBg.height-30)/5;for(var c=Math.random()*i,r=0,l=0,t=0;t<e.length;t++){if(c>=l&&c<=l+e[t]){r=t+1;break}l+=e[t]}s.getComponent("Tile").setNum(r,!1,!1),s.getComponent("Tile").newTile(o,n),this.tiles[o][n]=s,this.tileBg.addChild(s)}this.scheduleOnce(function(){for(var e=!1,t=0;t<5;t++)for(var i=0;i<5;i++)e||(e=null!=this.tiles[i][t]&&this.operateLogic(i,t,parseInt(this.tiles[i][t].getComponent("Tile").numLabel.string),!1))},.5)},.3)}}),cc._RFpop()},{Colors:"Colors",Global:"Global"}],Global:[function(e,t,i){"use strict";cc._RFpush(t,"78b57/S+OlBkaCkzwp9T6zI","Global"),t.exports={score:0,combo:0},cc._RFpop()},{}],Over:[function(e,t,i){"use strict";cc._RFpush(t,"5ea41oSQZNPrZkAHH6y7Av9","Over"),cc.Class({"extends":cc.Component,properties:{loseAudio:cc.AudioClip},onLoad:function(){this.loseId=cc.audioEngine.play(this.loseAudio)},restartAction:function(){cc.audioEngine.stop(this.loseId),cc.director.loadScene("Game")},backAction:function(){cc.audioEngine.stop(this.loseId),cc.director.loadScene("Load")}}),cc._RFpop()},{}],Start:[function(e,t,i){"use strict";cc._RFpush(t,"7b061CE0fdCypjf+KiWoHU+","Start"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){cc.director.preloadScene("Game")},startGame:function(){cc.director.loadScene("Game")}}),cc._RFpop()},{}],Tile:[function(e,t,i){"use strict";cc._RFpush(t,"a3772DjmjBCgq0FmCikE3hP","Tile");var n=e("Global"),o=e("Colors");cc.Class({"extends":cc.Component,properties:{numLabel:{"default":null,type:cc.Label},clickEffect:cc.AudioClip},onLoad:function(){this.bgWidth=cc.winSize.width-100,this.bgHeight=this.bgWidth;var e=this;this.node.on(cc.Node.EventType.TOUCH_START,function(t){e.game.isCal||(cc.audioEngine.play(e.clickEffect),e.game.isCal=!0,n.combo=0,cc.audioEngine.playEffect(this.addCoin),e.setNum(parseInt(e.numLabel.string)+1,!0,!1))},this.node)},newTile:function(e,t){this.node.setPosition(5+(5+this.node.width)*t+this.node.width/2,5+(5+this.node.height)*e+this.node.height/2),this.node.setScale(0),this.node.runAction(cc.scaleTo(.1,1)),this.setArrPosition(e,t)},moveTo:function(e,t){this.row=e,this.col=t,this.node.stopActionByTag(1);var i=cc.moveTo(.2,cc.p(5+(5+this.node.width)*t+this.node.width/2,5+(5+this.node.height)*e+this.node.height/2));this.node.runAction(i),i.setTag(1)},destoryTile:function(){var e=cc.sequence(cc.scaleTo(.1,0),cc.callFunc(function(e){e.destroy()},this.node,this.node));this.node.runAction(e)},setArrPosition:function(e,t){this.row=e,this.col=t},setNum:function(e,t,i){switch(this.game.maxNum=e>this.game.maxNum?e:this.game.maxNum,this.numLabel.string=e,e){case 1:this.node.color=o.num1;break;case 2:this.node.color=o.num2;break;case 3:this.node.color=o.num3;break;case 4:this.node.color=o.num4;break;case 5:this.node.color=o.num5;break;case 6:this.node.color=o.num6;break;case 7:this.node.color=o.num7;break;case 8:this.node.color=o.num8;break;case 9:this.node.color=o.num9;break;case 10:this.node.color=o.num10;break;case 11:this.node.color=o.num11;break;case 12:this.node.color=o.num12;break;case 13:this.node.color=o.num13;break;case 14:this.node.color=o.num14;break;case 15:this.node.color=o.num15;break;case 16:this.node.color=o.num16;break;case 17:this.node.color=o.num17;break;case 18:this.node.color=o.num18;break;case 19:this.node.color=o.num19;break;case 20:this.node.color=o.num20;break;default:this.node.color=o.nums}if(i&&this.node.runAction(cc.sequence(cc.scaleTo(.15,1.5),cc.scaleTo(.15,1))),t){var s=this.game.operateLogic(this.row,this.col,parseInt(this.numLabel.string),!0),c=this.game.powers;if(!s){for(var r=c.length-1;r>=0;r--)if(null!=c[r]){var l=cc.sequence(cc.scaleTo(.1,0),cc.callFunc(function(e){e.destroy()},null,c[r]));c[r].runAction(l),c[r]=null;break}null==c[0]&&(n.score=this.game.scoreNum.string,cc.director.loadScene("Over"))}}}}),cc._RFpop()},{Colors:"Colors",Global:"Global"}]},{},["Colors","Game","Global","Over","Start","Tile"]);