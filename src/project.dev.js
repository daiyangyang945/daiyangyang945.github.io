require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Colors":[function(require,module,exports){
"use strict";
cc._RFpush(module, '92a3dnvUH1MPoGm4qXTl2TH', 'Colors');
// Scripts\Colors.js

module.exports = {
    num1: new cc.color(152, 245, 255, 255),
    num2: new cc.color(84, 255, 159, 255),
    num3: new cc.color(0, 191, 255, 255),
    num4: new cc.color(255, 236, 139, 255),
    num5: new cc.color(233, 233, 64, 255),
    num6: new cc.color(255, 193, 193, 255),
    num7: new cc.color(255, 106, 106, 255),
    num8: new cc.color(255, 20, 147, 255),
    num9: new cc.color(218, 112, 214, 255),
    num10: new cc.color(0, 0, 238, 255),
    num11: new cc.color(105, 105, 105, 255),
    num12: new cc.color(144, 238, 144, 255),
    num13: new cc.color(255, 165, 0, 255),
    num14: new cc.color(255, 140, 0, 255),
    num15: new cc.color(255, 99, 71, 255),
    num16: new cc.color(255, 69, 0, 255),
    num17: new cc.color(255, 48, 48, 255),
    num18: new cc.color(238, 44, 44, 255),
    num19: new cc.color(205, 38, 38, 255),
    num20: new cc.color(255, 0, 0, 255),
    nums: new cc.color(238, 0, 0, 255)
};

cc._RFpop();
},{}],"Game":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1012cZgm09H/KSpyKFz+oSL', 'Game');
// Scripts\Game.js

var Colors = require("Colors");
var Global = require("Global");

cc.Class({
    "extends": cc.Component,

    properties: {
        tilePre: {
            "default": null,
            type: cc.Prefab
        },
        powerPre: {
            "default": null,
            type: cc.Prefab
        },
        tiles: {
            "default": null,
            type: Array
        },
        powers: {
            "default": null,
            type: Array
        },
        // scoreLabel:{
        //     default:null,
        //     type:cc.Label
        // },
        scoreNum: {
            "default": null,
            type: cc.Label
        },
        tileBg: {
            "default": null,
            type: cc.Node
        },
        powerBarBg: {
            "default": null,
            type: cc.Node
        },
        star1: cc.AudioClip,
        star2: cc.AudioClip,
        star3: cc.AudioClip,
        star4: cc.AudioClip,
        star5: cc.AudioClip,
        star6: cc.AudioClip,
        star7: cc.AudioClip,
        star8: cc.AudioClip,
        bgMusic: cc.AudioClip,
        maxNum: 0,
        isCal: false
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.bgId = cc.audioEngine.play(this.bgMusic, true);
        // 初始化方块数组
        this.tiles = [[null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null], [null, null, null, null, null]];
        this.powers = [null, null, null, null, null];
        // // 能量条背景层
        this.powerBarBg.width = cc.winSize.width - 100;
        this.powerBarBg.height = this.powerBarBg.width / 5 / 2;
        // this.powerBarBg.setPosition(15-cc.winSize.width/2,this.topBg.getPositionY()-200);
        // // 方块背景层
        this.tileBg.width = cc.winSize.width - 100;
        this.tileBg.height = this.tileBg.width;
        // this.tileBg.setPosition(15-cc.winSize.width/2,this.powerBarBg.getPositionY()-10-this.tileBg.height);
        // // 生成能量条
        for (var i = 0; i < 5; i++) {
            var power = cc.instantiate(this.powerPre);
            power.width = (this.powerBarBg.width - 30) / 5;
            power.height = this.powerBarBg.height - 10;
            this.powerBarBg.addChild(power);
            power.setPosition(-this.powerBarBg.width / 2 + (5 + power.width) * i + 5, 5 + power.height / 2);
            // power.color = Colors.power;
            this.powers[i] = power;
        };
        // 计算生成方块数字的概率
        var gailv = new Array();
        this.maxNum = 8;
        for (var num = 0; num < this.maxNum - 3; num++) {
            gailv[num] = this.maxNum - 3 - num;
        }
        var sum = 0;
        for (var num = 0; num < gailv.length; num++) {
            sum += gailv[num];
        }
        // 生成初始方块
        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 5; col++) {
                var tile = cc.instantiate(this.tilePre);
                tile.getComponent("Tile").game = this;
                tile.width = (this.tileBg.width - 30) / 5;
                tile.height = (this.tileBg.height - 30) / 5;
                var count = 0;
                // var maxRandom = 8;
                var randomNum = 0;
                while (true) {
                    count++;
                    var arr = new Array();
                    var scanArr = new Array();
                    // if(count>10){
                    //     maxRandom++;
                    // }
                    // randomNum = Math.ceil(Math.random()*maxRandom);
                    randomNum = Math.random() * sum;
                    var newNum = 0;
                    var min = 0;
                    for (var num = 0; num < gailv.length; num++) {
                        if (randomNum >= min && randomNum <= min + gailv[num]) {
                            newNum = num + 1;
                            break;
                        } else {
                            min = min + gailv[num];
                        }
                    }
                    tile.getComponent("Tile").setNum(newNum, false, false);
                    tile.setPosition(5 + (5 + tile.width) * col + tile.width / 2, 5 + (5 + tile.height) * row + tile.height / 2);
                    this.tiles[row][col] = tile;
                    this.scanAround(row, col, -1, -1, newNum, arr, scanArr);
                    if (arr.length < 3) {
                        break;
                    }
                }
                tile.getComponent("Tile").setArrPosition(row, col);
                this.tileBg.addChild(tile);
            }
        }
    },

    onDestory: function onDestory() {
        cc.audioEngine.stop(this.bgId);
    },

    scanAround: function scanAround(row, col, lastRow, lastCol, num, arr, scanArr) {
        // cc.log("row:",row,",col:",col,",lastRow:",lastRow,",lastCol:",lastCol,",num:",num,",arr:",arr,",scanArr:",scanArr);
        if (this.tiles[row][col] == null) {
            return;
        }
        var isClear = false;
        if (scanArr == undefined) {
            scanArr = new Array();
        }
        // 扫描过的节点不再扫描
        if (scanArr.indexOf(row + "#" + col) == -1) {
            scanArr.push(row + "#" + col);
        } else {
            return;
        }
        // 扫描上
        if (row < 4 && (lastRow != row + 1 || lastCol != col) && this.tiles[row + 1][col] != null) {
            var nextNum = parseInt(this.tiles[row + 1][col].getComponent("Tile").numLabel.string);
            if (nextNum == num) {
                if (arr.indexOf(row + "#" + col) == -1) {
                    arr.push(row + "#" + col);
                }
                this.scanAround(row + 1, col, row, col, num, arr, scanArr);
                isClear = true;
            }
        }
        // 扫描下
        if (row > 0 && (lastRow != row - 1 || lastCol != col) && this.tiles[row - 1][col] != null) {
            var nextNum = parseInt(this.tiles[row - 1][col].getComponent("Tile").numLabel.string);
            if (nextNum == num) {
                if (arr.indexOf(row + "#" + col) == -1) {
                    arr.push(row + "#" + col);
                }
                this.scanAround(row - 1, col, row, col, num, arr, scanArr);
                isClear = true;
            }
        }
        // 扫描左
        if (col > 0 && (lastRow != row || lastCol != col - 1) && this.tiles[row][col - 1] != null) {
            var nextNum = parseInt(this.tiles[row][col - 1].getComponent("Tile").numLabel.string);
            if (nextNum == num) {
                if (arr.indexOf(row + "#" + col) == -1) {
                    arr.push(row + "#" + col);
                }
                this.scanAround(row, col - 1, row, col, num, arr, scanArr);
                isClear = true;
            }
        }
        // 扫描右
        if (col < 4 && (lastRow != row || lastCol != col + 1) && this.tiles[row][col + 1] != null) {
            var nextNum = parseInt(this.tiles[row][col + 1].getComponent("Tile").numLabel.string);
            if (nextNum == num) {
                if (arr.indexOf(row + "#" + col) == -1) {
                    arr.push(row + "#" + col);
                }
                this.scanAround(row, col + 1, row, col, num, arr, scanArr);
                isClear = true;
            }
        }
        // 四周都不通，但不是出发遍历点，并且数字相同，也加入到数组
        if (!isClear && lastRow != -1 && lastCol != -1) {
            var curNum = parseInt(this.tiles[row][col].getComponent("Tile").numLabel.string);
            if (curNum == num) {
                if (arr.indexOf(row + "#" + col) == -1) {
                    arr.push(row + "#" + col);
                }
            }
        }
    },
    // 主要操作逻辑
    operateLogic: function operateLogic(touchRow, touchCol, curNum, isFirstCall) {
        var arr = new Array();
        var scanArr = new Array();
        this.scanAround(touchRow, touchCol, -1, -1, curNum, arr, scanArr);
        if (arr.length >= 3) {
            var addScore = 0;
            for (var index in arr) {
                var row = arr[index].split("#")[0];
                var col = arr[index].split("#")[1];
                addScore += parseInt(this.tiles[row][col].getComponent("Tile").numLabel.string * 10);
                if (row != touchRow || col != touchCol) {
                    // 执行销毁动作                   
                    this.tiles[row][col].getComponent("Tile").destoryTile();
                    this.tiles[row][col] = null;
                } else {
                    this.tiles[row][col].getComponent("Tile").setNum(curNum + 1, false, true);
                    this.maxNum = curNum + 1 > this.maxNum ? curNum + 1 : this.maxNum;
                }
            }
            // 更新分数
            this.scoreNum.string = parseInt(this.scoreNum.string) + addScore;
            this.scheduleOnce(function () {
                // 0.1s后所有方块向下移动
                this.moveAllTileDown();
            }, 0.1);
            if (!isFirstCall) {
                // 能量条补充一格
                for (var i = 0; i < 5; i++) {
                    if (this.powers[i] == null) {
                        var power = cc.instantiate(this.powerPre);
                        power.width = (this.powerBarBg.width - 30) / 5;
                        power.height = this.powerBarBg.height - 10;
                        this.powerBarBg.addChild(power);
                        power.setPosition(-this.powerBarBg.width / 2 + 5 + (5 + power.width) * i, 5 + power.height / 2);
                        power.setScale(0);
                        power.runAction(cc.scaleTo(0.1, 1));
                        this.powers[i] = power;
                        break;
                    }
                };
            }
            // 连击次数+1
            Global.combo++;
            // cc.log("连击次数："+Global.combo);
            // 播放音效
            switch (Global.combo) {
                case 1:
                    cc.audioEngine.play(this.star1);
                    break;
                case 2:
                    cc.audioEngine.play(this.star2);
                    break;
                case 3:
                    cc.audioEngine.play(this.star3);
                    break;
                case 4:
                    cc.audioEngine.play(this.star4);
                    break;
                case 5:
                    cc.audioEngine.play(this.star5);
                    break;
                case 6:
                    cc.audioEngine.play(this.star6);
                    break;
                case 7:
                    cc.audioEngine.play(this.star7);
                    break;
                default:
                    cc.audioEngine.play(this.star8);
                    break;
            }
            return true;
        } else {
            this.isCal = false;
        }
        return false;
    },
    // 所有方块向下移动
    moveAllTileDown: function moveAllTileDown() {
        for (var col = 0; col < 5; col++) {
            for (var row = 0; row < 5; row++) {
                if (this.tiles[row][col] != null) {
                    // 有方块
                    for (var row1 = row; row1 > 0; row1--) {
                        if (this.tiles[row1 - 1][col] == null) {
                            //如果没有向下移动
                            this.tiles[row1 - 1][col] = this.tiles[row1][col];
                            this.tiles[row1][col] = null;
                            this.tiles[row1 - 1][col].getComponent("Tile").moveTo(row1 - 1, col);
                        }
                    }
                }
            }
        }
        this.scheduleOnce(function () {
            // 计算生成方块数字的概率
            var gailv = new Array();
            // for(var num = 0;num<this.maxNum;num++){
            //     gailv[num] = 0;
            // }
            for (var num = 0; num < this.maxNum - 3; num++) {
                gailv[num] = this.maxNum - 3 - num;
            }
            // for(var num = 0;num<this.maxNum;num++){
            //     for (var col = 0; col < 5; col++) {
            //         for (var row = 0; row < 5; row++) {
            //             if(this.tiles[row][col]!=null&&parseInt(this.tiles[row][col].getComponent("Tile").numLabel.string)==num+1){
            //                 gailv[num]+=1;
            //             }
            //         }
            //     }
            // }
            var sum = 0;
            for (var num = 0; num < gailv.length; num++) {
                sum += gailv[num];
            }
            // 0.3s后生成新方块
            for (var col = 0; col < 5; col++) {
                for (var row = 0; row < 5; row++) {
                    if (this.tiles[row][col] == null) {
                        var tile = cc.instantiate(this.tilePre);
                        tile.getComponent("Tile").game = this;
                        tile.width = (this.tileBg.width - 30) / 5;
                        tile.height = (this.tileBg.height - 30) / 5;
                        // var maxRandom = this.maxNum;
                        // var randomNum = Math.ceil(Math.random()*maxRandom);
                        var randomNum = Math.random() * sum;
                        var newNum = 0;
                        var min = 0;
                        for (var num = 0; num < gailv.length; num++) {
                            if (randomNum >= min && randomNum <= min + gailv[num]) {
                                newNum = num + 1;
                                break;
                            } else {
                                min = min + gailv[num];
                            }
                        }
                        tile.getComponent("Tile").setNum(newNum, false, false);
                        tile.getComponent("Tile").newTile(row, col);
                        this.tiles[row][col] = tile;
                        this.tileBg.addChild(tile);
                    }
                }
            }
            // 0.5s后遍历执行逻辑
            this.scheduleOnce(function () {
                var isSearch = false;
                for (var col = 0; col < 5; col++) {
                    for (var row = 0; row < 5; row++) {
                        if (!isSearch) {
                            isSearch = this.tiles[row][col] != null && this.operateLogic(row, col, parseInt(this.tiles[row][col].getComponent("Tile").numLabel.string), false);
                        }
                    }
                }
            }, 0.5);
        }, 0.3);
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"Colors":"Colors","Global":"Global"}],"Global":[function(require,module,exports){
"use strict";
cc._RFpush(module, '78b57/S+OlBkaCkzwp9T6zI', 'Global');
// Scripts\Global.js

module.exports = {
    score: 0,
    combo: 0
};

cc._RFpop();
},{}],"Over":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5ea41oSQZNPrZkAHH6y7Av9', 'Over');
// Scripts\Over.js

cc.Class({
    "extends": cc.Component,

    properties: {
        loseAudio: cc.AudioClip
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.loseId = cc.audioEngine.play(this.loseAudio);
    },

    restartAction: function restartAction() {
        cc.audioEngine.stop(this.loseId);
        cc.director.loadScene("Game");
    },

    backAction: function backAction() {
        cc.audioEngine.stop(this.loseId);
        cc.director.loadScene("Load");
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"Start":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7b061CE0fdCypjf+KiWoHU+', 'Start');
// Scripts\Start.js

cc.Class({
    "extends": cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        cc.director.preloadScene("Game");
    },

    startGame: function startGame() {
        cc.director.loadScene("Game");
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"Tile":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a3772DjmjBCgq0FmCikE3hP', 'Tile');
// Scripts\Tile.js

var Global = require("Global");
var Colors = require("Colors");
cc.Class({
    "extends": cc.Component,

    properties: {
        numLabel: {
            "default": null,
            type: cc.Label
        },
        clickEffect: cc.AudioClip
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.bgWidth = cc.winSize.width - 100;
        this.bgHeight = this.bgWidth;
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (!self.game.isCal) {
                cc.audioEngine.play(self.clickEffect);
                self.game.isCal = true;
                // 连击次数归零
                Global.combo = 0;
                cc.audioEngine.playEffect(this.addCoin);
                self.setNum(parseInt(self.numLabel.string) + 1, true, false);
            }
        }, this.node);
    },

    // 产生新方块
    newTile: function newTile(row, col) {
        // this.node.setPosition(-this.bgWidth/2+5+(5+this.node.width)*col+this.node.width/2,-this.bgHeight/2+5+(5+this.node.height)*row+this.node.height/2);
        this.node.setPosition(5 + (5 + this.node.width) * col + this.node.width / 2, 5 + (5 + this.node.height) * row + this.node.height / 2);
        this.node.setScale(0);
        this.node.runAction(cc.scaleTo(0.1, 1));
        this.setArrPosition(row, col);
    },
    // 移动到特定点
    moveTo: function moveTo(row, col) {
        this.row = row;
        this.col = col;
        this.node.stopActionByTag(1);
        // var action = cc.moveTo(0.2,cc.p(-this.bgWidth/2+5+(5+this.node.width)*col+this.node.width/2,-this.bgHeight/2+5+(5+this.node.height)*row+this.node.height/2));
        var action = cc.moveTo(0.2, cc.p(5 + (5 + this.node.width) * col + this.node.width / 2, 5 + (5 + this.node.height) * row + this.node.height / 2));
        this.node.runAction(action);
        action.setTag(1);
    },
    // 方块销毁
    destoryTile: function destoryTile() {
        var action = cc.sequence(cc.scaleTo(0.1, 0), cc.callFunc(function (node) {
            node.destroy();
        }, this.node, this.node));
        this.node.runAction(action);
    },
    // 设置方块在数组的位置
    setArrPosition: function setArrPosition(row, col) {
        this.row = row;
        this.col = col;
    },
    // 设置方块数字
    setNum: function setNum(num, exeLogic, playEffect) {
        this.game.maxNum = num > this.game.maxNum ? num : this.game.maxNum;
        this.numLabel.string = num;
        switch (num) {
            case 1:
                this.node.color = Colors.num1;
                break;
            case 2:
                this.node.color = Colors.num2;
                break;
            case 3:
                this.node.color = Colors.num3;
                break;
            case 4:
                this.node.color = Colors.num4;
                break;
            case 5:
                this.node.color = Colors.num5;
                break;
            case 6:
                this.node.color = Colors.num6;
                break;
            case 7:
                this.node.color = Colors.num7;
                break;
            case 8:
                this.node.color = Colors.num8;
                break;
            case 9:
                this.node.color = Colors.num9;
                break;
            case 10:
                this.node.color = Colors.num10;
                break;
            case 11:
                this.node.color = Colors.num11;
                break;
            case 12:
                this.node.color = Colors.num12;
                break;
            case 13:
                this.node.color = Colors.num13;
                break;
            case 14:
                this.node.color = Colors.num14;
                break;
            case 15:
                this.node.color = Colors.num15;
                break;
            case 16:
                this.node.color = Colors.num16;
                break;
            case 17:
                this.node.color = Colors.num17;
                break;
            case 18:
                this.node.color = Colors.num18;
                break;
            case 19:
                this.node.color = Colors.num19;
                break;
            case 20:
                this.node.color = Colors.num20;
                break;
            default:
                this.node.color = Colors.nums;
                break;
        }
        // 播放特效
        if (playEffect) {
            this.node.runAction(cc.sequence(cc.scaleTo(0.15, 1.5), cc.scaleTo(0.15, 1)));
        }
        // 消除逻辑
        if (exeLogic) {
            // 执行逻辑
            var isMove = this.game.operateLogic(this.row, this.col, parseInt(this.numLabel.string), true);
            var powers = this.game.powers;
            // 能量条-1
            if (!isMove) {
                for (var i = powers.length - 1; i >= 0; i--) {
                    if (powers[i] != null) {
                        var costBarAction = cc.sequence(cc.scaleTo(0.1, 0), cc.callFunc(function (power) {
                            power.destroy();
                        }, null, powers[i]));
                        powers[i].runAction(costBarAction);
                        powers[i] = null;
                        break;
                    }
                };
                // 游戏结束逻辑判断：能量条为空
                if (powers[0] == null) {
                    Global.score = this.game.scoreNum.string;
                    // Game Over
                    cc.director.loadScene("Over");
                }
            }
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{"Colors":"Colors","Global":"Global"}]},{},["Colors","Game","Global","Over","Start","Tile"]);
