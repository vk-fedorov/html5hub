(function() {
    function B(a, b) {
        function c() {}
        c.prototype = a;
        var d = new c,
            e;
        for (e in b) d[e] = b[e];
        b.toString !== Object.prototype.toString && (d.toString = b.toString);
        return d
    }

    function Rc(a) {
        return a instanceof Array ? function() {
            return y.iter(a)
        } : "function" == typeof a.iterator ? F(a, a.iterator) : a.iterator
    }

    function F(a, b) {
        if (null == b) return null;
        null == b.__id__ && (b.__id__ = fd++);
        var c;
        null == a.hx__closures__ ? a.hx__closures__ = {} : c = a.hx__closures__[b.__id__];
        null == c && (c = function() {
                return c.method.apply(c.scope, arguments)
            },
            c.scope = a, c.method = b, a.hx__closures__[b.__id__] = c);
        return c
    }
    var n = function() {
        return J.__string_rec(this, "")
    }, Q = function(a) {
            this.shown = this.isVisible = !1;
            this._app = a;
            this._scratchVec = new na;
            this._scratchAABB = new C;
            this.container = new Ia(W.getClassName(W.getClass(this)))
        };
    Q.__name__ = ["AbstractScreen"];
    Q.prototype = {
        free: function() {
            this.hide();
            this._app = null
        },
        show: function() {
            this.shown = !0;
            this._app.activeScreen = W.getClass(this);
            this._touchStarted = !1;
            this.onShow();
            this.update();
            this.container.set_visible(!this._app.isLandscape);
            x.getScene().addChild(this.container.node);
            x.getScene().updateGeometricState(0);
            x.drawScene();
            this.registerTouchEvents()
        },
        onShow: function() {},
        hide: function() {
            this.shown = !1;
            this.onHide();
            this.update();
            x.getScene().removeChild(this.container.node);
            this.unregisterTouchEvents()
        },
        onHide: function() {},
        update: function() {
            this.container.applyChanges();
            this.container.spatial.updateGeometricState(0)
        },
        onTick: function(a) {},
        onDraw: function(a) {},
        onResize: function(a, b) {},
        createSprite: function(a, b, c, d, e, f) {
            null == f &&
                (f = this.container);
            a = new N(a, f);
            a.setTexture(b, c);
            a.mX = d;
            a.mY = e;
            a.mFlags |= 1;
            return a
        },
        createTextField: function(a, b, c) {
            a = a.clone();
            a.minY += c / 2;
            a.maxY += c / 2;
            (new Ua("spritefont_a", this.container)).addString(b, a, $.Left, c)
        },
        createTitle: function(a) {
            var b = new C(0, 100, l.NATIVE_WIDTH, 200);
            (new Ua("spritefont_c", this.container)).addString(a, b, $.Center, 80)
        },
        createTextLine: function(a, b, c, d, e, f) {
            null == f && (f = 1);
            null == e && (e = 0);
            a = a.clone();
            a.minY += c / 2;
            a.maxY += c / 2;
            d = new Ua(d, this.container);
            d.addString(b, a, 0 == e ? $.Center : -1 == e ? $.Left : $.Right, c);
            1 > f && d.set_alpha(f)
        },
        onTouchStart: function(a, b) {},
        onTouchMove: function(a, b) {},
        onTouchEnd: function(a, b) {},
        mapFromScreenToContainerSpace: function(a, b) {
            var c = this._scratchVec;
            c.x = a;
            c.y = b;
            this.container.spatial.world.applyInverse2(c, c);
            return c
        },
        registerTouchEvents: function() {
            var a = this;
            this._app.inputSystem.onTouchStart = function(b, c) {
                var d = a.mapFromScreenToContainerSpace(b, c);
                a.onTouchStart(d.x, d.y)
            };
            this._app.inputSystem.onTouchEnd = function(b, c) {
                var d = a.mapFromScreenToContainerSpace(b,
                    c);
                a.onTouchEnd(d.x, d.y)
            };
            this._app.inputSystem.onTouchMove = function(b, c) {
                var d = a.mapFromScreenToContainerSpace(b, c);
                a.onTouchMove(d.x, d.y)
            }
        },
        unregisterTouchEvents: function() {
            this._app.inputSystem.onTouchStart = null;
            this._app.inputSystem.onTouchEnd = null;
            this._app.inputSystem.onTouchMove = null
        },
        hitTest: function(a, b, c) {
            a = a.localBox();
            return b >= a.minX && b <= a.maxX && c >= a.minY && c <= a.maxY
        },
        __class__: Q
    };
    var hb = function() {
        this._portraitHint = null;
        var a = this;
        D.init("en");
        try {
            this._visibility = new vc(F(this, this.onVisibilityChanged))
        } catch (b) {
            null
        }
        try {
            this.fullscreenSupported =
                E.isFullscreenSupported(), this._isFullscreen = !1, this.fullscreenSupported && this.addVendorListener(window.document, "fullscreenchange", function(b) {
                    a.updateFullscreen()
                }, !1)
        } catch (c) {
            null
        }
        try {
            null != window.orientation && (window.addEventListener("orientationchange", F(this, this.onOrientationChange), !1), this.onOrientationChange(null))
        } catch (d) {}
        try {
            this.lockOrientation(sa.Portrait)
        } catch (e) {
            null
        }
        this._screenLookup = new ca;
        this._screenList = [];
        this.statistics = {
            numBubblesCleared: 0,
            numGamesPlayed: 0,
            numGamesWon: 0,
            numFewestShots: -1,
            timePlayed: 0,
            numYellowBubblesCleared: 0,
            numBlueBubblesCleared: 0,
            numGreenBubblesCleared: 0,
            numRedBubblesCleared: 0,
            numTurquoiseBubblesCleared: 0,
            numPurpleBubblesCleared: 0
        };
        this.highScoreTable = [{
            score: 1E3,
            name: "Player"
        }, {
            score: 900,
            name: "Player"
        }, {
            score: 800,
            name: "Player"
        }, {
            score: 700,
            name: "Player"
        }, {
            score: 600,
            name: "Player"
        }, {
            score: 500,
            name: "Player"
        }];
        E.fixAndroidMath();
        this.saveGame = new wc(this);
        this.logic = new wa;
        this.logic.setLevel(l.LEVEL_SETTINGS[0]);
        x.init();
        var f = new Ib;
        f.setBackgroundColor(108798);
        x.setRenderer(f);
        var g = new Jb;
        S.canvas = g.mCanvas;
        f.setSurface(g);
        this.inputSystem = new S(this);
        this.isDesktop = E.isDesktop();
        this.isLandscape = !1;
        this.window = new xc(f, F(this, this.onResize));
        f = new fb(s.getString("res/chunkfive.fnt"));
        x.defineImage("spritefont_a", s.get("res/chunkfive_a.png"), f);
        x.defineImage("spritefont_b", s.get("res/chunkfive_b.png"), f);
        x.defineImage("spritefont_c", s.get("res/chunkfive_c.png"), f);
        x.defineImage("spritefont_d", s.get("res/chunkfive_d.png"), f);
        x.defineImage("spritefont_e",
            s.get("res/chunkfive_e.png"), f);
        x.defineImage("texture0", s.get("res/sprites_0.png"), new gb(s.get("res/sprites_0.json")));
        x.defineImage("texture1", s.get("res/sprites_1.png"), new gb(s.get("res/sprites_1.json")));
        x.defineImage("orientation", s.get("res/orientation.png"));
        this.isDesktop || (this._portraitHint = new N("portrait"), this._portraitHint.setTexture("orientation"), x.getScene().addChild(this._portraitHint.spatial), this._portraitHint.set_x(l.NATIVE_WIDTH / 2), this._portraitHint.set_y(l.NATIVE_HEIGHT /
            2), this._portraitHint.centerOrigin(), this._portraitHint.set_visible(this.isLandscape), this._portraitHint.applyChanges());
        this.showMainMenu()
    };
    hb.__name__ = ["App"];
    hb.orientation = function(a) {
        switch (a) {
            case -90:
            case 90:
                return sa.Landscape;
            default:
                return sa.Portrait
        }
    };
    hb.prototype = {
        tick: function(a) {
            S.timeLastTouch += a;
            if (!(30 < S.timeLastTouch))
                for (var b = 0, c = this._screenList; b < c.length;) {
                    var d = c[b];
                    ++b;
                    if (d.shown && d.container.spatial.get_cullingMode() != G.CullAlways) d.onTick(a)
                }
        },
        draw: function(a) {
            if (!(30 <
                S.timeLastTouch)) {
                for (var b = 0, c = this._screenList; b < c.length;) {
                    var d = c[b];
                    ++b;
                    if (d.shown && d.container.spatial.get_cullingMode() != G.CullAlways && !this.isLandscape) d.onDraw(a)
                }
                x.getScene().updateGeometricState(0);
                x.drawScene()
            }
        },
        onVisibilityChanged: function(a) {
            a ? k.resume() : k.halt()
        },
        onResize: function(a, b) {
            var c = 1,
                c = window.devicePixelRatio,
                c = this.fitBoundShowAll(Math.round(a * c), Math.round(b * c), l.NATIVE_WIDTH, l.NATIVE_HEIGHT);
            x.getScene().local.setUniformScale2(c.scale);
            x.getScene().local.setTranslate2(c.x,
                c.y);
            if (!this.isDesktop) {
                this.isLandscape = a > b;
                null != this._portraitHint && this._portraitHint.set_visible(this.isLandscape);
                for (var c = 0, d = this._screenList; c < d.length;) {
                    var e = d[c];
                    ++c;
                    e.container.set_visible(!this.isLandscape);
                    e.onResize(a, b)
                }
            }
            x.getScene().updateGeometricState(0)
        },
        fitBoundShowAll: function(a, b, c, d, e, f) {
            null == e && (e = 0);
            f = a / c;
            var g = b / d,
                h = 1,
                k = 0,
                l = 0;
            f <= g ? (l = Math.round((b - d * f) / 2), (b - f * d) / b < e ? (l = 0, k = Math.round((a - c * g) / 2)) : h = f) : (k = Math.round((a - c * g) / 2), (a - g * c) / a < e ? (g = f, k = 0, l = Math.round((b - d * g) /
                2)) : h = g);
            return {
                x: k,
                y: l,
                scale: h
            }
        },
        startGame: function() {
            this.hideScreen(xa);
            this.showScreen(oa);
            this.logic.start()
        },
        pauseGame: function() {
            this.logic.pause();
            this.getScreen(oa).container.spatial.set_cullingMode(G.CullAlways);
            !1;
            this.showScreen(ta)
        },
        resumeGame: function() {
            this.hideScreen(ta);
            this.logic.unpause();
            this.getScreen(oa).container.spatial.set_cullingMode(G.CullDynamic);
            !0;
            this.getScreen(oa).registerTouchEvents()
        },
        confirmRestart: function() {
            this.hideScreen(ta);
            this.showScreen(Va)
        },
        confirmAbort: function() {
            this.hideScreen(ta);
            this.showScreen(Wa)
        },
        restartGame: function() {
            this.hideScreen(Va);
            this.logic.stop();
            this.logic.start();
            this.getScreen(oa).container.spatial.set_cullingMode(G.CullDynamic);
            !0;
            this.getScreen(oa).registerTouchEvents()
        },
        cancelRestart: function() {
            this.hideScreen(Va);
            this.showScreen(ta)
        },
        cancelAbort: function() {
            this.hideScreen(Wa);
            this.showScreen(ta)
        },
        abortGame: function() {
            this.logic.stop();
            this.hideScreen(Wa);
            this.hideScreen(oa);
            this.showScreen(xa)
        },
        gameOver: function() {
            try {
                window.kaisergames.submitHighscore("",
                    this.logic._score)
            } catch (a) {
                null
            }
            var b = this.logic._score > this.highScoreTable[0].score;
            this.highScoreTable.push({
                score: this.logic._score,
                name: "Player"
            });
            this.highScoreTable.sort(function(a, b) {
                return b.score - a.score
            });
            this.highScoreTable.pop();
            this.saveGame.writeHighscoreTable();
            this.gameResult = {
                newHighscore: b,
                gameWon: 4 == this.logic._status,
                score: this.logic._score,
                numBubblesCleared: this.logic.statBubblesCleared,
                numBallsShot: this.logic.statBallsShot,
                largestGroup: this.logic.statLargestGroupCleared,
                time: this.logic.statPlayTime,
                hitRatioPercent: Math.floor(100 * this.logic.statNumHits / this.logic.statBallsShot)
            };
            this.statistics.numBubblesCleared += this.logic.statBubblesCleared;
            this.statistics.numGamesPlayed++;
            this.statistics.numGamesWon = this.gameResult.gameWon ? this.statistics.numGamesWon + 1 : this.statistics.numGamesWon + 0;
            this.statistics.numFewestShots = -1 == this.statistics.numFewestShots ? this.gameResult.numBallsShot : u["int"](Math.min(this.gameResult.numBallsShot, this.statistics.numFewestShots));
            this.statistics.timePlayed += this.gameResult.time;
            this.statistics.numBlueBubblesCleared += this.logic.getStatBubblesClearedPerType(1);
            this.statistics.numGreenBubblesCleared += this.logic.getStatBubblesClearedPerType(2);
            this.statistics.numYellowBubblesCleared += this.logic.getStatBubblesClearedPerType(3);
            this.statistics.numTurquoiseBubblesCleared += this.logic.getStatBubblesClearedPerType(4);
            this.statistics.numPurpleBubblesCleared += this.logic.getStatBubblesClearedPerType(5);
            this.statistics.numRedBubblesCleared += this.logic.getStatBubblesClearedPerType(6);
            this.hideScreen(oa);
            this.showScreen(Xa)
        },
        showMainMenu: function() {
            this.getScreen(Ya).shown && this.getScreen(Ya).hide();
            this.getScreen(Za).shown && this.getScreen(Za).hide();
            this.getScreen(Xa).shown && (this.getScreen(Xa).hide(), this.logic.stop());
            this.showScreen(xa)
        },
        showHighscores: function() {
            this.getScreen(xa).hide();
            this.getScreen(Za).show()
        },
        showStatistics: function() {
            this.getScreen(xa).hide();
            this.getScreen(Ya).show()
        },
        showScreen: function(a) {
            this.getScreen(a).show()
        },
        hideScreen: function(a) {
            this.getScreen(a).hide()
        },
        getScreen: function(a) {
            var b = W.getClassName(a);
            if (this._screenLookup.exists(b)) return this._screenLookup.get(b);
            a = W.createInstance(a, [this]);
            this._screenLookup.set(b, a);
            this._screenList.push(a);
            return a
        },
        addVendorListener: function(a, b, c, d) {
            for (var e = 0, f = ["webkit", "moz", "ms", "o", "khtml"]; e < f.length;) {
                var g = f[e];
                ++e;
                a.addEventListener(g + b, c, d)
            }
            a.addEventListener(b, c, d)
        },
        updateFullscreen: function() {
            this._isFullscreen = !0 == E.getFeature2(["fullscreen", "fullScreen", "isFullScreen"], window.document).feature;
            null
        },
        lockOrientation: function(a) {
            var b = E.getFeature("lockOrientation", window.screen).feature;
            if (null != b) {
                var c;
                switch (a[1]) {
                    case 0:
                        c = "portrait";
                        break;
                    case 1:
                        c = "landscape"
                }
                b.apply(window.screen, [c]) || null
            }
        },
        unlockOrientation: function() {
            var a = E.getFeature("unlockOrientation", window.screen).feature;
            null != a && a.apply(window.screen, [])
        },
        onOrientationChange: function(a) {
            a = hb.orientation(window.orientation);
            this.window.onScreenWindowResize();
            // if (!this.isDesktop) {
            //     a = a == sa.Landscape;
            //     null != this._portraitHint &&
            //         (this._portraitHint.spatial.set_cullingMode(a ? G.CullDynamic : G.CullAlways), a);
            //     for (var b = 0, c = this._screenList; b < c.length;) {
            //         var d = c[b];
            //         ++b;
            //         d.container.set_visible(!a);
            //         d.onResize(this.window.resolution.x, this.window.resolution.y)
            //     }
            // }
        },
        requestFullscreen: function(a) {
            null == a && (a = !0);
            if (a) {
                a = window.document.documentElement;
                var b = E.getFeature2(["requestFullscreen", "requestFullScreen"], a).feature;
                null != b && b.apply(a, [])
            } else a = E.getFeature2(["cancelFullscreen", "cancelFullScreen"], window.document).feature, null !=
                a && X.callMethod(window.document, a, [])
        },
        __class__: hb
    };
    var aa = function(a) {
        this.radius = 0;
        this.freeFloat = this.enabled = this.connected = this.moving = !1;
        this.type = -1;
        this.freeFloat = a;
        this.lastPosY = this.lastPosX = this._posY = this._posX = this.speedY = this.speedX = 0;
        this.neighbors = []
    };
    aa.__name__ = ["Bubble"];
    aa.prototype = {
        destroy: function() {
            this.enabled && this.disable();
            this.removeNeighbors();
            this.neighbors = null
        },
        enable: function(a, b, c, d) {
            this.type = a;
            this.radius = b;
            this._posX = this.lastPosX = c;
            this._posY = this.lastPosY =
                d;
            this.connected = !1;
            this.enabled = !0;
            q.dispatch(0, null, this)
        },
        disable: function() {
            this.enabled = this.moving = !1;
            q.dispatch(1, null, this)
        },
        addNeighbor: function(a) {
            this.neighbors.push(a)
        },
        removeNeighbors: function() {
            this.neighbors = []
        },
        shoot: function(a, b) {
            this.moving = !0;
            this.speedX = b * Math.sin(a / 180 * Math.PI);
            this.speedY = -1 * b * Math.cos(a / 180 * Math.PI);
            q.dispatch(3, null, this)
        },
        touchNeighbors: function(a, b, c, d, e, f) {
            null == e && (e = 0);
            null == f && (f = [], f.push(this));
            b = a = 0;
            for (var g = this.neighbors; b < g.length;) {
                var h = g[b];
                ++b;
                if (h.enabled && -1 == fa.indexOf(f, h)) {
                    var k = this._posX - h._posX,
                        l = this._posY - h._posY,
                        m = Math.sqrt(k * k + l * l);
                    if (1E-5 < m) k /= m, l /= m;
                    else throw "";
                    q.dispatch(7, {
                        dirX: c,
                        dirY: d,
                        amount: (-1 * (k * c + l * d) + 1) / 2,
                        distance: e
                    }, h);
                    f.push(h)
                }
                a++
            }
            if (1 > e)
                for (a = 0, b = this.neighbors; a < b.length;) g = b[a], ++a, g.enabled && g.touchNeighbors(this._posX, this._posY, c, d, e + 1, f)
        },
        snap: function(a, b, c, d) {
            this._posX = c;
            this._posY = d;
            q.dispatch(6, {
                fromX: a,
                fromY: b,
                toX: c,
                toY: d
            }, this);
            a = [];
            this.checkForNeighborMatches(a);
            if (3 <= a.length)
                for (c =
                    b = 0; c < a.length;) d = a[c], ++c, d.burst(b), b++;
            return a.length
        },
        burst: function(a) {
            q.dispatch(9, {
                index: a
            }, this);
            this.disable()
        },
        markDisconnected: function() {
            this.connected = !1
        },
        markConnected: function() {
            this.connected = !0;
            for (var a = 0, b = this.neighbors; a < b.length;) {
                var c = b[a];
                ++a;
                c.enabled && !c.connected && c.markConnected()
            }
        },
        drop: function(a) {
            q.dispatch(8, {
                index: a
            }, this);
            this.disable()
        },
        tick: function(a) {
            !0 == this.moving && (0.03333333333333333 < a && (a = 0.03333333333333333, null), this.iterateMovement(a))
        },
        checkForNeighborMatches: function(a,
            b) {
            null == b && (b = [], b.push(this), a.push(this));
            for (var c = 0, d = this.neighbors; c < d.length;) {
                var e = d[c];
                ++c;
                e.enabled && -1 == fa.indexOf(b, e) && (b.push(e), e.type == this.type && (a.push(e), e.checkForNeighborMatches(a, b)))
            }
        },
        iterateMovement: function(a) {
            this.lastPosX = this._posX;
            this.lastPosY = this._posY;
            this._posX += this.speedX * a;
            this._posY += this.speedY * a;
            this._posX <= this.radius ? (this._posX = 2 * this.radius - this._posX, this.speedX *= -1, q.dispatch(5, null, this)) : this._posX >= 1 - this.radius && (this._posX = 2 * (1 - this.radius) - this._posX,
                this.speedX *= -1, q.dispatch(5, null, this));
            q.dispatch(4, null, this)
        },
        get_posX: function() {
            return this._posX
        },
        get_posY: function() {
            return this._posY
        },
        setPos: function(a, b) {
            if (a != this._posX || b != this._posY) this._posX = a, this._posY = b, this.lastPosX = a, this.lastPosY = b, this.enabled && q.dispatch(2, null, this)
        },
        __class__: aa
    };
    var U = function(a) {
        this.mOriginX = this.mOriginY = this.mPivotX = this.mPivotY = this.mRotationDeg = this.mFlags = 0;
        this.mScaleX = this.mScaleY = 1;
        this.mX = this.mY = this.mSizeX = this.mSizeY = 0;
        this.spatial = a;
        this.mFlags =
            64;
        a.set_userData(this);
        a.mFlags |= 256
    };
    U.__name__ = ["de", "polygonal", "zz", "sprite", "SpriteBase"];
    U.prototype = {
        free: function() {
            this.remove();
            this.spatial = null
        },
        remove: function() {
            var a = this.spatial.parent;
            null != a && a.removeChild(this.spatial)
        },
        get_alpha: function() {
            throw "";
        },
        set_alpha: function(a) {
            throw "";
        },
        set_visible: function(a) {
            this.spatial.set_cullingMode(a ? G.CullDynamic : G.CullAlways);
            return a
        },
        set_x: function(a) {
            this.mX = a;
            this.mFlags |= 1;
            return a
        },
        set_y: function(a) {
            this.mY = a;
            this.mFlags |= 1;
            return a
        },
        set_rotation: function(a) {
            this.mRotationDeg = a;
            this.mFlags |= 1;
            this.mFlags |= 16;
            return a
        },
        set_scale: function(a) {
            this.mScaleX = this.mScaleY = a;
            this.mFlags |= 1;
            return a
        },
        set_scaleX: function(a) {
            this.mScaleX = a;
            this.mFlags |= 1;
            return a
        },
        set_scaleY: function(a) {
            this.mScaleY = a;
            this.mFlags |= 1;
            return a
        },
        get_width: function() {
            return this.mSizeX * Y.fabs(this.mScaleX)
        },
        set_width: function(a) {
            this.mScaleX = a / this.mSizeX;
            this.mFlags |= 1;
            return a
        },
        get_height: function() {
            return this.mSizeY *
                Y.fabs(this.mScaleY)
        },
        set_height: function(a) {
            this.mScaleY = a / this.mSizeY;
            this.mFlags |= 1;
            return a
        },
        get_size: function() {
            return this.mSizeX
        },
        set_size: function(a) {
            this.mScaleX = this.mScaleY = a / this.mSizeX;
            this.mFlags |= 1;
            return a
        },
        set_originX: function(a) {
            this.mOriginX = a;
            this.mFlags |= 1;
            this.mFlags = 0 == a && 0 == this.mOriginY ? this.mFlags & -5 : this.mFlags | 4;
            return a
        },
        set_originY: function(a) {
            this.mOriginY = a;
            this.mFlags |= 1;
            this.mFlags = 0 == a && 0 == this.mOriginX ? this.mFlags & -5 : this.mFlags | 4;
            return a
        },
        set_pivotX: function(a) {
            this.mPivotX =
                a;
            this.mFlags |= 1;
            this.mFlags = 0 == a && 0 == this.mPivotY ? this.mFlags & -9 : this.mFlags | 8;
            return a
        },
        set_pivotY: function(a) {
            this.mPivotY = a;
            this.mFlags |= 1;
            this.mFlags = 0 == a && 0 == this.mPivotX ? this.mFlags & -9 : this.mFlags | 8;
            return a
        },
        centerOrigin: function() {
            this.set_originX(-this.mSizeX / 2);
            this.set_originY(-this.mSizeY / 2);
            this.mFlags |= 1
        },
        centerPivot: function() {
            var a = this.mSizeY / 2;
            this.mPivotX = this.mSizeX / 2;
            this.mPivotY = a;
            this.mFlags |= 8;
            this.mFlags |= 1
        },
        resetPivot: function() {
            this.mFlags &= -9;
            this.mPivotX = this.mPivotY =
                0;
            this.mFlags |= 1
        },
        tween: function(a, b, c, d, e) {
            if (null != this.spatial.mControllers)
                for (var f = this.spatial.mControllers.iterator(); f.hasNext();) {
                    var g = f.next();
                    if (1 == g.type)
                        if (g.active) {
                            if (g.field == a) {
                                g.tween(a, b, c, d, e);
                                return
                            }
                        } else g.tween(a, b, c, d, e)
                }
            f = new ib;
            this.spatial.attach(f);
            f.tween(a, b, c, d, e)
        },
        tick: function(a) {
            this.spatial.updateControllers(a)
        },
        applyChanges: function() {
            0 < (this.mFlags & 1) && (this.mFlags &= -2, this.syncLocalXform())
        },
        syncLocalXform: function() {
            this.spatial.mFlags |= 32
        },
        __class__: U
    };
    var N =
        function(a, b) {
            U.call(this, new Ja(a));
            this.visual = this.spatial;
            null != b && b.addChild(this)
    };
    N.__name__ = ["de", "polygonal", "zz", "sprite", "Sprite"];
    N.__super__ = U;
    N.prototype = B(U.prototype, {
        free: function() {
            U.prototype.free.call(this);
            this.visual.free();
            this.visual = null
        },
        localBox: function(a) {
            this.applyChanges();
            null == a && (a = new C);
            a.minX = this.mX;
            a.minY = this.mY;
            a.maxX = this.mX + this.get_width();
            a.maxY = this.mY + this.get_height();
            return a
        },
        set_frame: function(a) {
            this.set_frameIndex(this.visual.effect.atlas._indexMap.get(a));
            return a
        },
        set_frameIndex: function(a) {
            var b = this.visual.effect;
            if (b.mFrameIndex == a) return a;
            b.mFrameIndex != a && (b.mFrameIndex = a, b.setCrop());
            var c = b.atlas._sizeList._a[a];
            this.mSizeX = c.x;
            this.mSizeY = c.y;
            b = b.atlas.scale;
            1 != b && (this.mSizeX /= b, this.mSizeY /= b);
            return a
        },
        setTexture: function(a, b) {
            if (null != x.getTextureAtlas(a)) {
                this.visual.effect = x.createSpriteSheetEffect(a);
                var c = this.visual.effect,
                    d;
                d = "string" == typeof b ? c.atlas.getFrameIndex(b) : (b | 0) === b ? b : 0;
                this.resetPivot();
                c.mFrameIndex != d && (c.mFrameIndex =
                    d, c.setCrop());
                d = c.atlas._sizeList._a[d];
                this.mSizeX = d.x;
                this.mSizeY = d.y;
                c = c.atlas.scale;
                1 != c && (this.mSizeX /= c, this.mSizeY /= c)
            } else c = this.visual.effect = x.createTextureEffect(a), this.mSizeX = c._tex.image.width, this.mSizeY = c._tex.image.height;
            this.mFlags |= 1;
            return this
        },
        bakeDownScale: function() {
            this.mSizeX *= Y.fabs(this.mScaleX);
            this.mSizeY *= Y.fabs(this.mScaleY);
            this.mScaleY = this.mScaleX = 1;
            this.mFlags |= 1
        },
        get_alpha: function() {
            return this.spatial.effect._alpha
        },
        set_alpha: function(a) {
            this.spatial.effect.set_alpha(0 >
                a ? 0 : 1 < a ? 1 : a);
            this.spatial.set_cullingMode(0 == a ? G.CullAlways : G.CullDynamic);
            return a
        },
        syncLocalXform: function() {
            U.prototype.syncLocalXform.call(this);
            var a = this.spatial.local;
            a._matrix.setIdentity();
            a._translate.zero();
            a._scale.x = 1;
            a._scale.y = 1;
            a._scale.z = 1;
            a._bits |= 31;
            var b = 0.017453292519943295 * this.mRotationDeg,
                c = Math.sin(b),
                b = Math.cos(b),
                d = this.mScaleX,
                e = this.mScaleY;
            0 > d ? -0.001 < d && (d = -0.001) : 0.001 > d && (d = 0.001);
            0 > e ? -0.001 < e && (e = -0.001) : 0.001 > e && (e = 0.001);
            var f = d * this.mPivotX,
                g = e * this.mPivotY;
            this.mSizeX ==
                this.mSizeY && d == e ? a.setUniformScale2(this.mSizeX * d) : (a._scale.x = this.mSizeX * d, a._scale.y = this.mSizeY * e, a._bits &= -14, a);
            d = a._matrix;
            d.m11 = b;
            d.m12 = -c;
            d.m21 = c;
            d.m22 = b;
            a._translate.x = -(f * b) + g * c + this.mPivotX + this.mX + this.mOriginX;
            a._translate.y = -(f * c) - g * b + this.mPivotY + this.mY + this.mOriginY;
            a._translate.z = 1;
            a._bits &= -2;
            a
        },
        __class__: N
    });
    var ya = function(a) {
        this._animIndex = 0;
        N.call(this);
        this.bubble = a;
        a.view = this;
        this.setTexture("texture1", this.getBubbleFrameId(a.type));
        this._interval = new yc
    };
    ya.__name__ = ["BubbleView"];
    ya.__super__ = N;
    ya.prototype = B(N.prototype, {
        free: function() {
            N.prototype.free.call(this);
            this.bubble = this.bubble.view = null
        },
        tick: function(a) {
            N.prototype.tick.call(this, a);
            switch (this._animIndex) {
                case 1:
                    this.mScaleX = this.mScaleY = a = this._interval.advance(a);
                    this.mFlags |= 1;
                    a;
                    1 == a && (this._animIndex = 0);
                    break;
                case 2:
                    a = this._interval.advance(a);
                    this.set_scale(1 - a);
                    1 == a && (this._animIndex = 0, this.free());
                    break;
                case 3:
                    a = this._interval.advance(a), 0.5 > a ? this.set_scale(1 + a / 0.5 * -0.15000000000000002) :
                        0.5 < a && this.set_scale(0.85 + (a - 0.5) / 0.5 * 0.15000000000000002), 1 == a && (this._animIndex = 0, this.mScaleX = this.mScaleY = 1, this.mFlags |= 1, 1)
            }
        },
        setType: function(a) {
            this.set_frame(this.getBubbleFrameId(a))
        },
        playBurstAnimation: function() {
            this.spatial.set_cullingMode(G.CullDynamic);
            !0;
            this._interval.set_duration(0.2);
            this._animIndex = 2
        },
        playAppearAnimation: function() {
            this.spatial.set_cullingMode(G.CullDynamic);
            !0;
            this._interval.set_duration(0.4);
            this._animIndex = 1
        },
        playIdleAnimation: function() {
            this.spatial.set_cullingMode(G.CullDynamic);
            !0;
            this.mScaleX = this.mScaleY = 1;
            this.mFlags |= 1;
            1;
            this._animIndex = 0
        },
        playSnapAnimation: function() {
            this._interval.set_duration(0.2);
            this.spatial.set_cullingMode(G.CullDynamic);
            !0;
            this.mScaleX = this.mScaleY = 1;
            this.mFlags |= 1;
            1;
            this._animIndex = 3
        },
        getBubbleFrameId: function(a) {
            switch (a) {
                case 0:
                    return "bubble_null";
                case 1:
                    return "bubble1";
                case 2:
                    return "bubble2";
                case 3:
                    return "bubble3";
                case 4:
                    return "bubble4";
                case 5:
                    return "bubble5";
                case 6:
                    return "bubble6";
                default:
                    throw "" +
                        a;
            }
        },
        __class__: ya
    });
    var l = function() {};
    l.__name__ = ["Config"];
    var ba = function(a, b) {
        b = b.split("u").join("");
        this.r = RegExp(a, b)
    };
    ba.__name__ = ["EReg"];
    ba.prototype = {
        match: function(a) {
            this.r.global && (this.r.lastIndex = 0);
            this.r.m = this.r.exec(a);
            this.r.s = a;
            return null != this.r.m
        },
        matched: function(a) {
            if (null != this.r.m && 0 <= a && a < this.r.m.length) return this.r.m[a];
            throw "";
        },
        __class__: ba
    };
    var wa = function() {
        this._numBubbleTypesOnBoard = this._numRowsToInsert = this._score = this._numSameColorsInARow = this._shootingArmRow =
            this._shootingArmAngle = this._currChain = this._numMissed = this._missesUntilNewRow = this._freeRows = this.statBallsShot = this.statNumHits = this.statNumMisses = this.statBubblesCleared = this.statLargestGroupCleared = this.statPlayTime = 0;
        this._bubbles = this._rowIndentation = this._currentBubble = null;
        this._maxMissesUntilNewRow = this._bubbleDiameterPlusSpacing = this._bubbleDiameter = this._bubbleRadius = this._bubbleSpacing = this._bubblePadding = 0;
        this._availableColors = null;
        this._numRows = this._numStartRows = this._numCols = 0;
        this._levelSettings =
            null;
        this._scratchVec = new Kb(0, 0);
        this._scratchIp = new Kb(0, 0);
        this._bubbleCount = [];
        for (var a = 0; 7 > a;) {
            var b = a++;
            this._bubbleCount[b] = 0
        }
        this._nextBubbleType = this._currentBubbleType = -1;
        this._status = 0;
        this._statBubblesClearedPerType = [];
        for (a = 0; 7 > a;) b = a++, this._statBubblesClearedPerType[b] = 0;
        q.addListener(0, F(this, this.handleMessages));
        q.addListener(1, F(this, this.handleMessages));
        q.addListener(4, F(this, this.handleMessages))
    };
    wa.__name__ = ["GameLogic"];
    wa.prototype = {
        setLevel: function(a) {
            this._levelSettings =
                a;
            this._numRows = this._levelSettings.max_rows + 1;
            this._numStartRows = this._levelSettings.start_rows + 1;
            this._numCols = this._levelSettings.bubbles_per_row;
            this._availableColors = this._levelSettings.colors;
            this._maxMissesUntilNewRow = this._levelSettings.misses_until_new_row;
            this._bubblePadding = l.BUBBLE_PADDING;
            this._bubbleDiameterPlusSpacing = (1 - 2 * this._bubblePadding) / (this._numCols + 0.5);
            this._bubbleDiameter = this._bubbleDiameterPlusSpacing / (1 + l.BUBBLE_SPACING_PERCENT);
            this._bubbleRadius = 0.5 * this._bubbleDiameter;
            this._bubbleSpacing = this._bubbleDiameterPlusSpacing - this._bubbleDiameter
        },
        start: function() {
            if (!this._levelSettings) throw "";
            this.createBubbles();
            this._score = 0;
            this._status = 2;
            this._numSameColorsInARow = 0;
            this._nextBubbleType = this._currentBubbleType = -1;
            this._numMissed = this._currChain = this._shootingArmAngle = 0;
            this._missesUntilNewRow = this._maxMissesUntilNewRow;
            this.resetStatistics();
            this.fetchNextBubble();
            q.dispatch(11)
        },
        stop: function() {
            this.destroyBubbles();
            this._status = 0;
            q.dispatch(13)
        },
        destroy: function() {
            q.removeAllListeners(F(this, this.handleMessages))
        },
        pause: function() {
            this._status = 3
        },
        unpause: function() {
            this._status = 2
        },
        get_paused: function() {
            return 3 == this._status
        },
        setShootingArmRow: function(a) {
            this._shootingArmRow = a;
            null != this._currentBubble && this._currentBubble.enabled && !this._currentBubble.moving && this._currentBubble.setPos(0.5, 0.5 * this._bubbleDiameterPlusSpacing + 0.866 * (this._shootingArmRow - 1) * this._bubbleDiameterPlusSpacing)
        },
        shoot: function() {
            2 ==
                this._status && !1 == this._currentBubble.moving && (this._currentBubble.shoot(this._shootingArmAngle, l.SHOOTER_COLOR_BUBBLE_SPEED), this.statBallsShot++)
        },
        getBubbleBurstPoints: function(a) {
            return a < l.POINTS_PER_BUBBLE.length ? l.POINTS_PER_BUBBLE[a] : l.POINTS_PER_BUBBLE[l.POINTS_PER_BUBBLE.length - 1]
        },
        get_score: function() {
            return this._score
        },
        get_shootingArmAngle: function() {
            return this._shootingArmAngle
        },
        set_shootingArmAngle: function(a) {
            return this._shootingArmAngle = a
        },
        get_rowHeight: function() {
            return 0.866 * this._bubbleDiameterPlusSpacing
        },
        get_halfBubbleHeight: function() {
            return 0.5 * this._bubbleDiameterPlusSpacing
        },
        get_shootingArmY: function() {
            return 0.5 * this._bubbleDiameterPlusSpacing + 0.866 * (this._shootingArmRow - 1) * this._bubbleDiameterPlusSpacing
        },
        get_maxRowY: function() {
            return 0.5 * this._bubbleDiameterPlusSpacing + 0.866 * (this._numRows - 1) * this._bubbleDiameterPlusSpacing
        },
        get_status: function() {
            return this._status
        },
        get_freeRows: function() {
            return this._freeRows
        },
        get_numRowsToInsert: function() {
            return this._numRowsToInsert
        },
        getStatBubblesClearedPerType: function(a) {
            return this._statBubblesClearedPerType[a]
        },
        resetStatistics: function() {
            for (var a = this.statPlayTime = this.statLargestGroupCleared = this.statBubblesCleared = this.statNumMisses = this.statNumHits = this.statBallsShot = 0; 7 > a;) {
                var b = a++;
                this._statBubblesClearedPerType[b] = 0
            }
        },
        createBubbles: function() {
            for (var a = 0; 7 > a;) {
                var b = a++;
                this._bubbleCount[b] = 0
            }
            this._bubbles = [];
            a = 0;
            for (b = this._numRows; a < b;) {
                var c = a++;
                this._bubbles[c] = []
            }
            this._rowIndentation = [];
            a = 0;
            for (b = this._numRows; a < b;) c = a++, this._rowIndentation[c] = !1;
            a = null;
            b = 0;
            for (c = this._numRows; b < c;) {
                for (var d =
                    b++, a = [], e = 0, f = this._numCols; e < f;) {
                    var g = e++;
                    a[g] = null
                }
                e = 0;
                for (f = this._numCols; e < f;) g = e++, a[g] = new aa(!1);
                this._bubbles[d] = a;
                this._rowIndentation[d] = 0 == d % 2 ? !1 : !0
            }
            a = this._scratchVec;
            b = 0;
            for (c = this._numCols; b < c;) d = b++, this.calcBubblePos(d, 0, a), this._bubbles[0][d].enable(0, this._bubbleRadius, a.x, a.y);
            a = 1;
            for (b = this._numStartRows; a < b;) c = a++, this.placeBubbleRow(c, !0);
            this.updateAllPositions();
            this.updateAllNeighbors();
            this.countFreeRows();
            this._currentBubble = new aa(!0)
        },
        destroyBubbles: function() {
            this._currentBubble.destroy();
            this._currentBubble = null;
            for (var a = 0, b = this._bubbles; a < b.length;) {
                var c = b[a];
                ++a;
                for (var d = 0; d < c.length;) {
                    var e = c[d];
                    ++d;
                    e.destroy()
                }
            }
            this._rowIndentation = this._bubbles = null;
            this._numBubbleTypesOnBoard = 0
        },
        chooseRandomBoardColor: function(a) {
            if (a) return this._availableColors[Math.floor(Math.random() * this._availableColors.length)];
            a = [];
            for (var b = 0, c = this._availableColors.length; b < c;) {
                var d = b++;
                0 < this._bubbleCount[this._availableColors[d]] && a.push(this._availableColors[d])
            }
            return 1 == a.length ? a[0] : a[Math.floor(Math.random() *
                a.length)]
        },
        chooseRandomShootColor: function(a, b) {
            null == b && (b = 0);
            for (var c = [], d = 0, e = this._availableColors.length; d < e;) {
                var f = d++;
                0 < this._bubbleCount[this._availableColors[f]] && c.push(this._availableColors[f])
            }
            if (1 == c.length) return c[0];
            d = -1;
            do d = c[Math.floor(Math.random() * c.length)], -1 != a && a == d && b >= l.MAX_SAME_COLORS_IN_A_ROW && null; while (-1 != a && a == d && b >= l.MAX_SAME_COLORS_IN_A_ROW);
            return d
        },
        fetchNextBubble: function() {
            this._currentBubble.enabled && this._currentBubble.disable();
            if (2 == this._status) {
                if (-1 ==
                    this._currentBubbleType) this._currentBubbleType = this.chooseRandomShootColor(-1), this._nextBubbleType = this.chooseRandomShootColor(-1), this._numSameColorsInARow = 0;
                else {
                    for (; 0 == this._bubbleCount[this._nextBubbleType];) this._nextBubbleType = this.chooseRandomShootColor(-1);
                    this._currentBubbleType = this._nextBubbleType;
                    this._nextBubbleType = this.chooseRandomShootColor(this._nextBubbleType, this._numSameColorsInARow);
                    this._nextBubbleType == this._currentBubbleType ? this._numSameColorsInARow++ : this._numSameColorsInARow =
                        0
                }
                this._currentBubble.enable(this._currentBubbleType, this._bubbleRadius, 0.5, 0.5 * this._bubbleDiameterPlusSpacing + 0.866 * (this._shootingArmRow - 1) * this._bubbleDiameterPlusSpacing);
                q.dispatch(17, {
                    upcoming: this._nextBubbleType,
                    left: this._missesUntilNewRow - this._numMissed
                })
            }
        },
        calcBubblePos: function(a, b, c) {
            var d = 0.5 * this._bubbleDiameterPlusSpacing + 0.866 * b * this._bubbleDiameterPlusSpacing + this._bubblePadding;
            c.x = !1 == this._rowIndentation[b] ? 0.5 * this._bubbleDiameterPlusSpacing + a * this._bubbleDiameterPlusSpacing +
                this._bubblePadding : this._bubbleDiameterPlusSpacing + a * this._bubbleDiameterPlusSpacing + this._bubblePadding;
            c.y = d;
            return c
        },
        updateAllPositions: function() {
            for (var a = null, b = this._scratchVec, c = 0, d = this._numRows; c < d;)
                for (var e = c++, f = 0, g = this._numCols; f < g;) {
                    var h = f++,
                        a = this._bubbles[e][h];
                    this.calcBubblePos(h, e, b);
                    a.setPos(b.x, b.y)
                }
        },
        updateBubbleNeighbors: function(a, b) {
            var c = this._bubbles[b][a];
            c.removeNeighbors();
            0 < a && c.addNeighbor(this._bubbles[b][a - 1]);
            a < this._numCols - 1 && c.addNeighbor(this._bubbles[b][a +
                1
            ]);
            0 < b && (!1 == this._rowIndentation[b] ? (0 < a && c.addNeighbor(this._bubbles[b - 1][a - 1]), c.addNeighbor(this._bubbles[b - 1][a])) : (c.addNeighbor(this._bubbles[b - 1][a]), a < this._numCols - 1 && c.addNeighbor(this._bubbles[b - 1][a + 1])));
            b < this._numRows - 1 && (!1 == this._rowIndentation[b] ? (0 < a && c.addNeighbor(this._bubbles[b + 1][a - 1]), c.addNeighbor(this._bubbles[b + 1][a])) : (c.addNeighbor(this._bubbles[b + 1][a]), a < this._numCols - 1 && c.addNeighbor(this._bubbles[b + 1][a + 1])))
        },
        updateAllNeighbors: function() {
            for (var a = 0, b = this._numRows; a <
                b;)
                for (var c = a++, d = 0, e = this._numCols; d < e;) {
                    var f = d++;
                    this.updateBubbleNeighbors(f, c)
                }
        },
        placeBubble: function(a, b, c) {
            var d = this._bubbles[b][a];
            a = this.calcBubblePos(a, b, this._scratchVec);
            d.enable(this.chooseRandomBoardColor(c), this._bubbleRadius, a.x, a.y)
        },
        placeBubbleRow: function(a, b) {
            for (var c = 0, d = this._numCols; c < d;) {
                var e = c++;
                this.placeBubble(e, a, b)
            }
        },
        countFreeRows: function() {
            this._freeRows = 0;
            for (var a = this._numRows - 1; 0 <= a;) {
                for (var b = 0, c = this._numCols; b < c;) {
                    var d = b++;
                    if (this._bubbles[a][d].enabled) return
                }
                this._freeRows++;
                a--
            }
        },
        updateRowsToInsert: function() {
            this._numRowsToInsert = 1 + this._availableColors.length - this._numBubbleTypesOnBoard
        },
        insertNewRows: function() {
            for (var a = 0, b = this._numRowsToInsert; a < b;) {
                a++;
                for (var c = 0, d = this._bubbles[this._numRows - 1]; c < d.length;) {
                    var e = d[c];
                    ++c;
                    e.enabled && e.disable()
                }
                c = this._bubbles[this._numRows - 1];
                for (d = this._numRows - 1; 1 < d;) this._bubbles[d] = this._bubbles[d - 1], this._rowIndentation[d] = this._rowIndentation[d - 1], d--;
                this._bubbles[1] = c;
                this._rowIndentation[0] = this._rowIndentation[2];
                this._rowIndentation[1] = !0 == this._rowIndentation[2] ? !1 : !0;
                this.placeBubbleRow(1, !1);
                this.updateAllPositions();
                this.updateAllNeighbors();
                c = this._bubbles[this._numRows - 1];
                for (d = 0; d < c.length;)
                    if (e = c[d], ++d, e.enabled) {
                        this.setLevelFailed();
                        return
                    }
            }
            q.dispatch(14)
        },
        dropIsolatedBubbles: function(a) {
            for (var b = null, c = null, d = 0, e = this._numRows; d < e;)
                for (var b = d++, b = this._bubbles[b], f = 0, g = this._numCols; f < g;) c = f++, c = b[c], c.enabled && c.markDisconnected();
            b = this._bubbles[0];
            d = 0;
            for (e = this._numCols; d < e;) c = d++, c = b[c],
            c.enabled && !c.connected && c.markConnected();
            e = d = 0;
            for (f = this._numRows; e < f;)
                for (var b = e++, b = this._bubbles[b], g = 0, h = this._numCols; g < h;) c = g++, c = b[c], c.enabled && !1 == c.connected && (c.drop(a + d), d++);
            return d
        },
        snapCurrentBubble: function(a, b, c) {
            a.enable(this._currentBubble.type, this._currentBubble.radius, a._posX, a._posY);
            var d = this._currentBubble.speedX,
                e = this._currentBubble.speedY,
                f = Math.sqrt(d * d + e * e);
            if (!(1E-5 < f)) throw "";
            a.touchNeighbors(this._currentBubble._posX, this._currentBubble._posY,
                d / f, e / f);
            b = a.snap(b, c, a._posX, a._posY);
            3 <= b ? (a = this.dropIsolatedBubbles(b), b += a, this._currChain++, this.addBurstPoints(b), this.statNumHits++, b > this.statLargestGroupCleared && (this.statLargestGroupCleared = b), 0 == this._numBubbleTypesOnBoard && this.setLevelComplete()) : (this._currChain = 0, -1 != fa.indexOf(this._bubbles[this._numRows - 1], a) ? this.setLevelFailed() : (this._numMissed++, this.statNumMisses++, this._numMissed == this._missesUntilNewRow && (this.insertNewRows(), this._numMissed = 0, 1 < this._missesUntilNewRow ? this._missesUntilNewRow-- :
                this._missesUntilNewRow = this._maxMissesUntilNewRow)));
            this.countFreeRows();
            this.fetchNextBubble()
        },
        addPoints: function(a, b) {
            null == b && (b = 0);
            this._score += a;
            q.dispatch(16, {
                score: this._score,
                numBursted: b
            })
        },
        addBurstPoints: function(a) {
            for (var b = 0, c = 0; c < a;) var d = c++,
            b = b + this.getBubbleBurstPoints(d);
            this.addPoints(b, a)
        },
        checkMovingBubble: function() {
            var a = this.testForBubbleCollisions(),
                b = null;
            if (0 < a.length) {
                for (var c = 0, d = null, e = 1E8, f = 0, g = 0, h = null, k = c = 0, m = null, k = 0; k < a.length;) m = a[k], ++k, b = m, c = m.intersect.x -
                    m.posBackwardX, h = m.intersect.y - m.posBackwardY, c = c * c + h * h, c < e && (d = m.bubble, e = c, f = m.intersect.x, g = m.intersect.y);
                if (null != d) {
                    a = -1 * b.directionX * this._bubbleRadius + f;
                    g = -1 * b.directionY * this._bubbleRadius + g;
                    k = 1E6;
                    m = null;
                    h = 0;
                    for (d = d.neighbors; h < d.length;) e = d[h], ++h, !1 == e.enabled && (c = a - e._posX, f = g - e._posY, c = c * c + f * f, c < k && (m = e, k = c));
                    if (null == m)
                        for (I.playSound(w.GameOverSuccess), k = 1E6, m = null, d = 0, e = this._numRows; d < e;)
                            for (var f = d++, n = 0, p = this._numCols; n < p;)
                                if (c = n++, h = this._bubbles[f][c], !1 == h.enabled) {
                                    var c = a -
                                        h._posX,
                                        q = g - h._posY,
                                        c = c * c + q * q;
                                    c < k && (m = h, k = c)
                                }
                    if (null != m) {
                        this.snapCurrentBubble(m, -1 * b.directionX * (1 - 0.5 * l.BUBBLE_SNEAK) * this._bubbleRadius + a, -1 * b.directionY * (1 - 0.5 * l.BUBBLE_SNEAK) * this._bubbleRadius + g);
                        return
                    }
                }
            }
            0 > this._currentBubble._posY && this.fetchNextBubble()
        },
        testForBubbleCollisions: function() {
            var a = [],
                b = this._currentBubble.radius,
                c = (1 - l.BUBBLE_SNEAK) * this._currentBubble.radius,
                d = 0.03333333333333333 * this._currentBubble.speedX,
                e = 0.03333333333333333 * this._currentBubble.speedY,
                f = -0.5 * d + this._currentBubble._posX,
                g = -0.5 * e + this._currentBubble._posY,
                d = 0.5 * d + this._currentBubble._posX,
                e = 0.5 * e + this._currentBubble._posY,
                h = 0,
                k = 0,
                h = 0,
                m = !1;
            d < b ? (h = (b - f) / (d - f), k = f + h * (d - f), h = g + h * (e - g), m = !0, d = 2 * b - d) : f < b ? (h = (b - f) / (d - f), k = f + h * (d - f), h = g + h * (e - g), m = !0, f = 2 * b - f) : d > 1 - b ? (h = (1 - b - f) / (d - f), k = f + h * (d - f), h = g + h * (e - g), m = !0, d = 2 * (1 - b) - d) : f > 1 - b && (h = (1 - b - f) / (d - f), k = f + h * (d - f), h = g + h * (e - g), m = !0, f = 2 * (1 - b) - f);
            m ? (this.findLineSegmentCollisionsWithBubbles(f, g, k, h, c, a), this.findLineSegmentCollisionsWithBubbles(k, h, d, e, c, a)) : this.findLineSegmentCollisionsWithBubbles(f,
                g, d, e, c, a);
            return a
        },
        findLineSegmentCollisionsWithBubbles: function(a, b, c, d, e, f) {
            var g = null,
                h = null,
                k = null,
                m = 0,
                l = 0,
                n = c - a,
                p = d - b,
                g = Math.sqrt(n * n + p * p);
            if (1E-5 < g) n /= g, p /= g;
            else throw "";
            for (var q = -p, v = n, t = Math.min(a, c) - e, x = Math.min(b, d) - e, r = Math.max(a, c) + e, s = Math.max(b, d) + e, y = this._numRows - 1; 0 <= y;) {
                for (var g = this._bubbles[y], w = 0, u = this._numCols; w < u;)
                    if (h = w++, h = g[h], h.enabled && !(r < h._posX - h.radius || s < h._posY - h.radius || t > h._posX + h.radius || x > h._posY + h.radius)) {
                        var k = this.calcRayRayIntersection(c,
                            d, a, b, h._posX, h._posY, h._posX + q, h._posY + v),
                            l = e + h.radius,
                            m = h._posX - k.x,
                            A = h._posY - k.y,
                            m = Math.sqrt(m * m + A * A);
                        m > l || f.push({
                            bubble: h,
                            intersect: k,
                            directionX: n,
                            directionY: p,
                            posBackwardX: a,
                            posBackwardY: b,
                            posForwardX: c,
                            posForwardY: d
                        })
                    }
                y--
            }
        },
        tick: function(a) {
            switch (this._status) {
                case 2:
                    this.tickHandleGameRunning(a);
                    break;
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    throw "" + this._status;
            }
            q.dispatch(15)
        },
        tickHandleGameRunning: function(a) {
            this._currentBubble.tick(a);
            1 < a && (a = 1);
            this.statPlayTime +=
                a
        },
        setLevelComplete: function() {
            this._status = 4;
            for (var a = 0, b = this._numCols; a < b;) {
                var c = a++;
                this._bubbles[0][c].disable()
            }
            this._currentBubble.burst(0);
            q.dispatch(12)
        },
        setLevelFailed: function() {
            this._status = 5;
            q.dispatch(12)
        },
        handleMessages: function(a, b, c) {
            b = null;
            switch (a) {
                case 4:
                    2 == this._status && this.checkMovingBubble();
                    break;
                case 0:
                    b = c;
                    b.freeFloat || 0 == b.type || (this._bubbleCount[b.type]++, 1 == this._bubbleCount[b.type] && (this._numBubbleTypesOnBoard++, this.updateRowsToInsert()));
                    break;
                case 1:
                    b = c;
                    b.freeFloat ||
                        0 == b.type || (this._bubbleCount[b.type]--, this.statBubblesCleared++, this._statBubblesClearedPerType[b.type]++, 0 == this._bubbleCount[b.type] && (this._numBubbleTypesOnBoard--, this.updateRowsToInsert()));
                    break;
                default:
                    throw "" + a;
            }
        },
        calcRayRayIntersection: function(a, b, c, d, e, f, g, h) {
            var k, m;
            k = d - b;
            m = a - c;
            c = c * b - a * d;
            a = h - f;
            b = e - g;
            e = g * f - e * h;
            f = k * b - a * m;
            if (0 == f) return null;
            this._scratchIp.x = (m * e - b * c) / f;
            this._scratchIp.y = (a * c - k * e) / f;
            return this._scratchIp
        },
        __class__: wa
    };
    var y = function() {};
    y.__name__ = ["HxOverrides"];
    y.cca = function(a, b) {
        var c = a.charCodeAt(b);
        return c != c ? void 0 : c
    };
    y.substr = function(a, b, c) {
        if (null != b && 0 != b && null != c && 0 > c) return "";
        null == c && (c = a.length);
        0 > b ? (b = a.length + b, 0 > b && (b = 0)) : 0 > c && (c = a.length + c - b);
        return a.substr(b, c)
    };
    y.indexOf = function(a, b, c) {
        var d = a.length;
        0 > c && (c += d, 0 > c && (c = 0));
        for (; c < d;) {
            if (a[c] === b) return c;
            c++
        }
        return -1
    };
    y.remove = function(a, b) {
        var c = y.indexOf(a, b, 0);
        if (-1 == c) return !1;
        a.splice(c, 1);
        return !0
    };
    y.iter = function(a) {
        return {
            cur: 0,
            arr: a,
            hasNext: function() {
                return this.cur <
                    this.arr.length
            },
            next: function() {
                return this.arr[this.cur++]
            }
        }
    };
    var D = function() {};
    D.__name__ = ["I18n"];
    D.init = function(a) {
        D._language = a;
        a = s.getString("res/strings.json");
        D._strings = JSON.parse(a)
    };
    D.get = function(a) {
        return X.field(X.field(D._strings, a), D._language)
    };
    var S = function(a) {
        this.last = 0;
        var b = this;
        this._app = a;
        a = window.document;
        if (null == F(a, a.createTouch)) {
            a = function(a) {
                var c = a.clientX,
                    d = a.clientY,
                    e = S.canvas.getBoundingClientRect(),
                    c = b.getX(c, e),
                    d = b.getY(d, e);
                switch (a.type) {
                    case "mousedown":
                        S.timeLastTouch =
                            0;
                        if (null != b.onTouchStart) b.onTouchStart(c, d);
                        break;
                    case "mousemove":
                        S.timeLastTouch = 0;
                        if (null != b.onTouchMove) b.onTouchMove(c, d);
                        break;
                    case "mouseup":
                        if (S.timeLastTouch = 0, null != b.onTouchEnd) b.onTouchEnd(c, d)
                }
            };
            for (var c = 0, d = ["mousedown", "mousemove", "mouseup"]; c < d.length;) {
                var e = d[c];
                ++c;
                S.canvas.addEventListener(e, a, !1)
            }
        } else a.addEventListener("touchmove", function(a) {
            a.preventDefault()
        }, !1), S.canvas.addEventListener("touchstart", F(this, this.touchStartHandler), !1), S.canvas.addEventListener("touchmove",
            F(this, this.touchMoveHandler), !1), S.canvas.addEventListener("touchend", F(this, this.touchEndHandler), !1)
    };
    S.__name__ = ["InputSystem"];
    S.prototype = {
        touchStartHandler: function(a) {
            0 != this.last && 250 > a.timeStamp - this.last && a.preventDefault();
            this.last = a.timeStamp;
            var b = a.targetTouches[0].clientX;
            a = a.targetTouches[0].clientY;
            var c = S.canvas.getBoundingClientRect(),
                b = this.getX(b, c);
            a = this.getY(a, c);
            S.timeLastTouch = 0;
            if (null != this.onTouchStart) this.onTouchStart(b, a)
        },
        touchMoveHandler: function(a) {
            var b = a.targetTouches[0].clientX;
            a = a.targetTouches[0].clientY;
            var c = S.canvas.getBoundingClientRect();
            this._lastX = b = this.getX(b, c);
            this._lastY = a = this.getY(a, c);
            S.timeLastTouch = 0;
            if (null != this.onTouchMove) this.onTouchMove(b, a)
        },
        touchEndHandler: function(a) {
            S.timeLastTouch = 0;
            if (null != this.onTouchEnd) this.onTouchEnd(this._lastX, this._lastY)
        },
        getX: function(a, b) {
            return (a - b.left) * S.canvas.width / b.width
        },
        getY: function(a, b) {
            return (a - b.top) * S.canvas.height / b.height
        },
        __class__: S
    };
    var fa = function() {};
    fa.__name__ = ["Lambda"];
    fa.array = function(a) {
        var b = [];
        for (a = Rc(a)(); a.hasNext();) {
            var c = a.next();
            b.push(c)
        }
        return b
    };
    fa.filter = function(a, b) {
        for (var c = new Lb, d = Rc(a)(); d.hasNext();) {
            var e = d.next();
            b(e) && c.add(e)
        }
        return c
    };
    fa.indexOf = function(a, b) {
        for (var c = 0, d = Rc(a)(); d.hasNext();) {
            var e = d.next();
            if (b == e) return c;
            c++
        }
        return -1
    };
    var Lb = function() {
        this.length = 0
    };
    Lb.__name__ = ["List"];
    Lb.prototype = {
        add: function(a) {
            a = [a];
            null == this.h ? this.h = a : this.q[1] = a;
            this.q = a;
            this.length++
        },
        iterator: function() {
            return {
                h: this.h,
                hasNext: function() {
                    return null != this.h
                },
                next: function() {
                    if (null == this.h) return null;
                    var a = this.h[0];
                    this.h = this.h[1];
                    return a
                }
            }
        },
        __class__: Lb
    };
    var zc = function() {};
    zc.__name__ = ["de", "polygonal", "core", "event", "IObserver"];
    zc.prototype = {
        __class__: zc
    };
    var za = function() {
        this.__guid = 0;
        var a = window.document.getElementById("logo");
        a.parentNode.removeChild(a);
        this._app = new hb;
        k.setTickRate(30);
        k.attach(this)
    };
    za.__name__ = ["Main"];
    za.__interfaces__ = [zc];
    za.main = function() {
        window.onload = function(a) {
            za.init()
        }
    };
    za.init = function() {
        k.init();
        k.setTimeSource(new Mb);
        r.init();
        var a = function(a) {
            for (var b = a.keys(); b.hasNext();) {
                var e = b.next();
                s.set(e, a.get(e))
            }
            if (E.isWebAudioSupported())
                for (p.init(), a = a.keys(); a.hasNext();) b = a.next(), (new ba("(wav|ogg)$", "")).match(b) && p.registerSoundAsset(b, s.get(b));
            new za
        };
        try {
            E.isAndroidStockBrowser() && (E.allowXhr = !1)
        } catch (b) {}
        if (E.isWebAudioSupported()) switch (I.soundSupported = !0, E.getPlatform()[1]) {
            case 0:
            case 3:
            case 4:
            case 2:
                I.format = Aa.Ogg;
                z.load(a, null, new ba("(wav)$", ""));
                break;
            case 1:
                I.format = Aa.Wav;
                z.load(a, null, new ba("(ogg)$",
                    ""));
                break;
            default:
                I.soundSupported = !1, z.load(a, null, new ba("(ogg|wav)$", ""))
        } else I.soundSupported = !1, z.load(a, null, new ba("(ogg|wav)$", ""))
    };
    za.prototype = {
        onUpdate: function(a, b, c) {
            1 == a && (r.tick(), this._app.tick(c));
            2 == a && this._app.draw(c)
        },
        __class__: za
    };
    var Sc = function() {};
    Sc.__name__ = ["IMap"];
    Math.__name__ = ["Math"];
    var q = function() {};
    q.__name__ = ["MessageRouter"];
    q.init = function() {
        q._initialized || (q._listeners = new Z, q._initialized = !0)
    };
    q.free = function() {
        q._listeners = null;
        q._initialized = !1
    };
    q.dispatch =
        function(a, b, c) {
            q._initialized || (q._listeners = new Z, q._initialized = !0);
            var d = q._listeners.get(a);
            if (null != d)
                for (var e = 0; e < d.length;) {
                    var f = d[e];
                    ++e;
                    f(a, b, c)
                }
    };
    q.addListener = function(a, b) {
        q._initialized || (q._listeners = new Z, q._initialized = !0);
        var c = q._listeners;
        null == c.get(a) && c.set(a, []);
        if (-1 != fa.indexOf(c.get(a), b)) throw "" + a + "'!";
        c.get(a).push(b)
    };
    q.removeListener = function(a, b) {
        q._initialized || (q._listeners = new Z, q._initialized = !0);
        var c = q._listeners.get(a);
        if (null == c) throw "" + a + "'!";
        var d = fa.indexOf(c, b);
        if (-1 == d) throw "" + a + "'!";
        c.splice(d, 1)
    };
    q.removeAllListeners = function(a) {
        q._initialized || (q._listeners = new Z, q._initialized = !0);
        for (var b = q._listeners, c = b.keys(); c.hasNext();) {
            var d = c.next(),
                d = b.get(d);
            null != d && -1 != fa.indexOf(d, a) && d.splice(fa.indexOf(d, a), 1)
        }
    };
    q.getNumListeners = function() {
        q._initialized ||
            (q._listeners = new Z, q._initialized = !0);
        for (var a = q._listeners, b = 0, c = a.keys(); c.hasNext();) {
            var d = c.next(),
                d = a.get(d);
            null != d && (b += d.length)
        }
        return b
    };
    q.getNumListenersByType = function(a) {
        q._initialized || (q._listeners = new Z, q._initialized = !0);
        return null == q._listeners.get(a) ? 0 : q._listeners.get(a).length
    };
    q.getNumListenersByHandler = function(a) {
        q._initialized || (q._listeners = new Z, q._initialized = !0);
        for (var b = q._listeners, c = 0, d = b.keys(); d.hasNext();) {
            var e = d.next(),
                e = b.get(e);
            null != e && -1 != fa.indexOf(e,
                a) && c++
        }
        return c
    };
    var jb = function(a, b) {
        N.call(this, "points_view");
        this.setTexture("texture1", this.getFrameName(a));
        this._pool = b
    };
    jb.__name__ = ["PointsView"];
    jb.__super__ = N;
    jb.prototype = B(N.prototype, {
        animate: function() {
            this.mScaleX = this.mScaleY = 1;
            this.mFlags |= 1;
            1;
            this.set_alpha(1);
            this._time = 0
        },
        setPoints: function(a) {
            this.set_frame(this.getFrameName(a));
            this.centerOrigin();
            this.centerPivot()
        },
        tick: function(a) {
            N.prototype.tick.call(this, a);
            this.set_y(this.mY - 0.5);
            this._time += a;
            0.5 < this._time && (this.set_alpha(this.get_alpha() -
                0.1), 0.005 >= this.get_alpha() && (this.set_alpha(0), this.sleep()))
        },
        getFrameName: function(a) {
            switch (a) {
                case 10:
                    return "pop_score_10";
                case 25:
                    return "pop_score_25";
                case 50:
                    return "pop_score_50";
                case 100:
                    return "pop_score_100";
                case 250:
                    return "pop_score_250";
                case 500:
                    return "pop_score_500";
                case 1E3:
                    return "pop_score_1000";
                default:
                    return null
            }
        },
        sleep: function() {
            this.remove();
            this._pool.push(this)
        },
        __class__: jb
    });
    var s = function() {};
    s.__name__ = ["R"];
    s.set = function(a, b) {
        null == s._lib && (s._lib = new ca);
        s._lib.set(a,
            b)
    };
    s.get = function(a) {
        return s._lib.get(a)
    };
    s.getString = function(a) {
        return s.get(a)
    };
    s.getImageElement = function(a) {
        return s.get(a)
    };
    s.getAudioElement = function(a) {
        return s.get(a)
    };
    s.getAudioBuffer = function(a) {
        return s.get(a)
    };
    var X = function() {};
    X.__name__ = ["Reflect"];
    X.field = function(a, b) {
        try {
            return a[b]
        } catch (c) {
            return null
        }
    };
    X.callMethod = function(a, b, c) {
        return b.apply(a, c)
    };
    X.isFunction = function(a) {
        return "function" == typeof a && !(a.__name__ || a.__ename__)
    };
    var wc = function(a) {
        this._app = a;
        this._storage =
            Tc.getLocalStorage();
        null != this._storage && (null != this._storage.getItem("statistics") ? a.statistics = JSON.parse(this._storage.getItem("statistics")) : this._storage.setItem("statistics", JSON.stringify(a.statistics)), null, null != this._storage.getItem("highscoreTable") ? a.highScoreTable = JSON.parse(this._storage.getItem("highscoreTable")) : this._storage.setItem("highscoreTable", JSON.stringify(a.highScoreTable)), null, null != this._storage.getItem("mute") ? I.soundMute = "true" == this._storage.getItem("mute") : this._storage.setItem("mute",
            "true"), null)
    };
    wc.__name__ = ["SaveGame"];
    wc.prototype = {
        writeSoundMute: function() {
            null != this._storage && this._storage.setItem("mute", I.soundMute ? "true" : "false")
        },
        writeStatistics: function() {
            null != this._storage && this._storage.setItem("statistics", JSON.stringify(this._app.statistics))
        },
        writeHighscoreTable: function() {
            null != this._storage && this._storage.setItem("highscoreTable", JSON.stringify(this._app.highScoreTable))
        },
        __class__: wc
    };
    var ua = function(a, b) {
        Q.call(this, a);
        var c = this.createSprite("window", "texture0",
            "dialog_background", 35, 160);
        c.mScaleX = c.mScaleY = 2;
        c.mFlags |= 1;
        2;
        this.createTextField(new C(76, 210, 563, 446), D.get(b), 40);
        c = this.createSprite("button_ok", "texture0", "button_dialog", 91, 450);
        this.createTextLine(c.localBox(), D.get("ok"), 60, "spritefont_a");
        c = this.createSprite("button_cancel", "texture0", "button_dialog", 91, 604);
        this.createTextLine(c.localBox(), D.get("cancel"), 60, "spritefont_a")
    };
    ua.__name__ = ["ScreenConfirm"];
    ua.__super__ = Q;
    ua.prototype = B(Q.prototype, {
        onTouchStart: function(a, b) {
            this.hitTest(this.container.getChildByName("button_ok"),
                a, b) ? (I.playSound(w.Tap), this.yes()) : this.hitTest(this.container.getChildByName("button_cancel"), a, b) && (I.playSound(w.Tap), this.no())
        },
        yes: function() {},
        no: function() {},
        __class__: ua
    });
    var Wa = function(a) {
        ua.call(this, a, "quit_to_main_menu_dialog_message")
    };
    Wa.__name__ = ["ScreenConfirmAbort"];
    Wa.__super__ = ua;
    Wa.prototype = B(ua.prototype, {
        yes: function() {
            this._app.abortGame()
        },
        no: function() {
            this._app.cancelAbort()
        },
        __class__: Wa
    });
    var Va = function(a) {
        ua.call(this, a, "restart_dialog_message")
    };
    Va.__name__ = ["ScreenConfirmRestart"];
    Va.__super__ = ua;
    Va.prototype = B(ua.prototype, {
        yes: function() {
            this._app.restartGame()
        },
        no: function() {
            this._app.cancelRestart()
        },
        __class__: Va
    });
    var oa = function(a) {
        this._displayedScore = this._timeUntilNextScoreUpdate = 0;
        this._killingLineVisible = this._clickedDown = !1;
        Q.call(this, a);
        this._logic = a.logic;
        this._gameWidth = l.NATIVE_WIDTH;
        a.isDesktop ? (a = new N(null, this.container), a.setTexture("texture1", "boundary_line"), a.set_height(l.NATIVE_HEIGHT + 200), a.mY = -100, a.mFlags |= 1, -100, a = new N(null, this.container), a.setTexture("texture1",
            "boundary_line")) : (a = new N(null, this.container), a.setTexture("texture1", "boundary"), a.set_height(l.NATIVE_HEIGHT + 200), a.mX = -250, a.mFlags |= 1, -250, a.mY = -100, a.mFlags |= 1, -100, a = new N(null, this.container), a.setTexture("texture1", "boundary"));
        a.set_height(l.NATIVE_HEIGHT + 200);
        a.set_x(l.NATIVE_WIDTH);
        a.mY = -100;
        a.mFlags |= 1; - 100;
        this._cloud = new N("cloud", this.container);
        this._cloud.setTexture("texture1", 0.5 > Math.random() ? "cloud_left" : "cloud_right");
        this._shootingArmView = new Ba;
        this._shootingArmView.set_pivotX(0.5 *
            this._shootingArmView.get_width());
        this._shootingArmView.set_pivotY(this._shootingArmView.get_height());
        this._shootingArmView.set_originX(-(0.5 * this._shootingArmView.get_width()));
        this._shootingArmView.set_originY(-this._shootingArmView.get_height());
        this._shootingArmView.set_scale(0.5);
        this.container.addChild(this._shootingArmView);
        this._groupBubbles = new Ia;
        this.container.addChild(this._groupBubbles);
        this._aimView = new N("aim_view", this.container);
        this._aimView.setTexture("texture1", "aim_dot");
        this._aimView.centerOrigin();
        this._aimView.centerPivot();
        this._killingLineView = new N;
        this._killingLineView.setTexture("texture1", "killing_line");
        this._killingLineView.set_width(l.NATIVE_WIDTH);
        this.container.addChild(this._killingLineView);
        this._pauseButtonView = new N("pause_button", this.container);
        this._pauseButtonView.setTexture("texture0", "button_pause");
        this._pauseButtonView.set_x(528);
        this._pauseButtonView.set_y(840);
        this._groupScore = new Ia;
        this._groupScore.set_x(23);
        this._groupScore.set_y(865);
        this.container.addChild(this._groupScore);
        for (a = 0; 7 > a;) {
            var b = a++,
                c = new N;
            c.setTexture("texture1", "score_digit_0");
            c.set_x((6 - b) * c.get_width());
            this._groupScore.addChild(c)
        }
        this._groupUpcomingBubbles = new Ia;
        this._groupUpcomingBubbles.set_x(l.NATIVE_WIDTH / 2);
        this._groupUpcomingBubbles.set_y(825);
        this.container.addChild(this._groupUpcomingBubbles);
        for (a = 0; 6 > a;) b = a++, c = new N(null, this._groupUpcomingBubbles), c.setTexture("texture1", "bubble_empty"), c.set_width(30), c.set_height(30), c.set_y(-15), c.set_x(3 > b ? -100 + 34 * b : 2 + 34 * (b - 3));
        this.updateUpcomingBubbles(-1,
            l.NUM_BOTTOM_BUBBLES);
        this._pointsViewPool = [];
        for (a = 0; 10 > a;) a++, this._pointsViewPool.push(new jb(0, this._pointsViewPool));
        q.addListener(9, F(this, this.handleMessages));
        q.addListener(8, F(this, this.handleMessages));
        q.addListener(1, F(this, this.handleMessages));
        q.addListener(0, F(this, this.handleMessages));
        q.addListener(4, F(this, this.handleMessages));
        q.addListener(2, F(this, this.handleMessages));
        q.addListener(3, F(this, this.handleMessages));
        q.addListener(5, F(this, this.handleMessages));
        q.addListener(6, F(this,
            this.handleMessages));
        q.addListener(7, F(this, this.handleMessages));
        q.addListener(10, F(this, this.handleMessages));
        q.addListener(11, F(this, this.handleMessages));
        q.addListener(12, F(this, this.handleMessages));
        q.addListener(13, F(this, this.handleMessages));
        q.addListener(16, F(this, this.handleMessages));
        q.addListener(14, F(this, this.handleMessages));
        q.addListener(17, F(this, this.handleMessages))
    };
    oa.__name__ = ["ScreenGame"];
    oa.__super__ = Q;
    oa.prototype = B(Q.prototype, {
        free: function() {
            q.removeAllListeners(F(this,
                this.handleMessages));
            for (this.removeAllBubbleVos(); 0 < this._groupUpcomingBubbles.node.numChildren;) J.__cast(this._groupUpcomingBubbles, N).free();
            this.container.removeChild(this._groupUpcomingBubbles);
            this._logic = this._groupUpcomingBubbles = null;
            Q.prototype.free.call(this)
        },
        onShow: function() {
            this._aimView.set_alpha(0);
            this._shootingArmView.set_alpha(0);
            this._killingLineView.set_alpha(0);
            this._groupBubbles.set_y(-0.866 * this._gameWidth * this._logic._bubbleDiameterPlusSpacing);
            this.initShootingArm();
            this._groupUpcomingBubbles.set_y(function(a) {
                a =
                    a._shootingArmView;
                return a.set_y(a.mY + 60)
            }(this));
            this._killingLineView.set_y(this._groupBubbles.mY + this._logic.get_maxRowY() * this._gameWidth);
            this.updateKillingLineVisibility();
            this.setDisplayedScore(this._displayedScore, 0, !0);
            this.setGameVisibility(!0);
            this._touchStarted = !1;
            this._cloud.set_y(Math.round(100 + Math.random() * (l.NATIVE_HEIGHT - 100)));
            this._cloud.set_x(1.1 * -this._cloud.get_width())
        },
        setGameVisibility: function(a) {
            this._pauseButtonView.spatial.set_cullingMode(a ? G.CullDynamic : G.CullAlways);
            a;
            this._shootingArmView.spatial.set_cullingMode(a ? G.CullDynamic : G.CullAlways);
            a;
            this._aimView.spatial.set_cullingMode(a ? G.CullDynamic : G.CullAlways);
            a;
            this._killingLineView.spatial.set_cullingMode(a ? G.CullDynamic : G.CullAlways);
            a;
            this._groupUpcomingBubbles.spatial.set_cullingMode(a ? G.CullDynamic : G.CullAlways);
            a;
            this._groupScore.spatial.set_cullingMode(a ? G.CullDynamic : G.CullAlways);
            a
        },
        onTick: function(a) {
            this._logic.tick(a);
            var b = this._cloud;
            b.set_x(b.mX + 0.25);
            this._cloud.mX > 1.1 * l.NATIVE_WIDTH && (this._cloud.set_y(Math.round(100 +
                Math.random() * (l.NATIVE_HEIGHT - 200))), this._cloud.set_frame(0.5 > Math.random() ? "cloud_right" : "cloud_left"), this._cloud.set_x(1.1 * -this._cloud.get_width()));
            Nb.tick(this.container, a)
        },
        onDraw: function(a) {
            Q.prototype.onDraw.call(this, a);
            this.container.applyChanges();
            this.container.spatial.updateGeometricState(0)
        },
        createBubbleView: function(a) {
            var b = new ya(a);
            this._groupBubbles.addChild(b);
            var c = b.get_size();
            b.set_x(a._posX * c);
            b.set_y(a._posY * c);
            b.set_size(2 * a.radius * this._gameWidth * l.VISUAL_BUBBLE_RADIUS_SCALE);
            b.bakeDownScale();
            b.centerPivot();
            b.centerOrigin();
            return b
        },
        removeBubbleVo: function(a) {
            a.view.free()
        },
        removeAllBubbleVos: function() {
            for (var a = [], b = 0, c = this._groupBubbles.node.numChildren; b < c;) {
                var d = b++,
                    d = this._groupBubbles.getChildAt(d);
                J.__instanceof(d, ya) && a.push(d)
            }
            for (b = 0; b < a.length;) c = a[b], ++b, c.free()
        },
        burstBubble: function(a, b, c) {
            !1 == b.enabled && (I.playSound(w.Burst), a % l.BONUS_SOUND_EVERY_BUBBLE == l.BONUS_SOUND_EVERY_BUBBLE - 1 && I.playSound(w.Bonus), c.playBurstAnimation(), b.freeFloat || (a = this._logic.getBubbleBurstPoints(a),
                b = 0 == this._pointsViewPool.length ? new jb(a, this._pointsViewPool) : this._pointsViewPool.pop(), b.setPoints(a), b.set_x(c.mX + this._groupBubbles.mX), b.set_y(c.mY + this._groupBubbles.mY), this.container.addChild(b), b.animate()))
        },
        updateBubble: function(a, b, c) {
            var d = this,
                e = a.view;
            if (null == e)
                if (0 == b) e = this.createBubbleView(a);
                else return;
                else if (0 == b || 6 == b) this.removeBubbleVo(a), e = this.createBubbleView(a);
            switch (b) {
                case 9:
                case 8:
                    var f = c.index;
                    new $a(function() {
                            d.burstBubble(f, a, e)
                        }, 9 == b ? l.BUBBLE_BURST_INITIAL_DELAY +
                        f * l.BUBBLE_BURST_PER_BUBBLE_DELAY : l.BUBBLE_DROP_INITIAL_DELAY + f * l.BUBBLE_DROP_PER_BUBBLE_DELAY);
                    break;
                case 1:
                    break;
                case 0:
                    e.spatial.set_cullingMode(G.CullDynamic);
                    !0;
                    e.set_x(a._posX * this._gameWidth);
                    e.set_y(a._posY * this._gameWidth);
                    e.playAppearAnimation();
                    break;
                case 4:
                case 2:
                    a.freeFloat ? (e.set_x(a._posX * this._gameWidth), e.set_y(a._posY * this._gameWidth)) : (e.tween(H.X, a._posX * this._gameWidth, l.POSITION_CHANGE_TWEEN_DURATION), e.tween(H.Y, a._posY * this._gameWidth, l.POSITION_CHANGE_TWEEN_DURATION));
                    break;
                case 3:
                    I.playSound(w.Shoot);
                    e.playIdleAnimation();
                    break;
                case 5:
                    I.playSound(w.Bounce);
                    break;
                case 7:
                    b = c.distance;
                    var g = c.dirX,
                        h = c.dirY,
                        g = a._posX + l.BUBBLE_TOUCH_MAX_BOUNCE_AMOUNT * J.__cast(c.amount, Ac) * a.radius * g / Math.pow(1 + J.__cast(c.distance, Ca), l.BUBBLE_TOUCH_DISTANCE_FALLOFF);
                    c = a._posY + l.BUBBLE_TOUCH_MAX_BOUNCE_AMOUNT * J.__cast(c.amount, Ac) * a.radius * h / Math.pow(1 + J.__cast(c.distance, Ca), l.BUBBLE_TOUCH_DISTANCE_FALLOFF);
                    var h = l.BUBBLE_TOUCH_BOUNCE_IN_TIME * (1 + b),
                        k = l.BUBBLE_TOUCH_BOUNCE_OUT_TIME * (1 + b);
                    e.tween(H.X, g * this._gameWidth, h, null, function() {
                        e.tween(H.X, a._posX * d._gameWidth, k)
                    });
                    e.tween(H.Y, c * this._gameWidth, h, null, function() {
                        e.tween(H.Y, a._posY * d._gameWidth, k)
                    });
                    break;
                case 6:
                    b = c.fromX;
                    c = c.fromY;
                    e.spatial.set_cullingMode(G.CullDynamic);
                    !0;
                    e.set_x(b * this._gameWidth);
                    e.set_y(c * this._gameWidth);
                    e.tween(H.X, a._posX * this._gameWidth, l.BUBBLE_SNAP_TWEEN_DURATION);
                    e.tween(H.Y, a._posY * this._gameWidth, l.BUBBLE_SNAP_TWEEN_DURATION);
                    e.playSnapAnimation();
                    I.playSound(w.Snap);
                    break;
                default:
                    throw "" +
                        b;
            }
        },
        updateUpcomingBubbles: function(a, b) {
            var c = this._groupUpcomingBubbles.getChildAt(0); - 1 != a ? c.set_frame(this.getBubbleFrameId(a)) : c.set_frame("bubble_empty");
            for (var c = 0, d = l.NUM_BOTTOM_BUBBLES; c < d;) {
                var e = c++,
                    f = this._groupUpcomingBubbles.getChildAt(e);
                e < b ? (f.spatial.set_cullingMode(G.CullDynamic), !0) : (f.spatial.set_cullingMode(G.CullAlways), !1)
            }
        },
        getBubbleFrameId: function(a) {
            switch (a) {
                case 0:
                    return null;
                case 1:
                    return "bubble1";
                case 2:
                    return "bubble2";
                case 3:
                    return "bubble3";
                case 4:
                    return "bubble4";
                case 5:
                    return "bubble5";
                case 6:
                    return "bubble6";
                default:
                    throw "" + a;
            }
        },
        initShootingArm: function() {
            this._logic.setShootingArmRow(((0.8 * l.NATIVE_HEIGHT - this._groupBubbles.mY) / this._gameWidth - 0.5 * this._logic._bubbleDiameterPlusSpacing) / (0.866 * this._logic._bubbleDiameterPlusSpacing) + 1);
            this.setShootingArm(0)
        },
        setShootingArm: function(a) {
            this._shootingArmView.set_x(this._groupBubbles.mX + this._gameWidth / 2);
            this._shootingArmView.set_y(this._groupBubbles.mY +
                this._logic.get_shootingArmY() * this._gameWidth);
            this._shootingArmView.set_rotation(a);
            this._shootingArmView.applyChanges();
            this._logic._shootingArmAngle = a;
            a
        },
        updateKillingLineVisibility: function() {
            var a = !1;
            this._logic._freeRows <= this._logic._numRowsToInsert + l.MIN_FREE_ROWS_FOR_KILLING_LINE && (a = !0);
            this._killingLineVisible != a && (a ? (this._killingLineView.set_alpha(0), this._killingLineView.tween(H.Alpha, 0.5, 1), this._killingLineVisible = !0) : (this._killingLineView.tween(H.Alpha, 0, 1), this._killingLineVisible = !1))
        },
        setDisplayedScore: function(a, b, c) {
            null == c && (c = !1);
            null == b && (b = 0);
            this._displayedScore = a;
            9999999 < a && (a = 9999999);
            var d = u.string(a).split("");
            d.reverse();
            a = u.parseInt(d[0]);
            var e;
            e = 1 < d.length ? u.parseInt(d[1]) : 0;
            var f;
            f = 2 < d.length ? u.parseInt(d[2]) : 0;
            var g;
            g = 3 < d.length ? u.parseInt(d[3]) : 0;
            var h;
            h = 4 < d.length ? u.parseInt(d[4]) : 0;
            var k;
            k = 5 < d.length ? u.parseInt(d[5]) : 0;
            d = 6 < d.length ? u.parseInt(d[6]) : 0;
            this._timeUntilNextScoreUpdate = l.SCORE_UPDATE_INITIAL_DELAY + l.BUBBLE_BURST_INITIAL_DELAY + b * l.BUBBLE_BURST_PER_BUBBLE_DELAY;
            b = this._groupScore.getChildren([]);
            this.updateScoreDigit(b[0], a, c ? 0 : this._timeUntilNextScoreUpdate + 0 * l.SCORE_UPDATE_PER_DIGIT_DELAY);
            this.updateScoreDigit(b[1], e, c ? 0 : this._timeUntilNextScoreUpdate + l.SCORE_UPDATE_PER_DIGIT_DELAY);
            this.updateScoreDigit(b[2], f, c ? 0 : this._timeUntilNextScoreUpdate + 2 * l.SCORE_UPDATE_PER_DIGIT_DELAY);
            this.updateScoreDigit(b[3], g, c ? 0 : this._timeUntilNextScoreUpdate + 3 * l.SCORE_UPDATE_PER_DIGIT_DELAY);
            this.updateScoreDigit(b[4], h, c ? 0 : this._timeUntilNextScoreUpdate + 4 * l.SCORE_UPDATE_PER_DIGIT_DELAY);
            this.updateScoreDigit(b[5], k, c ? 0 : this._timeUntilNextScoreUpdate + 5 * l.SCORE_UPDATE_PER_DIGIT_DELAY);
            this.updateScoreDigit(b[6], d, c ? 0 : this._timeUntilNextScoreUpdate + 6 * l.SCORE_UPDATE_PER_DIGIT_DELAY)
        },
        updateScoreDigit: function(a, b, c) {
            var d = function() {
                a.set_frame(function(a) {
                    switch (b) {
                        case 0:
                            a = "score_digit_0";
                            break;
                        case 1:
                            a = "score_digit_1";
                            break;
                        case 2:
                            a = "score_digit_2";
                            break;
                        case 3:
                            a = "score_digit_3";
                            break;
                        case 4:
                            a = "score_digit_4";
                            break;
                        case 5:
                            a = "score_digit_5";
                            break;
                        case 6:
                            a = "score_digit_6";
                            break;
                        case 7:
                            a =
                                "score_digit_7";
                            break;
                        case 8:
                            a = "score_digit_8";
                            break;
                        case 9:
                            a = "score_digit_9";
                            break;
                        default:
                            a = null
                    }
                    return a
                }(this));
                a.mScaleY = 0.1;
                a.mFlags |= 1;
                0.1;
                a.tween(H.ScaleY, 1, l.SCORE_UPDATE_TWEEN_TIME)
            };
            0 < c ? new $a(d, c) : d()
        },
        processGameStart: function() {
            this._groupUpcomingBubbles.getChildAt(0).set_visible(!0);
            this.setDisplayedScore(this._logic._score, 0, !0)
        },
        processGameOver: function() {
            var a = this,
                b;
            4 == this._logic._status ? (I.playSound(w.GameOverSuccess), b = this._timeUntilNextScoreUpdate) : (I.playSound(w.GameOverFailure),
                b = 1);
            this.setGameVisibility(!1);
            new $a(function() {
                a._app.gameOver()
            }, b + l.DEFAULT_SCREEN_FADE_OUT_TIME)
        },
        handleMessages: function(a, b, c) {
            switch (a) {
                case 11:
                    this.processGameStart();
                    break;
                case 12:
                    this.processGameOver();
                    break;
                case 13:
                    this.removeAllBubbleVos();
                    break;
                case 16:
                    this.setDisplayedScore(J.__cast(b.score, Ca), J.__cast(b.numBursted, Ca));
                    break;
                case 14:
                    I.playSound(w.NewRow);
                    break;
                case 17:
                    this.updateUpcomingBubbles(J.__cast(b.upcoming, Ca), J.__cast(b.left, Ca));
                    this.updateKillingLineVisibility();
                    break;
                case 9:
                case 8:
                case 1:
                case 0:
                case 2:
                case 4:
                case 3:
                case 5:
                case 6:
                case 7:
                    this.updateBubble(c, a, b);
                    break;
                default:
                    throw "" + a;
            }
        },
        focusAimingDot: function() {
            if (2 == this._logic._status) {
                var a = l.AIM_DOT_BASE_SIZE * this._gameWidth;
                this._aimView.set_scale(a);
                this._aimView.tween(H.Scale, 0.75 * a, 0.5);
                this._aimView.set_alpha(0);
                this._aimView.tween(H.Alpha, 1, 0.5)
            }
        },
        adjustCannonToMousePosition: function(a, b) {
            if (2 == this._logic._status) {
                var c = 1.2 * (a - this._shootingArmView.mX),
                    d = Math.min(-0.015 *
                        this._gameWidth, b - this._shootingArmView.mY - 0.2 * this._gameWidth);
                c > 0.5 * this._gameWidth && (c = 0.5 * this._gameWidth);
                c < -0.5 * this._gameWidth && (c = -0.5 * this._gameWidth);
                var e = -1 * Math.atan(c / d) * (180 / Math.PI);
                this.setShootingArm(e);
                this._shootingArmView._state = 1;
                this._aimView.set_x(this._shootingArmView.mX + c);
                this._aimView.set_y(this._shootingArmView.mY + d)
            }
        },
        shootCannonFromPosition: function(a, b) {
            if (2 == this._logic._status) {
                var c = l.AIM_DOT_BASE_SIZE * this._gameWidth;
                this._shootingArmView._state = 2;
                this._aimView.tween(H.Scale,
                    0.5 * c, 0.3);
                this._aimView.tween(H.Alpha, 0, 0.3);
                this._logic.shoot()
            }
        },
        onTouchStart: function(a, b) {
            var c = this._pauseButtonView.localBox(this._scratchAABB);
            a >= c.minX && a <= c.maxX && b >= c.minY && b <= c.maxY ? (I.playSound(w.Tap), this._app.pauseGame()) : (this._touchStarted = !0, this.focusAimingDot(), this.onTouchMove(a, b))
        },
        onTouchMove: function(a, b) {
            this.adjustCannonToMousePosition(a, b)
        },
        onTouchEnd: function(a, b) {
            this._touchStarted && (this._touchStarted = !1, this.shootCannonFromPosition(a, b))
        },
        __class__: oa
    });
    var Xa = function(a) {
        Q.call(this,
            a)
    };
    Xa.__name__ = ["ScreenGameOver"];
    Xa.__super__ = Q;
    Xa.prototype = B(Q.prototype, {
        onShow: function() {
            var a = this._app.gameResult;
            this.createTitle(D.get(a.gameWon ? "results_game_won" : "results_game_lost"));
            var b = Math.floor(a.time),
                c = Math.floor(b / 3600),
                b = b - 3600 * c,
                d = Math.floor(b / 60),
                b = b - 60 * d,
                b = (0 < c ? c + ":" : "") + (10 > d ? "0" : "") + d + ":" + (10 > b ? "0" : "") + b;
            a.newHighscore && this.createTextLine(new C(0, 183, l.NATIVE_WIDTH, 243), D.get("results_new_highscore"), 40, "spritefont_d");
            this.createTextLine(new C(0, 213, l.NATIVE_WIDTH, 373),
                kb.groupDigits(a.score, D.get("thousands_separator")), 80, "spritefont_b", 0);
            this.createTextLine(new C(54, 406, 464, 466), D.get("results_bubbles_cleared"), 40, "spritefont_b", -1, 0.5);
            this.createTextLine(new C(54, 466, 464, 526), D.get("results_balls_shot"), 40, "spritefont_b", -1, 0.5);
            this.createTextLine(new C(54, 526, 464, 586), D.get("results_hit_ratio"), 40, "spritefont_b", -1, 0.5);
            this.createTextLine(new C(54, 586, 464, 646), D.get("results_largest_group"), 40, "spritefont_b", -1, 0.5);
            this.createTextLine(new C(54, 646, 464,
                706), D.get("results_play_time"), 40, "spritefont_b", -1, 0.5);
            this.createTextLine(new C(382, 406, 582, 464), u.string(a.numBubblesCleared), 40, "spritefont_b", 1);
            this.createTextLine(new C(382, 466, 582, 524), u.string(a.numBallsShot), 40, "spritefont_b", 1);
            this.createTextLine(new C(382, 526, 582, 584), u.string(a.hitRatioPercent) + "%", 40, "spritefont_b", 1);
            this.createTextLine(new C(382, 586, 582, 644), u.string(a.largestGroup), 40, "spritefont_b", 1);
            this.createTextLine(new C(382, 646, 582, 704), b, 40, "spritefont_b", 1);
            a = this.createSprite("button_continue",
                "texture0", "button_default", 36, 772);
            this.createTextLine(a.localBox(), D.get("continue"), 60, "spritefont_a")
        },
        onHide: function() {
            Q.prototype.onHide.call(this);
            this.container.freeChildren()
        },
        onTouchStart: function(a, b) {
            this.hitTest(this.container.getChildByName("button_continue"), a, b) && (I.playSound(w.Tap), this._app.showMainMenu())
        },
        __class__: Xa
    });
    var Za = function(a) {
        Q.call(this, a)
    };
    Za.__name__ = ["ScreenHighscores"];
    Za.__super__ = Q;
    Za.prototype = B(Q.prototype, {
        onShow: function() {
            this.createTitle(D.get("highscores_title"));
            for (var a = this._app.highScoreTable, b = 228, c = 1; 7 > c;) {
                var d = c++;
                this.createTextLine(new C(56, b, 146, b + 58), "" + d, 40, "spritefont_b", -1);
                this.createTextLine(new C(156, b, 401, b + 58), X.field(a[d - 1], "name"), 40, "spritefont_b", -1, 0.5);
                this.createTextLine(new C(403, b, 583, b + 58), kb.groupDigits(X.field(a[d - 1], "score"), D.get("thousands_separator")), 40, "spritefont_b", 1);
                b += 90
            }
            this.createSprite("button_back", "texture0", "button_back", 37, 806)
        },
        onHide: function() {
            this.container.freeChildren()
        },
        onTouchStart: function(a, b) {
            this.hitTest(this.container.getChildByName("button_back"),
                a, b) && (I.playSound(w.Tap), this._app.showMainMenu())
        },
        __class__: Za
    });
    var xa = function(a) {
        Q.call(this, a);
        this.createSprite("bubbles", "texture0", "title_bubbles", 160, 266);
        this.createSprite("logo", "texture0", "game_logo", 55, 20);
        a = this.createSprite("button_start", "texture0", "button_default", 25, 467);
        this.createTextLine(a.localBox(), D.get("main_menu_play"), 60, "spritefont_a");
        // this.createSprite("more_games", "texture0", "more_games_graphic", 123, 616);
        // a = this.createSprite("more_games_button", "texture0", "button_more_games",
        //     140, 630);
        // this.createTextLine(a.localBox(), D.get("main_menu_more_games"), 30, "spritefont_a");
        a = this.createSprite("button_statistics", "texture0", "button_statistics", 0, 811);
        a.set_x((l.NATIVE_WIDTH - a.get_width()) / 2);
        a.applyChanges();
        a = a.localBox().clone();
        a.minX += 25;
        a.maxX += 25;
        this.createTextLine(a, D.get("main_menu_statistics"), 30, "spritefont_e", 0, 40);
        // a = this.createSprite("legal_notes", "texture0", "legal_note", 0, 900);
        // a.set_x((l.NATIVE_WIDTH - a.get_width()) / 2)
    };
    xa.__name__ = ["ScreenMainMenu"];
    xa.__super__ =
        Q;
    xa.prototype = B(Q.prototype, {
        onTouchStart: function(a, b) {
            this.hitTest(this.container.getChildByName("button_start"), a, b) ? (I.playSound(w.Tap), this._app.startGame()) : this.hitTest(this.container.getChildByName("button_statistics"), a, b) && (I.playSound(w.Tap), this._app.showStatistics())
        },
        __class__: xa
    });
    var ta = function(a) {
        Q.call(this, a);
        this.createTitle(D.get("paused"));
        a = this.createSprite("resume_button",
            "texture0", "button_default", 36, 261);
        this.createTextLine(a.localBox(), D.get("resume"), 60, "spritefont_a");
        a = this.createSprite("restart_button", "texture0", "button_default", 36, 415);
        this.createTextLine(a.localBox(), D.get("restart"), 60, "spritefont_a");
        a = this.createSprite("main_menu_button", "texture0", "button_default", 36, 569);
        this.createTextLine(a.localBox(), D.get("main_menu"), 60, "spritefont_a");
        I.soundSupported && this.createSprite("sound_button", "texture0", "button_audio", 278, 728, this.container)
    };
    ta.__name__ = ["ScreenPause"];
    ta.__super__ = Q;
    ta.prototype = B(Q.prototype, {
        onShow: function() {
            I.soundSupported && this.container.getChildByName("sound_button").set_alpha(I.soundMute ? 0.5 : 1)
        },
        onTouchStart: function(a, b) {
            this.hitTest(this.container.getChildByName("resume_button"), a, b) ? (I.playSound(w.Tap), this._app.resumeGame()) : this.hitTest(this.container.getChildByName("restart_button"), a, b) ? (I.playSound(w.Tap), this._app.confirmRestart()) : this.hitTest(this.container.getChildByName("main_menu_button"), a, b) ? (I.playSound(w.Tap),
                this._app.confirmAbort()) : this.hitTest(this.container.getChildByName("sound_button"), a, b) && (I.soundMute = !I.soundMute, this.container.getChildByName("sound_button").set_alpha(I.soundMute ? 0.5 : 1), I.soundMute || I.playSound(w.Tap), this._app.saveGame.writeSoundMute())
        },
        __class__: ta
    });
    var Ya = function(a) {
        Q.call(this, a)
    };
    Ya.__name__ = ["ScreenStatistics"];
    Ya.__super__ = Q;
    Ya.prototype = B(Q.prototype, {
        onShow: function() {
            var a = this._app.statistics;
            this.createTitle(D.get("statistics_title"));
            this.createTextLine(new C(53,
                208, 463, 266), D.get("statistics_bubbles_cleared"), 40, "spritefont_b", -1, 0.5);
            this.createTextLine(new C(53, 268, 463, 326), D.get("statistics_games_played"), 40, "spritefont_b", -1, 0.5);
            this.createTextLine(new C(53, 328, 463, 386), D.get("statistics_games_won"), 40, "spritefont_b", -1, 0.5);
            this.createTextLine(new C(53, 388, 463, 446), D.get("statistics_fewest_balls"), 40, "spritefont_b", -1, 0.5);
            this.createTextLine(new C(53, 448, 463, 506), D.get("statistics_play_time"), 40, "spritefont_b", -1, 0.5);
            this.createTextLine(new C(382,
                208, 582, 266), u.string(a.numBubblesCleared), 40, "spritefont_b", 1);
            this.createTextLine(new C(382, 268, 582, 326), u.string(a.numGamesPlayed), 40, "spritefont_b", 1);
            this.createTextLine(new C(382, 328, 582, 386), u.string(a.numGamesWon), 40, "spritefont_b", 1);
            this.createTextLine(new C(382, 388, 582, 446), -1 == a.numFewestShots ? "-" : u.string(a.numFewestShots), 40, "spritefont_b", 1);
            this.createTextLine(new C(382, 448, 582, 506), kb.toMMSS(a.timePlayed), 40, "spritefont_b", 1);
            this.createSprite("bubble_yellow", "texture1", "bubble3",
                56, 564);
            this.createSprite("bubble_blue", "texture1", "bubble1", 56, 623);
            this.createSprite("bubble_green", "texture1", "bubble2", 56, 683);
            this.createSprite("bubble_red", "texture1", "bubble6", 406, 564);
            this.createSprite("bubble_turquoise", "texture1", "bubble4", 406, 623);
            this.createSprite("bubble_purple", "texture1", "bubble5", 406, 683);
            this.createTextLine(new C(128, 544, 274, 602), u.string(a.numYellowBubblesCleared), 40, "spritefont_b", -1);
            this.createTextLine(new C(128, 603, 274, 661), u.string(a.numBlueBubblesCleared),
                40, "spritefont_b", -1);
            this.createTextLine(new C(128, 663, 274, 721), u.string(a.numGreenBubblesCleared), 40, "spritefont_b", -1);
            this.createTextLine(new C(480, 544, 626, 602), u.string(a.numRedBubblesCleared), 40, "spritefont_b", -1);
            this.createTextLine(new C(480, 603, 626, 661), u.string(a.numTurquoiseBubblesCleared), 40, "spritefont_b", -1);
            this.createTextLine(new C(480, 663, 626, 721), u.string(a.numPurpleBubblesCleared), 40, "spritefont_b", -1);
            for (a = this.container.iterator(); a.hasNext();) {
                var b = a.next();
                (new ba("bubble_",
                    "")).match(b.spatial.name) && b.set_size(50)
            }
            this.createSprite("button_back", "texture0", "button_back", 37, 806)
        },
        onHide: function() {
            this.container.freeChildren()
        },
        onTouchStart: function(a, b) {
            this.hitTest(this.container.getChildByName("button_back"), a, b) && this._app.showMainMenu()
        },
        __class__: Ya
    });
    var Ba = function() {
        N.call(this);
        this.setTexture("texture1", "shooting_arm");
        this._alpha = this._state = 0
    };
    Ba.__name__ = ["ShootingArmView"];
    Ba.__super__ = N;
    Ba.prototype = B(N.prototype, {
        fadeIn: function() {
            this._state = 1
        },
        fadeOut: function() {
            this._state =
                2
        },
        tick: function(a) {
            N.prototype.tick.call(this, a);
            switch (this._state) {
                case 1:
                    this._alpha += 0.1;
                    break;
                case 2:
                    this._alpha -= 0.1
            }
            this._alpha = Y.fclamp(this._alpha, 0, 1);
            this.set_alpha(this._alpha)
        },
        __class__: Ba
    });
    var Aa = {
        __ename__: !0,
        __constructs__: ["Ogg", "Wav"],
        Ogg: ["Ogg", 0]
    };
    Aa.Ogg.toString = n;
    Aa.Ogg.__enum__ = Aa;
    Aa.Wav = ["Wav", 1];
    Aa.Wav.toString = n;
    Aa.Wav.__enum__ = Aa;
    var w = {
        __ename__: !0,
        __constructs__: "Bonus Bounce Burst GameOverFailure GameOverSuccess NewRow Shoot Snap Start Tap".split(" "),
        Bonus: ["Bonus",
            0
        ]
    };
    w.Bonus.toString = n;
    w.Bonus.__enum__ = w;
    w.Bounce = ["Bounce", 1];
    w.Bounce.toString = n;
    w.Bounce.__enum__ = w;
    w.Burst = ["Burst", 2];
    w.Burst.toString = n;
    w.Burst.__enum__ = w;
    w.GameOverFailure = ["GameOverFailure", 3];
    w.GameOverFailure.toString = n;
    w.GameOverFailure.__enum__ = w;
    w.GameOverSuccess = ["GameOverSuccess", 4];
    w.GameOverSuccess.toString = n;
    w.GameOverSuccess.__enum__ = w;
    w.NewRow = ["NewRow", 5];
    w.NewRow.toString = n;
    w.NewRow.__enum__ = w;
    w.Shoot = ["Shoot", 6];
    w.Shoot.toString = n;
    w.Shoot.__enum__ = w;
    w.Snap = ["Snap", 7];
    w.Snap.toString =
        n;
    w.Snap.__enum__ = w;
    w.Start = ["Start", 8];
    w.Start.toString = n;
    w.Start.__enum__ = w;
    w.Tap = ["Tap", 9];
    w.Tap.toString = n;
    w.Tap.__enum__ = w;
    var I = function() {};
    I.__name__ = ["SoundManager"];
    I.playSound = function(a) {
        if (null != I.format && !1 != I.soundSupported && !I.soundMute) {
            var b;
            switch (I.format[1]) {
                case 0:
                    switch (a[1]) {
                        case 0:
                            b = "res/sounds/ogg/bonus.ogg";
                            break;
                        case 1:
                            b = "res/sounds/ogg/bounce.ogg";
                            break;
                        case 2:
                            b = "res/sounds/ogg/burst.ogg";
                            break;
                        case 3:
                            b = "res/sounds/ogg/game_over_failure.ogg";
                            break;
                        case 4:
                            b = "res/sounds/ogg/game_over_success.ogg";
                            break;
                        case 5:
                            b = "res/sounds/ogg/new_row.ogg";
                            break;
                        case 6:
                            b = "res/sounds/ogg/shoot.ogg";
                            break;
                        case 7:
                            b = "res/sounds/ogg/snap.ogg";
                            break;
                        case 8:
                            b = "res/sounds/ogg/start.ogg";
                            break;
                        case 9:
                            b = "res/sounds/ogg/tap.ogg"
                    }
                    break;
                case 1:
                    switch (a[1]) {
                        case 0:
                            b = "res/sounds/wav/bonus.wav";
                            break;
                        case 1:
                            b = "res/sounds/wav/bounce.wav";
                            break;
                        case 2:
                            b = "res/sounds/wav/burst.wav";
                            break;
                        case 3:
                            b = "res/sounds/wav/game_over_failure.wav";
                            break;
                        case 4:
                            b = "res/sounds/wav/game_over_success.wav";
                            break;
                        case 5:
                            b = "res/sounds/wav/new_row.wav";
                            break;
                        case 6:
                            b = "res/sounds/wav/shoot.wav";
                            break;
                        case 7:
                            b = "res/sounds/wav/snap.wav";
                            break;
                        case 8:
                            b = "res/sounds/wav/start.wav";
                            break;
                        case 9:
                            b = "res/sounds/wav/tap.wav"
                    }
            }
            p.soundAssetExists(b) && p.play(b)
        }
    };
    var u = function() {};
    u.__name__ = ["Std"];
    u.string = function(a) {
        return J.__string_rec(a, "")
    };
    u["int"] = function(a) {
        return a | 0
    };
    u.parseInt = function(a) {
        var b = parseInt(a, 10);
        0 != b || 120 != y.cca(a, 1) && 88 != y.cca(a, 1) || (b = parseInt(a));
        return isNaN(b) ? null : b
    };
    u.parseFloat = function(a) {
        return parseFloat(a)
    };
    var ab = function() {
        this.b =
            ""
    };
    ab.__name__ = ["StringBuf"];
    ab.prototype = {
        add: function(a) {
            this.b += u.string(a)
        },
        addSub: function(a, b, c) {
            this.b = null == c ? this.b + y.substr(a, b, null) : this.b + y.substr(a, b, c)
        },
        __class__: ab
    };
    var Uc = function() {};
    Uc.__name__ = ["StringTools"];
    Uc.fastCodeAt = function(a, b) {
        return a.charCodeAt(b)
    };
    var W = function() {};
    W.__name__ = ["Type"];
    W.getClass = function(a) {
        return null == a ? null : a instanceof Array && null == a.__enum__ ? Array : a.__class__
    };
    W.getClassName = function(a) {
        return a.__name__.join(".")
    };
    W.createInstance = function(a,
        b) {
        switch (b.length) {
            case 0:
                return new a;
            case 1:
                return new a(b[0]);
            case 2:
                return new a(b[0], b[1]);
            case 3:
                return new a(b[0], b[1], b[2]);
            case 4:
                return new a(b[0], b[1], b[2], b[3]);
            case 5:
                return new a(b[0], b[1], b[2], b[3], b[4]);
            case 6:
                return new a(b[0], b[1], b[2], b[3], b[4], b[5]);
            case 7:
                return new a(b[0], b[1], b[2], b[3], b[4], b[5], b[6]);
            case 8:
                return new a(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7]);
            default:
                throw "";
        }
    };
    W.createEnum = function(a, b, c) {
        var d = X.field(a, b);
        if (null == d) throw "" +
            b;
        if (X.isFunction(d)) {
            if (null == c) throw "" + b + " need parameters";
            return d.apply(a, c)
        }
        if (null != c && 0 != c.length) throw "" + b + " does not need parameters";
        return d
    };
    W.createEnumIndex = function(a, b, c) {
        var d = a.__constructs__[b];
        if (null == d) throw b + " is not a valid enum constructor index";
        return W.createEnum(a, d, c)
    };
    W.getEnumConstructs = function(a) {
        return a.__constructs__.slice()
    };
    var Kb = function(a, b) {
        this.x = a;
        this.y = b
    };
    Kb.__name__ = ["Vec"];
    Kb.prototype = {
        __class__: Kb
    };
    var A = function() {};
    A.__name__ = ["Xml"];
    A.parse = function(a) {
        return Da.parse(a)
    };
    A.createElement = function(a) {
        var b = new A;
        b.nodeType = A.Element;
        b._children = [];
        b._attributes = new ca;
        b.set_nodeName(a);
        return b
    };
    A.createPCData = function(a) {
        var b = new A;
        b.nodeType = A.PCData;
        b.set_nodeValue(a);
        return b
    };
    A.createCData = function(a) {
        var b = new A;
        b.nodeType = A.CData;
        b.set_nodeValue(a);
        return b
    };
    A.createComment = function(a) {
        var b = new A;
        b.nodeType = A.Comment;
        b.set_nodeValue(a);
        return b
    };
    A.createDocType = function(a) {
        var b = new A;
        b.nodeType = A.DocType;
        b.set_nodeValue(a);
        return b
    };
    A.createProcessingInstruction = function(a) {
        var b = new A;
        b.nodeType = A.ProcessingInstruction;
        b.set_nodeValue(a);
        return b
    };
    A.createDocument = function() {
        var a = new A;
        a.nodeType = A.Document;
        a._children = [];
        return a
    };
    A.prototype = {
        get_nodeName: function() {
            if (this.nodeType != A.Element) throw "";
            return this._nodeName
        },
        set_nodeName: function(a) {
            if (this.nodeType != A.Element) throw "";
            return this._nodeName = a
        },
        set_nodeValue: function(a) {
            if (this.nodeType == A.Element || this.nodeType == A.Document) throw "";
            return this._nodeValue = a
        },
        get: function(a) {
            if (this.nodeType != A.Element) throw "";
            return this._attributes.get(a)
        },
        set: function(a, b) {
            if (this.nodeType != A.Element) throw "";
            this._attributes.set(a, b)
        },
        exists: function(a) {
            if (this.nodeType != A.Element) throw "";
            return this._attributes.exists(a)
        },
        elementsNamed: function(a) {
            if (null == this._children) throw "";
            return {
                cur: 0,
                x: this._children,
                hasNext: function() {
                    for (var b = this.cur, c = this.x.length; b < c;) {
                        var d = this.x[b];
                        if (d.nodeType ==
                            A.Element && d._nodeName == a) break;
                        b++
                    }
                    this.cur = b;
                    return b < c
                },
                next: function() {
                    for (var b = this.cur, c = this.x.length; b < c;) {
                        var d = this.x[b];
                        b++;
                        if (d.nodeType == A.Element && d._nodeName == a) return this.cur = b, d
                    }
                    return null
                }
            }
        },
        firstElement: function() {
            if (null == this._children) throw "";
            for (var a = 0, b = this._children.length; a < b;) {
                var c = this._children[a];
                if (c.nodeType == A.Element) return c;
                a++
            }
            return null
        },
        addChild: function(a) {
            if (null == this._children) throw "";
            null != a._parent && y.remove(a._parent._children,
                a);
            a._parent = this;
            this._children.push(a)
        },
        __class__: A
    };
    var m = function() {};
    m.__name__ = ["de", "polygonal", "Printf"];
    m.init = function() {
        m.dataTypeMap = m.makeDataTypeMap();
        m.formatIntFuncHash = new Z;
        m.formatIntFuncHash.set(1, m.formatSignedDecimal);
        m.formatIntFuncHash.set(2, m.formatUnsignedDecimal);
        m.formatIntFuncHash.set(0, m.formatCharacter);
        m.formatIntFuncHash.set(4, m.formatHexadecimal);
        m.formatIntFuncHash.set(3, m.formatOctal);
        m.formatIntFuncHash.set(5, m.formatBinary);
        m.formatFloatFuncHash = new Z;
        m.formatFloatFuncHash.set(0,
            m.formatNormalFloat);
        m.formatFloatFuncHash.set(1, m.formatScientific);
        m.formatFloatFuncHash.set(2, m.formatNaturalFloat);
        m.formatStringFuncHash = new Z;
        m.formatStringFuncHash.set(2, m.formatString)
    };
    m.makeDataTypeMap = function() {
        var a = new Z;
        a.set(105, O.FmtInteger(M.ISignedDecimal));
        a.set(100, O.FmtInteger(M.ISignedDecimal));
        a.set(117, O.FmtInteger(M.IUnsignedDecimal));
        a.set(99, O.FmtInteger(M.ICharacter));
        a.set(120, O.FmtInteger(M.IHex));
        a.set(88, O.FmtInteger(M.IHex));
        a.set(111, O.FmtInteger(M.IOctal));
        a.set(98,
            O.FmtInteger(M.IBin));
        a.set(102, O.FmtFloat(da.FNormal));
        a.set(101, O.FmtFloat(da.FScientific));
        a.set(69, O.FmtFloat(da.FScientific));
        a.set(103, O.FmtFloat(da.FNatural));
        a.set(71, O.FmtFloat(da.FNatural));
        a.set(115, O.FmtString);
        a.set(112, O.FmtPointer);
        a.set(110, O.FmtNothing);
        return a
    };
    m.format = function(a, b) {
        m._initialized || (m._initialized = !0, m.init());
        for (var c = 0, d = b.length; c < d;) {
            var e = c++;
            null == b[e] && (b[e] = "null")
        }
        for (var c = "", d = 0, e = m.tokenize(a), f = 0; f < e.length;) {
            var g = e[f];
            ++f;
            switch (g[1]) {
                case 3:
                    throw "";
                case 0:
                    c += g[2];
                    break;
                case 2:
                    var h = g[2];
                    if (!Object.prototype.hasOwnProperty.call(b[0], h)) throw "" + h;
                    c += u.string(X.field(b[0], h));
                    break;
                case 1:
                    h = g[3];
                    g = g[2];
                    h.width = null != h.width ? h.width : J.__cast(b[d++], Ca);
                    h.precision = null != h.precision ? h.precision : J.__cast(b[d++], Ca);
                    var k = b[d++],
                        l;
                    switch (g[1]) {
                        case 1:
                            l = m.formatFloatFuncHash.get(g[2][1]);
                            break;
                        case 0:
                            l = m.formatIntFuncHash.get(g[2][1]);
                            break;
                        case 2:
                            l = m.formatStringFuncHash.get(2);
                            break;
                        case 3:
                            throw "";
                        case 4:
                            throw "";
                    }
                    c += l(k, h)
            }
        }
        return c
    };
    m.tokenize = function(a) {
        for (var b = a.length, c = new ab, d = 0, e = []; d < b;) {
            var f = m.codeAt(a, d++);
            if (37 == f)
                if (f = m.codeAt(a, d++), 37 == f) c.b += String.fromCharCode(f);
                else {
                    0 < c.b.length && (e.push(va.BareString(c.b)), c = new ab);
                    if (40 == f)
                        if (f = a.indexOf(")", d), -1 == f) f = va.Unknown("named param", d);
                        else var g = y.substr(a, d, f - d),
                    d = f + 1, f = va.Property(g);
                    else {
                        for (g = {
                            flags: 0,
                            pos: -1,
                            width: -1,
                            precision: -1
                        }; 45 == f || 43 == f || 35 == f || 48 == f || 32 == f;) 45 == f ? g.flags |= 1 << v.Minus[1] : 43 == f ? g.flags |= 1 << v.Plus[1] : 35 == f ? g.flags |=
                            1 << v.Sharp[1] : 48 == f ? g.flags |= 1 << v.Zero[1] : 32 == f && (g.flags |= 1 << v.Space[1]), f = m.codeAt(a, d++);
                        0 != (g.flags & 1 << v.Minus[1]) && 0 != (g.flags & 1 << v.Zero[1]) && (g.flags &= 268435455 - (1 << v.Zero[1]));
                        0 != (g.flags & 1 << v.Space[1]) && 0 != (g.flags & 1 << v.Plus[1]) && (g.flags &= 268435455 - (1 << v.Space[1]));
                        if (42 == f) g.width = null, f = m.codeAt(a, d++);
                        else if (48 <= f && 57 >= f) {
                            for (g.width = 0; 48 <= f && 57 >= f;) g.width = f - 48 + 10 * g.width, f = m.codeAt(a, d++);
                            if (36 == f)
                                if (g.pos = g.width - 1, g.width = -1, f = m.codeAt(a, d++), 42 == f) g.width = null, f = m.codeAt(a, d++);
                                else if (48 <= f && 57 >= f)
                                for (g.width = 0; 48 <= f && 57 >= f;) g.width = f - 48 + 10 * g.width, f = m.codeAt(a, d++)
                        }
                        if (46 == f)
                            if (f = m.codeAt(a, d++), 42 == f) g.precision = null, f = m.codeAt(a, d++);
                            else if (48 <= f && 57 >= f)
                            for (g.precision = 0; 48 <= f && 57 >= f;) g.precision = f - 48 + 10 * g.precision, f = m.codeAt(a, d++);
                        else g.precision = 0;
                        for (; 104 == f || 108 == f || 76 == f;) {
                            switch (f) {
                                case 104:
                                    g.flags |= 1 << v.LengthH[1];
                                    break;
                                case 108:
                                    g.flags |= 1 << v.Lengthl[1];
                                    break;
                                case 76:
                                    g.flags |= 1 << v.LengthL[1]
                            }
                            f = m.codeAt(a, d++)
                        }
                        if (69 == f || 71 == f || 88 == f) g.flags |= 1 << v.UpperCase[1];
                        var h = m.dataTypeMap.get(f),
                            f = null == h ? va.Unknown(String.fromCharCode(f), d) : va.Tag(h, g)
                    }
                    e.push(f)
                } else c.b += String.fromCharCode(f)
        }
        0 < c.b.length && e.push(va.BareString(c.b));
        return e
    };
    m.formatBinary = function(a, b) {
        var c = "",
            d = b.flags,
            e = b.precision,
            f = b.width; - 1 == e && (e = 1);
        if (0 != a) {
            0 != (d & 1 << v.LengthH[1]) && (a &= 65535);
            var g = a;
            do c = (0 < (g & 1) ? "1" : "0") + c, g >>>= 1; while (0 < g);
            1 < e && (e > c.length && (c = m.lpad(c, "0", e)), 0 != (d & 1 << v.Sharp[1]) && (c = "b" + c))
        }
        return 0 != (d & 1 << v.Minus[1]) ? f > c.length ? m.rpad(c, " ", f) : c : f > c.length ? m.lpad(c,
            0 != (d & 1 << v.Zero[1]) ? "0" : " ", f) : c
    };
    m.formatOctal = function(a, b) {
        var c = "",
            d = b.flags,
            e = b.precision,
            f = b.width; - 1 == e && (e = 1);
        0 != a && (0 != (d & 1 << v.LengthH[1]) && (a &= 65535), c = m.toOct(a), 0 != (d & 1 << v.Sharp[1]) && (c = "0" + c), 1 < e && c.length < e && (c = m.lpad(c, "0", e)));
        return 0 != (d & 1 << v.Minus[1]) ? f > c.length ? m.rpad(c, " ", f) : c : f > c.length ? m.lpad(c, 0 != (d & 1 << v.Zero[1]) ? "0" : " ", f) : c
    };
    m.formatHexadecimal = function(a, b) {
        var c = "",
            d = b.flags,
            e = b.precision,
            f = b.width; - 1 == e && (e = 1);
        0 != a && (0 != (d & 1 << v.LengthH[1]) && (a &= 65535), c = m.toHex(a), 1 <
            e && c.length < e && (c = m.lpad(c, "0", e)), 0 != (d & 1 << v.Sharp[1]) && 0 != a && (c = "0x" + c), c = 0 != (d & 1 << v.UpperCase[1]) ? c.toUpperCase() : c.toLowerCase());
        return 0 != (d & 1 << v.Minus[1]) ? f > c.length ? m.rpad(c, " ", f) : c : f > c.length ? m.lpad(c, 0 != (d & 1 << v.Zero[1]) ? "0" : " ", f) : c
    };
    m.formatUnsignedDecimal = function(a, b) {
        var c, d = b.precision;
        0 <= a ? c = m.formatSignedDecimal(a, b) : (c = (new V(0, a)).toString(), 1 < d && c.length < d && (c = m.lpad(c, "0", d)), c = m.padNumber(c, a, b.flags, b.width));
        return c
    };
    m.formatNaturalFloat = function(a, b) {
        b.precision = 0;
        var c =
            m.formatNormalFloat(a, b),
            d = m.formatScientific(a, b);
        if (0 != (b.flags & 1 << v.Sharp[1]) && -1 != c.indexOf(".")) {
            for (var e = c.length - 1; 48 == c.charCodeAt(e);) e--;
            c = y.substr(c, 0, e)
        }
        return c.length <= d.length ? c : d
    };
    m.formatScientific = function(a, b) {
        var c = "",
            d = b.flags,
            e = b.precision; - 1 == e && (e = 6);
        var f, g;
        if (0 == a) {
            if (g = f = 0, c += "0", 0 < e)
                for (var c = c + ".", h = 0; h < e;) h++, c += "0"
        } else f = 0 < a ? 1 : 0 > a ? -1 : 0, a = Math.abs(a), g = Math.floor(Math.log(a) / 2.302585092994046), a /= Math.pow(10, g), h = Math.pow(0.1, e), a = Math.round(a / h) * h;
        c = 0 > f ? c + "-" : 0 != (d &
            1 << v.Plus[1]) ? c + "+" : c + "";
        0 != a && (c += m.rpad(function(b) {
            b = m.str(a);
            return y.substr(b, 0, e + 2)
        }(this), "0", e + 2));
        c = 0 != (d & 1 << v.UpperCase[1]) ? c + "E" : c + "e";
        c = 0 <= g ? c + "+" : c + "-";
        10 > g ? c += "00" : 100 > g && (c += "0");
        return c += m.str(m.iabs(g))
    };
    m.formatSignedDecimal = function(a, b) {
        var c, d = b.flags,
            e = b.precision,
            f = b.width;
        0 == e && 0 == a ? c = "" : (0 != (d & 1 << v.LengthH[1]) && (a &= 65535), c = m.str(m.iabs(a)), 1 < e && c.length < e && (c = m.lpad(c, "0", e)), 0 != (d & 1 << v.Zero[1]) && (c = m.lpad(c, "0", 0 > a ? f - 1 : f)), 0 > a && (c = "-" + c));
        0 <= a && (0 != (d & 1 << v.Plus[1]) ? c = "+" +
            c : 0 != (d & 1 << v.Space[1]) && (c = " " + c));
        return c = 0 != (d & 1 << v.Minus[1]) ? m.rpad(c, " ", b.width) : m.lpad(c, " ", b.width)
    };
    m.formatString = function(a, b) {
        var c = a,
            d = b.precision,
            e = b.width;
        0 < d && (c = y.substr(a, 0, d));
        d = c.length;
        0 < e && d < e && (c = 0 != (b.flags & 1 << v.Minus[1]) ? m.rpad(c, " ", e) : m.lpad(c, " ", e));
        return c
    };
    m.formatNormalFloat = function(a, b) {
        var c, d = b.flags,
            e = b.precision,
            f = b.width; - 1 == e && (e = 6);
        if (0 == e) c = m.str(m.iabs(Math.round(a))), 0 != (d & 1 << v.Sharp[1]) && (c += ".");
        else if (a = m.roundTo(a, Math.pow(0.1, e)), Math.isNaN(a)) c =
            "NaN";
        else {
            c = u["int"](Math.pow(10, e));
            c = m.str((a * c | 0) / c);
            var g = c.indexOf("."); - 1 != g ? g = y.substr(c, g + 1, null).length : (c += ".", g = 0);
            for (; g < e;) g++, c += "0"
        }
        0 != (d & 1 << v.Plus[1]) && 0 <= a ? c = "+" + c : 0 != (d & 1 << v.Space[1]) && 0 <= a && (c = " " + c);
        0 != (d & 1 << v.Zero[1]) && (c = m.lpad(c, "0", 0 > a ? f - 1 : f));
        return c = 0 != (d & 1 << v.Minus[1]) ? m.rpad(c, " ", f) : m.lpad(c, " ", f)
    };
    m.formatCharacter = function(a, b) {
        var c = String.fromCharCode(a);
        1 < b.width && (c = 0 != (b.flags & 1 << v.Minus[1]) ? m.rpad(c, " ", b.width) : m.lpad(c, " ", b.width));
        return c
    };
    m.padNumber =
        function(a, b, c, d) {
            var e = a.length;
            0 < d && e < d && (a = 0 != (c & 1 << v.Minus[1]) ? m.rpad(a, " ", d) : 0 <= b ? m.lpad(a, 0 != (c & 1 << v.Zero[1]) ? "0" : " ", d) : 0 != (c & 1 << v.Zero[1]) ? "-" + m.lpad(y.substr(a, 1, null), "0", d) : m.lpad(a, " ", d));
            return a
    };
    m.lpad = function(a, b, c) {
        if (0 >= b.length) throw "";
        for (; a.length < c;) a = b + a;
        return a
    };
    m.rpad = function(a, b, c) {
        if (0 >= b.length) throw "";
        for (; a.length < c;) a += b;
        return a
    };
    m.toHex = function(a) {
        var b = "";
        do b = "0123456789ABCDEF".charAt(a & 15) + b, a >>>= 4; while (0 < a);
        return b
    };
    m.toOct = function(a) {
        var b =
            "";
        do b = (a & 7) + b, a >>>= 3; while (0 < a);
        return b
    };
    m.iabs = function(a) {
        return u["int"](Math.abs(a))
    };
    m.str = function(a) {
        return u.string(a)
    };
    m.codeAt = function(a, b) {
        return a.charCodeAt(b)
    };
    m.roundTo = function(a, b) {
        return Math.round(a / b) * b
    };
    var v = {
        __ename__: !0,
        __constructs__: "Minus Plus Space Sharp Zero LengthH LengthL Lengthl UpperCase".split(" "),
        Minus: ["Minus", 0]
    };
    v.Minus.toString = n;
    v.Minus.__enum__ = v;
    v.Plus = ["Plus", 1];
    v.Plus.toString = n;
    v.Plus.__enum__ = v;
    v.Space = ["Space", 2];
    v.Space.toString = n;
    v.Space.__enum__ =
        v;
    v.Sharp = ["Sharp", 3];
    v.Sharp.toString = n;
    v.Sharp.__enum__ = v;
    v.Zero = ["Zero", 4];
    v.Zero.toString = n;
    v.Zero.__enum__ = v;
    v.LengthH = ["LengthH", 5];
    v.LengthH.toString = n;
    v.LengthH.__enum__ = v;
    v.LengthL = ["LengthL", 6];
    v.LengthL.toString = n;
    v.LengthL.__enum__ = v;
    v.Lengthl = ["Lengthl", 7];
    v.Lengthl.toString = n;
    v.Lengthl.__enum__ = v;
    v.UpperCase = ["UpperCase", 8];
    v.UpperCase.toString = n;
    v.UpperCase.__enum__ = v;
    var va = {
        __ename__: !0,
        __constructs__: ["BareString", "Tag", "Property", "Unknown"],
        BareString: function(a) {
            a = ["BareString",
                0, a
            ];
            a.__enum__ = va;
            a.toString = n;
            return a
        },
        Tag: function(a, b) {
            var c = ["Tag", 1, a, b];
            c.__enum__ = va;
            c.toString = n;
            return c
        },
        Property: function(a) {
            a = ["Property", 2, a];
            a.__enum__ = va;
            a.toString = n;
            return a
        },
        Unknown: function(a, b) {
            var c = ["Unknown", 3, a, b];
            c.__enum__ = va;
            c.toString = n;
            return c
        }
    }, O = {
            __ename__: !0,
            __constructs__: ["FmtInteger", "FmtFloat", "FmtString", "FmtPointer", "FmtNothing"],
            FmtInteger: function(a) {
                a = ["FmtInteger", 0, a];
                a.__enum__ = O;
                a.toString = n;
                return a
            },
            FmtFloat: function(a) {
                a = ["FmtFloat", 1, a];
                a.__enum__ =
                    O;
                a.toString = n;
                return a
            },
            FmtString: ["FmtString", 2]
        };
    O.FmtString.toString = n;
    O.FmtString.__enum__ = O;
    O.FmtPointer = ["FmtPointer", 3];
    O.FmtPointer.toString = n;
    O.FmtPointer.__enum__ = O;
    O.FmtNothing = ["FmtNothing", 4];
    O.FmtNothing.toString = n;
    O.FmtNothing.__enum__ = O;
    var M = {
        __ename__: !0,
        __constructs__: "ICharacter ISignedDecimal IUnsignedDecimal IOctal IHex IBin".split(" "),
        ICharacter: ["ICharacter", 0]
    };
    M.ICharacter.toString = n;
    M.ICharacter.__enum__ = M;
    M.ISignedDecimal = ["ISignedDecimal", 1];
    M.ISignedDecimal.toString =
        n;
    M.ISignedDecimal.__enum__ = M;
    M.IUnsignedDecimal = ["IUnsignedDecimal", 2];
    M.IUnsignedDecimal.toString = n;
    M.IUnsignedDecimal.__enum__ = M;
    M.IOctal = ["IOctal", 3];
    M.IOctal.toString = n;
    M.IOctal.__enum__ = M;
    M.IHex = ["IHex", 4];
    M.IHex.toString = n;
    M.IHex.__enum__ = M;
    M.IBin = ["IBin", 5];
    M.IBin.toString = n;
    M.IBin.__enum__ = M;
    var da = {
        __ename__: !0,
        __constructs__: ["FNormal", "FScientific", "FNatural"],
        FNormal: ["FNormal", 0]
    };
    da.FNormal.toString = n;
    da.FNormal.__enum__ = da;
    da.FScientific = ["FScientific", 1];
    da.FScientific.toString = n;
    da.FScientific.__enum__ = da;
    da.FNatural = ["FNatural", 2];
    da.FNatural.toString = n;
    da.FNatural.__enum__ = da;
    var dd = function() {};
    dd.__name__ = ["de", "polygonal", "core", "event", "IObservable"];
    var Ob = function() {};
    Ob.__name__ = ["de", "polygonal", "ds", "Hashable"];
    var la = function() {
        this.key = ka._counter++
    };
    la.__name__ = ["de", "polygonal", "ds", "HashableItem"];
    la.__interfaces__ = [Ob];
    la.prototype = {
        __class__: la
    };
    var ea = function(a, b) {
        null == a && (a = 0);
        la.call(this);
        this._source = null == b ? this : b;
        this._observer = null;
        this._observerCount =
            0;
        this._tail = this._head = new bb;
        this._hook = null;
        this.mPoolSize = this._blacklist = 0;
        this.mPoolCapacity = a;
        this._updating = this._freed = !1;
        this._stack = new cb;
        this._type = 0;
        this._userData = null;
        this.mNodeLookup = new Z
    };
    ea.__name__ = ["de", "polygonal", "core", "event", "Observable"];
    ea.__interfaces__ = [dd];
    ea._getRegistry = function() {
        null == ea._registry && (ea._registry = new Pb);
        return ea._registry
    };
    ea.__super__ = la;
    ea.prototype = B(la.prototype, {
        free: function() {
            if (!this._freed) {
                this.clear();
                this._stack.free();
                for (var a = this._head; null !=
                    a;) {
                    var b = a.next;
                    a.prev = null;
                    a.next = null;
                    a.observer = null;
                    a.mask = null;
                    a = b
                }
                this._userData = this._tail = this._head = this._stack = this.mNodeLookup = null;
                this._freed = !0
            }
        },
        clear: function(a) {
            null == a && (a = !1);
            0 < this._observerCount && ea._getRegistry().remove(this);
            this._stack.clear(null);
            this._updating = this._userData = !1;
            this._observer = this._hook = null;
            this._observerCount = 0;
            this.mNodeLookup = new Z;
            if (a) {
                this.mPoolSize = 0;
                for (a = this._head; null != a;) {
                    var b = a.next;
                    a.prev = null;
                    a.next = null;
                    a.observer = null;
                    a = b
                }
                this._tail = this._head =
                    new bb
            }
        },
        attach: function(a, b) {
            null == b && (b = 0);
            if (!this._freed) {
                0 == a.__guid && (a.__guid = ea._nextGUID++);
                var c = this.mNodeLookup.get(a.__guid);
                if (null != c) {
                    var d = b >>> 27; - 1 == c.mask[d] ? 0 != b && (c.mask[d] = b & 134217727) : c.mask[d] = 0 != b ? c.mask[d] | b & 134217727 : -1
                } else 0 == this.mPoolCapacity ? c = new bb : 0 == this.mPoolSize ? c = new bb : (c = this._head, this._head = this._head.next, this.mPoolSize--), c.observer = a, 0 == b || -1 == b ? c.all = !0 : (d = b >>> 27, c.mask[d] = 0 == b ? c.mask[d] | -1 : c.mask[d] | b & 134217727, c.groupBits |= 1 << d), this.mNodeLookup.set(a.__guid,
                    c), c.next = this._observer, null != this._observer && (this._observer.prev = c), this._observer = c, this._observerCount++, 1 == this._observerCount && ea._getRegistry().set(this)
            }
        },
        detach: function(a, b) {
            null == b && (b = 0);
            if (!this._freed) {
                var c = this.mNodeLookup.get(a.__guid);
                if (null != c) {
                    if (0 != b) {
                        var d = b >>> 27;
                        c.mask[d] &= ~(b & 134217727);
                        0 == c.mask[d] && (c.groupBits &= ~(1 << d));
                        if (0 < c.groupBits) return
                    }
                    null != c.prev && (c.prev.next = c.next);
                    null != c.next && (c.next.prev = c.prev);
                    c == this._observer && (this._observer = c.next);
                    c == this._hook &&
                        (this._hook = this._hook.next);
                    if (this._updating)
                        for (var d = 0, e = this._stack._top; d < e;) this._stack._a[d] == c && (this._stack._a[d] = c.next), d += 3;
                    this.mNodeLookup.remove(c.observer.__guid);
                    c.observer = null;
                    c.prev = c.next = null;
                    0 < this.mPoolCapacity && this.mPoolSize < this.mPoolCapacity && (this._tail = this._tail.next = c, this.mPoolSize++);
                    this._observerCount--;
                    0 == this._observerCount && ea._getRegistry().remove(this)
                }
            }
        },
        notify: function(a, b) {
            this._notify(a, b)
        },
        _notify: function(a, b) {
            if (0 != this._observerCount && (a & this._blacklist) !=
                a) {
                var c = a & 134217727,
                    d = a >>> 27;
                if (this._updating) this._stack.push(this._hook), this._stack.push(this._type), this._stack.push(this._userData), this._type = a, this._userData = b, this._update(this._observer, a, c, d, b);
                else if (this._updating = !0, this._type = a, this._userData = b, this._update(this._observer, a, c, d, b), null == this._stack) this._observer = this._hook = null;
                else {
                    if (0 < this._stack._top)
                        for (; 0 < this._stack._top;) b = this._stack.pop(), a = this._stack.pop(), c = a & 134217727, d = a >>> 27, this._update(this._stack.pop(), a, c, d, b);
                    this._updating = !1;
                    this._hook = null
                }
            }
        },
        _update: function(a, b, c, d, e) {
            for (; null != a;) {
                this._hook = a.next;
                if (a.all || 0 < (a.mask[d] & c)) a.observer.onUpdate(b, this._source, e);
                a = this._hook
            }
        },
        __class__: ea
    });
    var bb = function() {
        this.next = this.prev = this.observer = null;
        this.groupBits = 0;
        this.all = !1;
        this.mask = Array(32);
        for (var a = 0; 32 > a;) {
            var b = a++;
            this.mask[b] = 0
        }
    };
    bb.__name__ = ["de", "polygonal", "core", "event", "ObserverNode"];
    bb.prototype = {
        __class__: bb
    };
    var kb = function() {};
    kb.__name__ = ["de", "polygonal", "core", "fmt", "NumberFormat"];
    kb.toMMSS = function(a) {
        a = 1E3 * a | 0;
        a = (a - a % 1E3) / 1E3;
        var b = a % 60;
        return y.substr("0" + (a - b) / 60, -2, null) + ":" + y.substr("0" + b, -2, null)
    };
    kb.groupDigits = function(a, b) {
        null == b && (b = ".");
        var c = a + "";
        if (1E6 > a) {
            if (1E3 > a) return c;
            if (1E4 > a) return y.substr(c, 0, 1) + b + y.substr(c, 1, null);
            if (1E5 > a) return y.substr(c, 0, 2) + b + y.substr(c, 2, null);
            if (1E6 > a) return y.substr(c, 0, 3) + b + y.substr(c, 3, null)
        } else {
            if (1E7 > a) return y.substr(c, 0, 1) + b + y.substr(c, 1, 3) + b + y.substr(c, 4, null);
            if (1E8 > a) return y.substr(c, 0, 2) + b + y.substr(c, 2, 3) + b + y.substr(c,
                5, null);
            if (1E9 > a) return y.substr(c, 0, 3) + b + y.substr(c, 3, 3) + b + y.substr(c, 6, null)
        } if (1E10 > a) return y.substr(c, 0, 1) + b + y.substr(c, 1, 3) + b + y.substr(c, 4, 3) + b + y.substr(c, 7, null);
        throw "";
    };
    var lb = function() {
        this.m11 = 1;
        this.m21 = this.m13 = this.m12 = 0;
        this.m22 = 1;
        this.m32 = this.m31 = this.m23 = 0;
        this.m33 = 1;
        this
    };
    lb.__name__ = ["de", "polygonal", "core", "math", "Mat33"];
    lb.prototype = {
        set: function(a) {
            this.m11 = a.m11;
            this.m12 = a.m12;
            this.m13 = a.m13;
            this.m21 = a.m21;
            this.m22 = a.m22;
            this.m23 = a.m23;
            this.m31 = a.m31;
            this.m32 =
                a.m32;
            this.m33 = a.m33;
            return this
        },
        setIdentity: function() {
            this.m11 = 1;
            this.m21 = this.m13 = this.m12 = 0;
            this.m22 = 1;
            this.m32 = this.m31 = this.m23 = 0;
            this.m33 = 1;
            return this
        },
        __class__: lb
    };
    var ma = function() {
        this.m11 = 1;
        this.m21 = this.m14 = this.m13 = this.m12 = 0;
        this.m22 = 1;
        this.m32 = this.m31 = this.m24 = this.m23 = 0;
        this.m33 = 1;
        this.m43 = this.m42 = this.m41 = this.m34 = 0;
        this.m44 = 1;
        this;
        null == ma._sharedSineCosine && (ma._sharedSineCosine = new Bc);
        this._sineCosine = ma._sharedSineCosine
    };
    ma.__name__ = ["de", "polygonal", "core", "math", "Mat44"];
    ma.matrixProduct = function(a, b, c) {
        var d = b.m11,
            e = b.m12,
            f = b.m13,
            g = b.m14,
            h = b.m21,
            k = b.m22,
            m = b.m23,
            l = b.m24,
            n = b.m31,
            p = b.m32,
            q = b.m33,
            v = b.m34,
            t = b.m41,
            y = b.m42,
            x = b.m43;
        b = b.m44;
        var r, s, w, u;
        r = a.m11;
        s = a.m12;
        w = a.m13;
        u = a.m14;
        c.m11 = r * d + s * h + w * n + u * t;
        c.m12 = r * e + s * k + w * p + u * y;
        c.m13 = r * f + s * m + w * q + u * x;
        c.m14 = r * g + s * l + w * v + u * b;
        r = a.m21;
        s = a.m22;
        w = a.m23;
        u = a.m24;
        c.m21 = r * d + s * h + w * n + u * t;
        c.m22 = r * e + s * k + w * p + u * y;
        c.m23 = r * f + s * m + w * q + u * x;
        c.m24 = r * g + s * l + w * v + u * b;
        r = a.m31;
        s = a.m32;
        w = a.m33;
        u = a.m34;
        c.m31 = r * d + s * h + w * n + u * t;
        c.m32 = r * e + s * k + w * p + u * y;
        c.m33 = r *
            f + s * m + w * q + u * x;
        c.m34 = r * g + s * l + w * v + u * b;
        r = a.m41;
        s = a.m42;
        w = a.m43;
        u = a.m44;
        c.m41 = r * d + s * h + w * n + u * t;
        c.m42 = r * e + s * k + w * p + u * y;
        c.m43 = r * f + s * m + w * q + u * x;
        c.m44 = r * g + s * l + w * v + u * b;
        return c
    };
    ma.prototype = {
        set: function(a) {
            this.m11 = a.m11;
            this.m12 = a.m12;
            this.m13 = a.m13;
            this.m14 = a.m14;
            this.m21 = a.m21;
            this.m22 = a.m22;
            this.m23 = a.m23;
            this.m24 = a.m24;
            this.m31 = a.m31;
            this.m32 = a.m32;
            this.m33 = a.m33;
            this.m34 = a.m34;
            this.m41 = a.m41;
            this.m42 = a.m42;
            this.m43 = a.m43;
            this.m44 = a.m44;
            return this
        },
        setIdentity: function() {
            this.m11 = 1;
            this.m21 = this.m14 =
                this.m13 = this.m12 = 0;
            this.m22 = 1;
            this.m32 = this.m31 = this.m24 = this.m23 = 0;
            this.m33 = 1;
            this.m43 = this.m42 = this.m41 = this.m34 = 0;
            this.m44 = 1;
            return this
        },
        setOrtho: function(a, b, c, d, e, f) {
            var g = b - a,
                h = d - c,
                k = f - e;
            this.m11 = 2 / g;
            this.m21 = this.m14 = this.m13 = this.m12 = 0;
            this.m22 = 2 / h;
            this.m32 = this.m31 = this.m24 = this.m23 = 0;
            this.m33 = -2 / k;
            this.m34 = 0;
            this.m41 = -(b + a) / g;
            this.m42 = -(d + c) / h;
            this.m43 = -(f + e) / k;
            this.m44 = 1;
            return this
        },
        catScale: function(a, b, c) {
            this.m11 *= a;
            this.m21 *= a;
            this.m31 *= a;
            this.m41 *= a;
            this.m12 *= b;
            this.m22 *= b;
            this.m32 *=
                b;
            this.m42 *= b;
            this.m13 *= c;
            this.m23 *= c;
            this.m33 *= c;
            this.m43 *= c;
            return this
        },
        catTranslate: function(a, b, c) {
            this.m14 += a;
            this.m24 += b;
            this.m34 += c;
            return this
        },
        __class__: ma
    };
    var Y = function() {};
    Y.__name__ = ["de", "polygonal", "core", "math", "Mathematics"];
    Y.abs = function(a) {
        return 0 > a ? -a : a
    };
    Y.fmin = function(a, b) {
        return a < b ? a : b
    };
    Y.fabs = function(a) {
        return 0 > a ? -a : a
    };
    Y.fclamp = function(a, b, c) {
        return a < b ? b : a > c ? c : a
    };
    Y.lerp = function(a, b, c) {
        return a + (b - a) * c
    };
    Y.nextPow2 = function(a) {
        a -= 1;
        a |= a >> 1;
        a |= a >> 2;
        a |= a >> 4;
        a |= a >> 8;
        return (a |
            a >> 16) + 1
    };
    Y.floor = function(a) {
        var b = a | 0;
        0 > a && b != a && b--;
        return b
    };
    var Bc = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b
    };
    Bc.__name__ = ["de", "polygonal", "core", "math", "Vec2"];
    Bc.prototype = {
        __class__: Bc
    };
    var na = function(a, b, c, d) {
        null == d && (d = 1);
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = d
    };
    na.__name__ = ["de", "polygonal", "core", "math", "Vec3"];
    na.prototype = {
        zero: function() {
            this.x = this.y = this.z = 0;
            this.w = 1;
            return this
        },
        set: function(a) {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
            this.w = a.w
        },
        __class__: na
    };
    var T = function() {};
    T.__name__ = "de polygonal core math interpolation Interpolation".split(" ");
    T.prototype = {
        __class__: T
    };
    var mb = function() {};
    mb.__name__ = ["de", "polygonal", "core", "time", "TimeSpan"];
    mb.prototype = {
        __class__: mb
    };
    var $a = function(a, b) {
        this._f = a;
        this._id = r.schedule(this, 0, b)
    };
    $a.__name__ = ["de", "polygonal", "core", "time", "Delay"];
    $a.__interfaces__ = [mb];
    $a.prototype = {
        onBlip: function() {
            this._id = -1;
            this._f();
            this._f = null
        },
        onStart: function() {},
        onProgress: function(a) {},
        onEnd: function() {},
        onCancel: function() {},
        __class__: $a
    };
    var yc = function(a) {
        null == a && (a = 0);
        this._duration = a;
        this._t0 = 0;
        this._t1 = this._duration;
        a
    };
    yc.__name__ = ["de", "polygonal", "core", "time", "Interval"];
    yc.prototype = {
        set_duration: function(a) {
            this._duration = a;
            this._t0 = 0;
            this._t1 = this._duration;
            return a
        },
        advance: function(a) {
            this.hold || (this._t0 += a);
            return Y.fmin(this._t0 / this._t1, 1)
        },
        __class__: yc
    };
    var Cc = function() {};
    Cc.__name__ = ["de", "polygonal", "core", "time", "Job"];
    Cc.prototype = {
        __class__: Cc
    };
    var Qb =
        function(a) {
            this._job = a;
            this._jobId = -1
    };
    Qb.__name__ = ["de", "polygonal", "core", "time", "JobHandler"];
    Qb.__interfaces__ = [mb];
    Qb.prototype = {
        run: function(a, b, c) {
            null == c && (c = 0);
            null != a && (this._job = a);
            this._jobId = r.schedule(this, b, c);
            return this
        },
        cancel: function() {
            null != this._job && -1 != this._jobId && r.cancel(this._jobId)
        },
        onBlip: function() {},
        onStart: function() {
            this._job.onStart()
        },
        onProgress: function(a) {
            this._job.onProgress(a)
        },
        onEnd: function() {
            null != this._job && (this._job.onComplete(), this._job = null)
        },
        onCancel: function() {
            null !=
                this._job && (this._job.onAbort(), this._job = null)
        },
        __class__: Qb
    };
    var Dc = function() {};
    Dc.__name__ = ["de", "polygonal", "core", "time", "Time"];
    Dc.prototype = {
        __class__: Dc
    };
    var k = function() {};
    k.__name__ = ["de", "polygonal", "core", "time", "Timebase"];
    k.attach = function(a, b) {
        null == b && (b = 0);
        k.observable.attach(a, b)
    };
    k.detach = function(a, b) {
        null == b && (b = 0);
        k.observable.detach(a, b)
    };
    k.init = function() {
        k.mInitialized || (k.mInitialized = !0, k.observable = new ea(100))
    };
    k.setTimeSource = function(a) {
        k.mTime = a;
        k.mTime.setTimingEventHandler(k.timeStep);
        k.mPast = k.mTime.now()
    };
    k.setTickRate = function(a, b) {
        null == b && (b = -1);
        k.tickRate = 1 / a;
        k.mAccumulator = 0;
        k.mAccumulatorLimit = -1 == b ? 10 : b * k.tickRate
    };
    k.halt = function() {
        k.mHalted || (k.mHalted = !0, k.observable.notify(4))
    };
    k.resume = function() {
        k.mHalted && (k.mHalted = !1, k.mAccumulator = 0, k.mPast = k.mTime.now(), k.observable.notify(16))
    };
    k.timeStep = function() {
        if (!k.mHalted) {
            var a = k.mTime.now(),
                b = a - k.mPast;
            k.mPast = a;
            k.appTimeDelta = b;
            k.appTime += b;
            k.mFpsTicks++;
            k.mFpsTime += b;
            1 <= k.mFpsTime && (k.mFpsTime -= 1, k.fps = k.mFpsTicks,
                k.mFpsTicks = 0);
            if (0 < k.mFreezeDelay) k.mFreezeDelay -= k.appTimeDelta, k.observable.notify(1, 0), k.observable.notify(2, 1), 0 >= k.mFreezeDelay && k.observable.notify(64);
            else if (k.useFixedTimeStep) {
                k.mAccumulator += k.appTimeDelta * k.timeScale;
                k.mAccumulator > k.mAccumulatorLimit && (k.observable.notify(8, k.mAccumulator), k.mAccumulator = k.mAccumulatorLimit);
                for (k.gameTimeDelta = k.tickRate * k.timeScale; k.mAccumulator >= k.tickRate && (k.mAccumulator -= k.tickRate, k.gameTime += k.gameTimeDelta, k.observable.notify(1, k.tickRate),
                    k.processedTicks++, !k.mHalted););
                k.mHalted || (k.observable.notify(2, k.mAccumulator / k.tickRate), k.processedFrames++)
            } else k.mAccumulator = 0, k.gameTimeDelta = b * k.timeScale, k.gameTime += k.gameTimeDelta, k.observable.notify(1, k.gameTimeDelta), k.processedTicks++, k.observable.notify(2, 1), k.processedFrames++
        }
    };
    var r = function() {};
    r.__name__ = ["de", "polygonal", "core", "time", "Timeline"];
    r.init = function() {
        r.mInitialized || (r.mInitialized = !0, k.init(), r.observable = new ea(100), r.mCurrentTick = k.processedTicks, r.mCurrentSubTick =
            0, r.mCurrentInterval = null, r.mRunningIntervals = new Rb, r.mPendingAdditions = new Sb(10 * r.POOL_SIZE), r.mIntervalHeap = new Tb, r.mIntervalPool = new Ub(r.POOL_SIZE), r.mIntervalPool.allocate(!0, nb), r._data = [r.mRunningIntervals, r.mPendingAdditions, r.mIntervalHeap])
    };
    r.schedule = function(a, b, c, d, e) {
        null == e && (e = 0);
        null == d && (d = 0);
        null == c && (c = 0);
        0 != d && 0 == e && (e = c);
        r.mCurrentTick = k.processedTicks;
        c = Math.round(c / k.tickRate);
        c = r.mCurrentTick + c;
        var f = ++r.mNextId,
            g;
        if (-1 == r.mIntervalPool._free) g = new nb;
        else {
            var h = r.mIntervalPool.next();
            g = r.mIntervalPool.get(h);
            g.poolId = h
        }
        g.id = f;
        g.ageTicks = c;
        g.spawnTicks = c;
        g.dieTicks = c + ((b / k.tickRate + 16384.5 | 0) - 16384);
        g.subTicks = r.mCurrentSubTick++;
        g.ticks = (e / k.tickRate + 16384.5 | 0) - 16384;
        g.iterations = d;
        g.iteration = 0;
        g.listener = a;
        r.mPendingAdditions.enqueue(g);
        return f
    };
    r.cancel = function(a) {
        null == a && (a = 0);
        if (0 > a || !r.mInitialized) return !1;
        if (0 == a) return r.mCurrentInterval.ageTicks = -1, !0;
        for (var b = 0, c = r._data; b < c.length;) {
            var d = c[b];
            ++b;
            for (d = d.iterator(); d.hasNext();) {
                var e = d.next();
                if (e.id == a) return e.ageTicks = -1, !0
            }
        }
        return !1
    };
    r.tick = function() {
        r.mCurrentTick = k.processedTicks;
        r.mCurrentSubTick = 0;
        var a, b, c = r.mPendingAdditions,
            d = r.mIntervalHeap,
            e = r.mRunningIntervals;
        b = 0;
        for (var f = c._size; b < f;)
            if (b++, a = c.dequeue(), -1 == a.ageTicks)
                if (r.mCurrentInterval = a, null != a.listener) a.listener.onCancel();
                else a.observable.notify(268435472, a.id);
                else d.add(a);
        for (b = e.head; null != b;)
            if (a = b.val, -1 == a.ageTicks)
                if (b = b._list.unlink(b), r.mCurrentInterval = a, null != a.listener) a.listener.onCancel();
                else a.observable.notify(268435472,
                    a.id);
                else {
                    a.ageTicks++;
                    r.mCurrentInterval = a;
                    if (null != a.listener) a.listener.onProgress((a.ageTicks - a.spawnTicks) / (a.dieTicks - a.spawnTicks));
                    else a.observable.notify(268435460, a.id); if (a.ageTicks == a.dieTicks) {
                        b = b._list.unlink(b);
                        r.mCurrentInterval = a;
                        if (null != a.listener) a.listener.onEnd();
                        else a.observable.notify(268435464, a.id);
                        0 != a.iterations ? (a.resurrect(), a.subTicks = r.mCurrentSubTick++, c.enqueue(a)) : -1 != a.poolId && r.mIntervalPool.put(a.poolId)
                    } else b = b.next
                }
        for (; 0 != d._size;)
            if (a = d._a[1], -1 == a.ageTicks)
                if (d.pop(), -1 != a.poolId && r.mIntervalPool.put(a.poolId), r.mCurrentInterval = a, null != a.listener) a.listener.onCancel();
                else a.observable.notify(268435472, a.id);
                else if (a.ageTicks <= r.mCurrentTick)
            if (d.pop(), a.ageTicks == a.dieTicks) {
                r.mCurrentInterval = a;
                if (null != a.listener) a.listener.onBlip();
                else a.observable.notify(268435457, a.id);
                0 != a.iterations ? (a.resurrect(), a.subTicks = r.mCurrentSubTick++, c.enqueue(a)) : -1 != a.poolId && r.mIntervalPool.put(a.poolId)
            } else {
                e.append(a);
                r.mCurrentInterval = a;
                if (null != a.listener) a.listener.onStart();
                else a.observable.notify(268435458, a.id);
                r.mCurrentInterval = a;
                if (null != a.listener) a.listener.onProgress((a.ageTicks - a.spawnTicks) / (a.dieTicks - a.spawnTicks));
                else a.observable.notify(268435460, a.id)
            } else break
    };
    var Vc = function() {};
    Vc.__name__ = ["de", "polygonal", "ds", "Cloneable"];
    var Ec = function() {};
    Ec.__name__ = ["de", "polygonal", "ds", "Comparable"];
    Ec.prototype = {
        __class__: Ec
    };
    var Vb = function() {};
    Vb.__name__ = ["de", "polygonal", "ds", "Heapable"];
    Vb.__interfaces__ = [Ec];
    Vb.prototype = {
        __class__: Vb
    };
    var nb = function() {
        this.listener =
            null;
        this.observable = r.observable;
        this.poolId = -1
    };
    nb.__name__ = "de polygonal core time _Timeline TimelineNode".split(" ");
    nb.__interfaces__ = [mb, Vc, Vb];
    nb.prototype = {
        resurrect: function() {
            var a = this.dieTicks - this.spawnTicks + this.ticks;
            this.spawnTicks += a;
            this.dieTicks += a;
            this.ageTicks = this.spawnTicks; - 1 != this.iterations && (this.iterations--, this.iteration++)
        },
        onBlip: function() {
            r.mCurrentInterval = this;
            if (null != this.listener) this.listener.onBlip();
            else this.observable.notify(268435457, this.id)
        },
        onStart: function() {
            r.mCurrentInterval =
                this;
            if (null != this.listener) this.listener.onStart();
            else this.observable.notify(268435458, this.id)
        },
        onProgress: function(a) {
            r.mCurrentInterval = this;
            if (null != this.listener) this.listener.onProgress((this.ageTicks - this.spawnTicks) / (this.dieTicks - this.spawnTicks));
            else this.observable.notify(268435460, this.id)
        },
        onEnd: function() {
            r.mCurrentInterval = this;
            if (null != this.listener) this.listener.onEnd();
            else this.observable.notify(268435464, this.id)
        },
        onCancel: function() {
            r.mCurrentInterval = this;
            if (null != this.listener) this.listener.onCancel();
            else this.observable.notify(268435472, this.id)
        },
        compare: function(a) {
            var b = a.ageTicks - this.ageTicks;
            return 0 == b ? a.subTicks - this.subTicks : b
        },
        __class__: nb
    };
    var ob = function(a) {
        null == a && (a = 0.1);
        this._overshoot = 17.0158 * a
    };
    ob.__name__ = "de polygonal core tween ease BackEaseIn".split(" ");
    ob.__interfaces__ = [T];
    ob.prototype = {
        interpolate: function(a) {
            return a * a * ((this._overshoot + 1) * a - this._overshoot)
        },
        __class__: ob
    };
    var pb = function(a) {
        null == a && (a = 0.1);
        this._overshoot = 17.0158 * a * 1.525
    };
    pb.__name__ = "de polygonal core tween ease BackEaseInOut".split(" ");
    pb.__interfaces__ = [T];
    pb.prototype = {
        interpolate: function(a) {
            if (0.5 > a) return 2 * a * a * (2 * (this._overshoot + 1) * a - this._overshoot);
            a = 2 * a - 2;
            return 0.5 * (a * a * ((this._overshoot + 1) * a + this._overshoot) + 2)
        },
        __class__: pb
    };
    var qb = function(a) {
        null == a && (a = 0.1);
        this._overshoot = 17.0158 * a
    };
    qb.__name__ = "de polygonal core tween ease BackEaseOut".split(" ");
    qb.__interfaces__ = [T];
    qb.prototype = {
        interpolate: function(a) {
            a -= 1;
            return a * a * ((this._overshoot + 1) * a + this._overshoot) + 1
        },
        __class__: qb
    };
    var Wb = function() {};
    Wb.__name__ = "de polygonal core tween ease BounceEaseIn".split(" ");
    Wb.__interfaces__ = [T];
    Wb.prototype = {
        interpolate: function(a) {
            a = 1 - a;
            if (0.36363636363636365 > a) return 1 - 7.5625 * a * a;
            if (0.7272727272727273 > a) return a -= 0.5454545454545454, 1 - (7.5625 * a * a + 0.75);
            if (0.9090909090909091 > a) return a -= 0.8181818181818182, 1 - (7.5625 * a * a + 0.9375);
            a -= 0.9545454545454546;
            return 1 - (7.5625 * a * a + 0.984375)
        },
        __class__: Wb
    };
    var Xb = function() {};
    Xb.__name__ = "de polygonal core tween ease BounceEaseInOut".split(" ");
    Xb.__interfaces__ = [T];
    Xb.prototype = {
        interpolate: function(a) {
            if (0.5 > a) {
                a = 1 - 2 * a;
                if (0.36363636363636365 >
                    a) return 0.5 * (1 - 7.5625 * a * a);
                if (0.7272727272727273 > a) return a -= 0.5454545454545454, 0.5 * (1 - (7.5625 * a * a + 0.75));
                if (0.9090909090909091 > a) return a -= 0.8181818181818182, 0.5 * (1 - (7.5625 * a * a + 0.9375));
                a -= 0.9545454545454546;
                return 0.5 * (1 - (7.5625 * a * a + 0.984375))
            }
            a = 2 * (a - 0.5);
            if (0.36363636363636365 > a) return 7.5625 * a * a * 0.5 + 0.5;
            if (0.7272727272727273 > a) return a -= 0.5454545454545454, 0.5 * (7.5625 * a * a + 0.75) + 0.5;
            if (0.9090909090909091 > a) return a -= 0.8181818181818182, 0.5 * (7.5625 * a * a + 0.9375) + 0.5;
            a -= 0.9545454545454546;
            return 0.5 *
                (7.5625 * a * a + 0.984375) + 0.5
        },
        __class__: Xb
    };
    var Yb = function() {};
    Yb.__name__ = "de polygonal core tween ease BounceEaseOut".split(" ");
    Yb.__interfaces__ = [T];
    Yb.prototype = {
        interpolate: function(a) {
            if (0.36363636363636365 > a) return 7.5625 * a * a;
            if (0.7272727272727273 > a) return a -= 0.5454545454545454, 7.5625 * a * a + 0.75;
            if (0.9090909090909091 > a) return a -= 0.8181818181818182, 7.5625 * a * a + 0.9375;
            a -= 0.9545454545454546;
            return 7.5625 * a * a + 0.984375
        },
        __class__: Yb
    };
    var Zb = function() {};
    Zb.__name__ = "de polygonal core tween ease CircularEaseIn".split(" ");
    Zb.__interfaces__ = [T];
    Zb.prototype = {
        interpolate: function(a) {
            return -(Math.sqrt(1 - a * a) - 1)
        },
        __class__: Zb
    };
    var $b = function() {};
    $b.__name__ = "de polygonal core tween ease CircularEaseInOut".split(" ");
    $b.__interfaces__ = [T];
    $b.prototype = {
        interpolate: function(a) {
            if (0.5 > a) return -0.5 * (Math.sqrt(1 - 4 * a * a) - 1);
            a = 2 * a - 2;
            return 0.5 * (Math.sqrt(1 - a * a) + 1)
        },
        __class__: $b
    };
    var ac = function() {};
    ac.__name__ = "de polygonal core tween ease CircularEaseOut".split(" ");
    ac.__interfaces__ = [T];
    ac.prototype = {
        interpolate: function(a) {
            return Math.sqrt(1 -
                (a - 1) * (a - 1))
        },
        __class__: ac
    };
    var t = {
        __ename__: !0,
        __constructs__: "None PowIn PowOut PowInOut ExpIn ExpOut ExpInOut SinIn SinOut SinInOut CircularIn CircularOut CircularInOut BackIn BackOut BackInOut ElasticIn ElasticOut ElasticInOut BounceIn BounceOut BounceInOut".split(" "),
        None: ["None", 0]
    };
    t.None.toString = n;
    t.None.__enum__ = t;
    t.PowIn = function(a) {
        a = ["PowIn", 1, a];
        a.__enum__ = t;
        a.toString = n;
        return a
    };
    t.PowOut = function(a) {
        a = ["PowOut", 2, a];
        a.__enum__ = t;
        a.toString = n;
        return a
    };
    t.PowInOut = function(a) {
        a = ["PowInOut",
            3, a
        ];
        a.__enum__ = t;
        a.toString = n;
        return a
    };
    t.ExpIn = ["ExpIn", 4];
    t.ExpIn.toString = n;
    t.ExpIn.__enum__ = t;
    t.ExpOut = ["ExpOut", 5];
    t.ExpOut.toString = n;
    t.ExpOut.__enum__ = t;
    t.ExpInOut = ["ExpInOut", 6];
    t.ExpInOut.toString = n;
    t.ExpInOut.__enum__ = t;
    t.SinIn = ["SinIn", 7];
    t.SinIn.toString = n;
    t.SinIn.__enum__ = t;
    t.SinOut = ["SinOut", 8];
    t.SinOut.toString = n;
    t.SinOut.__enum__ = t;
    t.SinInOut = ["SinInOut", 9];
    t.SinInOut.toString = n;
    t.SinInOut.__enum__ = t;
    t.CircularIn = ["CircularIn", 10];
    t.CircularIn.toString = n;
    t.CircularIn.__enum__ = t;
    t.CircularOut = ["CircularOut", 11];
    t.CircularOut.toString = n;
    t.CircularOut.__enum__ = t;
    t.CircularInOut = ["CircularInOut", 12];
    t.CircularInOut.toString = n;
    t.CircularInOut.__enum__ = t;
    t.BackIn = function(a) {
        a = ["BackIn", 13, a];
        a.__enum__ = t;
        a.toString = n;
        return a
    };
    t.BackOut = function(a) {
        a = ["BackOut", 14, a];
        a.__enum__ = t;
        a.toString = n;
        return a
    };
    t.BackInOut = function(a) {
        a = ["BackInOut", 15, a];
        a.__enum__ = t;
        a.toString = n;
        return a
    };
    t.ElasticIn = function(a, b) {
        var c = ["ElasticIn", 16, a, b];
        c.__enum__ = t;
        c.toString = n;
        return c
    };
    t.ElasticOut = function(a,
        b) {
        var c = ["ElasticOut", 17, a, b];
        c.__enum__ = t;
        c.toString = n;
        return c
    };
    t.ElasticInOut = function(a, b) {
        var c = ["ElasticInOut", 18, a, b];
        c.__enum__ = t;
        c.toString = n;
        return c
    };
    t.BounceIn = ["BounceIn", 19];
    t.BounceIn.toString = n;
    t.BounceIn.__enum__ = t;
    t.BounceOut = ["BounceOut", 20];
    t.BounceOut.toString = n;
    t.BounceOut.__enum__ = t;
    t.BounceInOut = ["BounceInOut", 21];
    t.BounceInOut.toString = n;
    t.BounceInOut.__enum__ = t;
    var Fa = function() {
        this._none = new bc;
        this._powEaseIn2 = new Ka(2);
        this._powEaseIn3 = new Ka(3);
        this._powEaseIn4 = new Ka(4);
        this._powEaseIn5 = new Ka(5);
        this._powEaseOut2 = new Ea(2);
        this._powEaseOut3 = new Ea(3);
        this._powEaseOut4 = new Ea(4);
        this._powEaseOut5 = new Ea(5);
        this._powEaseInOut2 = new La(2);
        this._powEaseInOut3 = new La(3);
        this._powEaseInOut4 = new La(4);
        this._powEaseInOut5 = new La(5);
        this._sinEaseIn = new cc;
        this._sinEaseOut = new dc;
        this._sinEaseInOut = new ec;
        this._expEaseIn = new fc;
        this._expEaseOut = new gc;
        this._expEaseInOut = new hc;
        this._circularEaseIn = new Zb;
        this._circularEaseOut = new ac;
        this._circularEaseInOut = new $b;
        this._backEaseIn =
            new ob;
        this._backEaseOut = new qb;
        this._backEaseInOut = new pb;
        this._elasticEaseIn = new rb;
        this._elasticEaseOut = new sb;
        this._elasticEaseInOut = new tb;
        this._bounceEaseIn = new Wb;
        this._bounceEaseOut = new Yb;
        this._bounceEaseInOut = new Xb
    };
    Fa.__name__ = "de polygonal core tween ease EaseFactory".split(" ");
    Fa.create = function(a) {
        null == Fa._instance && (Fa._instance = new Fa);
        return Fa._instance._create(a)
    };
    Fa.prototype = {
        _create: function(a) {
            switch (a[1]) {
                case 0:
                    return this._none;
                case 1:
                    switch (a[2]) {
                        case 2:
                            return this._powEaseIn2;
                        case 3:
                            return this._powEaseIn3;
                        case 4:
                            return this._powEaseIn4;
                        case 5:
                            return this._powEaseIn5
                    }
                    break;
                case 2:
                    switch (a[2]) {
                        case 2:
                            return this._powEaseOut2;
                        case 3:
                            return this._powEaseOut3;
                        case 4:
                            return this._powEaseOut4;
                        case 5:
                            return this._powEaseOut5
                    }
                    break;
                case 3:
                    switch (a[2]) {
                        case 2:
                            return this._powEaseInOut2;
                        case 3:
                            return this._powEaseInOut3;
                        case 4:
                            return this._powEaseInOut4;
                        case 5:
                            return this._powEaseInOut5
                    }
                    break;
                case 7:
                    return this._sinEaseIn;
                case 8:
                    return this._sinEaseOut;
                case 9:
                    return this._sinEaseInOut;
                case 4:
                    return this._expEaseIn;
                case 5:
                    return this._expEaseOut;
                case 6:
                    return this._expEaseInOut;
                case 10:
                    return this._circularEaseIn;
                case 11:
                    return this._circularEaseOut;
                case 12:
                    return this._circularEaseInOut;
                case 13:
                    return a = a[2], 0.1 == a ? this._backEaseIn : new ob(a);
                case 14:
                    return a = a[2], 0.1 == a ? this._backEaseOut : new qb(a);
                case 15:
                    return a = a[2], 0.1 == a ? this._backEaseInOut : new pb(a);
                case 16:
                    var b = a[3];
                    a = a[2];
                    return 0 == a && 0.3 == b ? this._elasticEaseIn : new rb(b, a);
                case 17:
                    return b = a[3], a = a[2], 0 == a && 0.3 == b ? this._elasticEaseOut :
                        new sb(b, a);
                case 18:
                    return b = a[3], a = a[2], 0 == a && 0.3 == b ? this._elasticEaseInOut : new tb(b, a);
                case 19:
                    return this._bounceEaseIn;
                case 20:
                    return this._bounceEaseOut;
                case 21:
                    return this._bounceEaseInOut
            }
            return null
        },
        __class__: Fa
    };
    var rb = function(a, b) {
        null == b && (b = 0.3);
        null == a && (a = 0);
        this._amplitude = a;
        this._period = b
    };
    rb.__name__ = "de polygonal core tween ease ElasticEaseIn".split(" ");
    rb.__interfaces__ = [T];
    rb.prototype = {
        interpolate: function(a) {
            var b, c;
            1 > this._amplitude ? (c = 1, b = 0.25 * this._period) : (c = this._amplitude,
                b = this._period / 6.283185307179586 * Math.asin(1 / c));
            return -(c * Math.pow(2, 10 * (a - 1)) * Math.sin(6.283185307179586 * (a - 1 - b) / this._period))
        },
        __class__: rb
    };
    var tb = function(a, b) {
        null == b && (b = 0.3);
        null == a && (a = 0);
        this._amplitude = a;
        this._period = b
    };
    tb.__name__ = "de polygonal core tween ease ElasticEaseInOut".split(" ");
    tb.__interfaces__ = [T];
    tb.prototype = {
        interpolate: function(a) {
            var b, c;
            1 > this._amplitude ? (c = 1, b = 0.25 * this._period) : (c = this._amplitude, b = this._period / 6.283185307179586 * Math.asin(1 / c));
            if (0.5 > a) return a =
                2 * a - 1, -0.5 * c * Math.pow(2, 10 * a) * Math.sin(2 * (a - b) * Math.PI / this._period);
            a = 2 * a - 1;
            return c * Math.pow(2, -10 * a) * Math.sin(6.283185307179586 * (a - b) / this._period) * 0.5 + 1
        },
        __class__: tb
    };
    var sb = function(a, b) {
        null == b && (b = 0.3);
        null == a && (a = 0);
        this._amplitude = a;
        this._period = b
    };
    sb.__name__ = "de polygonal core tween ease ElasticEaseOut".split(" ");
    sb.__interfaces__ = [T];
    sb.prototype = {
        interpolate: function(a) {
            var b, c;
            1 > this._amplitude ? (c = 1, b = 0.25 * this._period) : (c = this._amplitude, b = this._period / 6.283185307179586 * Math.asin(1 /
                c));
            return c * Math.pow(2, -10 * a) * Math.sin(6.283185307179586 * (a - b) / this._period) + 1
        },
        __class__: sb
    };
    var fc = function() {};
    fc.__name__ = "de polygonal core tween ease ExpEaseIn".split(" ");
    fc.__interfaces__ = [T];
    fc.prototype = {
        interpolate: function(a) {
            return Math.pow(2, 10 * (a - 1))
        },
        __class__: fc
    };
    var hc = function() {};
    hc.__name__ = "de polygonal core tween ease ExpEaseInOut".split(" ");
    hc.__interfaces__ = [T];
    hc.prototype = {
        interpolate: function(a) {
            return 0.5 > a ? 0.5 * Math.pow(2, 10 * (2 * a - 1)) : 0.5 * (-Math.pow(2, -10 * (2 * a - 1)) + 2)
        },
        __class__: hc
    };
    var gc = function() {};
    gc.__name__ = "de polygonal core tween ease ExpEaseOut".split(" ");
    gc.__interfaces__ = [T];
    gc.prototype = {
        interpolate: function(a) {
            return -Math.pow(2, -10 * a) + 1
        },
        __class__: gc
    };
    var bc = function() {};
    bc.__name__ = "de polygonal core tween ease NullEase".split(" ");
    bc.__interfaces__ = [T];
    bc.prototype = {
        interpolate: function(a) {
            return a
        },
        __class__: bc
    };
    var Ka = function(a) {
        this.degree = a
    };
    Ka.__name__ = "de polygonal core tween ease PowEaseIn".split(" ");
    Ka.__interfaces__ = [T];
    Ka.prototype = {
        interpolate: function(a) {
            return Math.pow(a, this.degree)
        },
        __class__: Ka
    };
    var La = function(a) {
        this.degree = a
    };
    La.__name__ = "de polygonal core tween ease PowEaseInOut".split(" ");
    La.__interfaces__ = [T];
    La.prototype = {
        interpolate: function(a) {
            if (0.5 > a) return 0.5 * Math.pow(2 * a, this.degree);
            var b;
            b = 0 == (this.degree & 1) ? -1 : 1;
            return 0.5 * b * (Math.pow(2 * a - 2, this.degree) + 2 * b)
        },
        __class__: La
    };
    var Ea = function(a) {
        this.degree = a
    };
    Ea.__name__ = "de polygonal core tween ease PowEaseOut".split(" ");
    Ea.__interfaces__ = [T];
    Ea.prototype = {
        interpolate: function(a) {
            return Math.pow(a - 1, this.degree) * (0 == (this.degree & 1) ? -1 : 1) + 1
        },
        __class__: Ea
    };
    var cc = function() {};
    cc.__name__ = "de polygonal core tween ease SinEaseIn".split(" ");
    cc.__interfaces__ = [T];
    cc.prototype = {
        interpolate: function(a) {
            return 1 - Math.cos(1.5707963267948966 * a)
        },
        __class__: cc
    };
    var ec = function() {};
    ec.__name__ = "de polygonal core tween ease SinEaseInOut".split(" ");
    ec.__interfaces__ = [T];
    ec.prototype = {
        interpolate: function(a) {
            return -0.5 * (Math.cos(3.141592653589793 * a) - 1)
        },
        __class__: ec
    };
    var dc = function() {};
    dc.__name__ = "de polygonal core tween ease SinEaseOut".split(" ");
    dc.__interfaces__ = [T];
    dc.prototype = {
        interpolate: function(a) {
            return Math.sin(1.5707963267948966 * a)
        },
        __class__: dc
    };
    var pa = function() {};
    pa.__name__ = ["de", "polygonal", "ds", "Collection"];
    pa.__interfaces__ = [Ob];
    pa.prototype = {
        __class__: pa
    };
    var qa = function() {};
    qa.__name__ = ["de", "polygonal", "ds", "Itr"];
    qa.prototype = {
        __class__: qa
    };
    var R = function() {};
    R.__name__ = ["de", "polygonal", "ds", "ArrayUtil"];
    R.alloc = function(a) {
        return Array(a)
    };
    R.copy = function(a, b, c, d) {
        null == d && (d = -1);
        null == c && (c = 0); - 1 == d && (d = a.length);
        for (var e = 0; c < d;) {
            var f = c++;
            b[e++] = a[f]
        }
        return b
    };
    R.fill = function(a, b, c) {
        null == c && (c = -1); - 1 == c && (c = a.length);
        for (var d = 0; d < c;) {
            var e = d++;
            a[e] = b
        }
    };
    R.assign = function(a, b, c, d) {
        null == d && (d = -1); - 1 == d && (d = a.length);
        null == c && (c = []);
        for (var e = 0; e < d;) {
            var f = e++;
            a[f] = W.createInstance(b, c)
        }
    };
    var Wc = function() {};
    Wc.__name__ = ["de", "polygonal", "ds", "Queue"];
    Wc.__interfaces__ = [pa];
    var Sb = function(a, b, c) {
        null == b && (b = !0);
        this.maxSize = -1;
        this._capacity =
            a;
        this._isResizable = b;
        this._size = this._front = this._sizeLevel = 0;
        this._a = R.alloc(this._capacity);
        this._iterator = null;
        this.key = ka._counter++;
        this.reuseIterator = !1
    };
    Sb.__name__ = ["de", "polygonal", "ds", "ArrayedQueue"];
    Sb.__interfaces__ = [Wc];
    Sb.prototype = {
        enqueue: function(a) {
            this._capacity == this._size && this._isResizable && (this._sizeLevel++, this._pack(this._capacity << 1), this._front = 0, this._capacity <<= 1);
            this.__set((this._size+++this._front) % this._capacity, a)
        },
        dequeue: function() {
            var a = this.__get(this._front++);
            this._front == this._capacity && (this._front = 0);
            this._size--;
            this._isResizable && 0 < this._sizeLevel && this._size == this._capacity >> 2 && (this._sizeLevel--, this._pack(this._capacity >> 2), this._front = 0, this._capacity >>= 2);
            return a
        },
        iterator: function() {
            return this.reuseIterator ? (null == this._iterator ? this._iterator = new ub(this) : this._iterator.reset(), this._iterator) : new ub(this)
        },
        _pack: function(a) {
            a = R.alloc(a);
            for (var b = 0, c = this._size; b < c;) {
                var d = b++;
                a[d] = this.__get(this._front++);
                this._front == this._capacity &&
                    (this._front = 0)
            }
            this._a = a
        },
        __get: function(a) {
            return this._a[a]
        },
        __set: function(a, b) {
            this._a[a] = b
        },
        __class__: Sb
    };
    var ub = function(a) {
        this._f = a;
        this._a = R.copy(this._f._a, [], null, null);
        this._front = this._f._front;
        this._capacity = this._f._capacity;
        this._size = this._f._size;
        this._i = 0;
        this
    };
    ub.__name__ = ["de", "polygonal", "ds", "ArrayedQueueIterator"];
    ub.__interfaces__ = [qa];
    ub.prototype = {
        reset: function() {
            this._a = R.copy(this._f._a, [], null, null);
            this._front = this._f._front;
            this._capacity = this._f._capacity;
            this._size =
                this._f._size;
            this._i = 0;
            return this
        },
        hasNext: function() {
            return this._i < this._size
        },
        next: function() {
            return this._a[(this._i+++this._front) % this._capacity]
        },
        __class__: ub
    };
    var Xc = function() {};
    Xc.__name__ = ["de", "polygonal", "ds", "Stack"];
    Xc.__interfaces__ = [pa];
    var cb = function(a, b) {
        null == a && (a = 0);
        this._a = 0 < a ? R.alloc(a) : [];
        this._top = 0;
        this._iterator = null;
        this.key = ka._counter++;
        this.reuseIterator = !1;
        this.maxSize = -1
    };
    cb.__name__ = ["de", "polygonal", "ds", "ArrayedStack"];
    cb.__interfaces__ = [Xc];
    cb.prototype = {
        push: function(a) {
            this.__set(this._top++,
                a)
        },
        pop: function() {
            return this.__get(--this._top)
        },
        free: function() {
            for (var a = 0, b = this._a.length; a < b;) {
                var c = a++;
                this._a[c] = null
            }
            this._iterator = this._a = null
        },
        clear: function(a) {
            null == a && (a = !1);
            if (a) {
                a = 0;
                for (var b = this._a.length; a < b;) {
                    var c = a++;
                    this._a[c] = null
                }
            }
            this._top = 0
        },
        iterator: function() {
            return this.reuseIterator ? (null == this._iterator ? this._iterator = new vb(this) : this._iterator.reset(), this._iterator) : new vb(this)
        },
        __get: function(a) {
            return this._a[a]
        },
        __set: function(a, b) {
            this._a[a] = b
        },
        __class__: cb
    };
    var vb = function(a) {
        this._f = a;
        this._a = this._f._a;
        this._i = this._f._top - 1;
        this
    };
    vb.__name__ = ["de", "polygonal", "ds", "ArrayedStackIterator"];
    vb.__interfaces__ = [qa];
    vb.prototype = {
        reset: function() {
            this._a = this._f._a;
            this._i = this._f._top - 1;
            return this
        },
        hasNext: function() {
            return 0 <= this._i
        },
        next: function() {
            return this._a[this._i--]
        },
        __class__: vb
    };
    var ra = function(a, b) {
        null == a && (a = 0);
        this._size = 0;
        this._iterator = null;
        this.maxSize = -1;
        this._a = 0 < a ? R.alloc(a) : [];
        this.key = ka._counter++;
        this.reuseIterator = !1
    };
    ra.__name__ = ["de", "polygonal", "ds", "DA"];
    ra.__interfaces__ = [pa];
    ra.prototype = {
        set: function(a, b) {
            this._a[a] = b;
            a >= this._size && this._size++
        },
        pushBack: function(a) {
            this.set(this._size, a)
        },
        fill: function(a, b) {
            null == b && (b = 0);
            0 < b ? this._size = b : b = this._size;
            for (var c = 0; c < b;) {
                var d = c++;
                this._a[d] = a
            }
            return this
        },
        free: function() {
            for (var a = 0, b = this._a.length; a < b;) {
                var c = a++;
                this._a[c] = null
            }
            this._iterator = this._a = null
        },
        contains: function(a) {
            for (var b = !1, c = 0, d = this._size; c < d;) {
                var e = c++;
                if (this._a[e] == a) {
                    b = !0;
                    break
                }
            }
            return b
        },
        remove: function(a) {
            if (0 == this._size) return !1;
            for (var b = 0, c = this._size; b < c;)
                if (this._a[b] == a) {
                    c--;
                    for (var d = b; d < c;) this._a[d] = this._a[d + 1], ++d
                } else b++;
            a = 0 != this._size - c;
            this._size = c;
            return a
        },
        clear: function(a) {
            null == a && (a = !1);
            if (a) {
                a = 0;
                for (var b = this._a.length; a < b;) {
                    var c = a++;
                    this._a[c] = null
                }
            }
            this._size = 0
        },
        iterator: function() {
            return this.reuseIterator ? (null == this._iterator ? this._iterator = new wb(this) : this._iterator.reset(), this._iterator) : new wb(this)
        },
        __class__: ra
    };
    var wb = function(a) {
        this._f = a;
        this._a =
            this._f._a;
        this._s = this._f._size;
        this._i = 0;
        this
    };
    wb.__name__ = ["de", "polygonal", "ds", "DAIterator"];
    wb.__interfaces__ = [qa];
    wb.prototype = {
        reset: function() {
            this._a = this._f._a;
            this._s = this._f._size;
            this._i = 0;
            return this
        },
        hasNext: function() {
            return this._i < this._s
        },
        next: function() {
            return this._a[this._i++]
        },
        __class__: wb
    };
    var Rb = function(a, b) {
        null == a && (a = 0);
        this.maxSize = -1;
        this._reservedSize = a;
        this._poolSize = this._size = 0;
        this._circular = !1;
        this._iterator = null;
        0 < a && (this._headPool = this._tailPool = new ic(null,
            this));
        this.head = this.tail = null;
        this.key = ka._counter++;
        this.reuseIterator = !1
    };
    Rb.__name__ = ["de", "polygonal", "ds", "DLL"];
    Rb.__interfaces__ = [pa];
    Rb.prototype = {
        append: function(a) {
            a = this._getNode(a);
            null != this.tail ? (this.tail.next = a, a.prev = this.tail) : this.head = a;
            this.tail = a;
            this._circular && (this.tail.next = this.head, this.head.prev = this.tail);
            this._size++;
            return a
        },
        unlink: function(a) {
            var b = a.next;
            a == this.head ? (this.head = this.head.next, this._circular && (this.head == this.tail ? this.head = null : this.tail.next =
                this.head), null == this.head && (this.tail = null)) : a == this.tail && (this.tail = this.tail.prev, this._circular && (this.head.prev = this.tail), null == this.tail && (this.head = null));
            a._unlink();
            this._putNode(a);
            this._size--;
            return b
        },
        iterator: function() {
            if (this.reuseIterator) {
                if (null == this._iterator) return this._circular ? new xb(this) : new yb(this);
                this._iterator.reset();
                return this._iterator
            }
            return this._circular ? new xb(this) : new yb(this)
        },
        _getNode: function(a) {
            if (0 == this._reservedSize || 0 == this._poolSize) return new ic(a,
                this);
            var b = this._headPool;
            this._headPool = this._headPool.next;
            this._poolSize--;
            b.next = null;
            b.val = a;
            return b
        },
        _putNode: function(a) {
            var b = a.val;
            0 < this._reservedSize && this._poolSize < this._reservedSize ? (this._tailPool = this._tailPool.next = a, a.val = null, this._poolSize++) : a._list = null;
            return b
        },
        __class__: Rb
    };
    var yb = function(a) {
        this._f = a;
        this._walker = this._f.head;
        this._hook = null;
        this
    };
    yb.__name__ = ["de", "polygonal", "ds", "DLLIterator"];
    yb.__interfaces__ = [qa];
    yb.prototype = {
        reset: function() {
            this._walker = this._f.head;
            this._hook = null;
            return this
        },
        hasNext: function() {
            return null != this._walker
        },
        next: function() {
            var a = this._walker.val;
            this._hook = this._walker;
            this._walker = this._walker.next;
            return a
        },
        __class__: yb
    };
    var xb = function(a) {
        this._f = a;
        this._walker = this._f.head;
        this._s = this._f._size;
        this._i = 0;
        this._hook = null;
        this
    };
    xb.__name__ = ["de", "polygonal", "ds", "CircularDLLIterator"];
    xb.__interfaces__ = [qa];
    xb.prototype = {
        reset: function() {
            this._walker = this._f.head;
            this._s = this._f._size;
            this._i = 0;
            this._hook = null;
            return this
        },
        hasNext: function() {
            return this._i < this._s
        },
        next: function() {
            var a = this._walker.val;
            this._hook = this._walker;
            this._walker = this._walker.next;
            this._i++;
            return a
        },
        __class__: xb
    };
    var ic = function(a, b) {
        this.val = a;
        this._list = b
    };
    ic.__name__ = ["de", "polygonal", "ds", "DLLNode"];
    ic.prototype = {
        _unlink: function() {
            var a = this.next;
            null != this.prev && (this.prev.next = this.next);
            null != this.next && (this.next.prev = this.prev);
            this.next = this.prev = null;
            return a
        },
        _insertAfter: function(a) {
            a.next = this.next;
            a.prev = this;
            null != this.next &&
                (this.next.prev = a);
            this.next = a
        },
        _insertBefore: function(a) {
            a.next = this;
            a.prev = this.prev;
            null != this.prev && (this.prev.next = a);
            this.prev = a
        },
        __class__: ic
    };
    var ka = function() {};
    ka.__name__ = ["de", "polygonal", "ds", "HashKey"];
    var Tb = function(a, b) {
        null == a && (a = 0);
        this.maxSize = -1;
        this._a = 0 < a ? R.alloc(a + 1) : [];
        this._a[0] = null;
        this._size = 0;
        this._iterator = null;
        this.key = ka._counter++;
        this.reuseIterator = !1
    };
    Tb.__name__ = ["de", "polygonal", "ds", "Heap"];
    Tb.__interfaces__ = [pa];
    Tb.prototype = {
        add: function(a) {
            this.__set(++this._size,
                a);
            a.position = this._size;
            this._upheap(this._size)
        },
        pop: function() {
            var a = this._a[1];
            this._a[1] = this._a[this._size];
            this._downheap(1);
            this._size--;
            return a
        },
        iterator: function() {
            return this.reuseIterator ? (null == this._iterator ? this._iterator = new zb(this) : this._iterator.reset(), this._iterator) : new zb(this)
        },
        _upheap: function(a) {
            for (var b = a >> 1, c = this._a[a], d; 0 < b;)
                if (d = this._a[b], 0 < c.compare(d)) this._a[a] = d, d.position = a, a = b, b >>= 1;
                else break;
            c.position = a;
            this._a[a] = c
        },
        _downheap: function(a) {
            for (var b = a << 1,
                    c = this._a[a], d = this._size - 1; b < this._size;) {
                b < d && 0 > this._a[b].compare(this._a[b + 1]) && b++;
                var e = this._a[b];
                if (0 > c.compare(e)) this._a[a] = e, e.position = a, a = c.position = b, b <<= 1;
                else break
            }
            c.position = a;
            this._a[a] = c
        },
        __set: function(a, b) {
            this._a[a] = b
        },
        __class__: Tb
    };
    var zb = function(a) {
        this._f = a;
        this._a = [];
        this._a[0] = null;
        this.reset()
    };
    zb.__name__ = ["de", "polygonal", "ds", "HeapIterator"];
    zb.__interfaces__ = [qa];
    zb.prototype = {
        reset: function() {
            this._s = this._f._size + 1;
            this._i = 1;
            for (var a = this._f._a, b = 1, c = this._s; b <
                c;) {
                var d = b++;
                this._a[d] = a[d]
            }
            return this
        },
        hasNext: function() {
            return this._i < this._s
        },
        next: function() {
            return this._a[this._i++]
        },
        __class__: zb
    };
    var Yc = function() {};
    Yc.__name__ = ["de", "polygonal", "ds", "Set"];
    Yc.__interfaces__ = [pa];
    var Zc = function() {};
    Zc.__name__ = ["de", "polygonal", "ds", "Map"];
    Zc.__interfaces__ = [pa];
    var Ab = function(a, b, c, d) {
        null == c && (c = !0);
        null == b && (b = -1); - 1 == b && (b = a);
        this._isResizable = c;
        this._free = 0;
        this._capacity = b;
        this._size = 0;
        this._mask = a - 1;
        this._sizeLevel = 0;
        this._iterator = null;
        this.maxSize = -1;
        this._hash = R.alloc(a);
        R.fill(this._hash, -1, a);
        this._data = R.alloc(3 * this._capacity);
        R.fill(this._data, 0, 3 * this._capacity);
        this._next = R.alloc(this._capacity);
        R.fill(this._next, 0, this._capacity);
        a = 2;
        for (c = 0; c < b;) c++, this._data[a - 1] = -2147483648, this._data[a] = -1, a += 3;
        b = 0;
        for (a = this._capacity - 1; b < a;) c = b++, this._next[c] = c + 1;
        this._next[this._capacity - 1] = -1;
        this.key = ka._counter++;
        this.reuseIterator = !1
    };
    Ab.__name__ = ["de", "polygonal", "ds", "IntIntHashTable"];
    Ab.__interfaces__ = [Zc];
    Ab.prototype = {
        get: function(a) {
            var b =
                this._hash[73856093 * a & this._mask];
            if (-1 == b) return -2147483648;
            if (this._data[b] == a) return this._data[b + 1];
            for (var c = -2147483648, b = this._data[b + 2]; - 1 != b;) {
                if (this._data[b] == a) {
                    c = this._data[b + 1];
                    break
                }
                b = this._data[b + 2]
            }
            return c
        },
        set: function(a, b) {
            this._size == this._capacity && this._isResizable && this._expand();
            var c = 3 * this._free;
            this._free = this._next[this._free];
            this._data[c] = a;
            this._data[c + 1] = b;
            var d = 73856093 * a & this._mask,
                e = this._hash[d];
            if (-1 == e) return this._hash[d] = c, this._size++, !0;
            for (var d = this._data[e] !=
                a, f = this._data[e + 2]; - 1 != f;) this._data[f] == a && (d = !1), e = f, f = this._data[f + 2];
            this._data[e + 2] = c;
            this._size++;
            return d
        },
        iterator: function() {
            return this.reuseIterator ? (null == this._iterator ? this._iterator = new Bb(this) : this._iterator.reset(), this._iterator) : new Bb(this)
        },
        _expand: function() {
            this._sizeLevel++;
            var a = this._capacity,
                b = a << 1;
            this._capacity = b;
            var c = R.alloc(b);
            R.copy(this._next, c, 0, a);
            this._next = c;
            c = R.alloc(3 * b);
            R.copy(this._data, c, 0, 3 * a);
            this._data = c;
            for (var c = a - 1, d = b - 1; c < d;) {
                var e = c++;
                this._next[e] =
                    e + 1
            }
            this._next[b - 1] = -1;
            this._free = a;
            b = 3 * a + 2;
            for (c = 0; c < a;) c++, this._data[b - 1] = -2147483648, this._data[b] = -1, b += 3
        },
        __class__: Ab
    };
    var Bb = function(a) {
        this._f = a;
        this._data = this._f._data;
        this._i = 0;
        for (this._s = this._f._capacity; this._i < this._s && -2147483648 == this._data[3 * this._i + 1];) this._i++
    };
    Bb.__name__ = ["de", "polygonal", "ds", "IntIntHashTableValIterator"];
    Bb.__interfaces__ = [qa];
    Bb.prototype = {
        reset: function() {
            this._data = this._f._data;
            this._i = 0;
            for (this._s = this._f._capacity; this._i < this._s && -2147483648 == this._data[3 *
                this._i + 1];) this._i++;
            return this
        },
        hasNext: function() {
            return this._i < this._s
        },
        next: function() {
            for (var a = this.__getData(3 * this._i+++1); this._i < this._s && -2147483648 == this._data[3 * this._i + 1];) this._i++;
            return a
        },
        __getData: function(a) {
            return this._data[a]
        },
        __class__: Bb
    };
    var Pb = function() {
        this._a = new ra;
        this.key = ka._counter++;
        this.reuseIterator = !1
    };
    Pb.__name__ = ["de", "polygonal", "ds", "ListSet"];
    Pb.__interfaces__ = [Yc];
    Pb.prototype = {
        set: function(a) {
            if (this._a.contains(a)) return !1;
            this._a.pushBack(a);
            return !0
        },
        remove: function(a) {
            return this._a.remove(a)
        },
        iterator: function() {
            this._a.reuseIterator = this.reuseIterator;
            return this._a.iterator()
        },
        __class__: Pb
    };
    var kc = function(a, b) {
        null == a && (a = 0);
        this.maxSize = -1;
        this._reservedSize = a;
        this._poolSize = this._size = 0;
        this._circular = !1;
        this._iterator = null;
        0 < a && (this._headPool = this._tailPool = new jc(null, this));
        this.head = this.tail = null;
        this.key = ka._counter++;
        this.reuseIterator = !1
    };
    kc.__name__ = ["de", "polygonal", "ds", "SLL"];
    kc.__interfaces__ = [pa];
    kc.prototype = {
        append: function(a) {
            a =
                this._getNode(a);
            null != this.tail ? this.tail.next = a : this.head = a;
            this.tail = a;
            this._circular && (this.tail.next = this.head);
            this._size++;
            return a
        },
        free: function() {
            for (var a = this.head, b = 0, c = this._size; b < c;) {
                b++;
                var d = a.next;
                a.free();
                a = d
            }
            this.head = this.tail = null;
            for (a = this._headPool; null != a;) b = a.next, a.free(), a = b;
            this._iterator = this._headPool = this._tailPool = null
        },
        remove: function(a) {
            var b = this._size;
            if (0 == b) return !1;
            for (var c = this.head, d = this.head.next, e = 1, f = this._size; e < f;)
                if (e++, d.val == a) {
                    d == this.tail && (this.tail =
                        c, this._circular && (this.tail.next = this.head));
                    var g = d.next;
                    c.next = g;
                    this._putNode(d);
                    d = g;
                    this._size--
                } else c = d, d = d.next;
            this.head.val == a && (a = this.head.next, this._putNode(this.head), this.head = a, null == this.head ? this.tail = null : this._circular && (this.tail.next = this.head), this._size--);
            return this._size < b
        },
        iterator: function() {
            if (this.reuseIterator) {
                if (null == this._iterator) return this._circular ? new Cb(this) : new Db(this);
                this._iterator.reset();
                return this._iterator
            }
            return this._circular ? new Cb(this) : new Db(this)
        },
        _getNode: function(a) {
            if (0 == this._reservedSize || 0 == this._poolSize) return new jc(a, this);
            var b = this._headPool;
            this._headPool = this._headPool.next;
            this._poolSize--;
            b.val = a;
            b.next = null;
            return b
        },
        _putNode: function(a) {
            var b = a.val;
            0 < this._reservedSize && this._poolSize < this._reservedSize ? (this._tailPool = this._tailPool.next = a, a.val = null, a.next = null, this._poolSize++) : a._list = null;
            return b
        },
        __class__: kc
    };
    var Db = function(a) {
        this._f = a;
        this._walker = this._f.head;
        this._hook = null;
        this
    };
    Db.__name__ = ["de", "polygonal",
        "ds", "SLLIterator"
    ];
    Db.__interfaces__ = [qa];
    Db.prototype = {
        reset: function() {
            this._walker = this._f.head;
            this._hook = null;
            return this
        },
        hasNext: function() {
            return null != this._walker
        },
        next: function() {
            var a = this._walker.val;
            this._hook = this._walker;
            this._walker = this._walker.next;
            return a
        },
        __class__: Db
    };
    var Cb = function(a) {
        this._f = a;
        this._walker = this._f.head;
        this._s = this._f._size;
        this._i = 0;
        this._hook = null;
        this
    };
    Cb.__name__ = ["de", "polygonal", "ds", "CircularSLLIterator"];
    Cb.__interfaces__ = [qa];
    Cb.prototype = {
        reset: function() {
            this._walker =
                this._f.head;
            this._s = this._f._size;
            this._i = 0;
            this._hook = null;
            return this
        },
        hasNext: function() {
            return this._i < this._s
        },
        next: function() {
            var a = this._walker.val;
            this._hook = this._walker;
            this._walker = this._walker.next;
            this._i++;
            return a
        },
        __class__: Cb
    };
    var jc = function(a, b) {
        this.val = a;
        this._list = b
    };
    jc.__name__ = ["de", "polygonal", "ds", "SLLNode"];
    jc.prototype = {
        free: function() {
            this.next = this.val = null
        },
        _insertAfter: function(a) {
            a.next = this.next;
            this.next = a
        },
        __class__: jc
    };
    var Ub = function(a) {
        this._size = a;
        this._free = -1;
        this.key = ka._counter++
    };
    Ub.__name__ = ["de", "polygonal", "ds", "pooling", "ObjectPool"];
    Ub.__interfaces__ = [Ob];
    Ub.prototype = {
        next: function() {
            var a = this._free;
            this._free = this._next[a];
            return a
        },
        get: function(a) {
            this._lazy && null == this._pool[a] && (this._pool[a] = this._lazyConstructor());
            return this._pool[a]
        },
        put: function(a) {
            this._next[a] = this._free;
            this._free = a
        },
        allocate: function(a, b, c, d) {
            this._lazy = a;
            this._next = R.alloc(this._size);
            a = 0;
            for (var e = this._size - 1; a < e;) {
                var f = a++;
                this._next[f] = f + 1
            }
            this._next[this._size -
                1] = -1;
            this._free = 0;
            this._pool = R.alloc(this._size);
            if (this._lazy) null != b ? this._lazyConstructor = function() {
                return W.createInstance(b, [])
            } : null != c ? this._lazyConstructor = function() {
                return c()
            } : null != d && (this._lazyConstructor = function() {
                return d.create()
            });
            else if (null != b)
                for (a = 0, e = this._size; a < e;) f = a++, this._pool[f] = W.createInstance(b, []);
            else if (null != c)
                for (a = 0, e = this._size; a < e;) f = a++, this._pool[f] = c();
            else if (null != d)
                for (a = 0, e = this._size; a < e;) f = a++, this._pool[f] = d.create()
        },
        __class__: Ub
    };
    var Eb = function(a,
        b, c, d) {
        null == d && (d = 1);
        null == c && (c = 0);
        null == b && (b = 0);
        null == a && (a = 0);
        na.call(this, a, b, c, d)
    };
    Eb.__name__ = ["de", "polygonal", "gl", "color", "ColorRGBA"];
    Eb.__super__ = na;
    Eb.prototype = B(na.prototype, {
        __class__: Eb
    });
    var Fc = function(a, b, c, d, e, f, g, h) {
        null == h && (h = 0);
        null == g && (g = 0);
        null == f && (f = 0);
        null == e && (e = 0);
        null == d && (d = 1);
        null == c && (c = 1);
        null == b && (b = 1);
        null == a && (a = 1);
        this.multiplier = new Eb(a, b, c, d);
        this.offset = new Eb(e, f, g, h)
    };
    Fc.__name__ = ["de", "polygonal", "gl", "color", "ColorXForm"];
    Fc.prototype = {
        __class__: Fc
    };
    var C = function(a, b, c, d) {
        null == d && (d = -1);
        null == c && (c = -1);
        null == b && (b = 1);
        null == a && (a = 1);
        a <= c && b <= d ? (this.minX = a, this.minY = b, this.maxX = c, this.maxY = d) : (this.minX = this.minY = Math.POSITIVE_INFINITY, this.maxX = this.maxY = Math.NEGATIVE_INFINITY)
    };
    C.__name__ = "de polygonal motor geom primitive AABB2".split(" ");
    C.__interfaces__ = [Vc];
    C.prototype = {
        get_intervalX: function() {
            return this.maxX - this.minX
        },
        setMinX: function(a) {
            a -= this.minX;
            this.minX += a;
            this.maxX += a
        },
        setMinY: function(a) {
            a -= this.minY;
            this.minY += a;
            this.maxY +=
                a
        },
        clone: function() {
            return new C(this.minX, this.minY, this.maxX, this.maxY)
        },
        __class__: C
    };
    var P = {
        __ename__: !0,
        __constructs__: "Android iOs Linux Windows MacOs ChromeOs Unknown".split(" "),
        Android: ["Android", 0]
    };
    P.Android.toString = n;
    P.Android.__enum__ = P;
    P.iOs = ["iOs", 1];
    P.iOs.toString = n;
    P.iOs.__enum__ = P;
    P.Linux = ["Linux", 2];
    P.Linux.toString = n;
    P.Linux.__enum__ = P;
    P.Windows = ["Windows", 3];
    P.Windows.toString = n;
    P.Windows.__enum__ = P;
    P.MacOs = ["MacOs", 4];
    P.MacOs.toString = n;
    P.MacOs.__enum__ = P;
    P.ChromeOs = ["ChromeOs",
        5
    ];
    P.ChromeOs.toString = n;
    P.ChromeOs.__enum__ = P;
    P.Unknown = ["Unknown", 6];
    P.Unknown.toString = n;
    P.Unknown.__enum__ = P;
    var ca = function() {
        this.h = {}
    };
    ca.__name__ = ["haxe", "ds", "StringMap"];
    ca.__interfaces__ = [Sc];
    ca.prototype = {
        set: function(a, b) {
            this.h["$" + a] = b
        },
        get: function(a) {
            return this.h["$" + a]
        },
        exists: function(a) {
            return this.h.hasOwnProperty("$" + a)
        },
        remove: function(a) {
            a = "$" + a;
            if (!this.h.hasOwnProperty(a)) return !1;
            delete this.h[a];
            return !0
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) &&
                a.push(b.substr(1));
            return y.iter(a)
        },
        __class__: ca
    };
    var E = function() {};
    E.__name__ = ["de", "polygonal", "platform", "js", "Context"];
    E.getPlatform = function() {
        for (var a = null, b = window.navigator.userAgent, c = 0, d = 0, e = [new ba("Android", ""), new ba("(iP[ao]d|iPhone)", "i"), new ba("Linux", ""), new ba("Windows", ""), new ba("Mac OS", ""), new ba("CrOS", "")]; d < e.length;) {
            var f = e[d];
            ++d;
            if (f.match(b)) {
                a = W.createEnumIndex(P, c);
                break
            }
            c++
        }
        null == a && (a = P.Unknown);
        return a
    };
    E.isAndroidStockBrowser = function() {
        var a = window.navigator.userAgent,
            b = -1 < a.indexOf("Android") && -1 < a.indexOf("Mozilla/5.0") && -1 < a.indexOf("AppleWebKit"),
            c = new ba("AppleWebKit/([\\d.]+)", "");
        return c.match(a) ? (a = u.parseFloat(c.matched(1)), b && 537 > a) : !1
    };
    E.getWebAudioContext = function() {
        if (E.isWebAudioSupported()) {
            if (null == E.mWebAudioContext) {
                var a = E.getFeature("AudioContext", window);
                E.mWebAudioContext = new a.feature
            }
            return E.mWebAudioContext
        }
        return null
    };
    E.getFeature = function(a, b) {
        var c = X.field(b, a);
        if (null != c) return {
            feature: c,
            supported: !0,
            prefix: "",
            fieldName: a
        };
        for (var c =
            0, d = ["moz", "webkit", "ms", "o", "khtml"]; c < d.length;) {
            var e = d[c];
            ++c;
            var f = "" + e + (a.charAt(0).toUpperCase() + y.substr(a, 1, null)),
                g = X.field(b, f);
            if (null != g) return b[a] = g, {
                feature: g,
                supported: !0,
                prefix: e,
                fieldName: f
            }
        }
        return {
            feature: null,
            supported: !1,
            prefix: null,
            fieldName: null
        }
    };
    E.getFeature2 = function(a, b) {
        for (var c = 0; c < a.length;) {
            var d = a[c];
            ++c;
            var e = X.field(b, d);
            if (null != e) return {
                feature: e,
                supported: !0,
                name: d,
                prefix: ""
            };
            for (var e = 0, f = ["moz", "webkit", "ms", "o", "khtml"]; e < f.length;) {
                var g = f[e];
                ++e;
                var h = "" +
                    g + (d.charAt(0).toUpperCase() + y.substr(d, 1, null)),
                    h = X.field(b, h);
                if (null != h) return b[d] = h, {
                    feature: h,
                    supported: !0,
                    name: d,
                    prefix: g
                }
            }
        }
        return {
            feature: null,
            supported: !1,
            name: null,
            prefix: null
        }
    };
    E.isDesktop = function() {
        switch (E.getPlatform()[1]) {
            case 3:
            case 4:
            case 2:
                return !0;
            default:
                return !1
        }
    };
    E.isFullscreenSupported = function() {
        return null != E.getFeature("fullscreenEnabled", window.document) || null != E.getFeature("fullScreenEnabled", window.document)
    };
    E.isWebAudioSupported = function() {
        return E.getFeature("AudioContext",
            window).supported
    };
    E.fixAndroidMath = function() {
        if (0 <= window.navigator.userAgent.indexOf("Linux; U; Android 4")) {
            var a = Math.sin,
                b = Math.cos;
            Math.sin = function(b) {
                return 0 == b ? 0 : a(b)
            };
            Math.cos = function(a) {
                return 0 == a ? 1 : b(a)
            }
        }
    };
    var vc = function(a) {
        var b = this;
        this.mCallback = a;
        var c = E.getFeature("hidden", window.document);
        c.supported ? (a = function(a) {
            b.mHidden = X.field(window.document, c.fieldName);
            b.mCallback(!1 == b.mHidden)
        }, a(null), window.document.addEventListener("" + c.prefix + "visibilitychange", a, !1)) : (a = function(a) {
            b.mCallback(!1 ==
                b.mHidden)
        }, window.addEventListener("pageshow", a, !1), window.addEventListener("pagehide", a, !1))
    };
    vc.__name__ = ["de", "polygonal", "platform", "js", "PageVisibility"];
    vc.prototype = {
        __class__: vc
    };
    var Mb = function() {
        var a = this;
        if (E.getFeature("requestAnimationFrame", window).supported && null != window.performance && E.getFeature("now", window.performance).supported) {
            var b = ($c = window, F($c, $c.requestAnimationFrame)),
                c = null,
                c = function(d) {
                    b(c);
                    a.mTime = d;
                    null != a.mHandler && a.mHandler();
                    return !0
                };
            this.mTime = window.performance.now();
            c(this.mTime)
        } else {
            this.mTime = Date.now();
            var d = null,
                d = function() {
                    window.setTimeout(d, 0);
                    a.mTime = Date.now();
                    null != a.mHandler && a.mHandler()
                };
            d()
        }
    };
    Mb.__name__ = ["de", "polygonal", "platform", "js", "TimeProvider"];
    Mb.__interfaces__ = [Dc];
    Mb.prototype = {
        now: function() {
            return this.mTime / 1E3
        },
        setTimingEventHandler: function(a) {
            this.mHandler = a
        },
        __class__: Mb
    };
    var z = function() {};
    z.__name__ = "de polygonal platform js res AssetLoader".split(" ");
    z.load = function(a, b, c) {
        z.mLoadCallback = a;
        z.mAssetsByName = new ca;
        z.mNumRemainingFiles =
            0;
        try {
            null
        } catch (d) {}
        try {
            var e = new XMLHttpRequest;
            e.open("GET", ".", !0);
            e.responseType = "blob";
            z.mURL = E.getFeature("URL", window).feature;
            z.mBlobSupported = "blob" == e.responseType && null != z.mURL && null != X.field(z.mURL, "createObjectURL")
        } catch (f) {}
        E.allowXhr || (z.mBlobSupported = !1);
        a = new ba("\\.([a-zA-Z0-9]{3,4}$)", "");
        for (var e = 0, g = s.all; e < g.length;) {
            var h = g[e];
            ++e;
            if (null == b || b.match(h))
                if (null == c || !c.match(h)) switch (z.mNumRemainingFiles++, a.match(h), a.matched(1)) {
                    case "png":
                    case "jpg":
                    case "gif":
                        z.loadImage(h);
                        break;
                    case "mp3":
                    case "ogg":
                    case "wav":
                    case "aac":
                        z.loadAudio(h);
                        break;
                    case "txt":
                    case "xml":
                    case "json":
                    case "fnt":
                        z.loadText(h)
                }
        }
    };
    z.xhr = function(a, b, c) {
        var d = new XMLHttpRequest;
        d.onerror = function(a) {
            window.clearInterval(0);
            null
        };
        d.onload = function(a) {
            window.clearInterval(0);
            404 != d.status && (a = d.response, null == a ? a = d.responseText : "blob" == b && "arraybuffer" == d.responseType && (a = new Blob([d.response])), c(a))
        };
        try {
            ad.stamp(), d.open("GET", a, !0), d.responseType = b, "" == d.responseType && (d.responseType = "arraybuffer"),
            d.send()
        } catch (e) {
            null
        }
        return d
    };
    z.loadAudio = function(a) {
        if (E.isWebAudioSupported()) z.xhr(a, "arraybuffer", function(b) {
            E.getWebAudioContext().decodeAudioData(b, function(b) {
                z.onFileLoaded(a, b);
                return !0
            }, function(a) {
                return !0
            })
        });
        else {
            var b;
            b = window.document.createElement("audio");
            b.setAttribute("type", "audio/wave");
            b.preload = "auto";
            b.addEventListener("canplaythrough", function(c) {
                z.onFileLoaded(a, b)
            });
            b.addEventListener("error", function(a) {
                null
            });
            b.addEventListener("progress", function(a) {
                0 < b.buffered.length &&
                    0 < b.duration && b.buffered.end(0)
            });
            b.src = a;
            b.load()
        }
    };
    z.loadImage = function(a) {
        var b;
        b = window.document.createElement("img");
        b.addEventListener("load", function(c) {
            z.onFileLoaded(a, b)
        });
        z.mBlobSupported ? z.xhr(a, "blob", function(a) {
            b.src = z.mURL.createObjectURL(a)
        }) : b.src = a
    };
    z.loadText = function(a) {
        z.xhr(a, "text", function(b) {
            z.onFileLoaded(a, b)
        })
    };
    z.onFileLoaded = function(a, b) {
        try {
            z.mAssetsByName.set(a, b), 0 == --z.mNumRemainingFiles && (z.mLoadCallback(z.mAssetsByName), z.mLoadCallback = null)
        } catch (c) {
            null
        }
    };
    var bd =
        function() {};
    bd.__name__ = ["de", "polygonal", "snd", "L"];
    bd.d = function(a, b) {};
    var Gc = function() {};
    Gc.__name__ = ["de", "polygonal", "snd", "SoundAsset"];
    Gc.prototype = {
        __class__: Gc
    };
    var ja = function() {
        this._volEnvelopeJob = this._onFadeComplete = this._onComplete = null;
        this._poolId = -1;
        this._pan = this._loops = this._startTime = 0;
        this._vol = 1;
        this.assetId = this._asset = null;
        this.id = 0;
        this._volEnvelope = new lc(this)
    };
    ja.__name__ = ["de", "polygonal", "snd", "SoundNode"];
    ja.prototype = {
        setAsset: function(a, b) {
            this._asset = a;
            this.assetId =
                b
        },
        isMusic: function() {
            return this._asset.isMusic
        },
        play: function() {
            this.isPlaying = !0;
            return this
        },
        stop: function() {
            this.isPlaying = !1;
            p._activeSoundNodes.remove(this.id);
            this.id = 0;
            null != this._volEnvelopeJob && this._volEnvelopeJob.cancel();
            return this
        },
        getVolume: function() {
            return this._vol
        },
        setVolume: function(a) {
            this._vol = a * (this._asset.isMusic ? p._musicVolume : p._soundVolume) * p._masterVolume;
            return this
        },
        mute: function() {
            this.setVolume(0);
            return this
        },
        setPan: function(a) {
            this._pan = a;
            return this
        },
        repeat: function(a) {
            this._loops =
                a;
            return this
        },
        loop: function() {
            this._loops = -1;
            return this
        },
        from: function(a) {
            this._startTime = a;
            return this
        },
        fade: function(a, b, c) {
            this._onFadeComplete = c;
            this._volEnvelope.srcValue = this._vol;
            this._volEnvelope.dstValue = a;
            null != this._volEnvelopeJob && (this._volEnvelopeJob.cancel(), this._volEnvelopeJob = null);
            this._volEnvelopeJob = (new Qb(this._volEnvelope)).run(null, b);
            return this
        },
        onComplete: function(a) {
            this._onComplete = a;
            return this
        },
        reset: function() {
            this._loops = this._lastAction = 0;
            this._vol = 1;
            this._startTime =
                this._pan = 0
        },
        onVolumeEnvelopeComplete: function() {
            this._volEnvelopeJob = null;
            null != this._onFadeComplete && (this._onFadeComplete(), this._onFadeComplete = null)
        },
        __class__: ja
    };
    var p = function() {};
    p.__name__ = ["de", "polygonal", "snd", "SoundSystem"];
    p.init = function() {
        if (p._init) throw "";
        p._init = !0;
        p._assets = new ca;
        p._activeSoundNodes = new Z;
        p._lastPlayTime = new ca;
        p._mute = !1;
        p._initialized = !0;
        p._nextId = 1;
        p._numActiveChannels = 0;
        p._masterVolume = 1;
        p._musicVolume = 1;
        p._soundVolume = 1
    };
    p.get_mute = function() {
        return p._mute
    };
    p.set_mute = function(a) {
        p.set_masterVolume((p._mute = a) ? 0 : 1);
        return a
    };
    p.get_masterVolume = function() {
        return p._masterVolume
    };
    p.set_masterVolume = function(a) {
        bd.d(m.format("set master volume to %.2f", [a]), null);
        return p._masterVolume = a
    };
    p.get_musicVolume = function() {
        return p._musicVolume
    };
    p.set_musicVolume = function(a) {
        p._musicVolume = a;
        for (var b = p._activeSoundNodes.iterator(); b.hasNext();) {
            var c = b.next();
            if (c.isMusic()) {
                c.setVolume(a);
                break
            }
        }
        return a
    };
    p.get_soundVolume = function() {
        return p._soundVolume
    };
    p.set_soundVolume = function(a) {
        p._soundVolume = a;
        for (var b = p._activeSoundNodes.iterator(); b.hasNext();) {
            var c = b.next();
            c.isMusic() || c.setVolume(a)
        }
        return a
    };
    p.registerSoundAsset = function(a, b, c) {
        null == c && (c = !1);
        var d = new Gc;
        d.data = b;
        d.isMusic = c;
        p._assets.set(a, d)
    };
    p.soundAssetExists = function(a) {
        return p._assets.exists(a)
    };
    p.createNode = function(a) {
        if (32 == p._numActiveChannels) return null;
        var b = p.getFreeSoundNode(),
            c = p.getAsset(a);
        b.setAsset(c, a);
        b.id = p._nextId++;
        p._activeSoundNodes.set(b.id, b);
        p._numActiveChannels++;
        b.isMusic() ? b.setVolume(p._musicVolume) : 1 > p._soundVolume && b.setVolume(p._soundVolume);
        return b
    };
    p.play = function(a) {
        var b = null,
            b = p.createNode(a);
        null != b && (b.isMusic() ? b.setVolume(p._musicVolume) : 1 > p._soundVolume && b.setVolume(p._soundVolume), b.play());
        return b
    };
    p.stop = function(a) {
        return p.isPlaying(a) ? p.find(a).stop() : null
    };
    p.stopById = function(a) {
        for (var b = fa.filter(p._activeSoundNodes, function(b) {
            return b.assetId == a
        }).iterator(); b.hasNext();) b.next().stop()
    };
    p.stopAll = function() {
        for (var a = p._activeSoundNodes.keys(); a.hasNext();) {
            var b =
                a.next();
            p._activeSoundNodes.get(b).stop()
        }
    };
    p.find = function(a) {
        p._initialized || p.init();
        return p._activeSoundNodes.exists(a) ? p._activeSoundNodes.get(a) : null
    };
    p.findByAsset = function(a) {
        return p._initialized ? fa.array(fa.filter(p._activeSoundNodes, function(b) {
            return b.assetId == a
        })) : []
    };
    p.isPlaying = function(a) {
        return null != p.find(a)
    };
    p.isMusicPlaying = function() {
        for (var a = p._activeSoundNodes.iterator(); a.hasNext();)
            if (a.next().isMusic()) return !0;
        return !1
    };
    p.getAsset = function(a) {
        return p._assets.get(a)
    };
    p.getFreeSoundNode = function() {
        return E.isWebAudioSupported() ? new mc : new nc
    };
    var Ma = function(a) {
        this.node = a;
        this.ease = new Ea(2)
    };
    Ma.__name__ = ["de", "polygonal", "snd", "SoundTween"];
    Ma.__interfaces__ = [Cc];
    Ma.prototype = {
        onStart: function() {
            this.update(this.srcValue)
        },
        onProgress: function(a) {
            this.update(Y.lerp(this.srcValue, this.dstValue, this.ease.interpolate(a)))
        },
        onComplete: function() {
            this.update(this.dstValue)
        },
        onAbort: function() {},
        update: function(a) {},
        __class__: Ma
    };
    var lc = function(a) {
        Ma.call(this, a)
    };
    lc.__name__ = ["de", "polygonal", "snd", "VolumeEnvelope"];
    lc.__super__ = Ma;
    lc.prototype = B(Ma.prototype, {
        update: function(a) {
            this.node.setVolume(a)
        },
        onComplete: function() {
            Ma.prototype.onComplete.call(this);
            this.node.onVolumeEnvelopeComplete()
        },
        __class__: lc
    });
    var nc = function() {
        ja.call(this)
    };
    nc.__name__ = ["de", "polygonal", "snd", "js", "AudioElementSoundNode"];
    nc.__super__ = ja;
    nc.prototype = B(ja.prototype, {
        play: function() {
            var a;
            a = J.__cast(this._asset.data, HTMLAudioElement);
            a.addEventListener("ended", F(this, this.onEnded));
            a.play();
            return ja.prototype.play.call(this)
        },
        onEnded: function(a) {
            J.__cast(this._asset.data, HTMLAudioElement).removeEventListener("ended", F(this, this.onEnded));
            this.isPlaying = !1;
            0 < this.id && p._activeSoundNodes.remove(this.id);
            p._numActiveChannels--;
            this._poolId = -1;
            null != this._onComplete && (this._onComplete(), this._onComplete = null)
        },
        stop: function() {
            return this
        },
        setVolume: function(a) {
            return this
        },
        setPan: function(a) {
            return this
        },
        reset: function() {
            ja.prototype.reset.call(this)
        },
        __class__: nc
    });
    var mc = function() {
        ja.call(this);
        this.mContext = E.getWebAudioContext();
        try {
            this._source = this.mContext.createBufferSource(), this._source.connect(this.mContext.destination), this._pannerNode = null
        } catch (a) {
            window.document.getElementById("dump").innerHTML = "node fail! " + u.string(a)
        }
    };
    mc.__name__ = ["de", "polygonal", "snd", "js", "WebAudioSoundNode"];
    mc.__super__ = ja;
    mc.prototype = B(ja.prototype, {
        play: function() {
            p._numActiveChannels--;
            this._start(this._source, 0);
            return this
        },
        _createGain: function() {
            return null != this.mContext.createGain ? this.mContext.createGain() :
                this.mContext.createGainNode()
        },
        _start: function(a, b) {
            null != a.start ? a.start(b) : a.noteOn(b)
        },
        stop: function() {
            this._source.stop(this.mContext.currentTime);
            return this
        },
        setVolume: function(a) {
            ja.prototype.setVolume.call(this, a);
            return this
        },
        setPan: function(a) {
            ja.prototype.setPan.call(this, a);
            return this
        },
        setAsset: function(a, b) {
            ja.prototype.setAsset.call(this, a, b);
            this._source.buffer = a.data
        },
        __class__: mc
    });
    var cd = function() {};
    cd.__name__ = ["de", "polygonal", "zz", "L"];
    cd.d = function(a, b) {};
    var x = function() {};
    x.__name__ = ["de", "polygonal", "zz", "RenderSystem"];
    x.init = function() {
        x._atlasLookup = new ca;
        x.setScene(new Na("scene_root"));
        x.images = new ca;
        x._textureUsageCount = new Ab(256)
    };
    x.setRenderer = function(a) {
        x.mRenderer = a
    };
    x.getScene = function() {
        return x._scene
    };
    x.setScene = function(a) {
        x._scene = a
    };
    x.drawScene = function() {
        null != x.mRenderer && null != x._scene && x.mRenderer.drawScene(x._scene)
    };
    x.getAtlas = function(a) {
        return x._atlasLookup.get(a)
    };
    x.getImage = function(a) {
        if (!x.images.exists(a)) throw 'image with id "' +
            a + '" does not exits, call registerImageData(imageId) first.';
        return x.images.get(a)
    };
    x.defineImage = function(a, b, c) {
        if (x.images.exists(a)) return null;
        b = new oc(b, b.width, b.height, !0);
        b.id = a;
        x.images.set(a, b);
        if (null == c || null != x._atlasLookup && x._atlasLookup.exists(a)) return b;
        var d = x.initTexture(a);
        c = new Hc(d, c);
        x._atlasLookup.set(a, c);
        return b
    };
    x.initTexture = function(a) {
        return x.mRenderer.initTexture(x.getImage(a))
    };
    x.getTextureAtlas = function(a) {
        return x._atlasLookup.get(a)
    };
    x.createTextureEffect = function(a) {
        a =
            x.initTexture(a);
        var b = x._textureUsageCount.get(a.key); - 2147483648 == b ? x._textureUsageCount.set(a.key, 1) : x._textureUsageCount.set(a.key, b + 1);
        return new Oa(a)
    };
    x.createSpriteSheetEffect = function(a) {
        if (!x._atlasLookup.exists(a)) throw 'sprite sheet with id "' + a + '" does not exits, call registerSpriteStrip(imageId) or registerSpriteAtlas(imageId) first.';
        return new db(x._atlasLookup.get(a))
    };
    var sa = {
        __ename__: !0,
        __constructs__: ["Portrait", "Landscape"],
        Portrait: ["Portrait", 0]
    };
    sa.Portrait.toString = n;
    sa.Portrait.__enum__ =
        sa;
    sa.Landscape = ["Landscape", 1];
    sa.Landscape.toString = n;
    sa.Landscape.__enum__ = sa;
    var xc = function(a, b) {
        this.resolution = {
            x: 0,
            y: 0
        };
        this.resizeHandler = b;
        this.mRenderer = a;
        window.addEventListener("resize", F(this, this.onScreenWindowResize), !1);
        this.onScreenWindowResize()
    };
    xc.__name__ = ["de", "polygonal", "zz", "Window"];
    xc.prototype = {
        onScreenWindowResize: function(a) {
            var b = this;
            window.document.getElementById("canvas_surface").style.visibility = "hidden";
            k.halt();
            window.clearTimeout(this.delay);
            window.setTimeout(function() {
                    b.doResize()
                },
                1E3)
        },
        doResize: function() {
            this.resolution.x = window.innerWidth;
            this.resolution.y = window.innerHeight;
            null != this.mRenderer && this.mRenderer.resize(this.resolution.x, this.resolution.y);
            null != this.resizeHandler && this.resizeHandler(this.resolution.x, this.resolution.y);
            k.resume();
            window.document.getElementById("canvas_surface").style.visibility = "visible"
        },
        __class__: xc
    };
    var pc = function() {
        this.mControllers = null
    };
    pc.__name__ = ["de", "polygonal", "zz", "controller", "ControlledObject"];
    pc.prototype = {
        attach: function(a) {
            null ==
                this.mControllers && (this.mControllers = new kc, this.mControllers.reuseIterator = !0);
            this.mControllers.append(a);
            a.setObject(this)
        },
        detach: function(a) {
            null != this.mControllers && (this.mControllers.remove(a), 0 == this.mControllers._size && (this.mControllers.free(), this.mControllers = null))
        },
        updateControllers: function(a) {
            return null != this.mControllers ? this.doUpdate(a) : !1
        },
        doUpdate: function(a) {
            for (var b = !1, c = this.mControllers.head, d; null != c;) d = c.next, c.val.update(a) && (b = !0), c = d;
            return b
        },
        __class__: pc
    };
    var Pa =
        function() {
            this.appTime = 0;
            this.active = !0;
            this.frequency = 1;
            this.minTime = this.maxTime = this.phase = 0;
            this.repeat = ga.Clamp;
            this.type = X.field(W.getClass(this), "TYPE")
    };
    Pa.__name__ = ["de", "polygonal", "zz", "controller", "Controller"];
    Pa.prototype = {
        free: function() {
            this.mObject.detach(this);
            this.repeat = this.mObject = null
        },
        setObject: function(a) {
            this.mObject = a
        },
        update: function(a) {
            return this.active ? (this.appTime += a, this.onUpdate(this.appTime)) : !1
        },
        onUpdate: function(a) {
            throw "";
        },
        getControlTime: function() {
            var a =
                this.frequency * this.appTime + this.phase;
            if (this.repeat == ga.Clamp) return Y.fclamp(a, this.minTime, this.maxTime);
            var b = this.maxTime - this.minTime;
            if (0 < b) {
                var c = (a - this.minTime) / b,
                    a = Y.floor(c),
                    c = c - a;
                return this.repeat == ga.Wrap ? this.minTime + c * b : 0 == (a & 1) ? this.minTime + c * b : this.maxTime - c * b
            }
            return this.minTime
        },
        __class__: Pa
    };
    var ga = {
        __ename__: !0,
        __constructs__: ["Clamp", "Wrap", "Cycle"],
        Clamp: ["Clamp", 0]
    };
    ga.Clamp.toString = n;
    ga.Clamp.__enum__ = ga;
    ga.Wrap = ["Wrap", 1];
    ga.Wrap.toString = n;
    ga.Wrap.__enum__ = ga;
    ga.Cycle = ["Cycle", 2];
    ga.Cycle.toString = n;
    ga.Cycle.__enum__ = ga;
    var Ic = function() {};
    Ic.__name__ = ["de", "polygonal", "zz", "render", "RenderSurface"];
    Ic.prototype = {
        __class__: Ic
    };
    var Fb = function() {
        this._alpha = 1;
        this._color = 16711935;
        this._colorXForm = new Fc;
        this._bits = 33
    };
    Fb.__name__ = "de polygonal zz render effect Effect".split(" ");
    Fb.prototype = {
        set_alpha: function(a) {
            this._bits = 1 > a ? this._bits | 8 : this._bits & -9;
            this._bits |= 128;
            return this._alpha = a
        },
        set_tex: function(a) {
            null != a ? (this._bits = a.isAlphaPreMultiplied ? this._bits |
                4 : this._bits | 2, this._bits &= -2) : (this._bits &= -7, this._bits |= 1);
            return this._tex = a
        },
        draw: function(a) {
            a.drawEffect(this)
        },
        __class__: Fb
    };
    var Oa = function(a) {
        Fb.call(this);
        this.set_tex(a);
        this.uvOffsetY = this.uvOffsetX = 0;
        this.uvScaleY = this.uvScaleX = 1;
        this.setCrop();
        this._bits |= 64
    };
    Oa.__name__ = "de polygonal zz render effect TextureEffect".split(" ");
    Oa.__super__ = Fb;
    Oa.prototype = B(Fb.prototype, {
        draw: function(a) {
            a.drawTextureEffect(this)
        },
        setCrop: function() {
            var a = this._tex.image.width,
                b = this._tex.image.height;
            this._tex.isNormalized && (a /= this._tex.width, b /= this._tex.height);
            this.crop = new Qa(0, 0, a, b)
        },
        __class__: Oa
    });
    var db = function(a) {
        this.mFrameIndex = 0;
        this.atlas = a;
        Oa.call(this, a.tex)
    };
    db.__name__ = "de polygonal zz render effect TextureAtlasEffect".split(" ");
    db.__super__ = Oa;
    db.prototype = B(Oa.prototype, {
        setFrameIndex: function(a) {
            this.mFrameIndex != a && (this.mFrameIndex = a, this.setCrop())
        },
        draw: function(a) {
            a.drawSpriteSheetEffect(this)
        },
        setCrop: function() {
            this._bits |= 64;
            this.crop = this.atlas._cropList._a[this.mFrameIndex]
        },
        __class__: db
    });
    var Ra = function() {
        this.maxBatchSize = 4096;
        this.allowGlobalState = this.allowAlphaState = !0;
        this.mViewport = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        this.maxBatchSize = 4096;
        this.mCuller = null;
        this.currMvp = new ma;
        this.currGlobalEffect = this.currEffect = this.currVisual = this.currNode = this.currScene = null;
        this.currViewProjMatrix = new ma;
        this.drawDeferred = null;
        this._deferredObjectList = new Na("deferredList");
        this.currAlphaState = this._deferredObjectNode = null;
        this.mViewMatrix = new ma;
        this.mProjMatrix = new ma;
        this.mBackgroundColor =
            0;
        this._textureLookup = new Z;
        this._tmpStack = new cb;
        this.setCamera(new Jc)
    };
    Ra.__name__ = ["de", "polygonal", "zz", "scene", "Renderer"];
    Ra.prototype = {
        setBackgroundColor: function(a) {
            this.mBackgroundColor = a;
            null != this.mSurface && this.mSurface.setBackgroundColor(a)
        },
        resize: function(a, b) {
            this.width = a;
            this.height = b;
            this.mViewport.width = a;
            this.mViewport.height = b;
            null == this.mSurface && null;
            null != this.mSurface && this.mSurface.resize(a, b);
            this.mProjMatrix.setOrtho(-a / 2, a / 2, -b / 2, b / 2, -1, 1);
            this.mProjMatrix.catScale(1, -1, 1);
            this.mProjMatrix.catTranslate(-1, 1, 1)
        },
        setSurface: function(a) {
            this.mSurface = a;
            this.mSurface.setBackgroundColor(this.mBackgroundColor)
        },
        setCamera: function(a) {
            this.mCamera = a;
            this.mCamera.setRenderer(this)
        },
        getViewport: function() {
            return this.mViewport
        },
        drawScene: function(a) {
            null != a && null != this.mCamera && (this.currScene = a, this.mViewMatrix.setIdentity(), null != this.mCamera && this.mViewMatrix.set(this.mCamera.viewMatrix), ma.matrixProduct(this.mProjMatrix, this.mViewMatrix, this.currViewProjMatrix), this.onBeginScene(),
                null != this.mCuller ? (a = this.mCuller.computeVisibleSet(a), this.drawVisibleSet(a)) : (this._deferredObjectList._next = null, this._deferredObjectNode = this._deferredObjectList, a.draw(this, !0), this._deferredObjectNode._next = null, null != this.drawDeferred && (this._deferredDrawingActive = !0, this.drawDeferred(), this._deferredDrawingActive = !1)), this.onEndScene(), this.nullifyDeferredObjects())
        },
        drawNode: function(a) {
            null == this.drawDeferred ? (this.currNode = a, this.currGlobalEffect = a.effect, this.currGlobalEffect.draw(this),
                this.currGlobalEffect = this.currNode = null) : this._deferredObjectNode = this._deferredObjectNode._next = a
        },
        drawQuad: function(a) {
            if (this._deferredDrawingActive) {
                var b = this._deferredObjectNode._next;
                this._deferredObjectNode._next = a;
                a._next = b;
                this._deferredObjectNode = a
            } else null == this.drawDeferred ? (this.currVisual = a, this.currEffect = a.effect, null != this.currEffect && this.currEffect.draw(this), this.currVisual = this.currEffect = null) : this._deferredObjectNode = this._deferredObjectNode._next = a
        },
        drawEffect: function(a) {
            this.allowGlobalState &&
                this.setGlobalState(this.currVisual.states)
        },
        drawTextureEffect: function(a) {
            this.allowGlobalState && this.setGlobalState(this.currVisual.states)
        },
        drawSpriteSheetEffect: function(a) {
            this.allowGlobalState && this.setGlobalState(this.currVisual.states)
        },
        drawVisibleSet: function(a, b) {
            if (null == b)
                for (var c = 0, d = a._size; c < d;) {
                    var e = c++;
                    this.currVisual = a._a[e];
                    this.drawQuad(this.currVisual)
                } else b.draw(this, a)
        },
        initTexture: function(a) {
            var b = this._textureLookup.get(a.key);
            null == b && (b = this.createTex(a), cd.d(m.format('created texture tex.key=#%d from image "%s" (#%d)', [b.key, a.id, a.key]), null), this._textureLookup.set(a.key, b));
            return b
        },
        setGlobalState: function(a) {
            if (this.allowAlphaState)
                if (null == a) null != this.currAlphaState && (this.setAlphaState(Sa.NONE), this.currAlphaState = null);
                else if (a = a._a[0], null == a) null != this.currAlphaState && (this.setAlphaState(Sa.NONE), this.currAlphaState = null);
            else if (null == this.currAlphaState || this.currAlphaState.flags != a.flags) this.setAlphaState(a), this.currAlphaState = a
        },
        onBeginScene: function() {},
        onEndScene: function() {},
        setAlphaState: function(a) {
            throw "";
        },
        nullifyDeferredObjects: function() {
            for (var a = this._deferredObjectList; null != a;) {
                var b = a._next;
                a._next = null;
                a = b
            }
            this._deferredObjectNode = this._deferredObjectList._next = null
        },
        createTex: function(a) {
            throw "";
        },
        __class__: Ra
    };
    var Ib = function() {
        Ra.call(this)
    };
    Ib.__name__ = "de polygonal zz render module canvas CanvasRenderer".split(" ");
    Ib.__super__ = Ra;
    Ib.prototype = B(Ra.prototype, {
        setSurface: function(a) {
            Ra.prototype.setSurface.call(this, a);
            this.mCanvasSurface = a
        },
        createTex: function(a) {
            return new qc(a, !1, !1)
        },
        drawEffect: function(a) {
            var b = this.currVisual.world,
                c = b._scale,
                d = b._matrix,
                b = b._translate,
                e = c.x,
                c = c.y,
                f = this.mCanvasSurface.context;
            f.setTransform(e * d.m11, e * d.m21, c * d.m12, c * d.m22, b.x, b.y);
            f.fillStyle = this.serializeRGBi(a._color, a._alpha);
            f.fillRect(0, 0, 1, 1)
        },
        drawTextureEffect: function(a) {
            var b = this.currVisual.world,
                c = b._scale,
                d = b._matrix,
                b = b._translate,
                e = a.crop,
                f = c.x / e.w,
                g = c.y / e.h,
                c = f * d.m11,
                f = f * d.m21,
                e = g * d.m12,
                d = g * d.m22,
                g = b.x,
                b = b.y,
                h = this.mCanvasSurface.context;
            h.globalAlpha = a._alpha;
            h.setTransform(c,
                f, e, d, g, b);
            h.drawImage(a._tex.image.data, 0, 0)
        },
        drawSpriteSheetEffect: function(a) {
            var b = this.currVisual.world,
                c = b._scale,
                d = b._matrix,
                e = b._translate,
                b = d.m11,
                f = d.m21,
                g = d.m12,
                d = d.m22,
                h = e.x,
                e = e.y,
                k = a.crop,
                m = this.mCanvasSurface.context;
            m.globalAlpha = a._alpha;
            m.setTransform(b, f, g, d, h, e);
            m.drawImage(a._tex.image.data, k.x, k.y, k.w, k.h, 0, 0, c.x, c.y)
        },
        onBeginScene: function() {
            var a = this.mCanvasSurface.context,
                b = this.mCanvasSurface.mCanvas.width,
                c = this.mCanvasSurface.mCanvas.height;
            a.fillStyle = this.serializeRGBi(this.mBackgroundColor,
                1);
            a.fillRect(0, 0, b, c);
            a.save()
        },
        onEndScene: function() {
            Ra.prototype.onEndScene.call(this);
            this.mCanvasSurface.context.restore()
        },
        serializeRGBi: function(a, b) {
            return "rgba(" + (a >> 16 & 255) + "," + (a >> 8 & 255) + "," + (a & 255) + "," + b + ")"
        },
        __class__: Ib
    });
    var Jb = function() {
        1 == window.document.body.getElementsByTagName("canvas").length ? this.mCanvas = window.document.body.getElementsByTagName("canvas").item(0) : this.mCanvas = window.document.createElement("canvas");
        this.mCanvas.id = "canvas_surface";
        this.width = this.mCanvas.width;
        this.height = this.mCanvas.height;
        var a = window.document.body;
        null == this.mCanvas.parentElement && a.appendChild(this.mCanvas);
        this.context = this.mCanvas.getContext("2d")
    };
    Jb.__name__ = "de polygonal zz render module canvas CanvasSurface".split(" ");
    Jb.__interfaces__ = [Ic];
    Jb.prototype = {
        resize: function(a, b) {
            var c = window.devicePixelRatio;
            this.mCanvas.parentNode.removeChild(this.mCanvas);
            this.mCanvas.width = Math.floor(a * c);
            this.mCanvas.height = Math.floor(b * c);
            this.mCanvas.style.width = a + "px";
            this.mCanvas.style.height =
                b + "px";
            window.document.body.appendChild(this.mCanvas);
            this.context = this.mCanvas.getContext("2d")
        },
        setBackgroundColor: function(a) {},
        __class__: Jb
    };
    var oc = function(a, b, c, d) {
        la.call(this);
        this.data = a;
        this.width = b;
        this.height = c;
        this.id = null;
        this.premultipliedAlpha = d
    };
    oc.__name__ = "de polygonal zz render texture Image".split(" ");
    oc.__super__ = la;
    oc.prototype = B(la.prototype, {
        __class__: oc
    });
    var Qa = function(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.w = c;
        this.h = d;
        this.r = a + c;
        this.b = b + d
    };
    Qa.__name__ = "de polygonal zz render texture Rect".split(" ");
    Qa.prototype = {
        clone: function() {
            return new Qa(this.x, this.y, this.w, this.h)
        },
        __class__: Qa
    };
    var rc = function(a, b) {
        null == b && (b = 0);
        null == a && (a = 0);
        this.x = a;
        this.y = b
    };
    rc.__name__ = "de polygonal zz render texture Size".split(" ");
    rc.prototype = {
        __class__: rc
    };
    var qc = function(a, b, c) {
        la.call(this);
        this.image = a;
        this.isPowerOfTwo = b;
        this.isNormalized = c;
        this.isAlphaPreMultiplied = a.premultipliedAlpha;
        b ? (this.width = Y.nextPow2(a.width), this.height = Y.nextPow2(a.height)) : (this.width = a.width, this.height = a.height)
    };
    qc.__name__ =
        "de polygonal zz render texture Tex".split(" ");
    qc.__super__ = la;
    qc.prototype = B(la.prototype, {
        __class__: qc
    });
    var Hc = function(a, b) {
        this.tex = a;
        this.mFormat = b;
        var c = this.mFormat.getData();
        this.frameCount = c.rectList.length;
        this.scale = c.scale;
        var d = this.frameCount;
        this._cropMap = new ca;
        this._sizeMap = new ca;
        this._cropList = new ra(d, d);
        this._sizeList = new ra(d, d);
        this._trimFlagList = (new ra(d, d)).fill(!1, d);
        this._trimOffset = (new ra(d, d)).fill(new rc, d);
        this._untrimmedSize = new ra(d, d);
        this._sheetW = a.image.width;
        this._sheetH = a.image.height;
        this._indexMap = new ca;
        this._nameMap = new Z;
        for (var d = 0, e = this.frameCount; d < e;) {
            var f = d++,
                g = c.rectList[f];
            if (null != g) {
                var h = new rc(g.w | 0, g.h | 0);
                this.addCropRectAt(f, c.nameList[f], g, h, a.isNormalized);
                c.trimFlag[f] ? (this._trimFlagList.set(f, !0), this._trimOffset.set(f, c.trimOffset[f]), this._untrimmedSize.set(f, c.untrimmedSize[f])) : this._untrimmedSize.set(f, h)
            }
        }
    };
    Hc.__name__ = "de polygonal zz render texture TextureAtlas".split(" ");
    Hc.prototype = {
        getFormat: function() {
            return this.mFormat
        },
        getFrameIndex: function(a) {
            return this._indexMap.get(a)
        },
        addCropRectAt: function(a, b, c, d, e) {
            this._indexMap.set(b, a);
            this._nameMap.set(a, b);
            c = c.clone();
            this._cropMap.set(b, c);
            this._cropMap.set(a, c);
            this._sizeMap.set(b, d);
            this._sizeMap.set(a, d);
            this._cropList.set(a, c);
            this._sizeList.set(a, d);
            e && (c.x /= this.tex.width, c.y /= this.tex.height, c.w /= this.tex.width, c.h /= this.tex.height);
            c.r = c.x + c.w;
            c.b = c.y + c.h
        },
        __class__: Hc
    };
    var Ga = function() {
        this.mTextureAtlasData = {
            width: 0,
            height: 0,
            scale: 1,
            rectList: [],
            nameList: [],
            trimFlag: [],
            trimOffset: [],
            untrimmedSize: []
        }
    };
    Ga.__name__ = "de polygonal zz render texture TextureAtlasFormat".split(" ");
    Ga.prototype = {
        getData: function() {
            return this.mTextureAtlasData
        },
        __class__: Ga
    };
    var fb = function(a) {
        Ga.call(this);
        var b = this.mTextureAtlasData;
        try {
            var c = new Gb(A.parse(a).firstElement());
            this.charSet = new Kc;
            this.charSet.renderedSize = Y.abs(u.parseInt(c.node.resolve("info").att.resolve("size")));
            this.charSet.lineHeight = u.parseInt(c.node.resolve("common").att.resolve("lineHeight"));
            this.charSet.base =
                u.parseInt(c.node.resolve("common").att.resolve("base"));
            this.charSet.textureW = u.parseInt(c.node.resolve("common").att.resolve("scaleW"));
            this.charSet.textureH = u.parseInt(c.node.resolve("common").att.resolve("scaleH"));
            b.width = this.charSet.textureW;
            b.height = this.charSet.textureH;
            var d = 32767;
            a = -1;
            for (var e = c.node.resolve("chars").nodes.resolve("char").iterator(); e.hasNext();) {
                var f = e.next(),
                    g = u.parseInt(f.att.resolve("id"));
                g > a && (a = g);
                g < d && (d = g)
            }
            for (e = 0; e < a;) {
                var h = e++;
                b.rectList[h] = new Qa(0, 0, 1, 1);
                b.nameList[h] = "undefined"
            }
            for (var k = c.node.resolve("chars").nodes.resolve("char").iterator(); k.hasNext();) {
                var m = k.next(),
                    l = u.parseInt(m.att.resolve("id")),
                    n = new sc;
                n.code = l;
                n.x = u.parseInt(m.att.resolve("x"));
                n.y = u.parseInt(m.att.resolve("y"));
                n.offX = u.parseInt(m.att.resolve("xoffset"));
                n.offY = u.parseInt(m.att.resolve("yoffset"));
                n.stepX = u.parseInt(m.att.resolve("xadvance"));
                n.w = u.parseInt(m.att.resolve("width"));
                n.h = u.parseInt(m.att.resolve("height"));
                this.charSet.characters[n.code] = n;
                if (-1 != l) {
                    var p =
                        new Qa(n.x, n.y, n.w, n.h);
                    b.rectList[l] = p;
                    b.nameList[l] = String.fromCharCode(l)
                }
            }
            if (c.hasNode.resolve("kernings"))
                for (var q = c.node.resolve("kernings").nodes.resolve("kerning").iterator(); q.hasNext();) {
                    var r = q.next(),
                        s = u.parseInt(r.att.resolve("first")),
                        v = u.parseInt(r.att.resolve("second")),
                        w = u.parseInt(r.att.resolve("amount"));
                    this.charSet.kerning.set(v << 16 | s, w)
                }
        } catch (t) {
            null
        }
    };
    fb.__name__ = "de polygonal zz render texture format BmFontFormat".split(" ");
    fb.__super__ = Ga;
    fb.prototype = B(Ga.prototype, {
        __class__: fb
    });
    var sc = function() {
        this.x = this.y = this.offX = this.offY = this.stepX = this.w = this.h = 0;
        this.code = -1
    };
    sc.__name__ = "de polygonal zz render texture format BitmapChar".split(" ");
    sc.prototype = {
        __class__: sc
    };
    var Kc = function() {
        this.characters = R.alloc(256);
        R.assign(this.characters, sc, [], 256);
        this.kerning = new Ab(4096)
    };
    Kc.__name__ = "de polygonal zz render texture format BitmapCharSet".split(" ");
    Kc.prototype = {
        __class__: Kc
    };
    var gb = function(a) {
        Ga.call(this);
        a = JSON.parse(a);
        for (var b = X.field(a, "frames"), c = 0; c < b.length;) {
            var d =
                b[c];
            ++c;
            this.mTextureAtlasData.rectList.push(this.toRect(d.frame));
            this.mTextureAtlasData.nameList.push(d.filename)
        }
        a = X.field(a, "meta");
        this.mTextureAtlasData.width = a.size.w;
        this.mTextureAtlasData.height = a.size.h;
        this.mTextureAtlasData.scale = a.scale
    };
    gb.__name__ = "de polygonal zz render texture format JsonArrayFormat".split(" ");
    gb.__super__ = Ga;
    gb.prototype = B(Ga.prototype, {
        toRect: function(a) {
            return new Qa(a.x, a.y, a.w, a.h)
        },
        __class__: gb
    });
    var K = {
        __ename__: !0,
        __constructs__: "Zero One DestinationColor OneMinusDestinationColor SourceAlpha OneMinusSourceAlpha DestinationAlpha OneMinusDestinationAlpha".split(" "),
        Zero: ["Zero", 0]
    };
    K.Zero.toString = n;
    K.Zero.__enum__ = K;
    K.One = ["One", 1];
    K.One.toString = n;
    K.One.__enum__ = K;
    K.DestinationColor = ["DestinationColor", 2];
    K.DestinationColor.toString = n;
    K.DestinationColor.__enum__ = K;
    K.OneMinusDestinationColor = ["OneMinusDestinationColor", 3];
    K.OneMinusDestinationColor.toString = n;
    K.OneMinusDestinationColor.__enum__ = K;
    K.SourceAlpha = ["SourceAlpha", 4];
    K.SourceAlpha.toString = n;
    K.SourceAlpha.__enum__ = K;
    K.OneMinusSourceAlpha = ["OneMinusSourceAlpha", 5];
    K.OneMinusSourceAlpha.toString = n;
    K.OneMinusSourceAlpha.__enum__ = K;
    K.DestinationAlpha = ["DestinationAlpha", 6];
    K.DestinationAlpha.toString = n;
    K.DestinationAlpha.__enum__ = K;
    K.OneMinusDestinationAlpha = ["OneMinusDestinationAlpha", 7];
    K.OneMinusDestinationAlpha.toString = n;
    K.OneMinusDestinationAlpha.__enum__ = K;
    var L = {
        __ename__: !0,
        __constructs__: "Zero One SourceColor OneMinusSourceColor SourceAlpha OneMinusSourceAlpha DestinationAlpha OneMinusDestinationAlpha".split(" "),
        Zero: ["Zero", 0]
    };
    L.Zero.toString = n;
    L.Zero.__enum__ = L;
    L.One = ["One", 1];
    L.One.toString = n;
    L.One.__enum__ = L;
    L.SourceColor = ["SourceColor", 2];
    L.SourceColor.toString = n;
    L.SourceColor.__enum__ = L;
    L.OneMinusSourceColor = ["OneMinusSourceColor", 3];
    L.OneMinusSourceColor.toString = n;
    L.OneMinusSourceColor.__enum__ = L;
    L.SourceAlpha = ["SourceAlpha", 4];
    L.SourceAlpha.toString = n;
    L.SourceAlpha.__enum__ = L;
    L.OneMinusSourceAlpha = ["OneMinusSourceAlpha", 5];
    L.OneMinusSourceAlpha.toString = n;
    L.OneMinusSourceAlpha.__enum__ = L;
    L.DestinationAlpha = ["DestinationAlpha", 6];
    L.DestinationAlpha.toString = n;
    L.DestinationAlpha.__enum__ =
        L;
    L.OneMinusDestinationAlpha = ["OneMinusDestinationAlpha", 7];
    L.OneMinusDestinationAlpha.toString = n;
    L.OneMinusDestinationAlpha.__enum__ = L;
    var Hb = function(a) {
        this.type = a;
        this.index = a[1];
        this.flags = 1 << this.index;
        this.next = null
    };
    Hb.__name__ = ["de", "polygonal", "zz", "scene", "GlobalState"];
    Hb.prototype = {
        __class__: Hb
    };
    var eb = {
        __ename__: !0,
        __constructs__: ["Alpha"],
        Alpha: ["Alpha", 0]
    };
    eb.Alpha.toString = n;
    eb.Alpha.__enum__ = eb;
    var Sa = function(a, b) {
        Hb.call(this, eb.Alpha);
        this.src = a;
        this.dst = b;
        var c = W.getEnumConstructs(eb).length;
        this.flags |= 1 << a[1] + c;
        this.flags |= 1 << b[1] + c + 8
    };
    Sa.__name__ = ["de", "polygonal", "zz", "scene", "AlphaState"];
    Sa.__super__ = Hb;
    Sa.prototype = B(Hb.prototype, {
        __class__: Sa
    });
    var tc = function() {
        this.minX = this.minY = this.maxX = this.maxY = 0;
        this.mTmpVec = new na
    };
    tc.__name__ = ["de", "polygonal", "zz", "scene", "Bv"];
    tc.prototype = {
        free: function() {
            this.mTmpVec = null
        },
        __class__: tc
    };
    var Jc = function() {
        this.viewMatrix = new ma;
        this.position = new na;
        this.planeCullState = 15;
        this._tmpVec = new na
    };
    Jc.__name__ = ["de", "polygonal", "zz", "scene",
        "Camera"
    ];
    Jc.prototype = {
        setRenderer: function(a) {
            this._renderer = a
        },
        __class__: Jc
    };
    var G = {
        __ename__: !0,
        __constructs__: ["CullDynamic", "CullAlways", "CullNever"],
        CullDynamic: ["CullDynamic", 0]
    };
    G.CullDynamic.toString = n;
    G.CullDynamic.__enum__ = G;
    G.CullAlways = ["CullAlways", 1];
    G.CullAlways.toString = n;
    G.CullAlways.__enum__ = G;
    G.CullNever = ["CullNever", 2];
    G.CullNever.toString = n;
    G.CullNever.__enum__ = G;
    var ha = function() {};
    ha.__name__ = ["de", "polygonal", "zz", "scene", "GlobalStateStack"];
    ha.clrStacks = function() {
        for (var a =
            0, b = ha._numStates; a < b;) {
            var c = a++;
            ha._stacks[c].clear(null)
        }
    };
    ha.initStacks = function() {
        ha._numStates = W.getEnumConstructs(eb).length;
        ha._stacks = Array(ha._numStates);
        for (var a = 0, b = ha._numStates; a < b;) {
            var c = a++;
            ha._stacks[c] = new cb
        }
    };
    var ia = function(a) {
        this.mControllers = null;
        this.name = a;
        this.key = ka._counter++;
        this.local = new Ha;
        this.world = new Ha;
        this.worldBound = new tc;
        this.mFlags = 0
    };
    ia.__name__ = ["de", "polygonal", "zz", "scene", "Spatial"];
    ia.__interfaces__ = [Ob];
    ia.__super__ = pc;
    ia.prototype = B(pc.prototype, {
        free: function() {
            null != this.parent && this.parent.removeChild(this);
            this.mSibling = this.parent = null;
            this.local.free();
            this.local = null;
            this.world.free();
            this.world = null;
            this.worldBound.free();
            this.worldBound = null;
            this.removeAllGlobalStates();
            this.effect = null;
            this.mFlags = 0;
            this.set_userData(null);
            this._next = null
        },
        get_userData: function() {
            return this.mUserData
        },
        set_userData: function(a) {
            return this.mUserData = a
        },
        get_cullingMode: function() {
            return 0 != (this.mFlags & 1) ? G.CullAlways : 0 != (this.mFlags & 2) ? G.CullNever :
                G.CullDynamic
        },
        set_cullingMode: function(a) {
            switch (a[1]) {
                case 0:
                    this.mFlags &= -4;
                    break;
                case 1:
                    this.mFlags &= -3;
                    this.mFlags |= 1;
                    break;
                case 2:
                    this.mFlags |= 2, this.mFlags &= -2
            }
            return a
        },
        draw: function(a, b) {},
        cull: function(a, b) {
            if (this.get_cullingMode() != G.CullAlways) {
                var c = a.mCamera,
                    d = c.planeCullState;
                b && this.draw(a, b);
                c.planeCullState = d
            }
        },
        onGetVisibleSet: function(a, b) {
            if (0 == (this.mFlags & 1)) {
                0 != (this.mFlags & 6) && (b = !0);
                var c = a.mPlaneCullState;
                if (b || a.isVisible(this.worldBound)) this.mFlags |= 4, this.getVisibleSet(a,
                    b);
                a.mPlaneCullState = c
            }
        },
        getVisibleSet: function(a, b) {},
        updateGeometricState: function(a, b) {
            null == b && (b = !0);
            this.updateWorldData();
            b && this.propagateBoundToRoot()
        },
        updateWorldData: function() {
            this.mFlags &= -33;
            0 < (this.mFlags & 8) || (null != this.parent ? this.world.product2(this.parent.world, this.local) : this.world.set(this.local))
        },
        propagateBoundToRoot: function() {
            null != this.parent && this.parent.propagateBoundToRoot()
        },
        updateRenderState: function(a) {
            var b = null == a;
            b ? (null == ha._stacks && ha.initStacks(), a = ha._stacks,
                this.propageStateFromRoot(a)) : this.pushState(a);
            this.propagateRenderStateUpdate(a);
            b ? ha.clrStacks() : this.popState(a)
        },
        removeAllGlobalStates: function() {
            for (var a = this.mGlobalState, b; null != a;) b = a.next, a.next = null, a = b;
            this.mGlobalState = null
        },
        propageStateFromRoot: function(a) {
            null != this.parent && this.parent.propageStateFromRoot(a);
            this.pushState(a)
        },
        propagateRenderStateUpdate: function(a) {
            throw "";
        },
        pushState: function(a) {
            for (var b = this.mGlobalState; null != b;) a[b.index].push(b), b =
                b.next
        },
        popState: function(a) {
            for (var b = this.mGlobalState; null != b;) a[b.index].pop(), b = b.next
        },
        __class__: ia
    });
    var Na = function(a) {
        ia.call(this, a);
        this.mFlags |= 64;
        this.child = null;
        this.numChildren = 0
    };
    Na.__name__ = ["de", "polygonal", "zz", "scene", "Node"];
    Na.__super__ = ia;
    Na.prototype = B(ia.prototype, {
        free: function() {
            ia.prototype.free.call(this);
            this.child = null
        },
        draw: function(a, b) {
            if (null == this.effect)
                for (var c = this.child; null != c;) c.cull(a, b), c = c.mSibling;
            else a.drawNode(this)
        },
        getVisibleSet: function(a, b) {
            for (var c =
                this.child; null != c;) c.onGetVisibleSet(a, b), c = c.mSibling
        },
        addChild: function(a) {
            if (null == this.child) this.child = a, a.mSibling = null;
            else {
                for (var b = this.child; null != b.mSibling;) b = b.mSibling;
                b.mSibling = a
            }
            a.parent = this;
            this.numChildren++;
            return this
        },
        removeChild: function(a) {
            if (this.child == a) this.child = a.mSibling;
            else {
                for (var b = this.child; b.mSibling != a;) b = b.mSibling;
                b.mSibling = a.mSibling
            }
            a.mSibling = null;
            a.parent = null;
            this.numChildren--;
            return this
        },
        getChildAt: function(a) {
            for (var b = this.child, c = 0; c <= a;) {
                if (c ==
                    a) return b;
                b = b.mSibling;
                c++
            }
            return null
        },
        getChildByName: function(a) {
            for (var b = this.child; null != b;) {
                if (b.name == a) return b;
                b = b.mSibling
            }
            return null
        },
        updateWorldData: function() {
            ia.prototype.updateWorldData.call(this);
            for (var a = this.child; null != a;) a.updateGeometricState(0, !1), a = a.mSibling
        },
        propagateRenderStateUpdate: function(a) {
            for (var b = this.child; null != b;) b.updateRenderState(a), b = b.mSibling
        },
        __class__: Na
    });
    var Ta = function(a) {
        ia.call(this, a);
        this.mFlags |= 128;
        this.modelBound = new tc;
        this.updateModelBound()
    };
    Ta.__name__ = ["de", "polygonal", "zz", "scene", "Visual"];
    Ta.__super__ = ia;
    Ta.prototype = B(ia.prototype, {
        free: function() {
            this.modelBound.free();
            this.modelBound = null;
            null != this.states && (this.states.free(), this.states = null);
            ia.prototype.free.call(this)
        },
        updateModelBound: function() {
            throw "";
        },
        getVisibleSet: function(a, b) {
            a.mVisibleSet.pushBack(this)
        },
        propagateRenderStateUpdate: function(a) {
            if (null == this.states) {
                var b = W.getEnumConstructs(eb).length;
                this.states = new ra(b, b);
                this.states.fill(null,
                    b)
            }
            for (var b = this.stateFlags = 0, c = a.length; b < c;) {
                var d = b++,
                    e = a[d];
                0 != e._top && (e = e._a[e._top - 1], this.states.set(d, e), this.stateFlags |= e.flags)
            }
        },
        __class__: Ta
    });
    var Ha = function() {
        this._scale = new na;
        this._translate = new na;
        this._matrix = new lb;
        this._bits = 0;
        this._matrix.setIdentity();
        this._translate.zero();
        this._scale.x = 1;
        this._scale.y = 1;
        this._scale.z = 1;
        this._bits |= 31
    };
    Ha.__name__ = ["de", "polygonal", "zz", "scene", "XForm"];
    Ha.prototype = {
        free: function() {
            this._matrix = this._translate = this._scale = null
        },
        setScale: function(a,
            b, c) {
            this._scale.x = a;
            this._scale.y = b;
            this._scale.z = c;
            this._bits &= -14;
            return this
        },
        setUniformScale2: function(a) {
            this._scale.x = a;
            this._scale.y = a;
            this._bits &= -10;
            this._bits |= 4;
            this._bits = 1 == a ? this._bits | 8 : this._bits & -9;
            return this
        },
        setTranslate: function(a, b, c) {
            this._translate.x = a;
            this._translate.y = b;
            this._translate.z = c;
            this._bits &= -2;
            return this
        },
        setTranslate2: function(a, b) {
            this._translate.x = a;
            this._translate.y = b;
            this._bits &= -2;
            return this
        },
        set: function(a) {
            this._translate.set(a._translate);
            this._scale.set(a._scale);
            this._matrix.set(a._matrix);
            this._bits = a._bits;
            return this
        },
        applyInverse2: function(a, b) {
            if (0 != (this._bits & 1)) b.x = a.x, b.y = a.y;
            else {
                var c = this._translate,
                    d = a.x - c.x,
                    c = a.y - c.y;
                if (0 != (this._bits & 2)) {
                    var e = this._matrix;
                    b.x = (d * e.m11 + c * e.m21) / this._scale.x;
                    b.y = (d * e.m12 + c * e.m22) / this._scale.y
                } else {
                    var f = this._matrix,
                        d = f.m11,
                        c = f.m12,
                        e = f.m21,
                        f = f.m22,
                        g = d * f - c * e;
                    if (1E-8 < (0 > g ? -g : g)) {
                        var g = 1 / g,
                            h = b.x,
                            k = b.y;
                        b.x = f * g * h + -c * g * k;
                        b.y = -e * g * h + d * g * k
                    } else b.x = b.y = 0
                }
            }
            return b
        },
        product2: function(a, b) {
            if (0 != (a._bits & 1)) return this._translate.set(b._translate),
            this._scale.set(b._scale), this._matrix.set(b._matrix), this._bits = b._bits, this;
            if (0 != (b._bits & 1)) return this._translate.set(a._translate), this._scale.set(a._scale), this._matrix.set(a._matrix), this._bits = a._bits, this;
            if (6 == (a._bits & 6) && 0 != (b._bits & 2)) {
                var c = a._matrix,
                    d = b._matrix,
                    e = this._matrix,
                    f = d.m11,
                    g = d.m12,
                    h = d.m21,
                    d = d.m22,
                    k, m;
                k = c.m11;
                m = c.m12;
                e.m11 = k * f + m * h;
                e.m12 = k * g + m * d;
                k = c.m21;
                m = c.m22;
                e.m21 = k * f + m * h;
                e.m22 = k * g + m * d;
                k = c.m31;
                m = c.m32;
                e.m31 = k * f + m * h;
                e.m32 = k * g + m * d;
                e = a._translate;
                h = b._translate;
                f = this._translate;
                g = h.x;
                h = h.y;
                f.x = c.m11 * g + c.m12 * h;
                f.y = c.m21 * g + c.m22 * h;
                c = a._scale.x;
                f.x = f.x * c + e.x;
                f.y = f.y * c + e.y;
                0 != (b._bits & 4) ? (c *= b._scale.x, this._scale.x = c, this._scale.y = c, this._bits &= -2, this._bits |= 6, this._bits = 1 == c ? this._bits | 8 : this._bits & -9) : (e = b._scale, this._scale.x = c * e.x, this._scale.y = c * e.y, this._bits &= -14, this._bits |= 2);
                return this
            }
            c = a._matrix;
            e = b._matrix;
            0 != (a._bits & 2) && (f = a._scale.x, g = a._scale.y, h = Ha._tmpMat1, h.m11 = c.m11 * f, h.m12 = c.m12 * g, h.m21 = c.m21 * f, h.m22 = c.m22 * g, c = h);
            0 != (b._bits & 2) && (f = b._scale.x, g = b._scale.y,
                h = Ha._tmpMat2, h.m11 = e.m11 * f, h.m12 = e.m12 * g, h.m21 = e.m21 * f, h.m22 = e.m22 * g, e = h);
            f = e.m11;
            g = e.m12;
            h = e.m21;
            e = e.m22;
            d = this._matrix;
            k = c.m11;
            m = c.m12;
            d.m11 = k * f + m * h;
            d.m12 = k * g + m * e;
            k = c.m21;
            m = c.m22;
            d.m21 = k * f + m * h;
            d.m22 = k * g + m * e;
            e = this._translate;
            f = a._translate;
            h = b._translate;
            g = h.x;
            h = h.y;
            e.x = c.m11 * g + c.m12 * h + f.x;
            e.y = c.m21 * g + c.m22 * h + f.y;
            this._bits &= -16;
            return this
        },
        __class__: Ha
    };
    var Ja = function(a) {
        Ta.call(this, a)
    };
    Ja.__name__ = "de polygonal zz scene geometry Quad".split(" ");
    Ja.__super__ = Ta;
    Ja.prototype = B(Ta.prototype, {
        draw: function(a, b) {
            a.drawQuad(this)
        },
        updateModelBound: function() {
            this.modelBound.minX = 0;
            this.modelBound.minY = 0;
            this.modelBound.maxX = 1;
            this.modelBound.maxY = 1
        },
        __class__: Ja
    });
    var $ = {
        __ename__: !0,
        __constructs__: ["Center", "Left", "Right"],
        Center: ["Center", 0]
    };
    $.Center.toString = n;
    $.Center.__enum__ = $;
    $.Left = ["Left", 1];
    $.Left.toString = n;
    $.Left.__enum__ = $;
    $.Right = ["Right", 2];
    $.Right.toString = n;
    $.Right.__enum__ = $;
    var Ua = function(a, b) {
        this.mAlpha = 1;
        this.mNumQuads = 0;
        this.monoSpaceWidth = this.mNextCode = -1;
        this.applyKerning = !0;
        this.tracking = this.leading = 0;
        U.call(this, new Na);
        this.node = this.spatial;
        this.mAtlas = x.getAtlas(a);
        null != b && b.addChild(this);
        this.mStringList = new ra;
        this.mQuads = []
    };
    Ua.__name__ = ["de", "polygonal", "zz", "sprite", "SpriteFont"];
    Ua.__super__ = U;
    Ua.prototype = B(U.prototype, {
        free: function() {
            U.prototype.free.call(this);
            for (var a = this.node.child; null != a;) {
                var b = a.mSibling;
                a.free();
                a = b
            }
            this.mLastBound = this.mQuads = this.mStringList = this.mAtlas = this.node = null
        },
        get_alpha: function() {
            return this.mAlpha
        },
        set_alpha: function(a) {
            return this.mAlpha =
                a
        },
        addString: function(a, b, c, d) {
            null == d && (d = 0);
            var e = this.mAtlas.getFormat();
            0 == d && (d = e.charSet.renderedSize);
            a = new Lc(a, b, c, d, this.applyKerning);
            this.mStringList.pushBack(a);
            this.mNumQuads = this.processQuads(a);
            this.mDirty = !0;
            return this.mStringList._size - 1
        },
        applyChanges: function() {
            U.prototype.applyChanges.call(this);
            if (this.mDirty) {
                this.mDirty = !1;
                for (var a = 0, b = this.mQuads.length; a < b;) {
                    var c = a++;
                    this.mQuads[c].parent == this.node && this.node.removeChild(this.mQuads[c])
                }
                a = 0;
                for (b = this.mNumQuads; a < b;) {
                    var c =
                        a++,
                        c = this.mQuads[c],
                        d = c.bitmapChar; - 1 != d.code && (this.node.addChild(c), c.local.setTranslate(c.bound.minX, c.bound.minY, 0), c.local.setScale(d.w * c.sizeScale, d.h * c.sizeScale, 1), J.__cast(c.effect, db).setFrameIndex(d.code))
                }
                this.node.updateGeometricState(0);
                this.node.updateRenderState();
                a = 0;
                for (b = this.mNumQuads; a < b;) c = a++, this.mQuads[c].effect.set_alpha(this.mAlpha)
            }
        },
        processQuads: function(a) {
            for (var b = J.__cast(this.mAtlas.getFormat(), fb).charSet, c = this.mQuads, d = 0, e = a.bound.minX, f = a.bound.minY, g = 0, h = a.size /
                    b.renderedSize, k = a.bound.get_intervalX(), m = 0, l = 1, n = 1, p = 0, q = !0, r = a.text, s = a.align, v = 0, w = r.length; v < w;) {
                var u = v++,
                    t = y.cca(r, u);
                r.charAt(u);
                var x = b.characters[t],
                    A = x.offX * h,
                    G = x.offY * h,
                    E;
                E = (-1 == this.monoSpaceWidth ? x.stepX : this.monoSpaceWidth) * h + this.tracking;
                var I = x.w * h,
                    H = x.h * h;
                if (f + G + H > a.bound.maxY) break;
                if (10 == t || 13 == t || g + E >= k) {
                    switch (s[1]) {
                        case 1:
                            e = a.bound.minX;
                            break;
                        case 2:
                            e = a.bound.minX + 0.5 * k;
                            break;
                        case 0:
                            e = a.bound.maxX
                    }
                    var f = f + (b.lineHeight + this.leading) * h,
                        C = 0;
                    if (g + E >= k && 1 != n) {
                        for (var z = 0, D = g = 0; D <
                            d;) {
                            var B = D++,
                                B = c[B],
                                F = B.bitmapChar;
                            switch (s[1]) {
                                case 1:
                                    B.lineNumber == l && B.wordNumber == n && (B.lineNumber++, B.wordNumber = 1, B.set_minX(e + F.offX * h), B.set_minY(f + F.offY * h), e += F.stepX * h, g += F.stepX * h, a.kerning && (this.mNextCode = B.character, z = b.kerning.get(this.mNextCode << 16 | z), -2147483648 != z && (e += z * h, g += z * h)));
                                    break;
                                case 0:
                                    B.lineNumber == l && B.wordNumber == n && (B.lineNumber++, B.wordNumber = 1, B.set_minX(e + F.offX * h), B.set_minY(f + F.offY * h), e += F.stepX * h, g += F.stepX * h, C += F.stepX * h * 0.5, a.kerning && (this.mNextCode = B.character,
                                        z = b.kerning.get(this.mNextCode << 16 | z), -2147483648 != z && (z *= h, e += z, g += z, C += 0.5 * z)));
                                    break;
                                case 2:
                                    B.lineNumber == l && B.wordNumber == n && (B.lineNumber++, B.wordNumber = 1, B.set_minX(e + F.offX * h), B.set_minY(f + F.offY * h), g += F.stepX * h, e += F.stepX * h, C += F.stepX * h, a.kerning && (this.mNextCode = B.character, z = b.kerning.get(this.mNextCode << 16 | z), -2147483648 != z && (z *= h, e += z, g += z, C += z)))
                            }
                            z = B.character
                        }
                        switch (s[1]) {
                            case 0:
                            case 2:
                                for (n = 0; n < d;) D = n++, D = c[D], D.lineNumber == l + 1 && D.set_minX(D.bound.minX - C);
                                e -= C;
                                for (n = 0; n < d;) D = n++, D =
                                    c[D], D.lineNumber == l && D.set_minX(D.bound.minX + C)
                        }
                    } else q = !0, g = 0;
                    n = 1;
                    l++
                }
                if (10 != t && 13 != t && 9 != t) {
                    if (q) switch (s[1]) {
                        case 1:
                            e = a.bound.minX;
                            break;
                        case 0:
                            e = a.bound.minX + 0.5 * k;
                            break;
                        case 2:
                            e = a.bound.maxX
                    }
                    C = 0;
                    a.kerning && !q && (this.mNextCode = y.cca(r, u), q = b.kerning.get(this.mNextCode << 16 | m), -2147483648 != q && (C = q * h, e += C, g += C, p += C));
                    q = !1;
                    32 == t && s == $.Right && (n++, p = 0);
                    p += E;
                    m = c[d];
                    null == m && (m = new uc, m.effect = new db(this.mAtlas), c[d] = m);
                    d++;
                    D = m.bound;
                    D.minX = e + A;
                    D.minY = f + G;
                    D.maxX = D.minX + I;
                    D.maxY = D.minY + H;
                    m.lineNumber =
                        l;
                    m.wordNumber = n;
                    m.wordWidth = p;
                    m.bitmapChar = x;
                    m.sizeScale = h;
                    m.character = y.cca(r, u);
                    32 == t && s == $.Left && (n++, p = 0);
                    e += E;
                    g += E;
                    m = y.cca(r, u);
                    switch (s[1]) {
                        case 0:
                            E *= 0.5;
                            a.kerning && (E += 0.5 * C);
                            for (u = 0; u < d;) t = u++, t = c[t], t.lineNumber == l && t.set_minX(t.bound.minX - E);
                            e -= E;
                            break;
                        case 2:
                            u = 0;
                            a.kerning && (u += C);
                            for (t = 0; t < d;) x = t++, x = c[x], x.lineNumber == l && (u = E, x.set_minX(x.bound.minX - E));
                            e -= u
                    }
                }
            }
            return d
        },
        __class__: Ua
    });
    var Lc = function(a, b, c, d, e) {
        this.text = a;
        this.bound = b;
        this.align = c;
        this.size = d;
        this.kerning = e
    };
    Lc.__name__ =
        "de polygonal zz sprite _SpriteFont StringBlock".split(" ");
    Lc.prototype = {
        __class__: Lc
    };
    var uc = function() {
        Ta.call(this, void 0);
        this.bound = new C
    };
    uc.__name__ = "de polygonal zz sprite _SpriteFont FontQuad".split(" ");
    uc.__super__ = Ja;
    uc.prototype = B(Ja.prototype, {
        free: function() {
            Ja.prototype.free.call(this);
            this.bound = this.bitmapChar = null
        },
        set_minX: function(a) {
            this.bound.setMinX(a);
            return a
        },
        set_minY: function(a) {
            this.bound.setMinY(a);
            return a
        },
        __class__: uc
    });
    var Ia = function(a, b) {
        U.call(this, new Na(a));
        this.node = this.spatial;
        null != b && b.addChild(this)
    };
    Ia.__name__ = ["de", "polygonal", "zz", "sprite", "SpriteGroup"];
    Ia.__super__ = U;
    Ia.prototype = B(U.prototype, {
        applyChanges: function() {
            U.prototype.applyChanges.call(this);
            if (0 != (this.mFlags & 128))
                for (var a = 0, b = this.mDescendants; a < b.length;) {
                    var c = b[a];
                    ++a;
                    0 < (c.mFlags & 1) && (c.syncLocalXform(), c.mFlags &= -2)
                } else
                    for (a = this.node.child; null != a;) J.__cast(a.mUserData, U).applyChanges(), a = a.mSibling
        },
        free: function() {
            this.node = null;
            U.prototype.free.call(this)
        },
        addChild: function(a) {
            this.node.addChild(a.spatial);
            return this
        },
        removeChild: function(a) {
            this.node.removeChild(a.spatial);
            return this
        },
        getChildAt: function(a) {
            return J.__cast(this.node.getChildAt(a).get_userData(), U)
        },
        getChildByName: function(a) {
            return J.__cast(this.node.getChildByName(a).get_userData(), U)
        },
        getChildren: function(a) {
            for (var b = this.node.child, c = 0, d = this.node.numChildren; c < d;) {
                var e = c++;
                a[e] = b.mUserData;
                b = b.mSibling
            }
            return a
        },
        iterator: function() {
            var a = this.node.child;
            return {
                hasNext: function() {
                    return null != a
                },
                next: function() {
                    var b = a.mUserData;
                    a = a.mSibling;
                    return b
                }
            }
        },
        freeChildren: function() {
            for (var a = this.node.child; null != a;) {
                var b = a.mSibling;
                J.__cast(a.mUserData, U).free();
                a = b
            }
            this.mFlags &= -129;
            this.mDescendants = []
        },
        get_width: function() {
            this.node.updateGeometricState(0);
            var a = this.node.worldBound;
            return a.maxX - a.minX
        },
        set_width: function(a) {
            var b = this.get_width();
            this.set_scaleX(a / b);
            return a
        },
        get_height: function() {
            this.node.updateGeometricState(0);
            var a = this.node.worldBound;
            return a.maxY - a.minY
        },
        set_height: function(a) {
            var b = this.get_height();
            this.set_scaleY(a / b);
            return a
        },
        syncLocalXform: function() {
            U.prototype.syncLocalXform.call(this);
            var a = this.node.local;
            a._matrix.setIdentity();
            a._translate.zero();
            a._scale.x = 1;
            a._scale.y = 1;
            a._scale.z = 1;
            a._bits |= 31;
            var b = 0.017453292519943295 * this.mRotationDeg,
                c = Math.sin(b),
                b = Math.cos(b),
                d = this.mScaleX,
                e = this.mScaleY,
                f = d * this.mPivotX,
                g = e * this.mPivotY;
            d == e ? (a._scale.x = d, a._scale.y = d, a._bits &= -10, a._bits |= 4, a._bits = 1 == d ? a._bits | 8 : a._bits & -9) : (a._scale.x = d, a._scale.y = e, a._scale.z = 1, a._bits &= -14);
            a;
            d = a._matrix;
            d.m11 = b;
            d.m12 = -c;
            d.m21 = c;
            d.m22 = b;
            a._translate.x = -(f * b) + g * c + this.mPivotX + this.mX;
            a._translate.y = -(f * c) - g * b + this.mPivotY + this.mY;
            a._translate.z = 1;
            a._bits &= -2;
            a
        },
        __class__: Ia
    });
    var Nb = function() {};
    Nb.__name__ = ["de", "polygonal", "zz", "sprite", "SpriteTools"];
    Nb.tick = function(a, b) {
        var c = Nb.mStack;
        c[0] = a.node;
        for (var d = 1, e; 0 != d;)
            if (e = c[--d], c[d] = null, J.__cast(e.mUserData, U).tick(b), 0 < (e.mFlags & 64))
                for (e = e.child; null != e;) c[d++] = e, e = e.mSibling
    };
    var ib = function() {
        Pa.call(this);
        this.active = !1
    };
    ib.__name__ = ["de",
        "polygonal", "zz", "sprite", "SpriteTweenController"
    ];
    ib.__super__ = Pa;
    ib.prototype = B(Pa.prototype, {
        free: function() {
            Pa.prototype.free.call(this);
            this.mInterpolation = this.mSpriteBase = null
        },
        tween: function(a, b, c, d, e) {
            this.appTime = k.appTime;
            this._onComplete = e;
            this.field = a;
            switch (a[1]) {
                case 0:
                    this.mSrcVal = this.mSpriteBase.mX;
                    break;
                case 1:
                    this.mSrcVal = this.mSpriteBase.mY;
                    break;
                case 2:
                    this.mSrcVal = this.mSpriteBase.mScaleX;
                    break;
                case 3:
                    this.mSrcVal = this.mSpriteBase.mScaleY;
                    break;
                case 4:
                    this.mSrcVal = this.mSpriteBase.mScaleX;
                    break;
                case 5:
                    this.mSrcVal = this.mSpriteBase.mRotationDeg;
                    break;
                case 6:
                    this.mSrcVal = this.mSpriteBase.get_alpha()
            }
            this.mDstVal = b;
            this.minTime = k.appTime;
            this.maxTime = this.minTime + c;
            this.mInterpolation = Fa.create(null == d ? t.None : d);
            this.active = !0;
            this.mDisposeTime = this.maxTime + 10
        },
        setObject: function(a) {
            Pa.prototype.setObject.call(this, a);
            this.mSpriteBase = J.__cast(a, ia).get_userData()
        },
        onUpdate: function(a) {
            if (a >= this.maxTime && this.repeat == ga.Clamp) return this.active = !1, this.free(), null != this._onComplete &&
                (this._onComplete(), this._onComplete = null), !1;
            a = (this.getControlTime() - this.minTime) / (this.maxTime - this.minTime);
            a = Y.lerp(this.mSrcVal, this.mDstVal, this.mInterpolation.interpolate(a));
            switch (this.field[1]) {
                case 0:
                    this.mSpriteBase.set_x(a);
                    break;
                case 1:
                    this.mSpriteBase.set_y(a);
                    break;
                case 2:
                    this.mSpriteBase.set_scaleX(a);
                    break;
                case 3:
                    this.mSpriteBase.set_scaleY(a);
                    break;
                case 4:
                    this.mSpriteBase.set_scaleX(this.mSpriteBase.set_scaleY(a));
                    break;
                case 5:
                    this.mSpriteBase.set_rotation(a);
                    break;
                case 6:
                    this.mSpriteBase.set_alpha(a)
            }
            return !0
        },
        __class__: ib
    });
    var H = {
        __ename__: !0,
        __constructs__: "X Y ScaleX ScaleY Scale Rotation Alpha".split(" "),
        X: ["X", 0]
    };
    H.X.toString = n;
    H.X.__enum__ = H;
    H.Y = ["Y", 1];
    H.Y.toString = n;
    H.Y.__enum__ = H;
    H.ScaleX = ["ScaleX", 2];
    H.ScaleX.toString = n;
    H.ScaleX.__enum__ = H;
    H.ScaleY = ["ScaleY", 3];
    H.ScaleY.toString = n;
    H.ScaleY.__enum__ = H;
    H.Scale = ["Scale", 4];
    H.Scale.toString = n;
    H.Scale.__enum__ = H;
    H.Rotation = ["Rotation", 5];
    H.Rotation.toString = n;
    H.Rotation.__enum__ = H;
    H.Alpha = ["Alpha", 6];
    H.Alpha.toString = n;
    H.Alpha.__enum__ = H;
    var V =
        function(a, b) {
            this.high = a | 0;
            this.low = b | 0
    };
    V.__name__ = ["haxe", "Int64"];
    V.sub = function(a, b) {
        var c = a.high - b.high | 0,
            d = a.low - b.low | 0;
        0 > V.uicompare(a.low, b.low) && c--;
        return new V(c, d)
    };
    V.divMod = function(a, b) {
        var c = new V(0, 0),
            d = 0,
            e = 1;
        for (b = new V(b.high, b.low); 0 <= b.high;) {
            var f = V.ucompare(b, a);
            b.high = b.high << 1 | 0 | b.low >>> 31 | 0;
            b.low = b.low << 1 | 0;
            d = d << 1 | 0 | e >>> 31 | 0;
            e = e << 1 | 0;
            if (0 <= f) break
        }
        for (; 0 != (e | d | 0);) 0 <= V.ucompare(a, b) && (c.high = c.high | d | 0, c.low = c.low | e | 0, a = V.sub(a, b)), e = e >>> 1 | d << 31 | 0, d >>>= 1, b.low = b.low >>> 1 |
            b.high << 31 | 0, b.high >>>= 1;
        return {
            quotient: c,
            modulus: a
        }
    };
    V.neg = function(a) {
        var b = ~a.high | 0;
        a = -a.low | 0;
        0 == a && b++;
        return new V(b, a)
    };
    V.uicompare = function(a, b) {
        return 0 > a ? 0 > b ? ~b - ~a | 0 : 1 : 0 > b ? -1 : a - b | 0
    };
    V.ucompare = function(a, b) {
        var c = V.uicompare(a.high, b.high);
        return 0 != c ? c : V.uicompare(a.low, b.low)
    };
    V.prototype = {
        toString: function() {
            if (0 == (this.high | this.low)) return "0";
            var a = "",
                b = !1,
                c = this;
            0 > c.high && (b = !0, c = V.neg(c));
            for (var d = new V(0, 10); 0 != (c.high | c.low);) c = V.divMod(c, d), a = c.modulus.low + a, c = c.quotient;
            b &&
                (a = "-" + a);
            return a
        },
        __class__: V
    };
    var ad = function() {};
    ad.__name__ = ["haxe", "Timer"];
    ad.stamp = function() {
        return (new Date).getTime() / 1E3
    };
    var Z = function() {
        this.h = {}
    };
    Z.__name__ = ["haxe", "ds", "IntMap"];
    Z.__interfaces__ = [Sc];
    Z.prototype = {
        set: function(a, b) {
            this.h[a] = b
        },
        get: function(a) {
            return this.h[a]
        },
        exists: function(a) {
            return this.h.hasOwnProperty(a)
        },
        remove: function(a) {
            if (!this.h.hasOwnProperty(a)) return !1;
            delete this.h[a];
            return !0
        },
        keys: function() {
            var a = [],
                b;
            for (b in this.h) this.h.hasOwnProperty(b) &&
                a.push(b | 0);
            return y.iter(a)
        },
        iterator: function() {
            return {
                ref: this.h,
                it: this.keys(),
                hasNext: function() {
                    return this.it.hasNext()
                },
                next: function() {
                    var a = this.it.next();
                    return this.ref[a]
                }
            }
        },
        __class__: Z
    };
    var Mc = function(a) {
        this.__x = a
    };
    Mc.__name__ = ["haxe", "xml", "_Fast", "NodeAccess"];
    Mc.prototype = {
        resolve: function(a) {
            var b = this.__x.elementsNamed(a).next();
            if (null == b) throw (this.__x.nodeType == A.Document ? "Document" : this.__x.get_nodeName()) + " is missing element " + a;
            return new Gb(b)
        },
        __class__: Mc
    };
    var Nc = function(a) {
        this.__x =
            a
    };
    Nc.__name__ = ["haxe", "xml", "_Fast", "AttribAccess"];
    Nc.prototype = {
        resolve: function(a) {
            if (this.__x.nodeType == A.Document) throw "" + a;
            var b = this.__x.get(a);
            if (null == b) throw this.__x.get_nodeName() + " is missing attribute " + a;
            return b
        },
        __class__: Nc
    };
    var Oc = function(a) {
        this.__x = a
    };
    Oc.__name__ = ["haxe", "xml", "_Fast", "HasAttribAccess"];
    Oc.prototype = {
        __class__: Oc
    };
    var Pc = function(a) {
        this.__x = a
    };
    Pc.__name__ = ["haxe", "xml", "_Fast", "HasNodeAccess"];
    Pc.prototype = {
        resolve: function(a) {
            return this.__x.elementsNamed(a).hasNext()
        },
        __class__: Pc
    };
    var Qc = function(a) {
        this.__x = a
    };
    Qc.__name__ = ["haxe", "xml", "_Fast", "NodeListAccess"];
    Qc.prototype = {
        resolve: function(a) {
            var b = new Lb;
            for (a = this.__x.elementsNamed(a); a.hasNext();) {
                var c = a.next();
                b.add(new Gb(c))
            }
            return b
        },
        __class__: Qc
    };
    var Gb = function(a) {
        if (a.nodeType != A.Document && a.nodeType != A.Element) throw "" + u.string(a.nodeType);
        this.x = a;
        this.node = new Mc(a);
        this.nodes = new Qc(a);
        this.att = new Nc(a);
        this.has = new Oc(a);
        this.hasNode = new Pc(a)
    };
    Gb.__name__ = ["haxe", "xml", "Fast"];
    Gb.prototype = {
        __class__: Gb
    };
    var Da = function() {};
    Da.__name__ = ["haxe", "xml", "Parser"];
    Da.parse = function(a) {
        var b = A.createDocument();
        Da.doParse(a, 0, b);
        return b
    };
    Da.doParse = function(a, b, c) {
        null == b && (b = 0);
        for (var d = null, e = 1, f = 1, g = null, h = 0, k = 0, m = 0, l = a.charCodeAt(b), n = new ab; l == l;) {
            switch (e) {
                case 0:
                    switch (l) {
                        case 10:
                        case 13:
                        case 9:
                        case 32:
                            break;
                        default:
                            e = f;
                            continue
                    }
                    break;
                case 1:
                    switch (l) {
                        case 60:
                            e = 0;
                            f = 2;
                            break;
                        default:
                            h = b;
                            e = 13;
                            continue
                    }
                    break;
                case 13:
                    60 == l ? (f = A.createPCData(n.b + y.substr(a, h, b - h)), n = new ab,
                        c.addChild(f), k++, e = 0, f = 2) : 38 == l && (n.addSub(a, h, b - h), e = 18, f = 13, h = b + 1);
                    break;
                case 17:
                    93 == l && 93 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b + 2) && (e = A.createCData(y.substr(a, h, b - h)), c.addChild(e), k++, b += 2, e = 1);
                    break;
                case 2:
                    switch (l) {
                        case 33:
                            if (91 == a.charCodeAt(b + 1)) {
                                b += 2;
                                if ("CDATA[" != y.substr(a, b, 6).toUpperCase()) throw "";
                                b += 5;
                                e = 17
                            } else if (68 == a.charCodeAt(b + 1) || 100 == a.charCodeAt(b + 1)) {
                                if ("OCTYPE" != y.substr(a, b + 2, 6).toUpperCase()) throw "";
                                b += 8;
                                e = 16
                            } else {
                                if (45 != a.charCodeAt(b +
                                    1) || 45 != a.charCodeAt(b + 2)) throw "";
                                b += 2;
                                e = 15
                            }
                            h = b + 1;
                            break;
                        case 63:
                            e = 14;
                            h = b;
                            break;
                        case 47:
                            if (null == c) throw "";
                            h = b + 1;
                            e = 0;
                            f = 10;
                            break;
                        default:
                            e = 3;
                            h = b;
                            continue
                    }
                    break;
                case 3:
                    if (!(97 <= l && 122 >= l || 65 <= l && 90 >= l || 48 <= l && 57 >= l || 58 == l || 46 == l || 95 == l || 45 == l)) {
                        if (b == h) throw "";
                        d = A.createElement(y.substr(a, h, b - h));
                        c.addChild(d);
                        e = 0;
                        f = 4;
                        continue
                    }
                    break;
                case 4:
                    switch (l) {
                        case 47:
                            e = 11;
                            k++;
                            break;
                        case 62:
                            e = 9;
                            k++;
                            break;
                        default:
                            e = 5;
                            h = b;
                            continue
                    }
                    break;
                case 5:
                    if (!(97 <= l && 122 >=
                        l || 65 <= l && 90 >= l || 48 <= l && 57 >= l || 58 == l || 46 == l || 95 == l || 45 == l)) {
                        if (h == b) throw "";
                        g = y.substr(a, h, b - h);
                        if (d.exists(g)) throw "";
                        e = 0;
                        f = 6;
                        continue
                    }
                    break;
                case 6:
                    switch (l) {
                        case 61:
                            e = 0;
                            f = 7;
                            break;
                        default:
                            throw "";
                    }
                    break;
                case 7:
                    switch (l) {
                        case 34:
                        case 39:
                            e = 8;
                            h = b;
                            break;
                        default:
                            throw 'Expected "';
                    }
                    break;
                case 8:
                    l == a.charCodeAt(h) && (f = y.substr(a, h + 1, b - h - 1), d.set(g, f), e = 0, f = 4);
                    break;
                case 9:
                    h = b = Da.doParse(a, b, d);
                    e = 1;
                    break;
                case 11:
                    switch (l) {
                        case 62:
                            e = 1;
                            break;
                        default:
                            throw "";
                    }
                    break;
                case 12:
                    switch (l) {
                        case 62:
                            return 0 == k && c.addChild(A.createPCData("")), b;
                        default:
                            throw "";
                    }
                case 10:
                    if (!(97 <= l && 122 >= l || 65 <= l && 90 >= l || 48 <= l && 57 >= l || 58 == l || 46 == l || 95 == l || 45 == l)) {
                        if (h == b) throw "";
                        if (y.substr(a, h, b - h) != c.get_nodeName()) throw "" + c.get_nodeName() + ">";
                        e = 0;
                        f = 12;
                        continue
                    }
                    break;
                case 15:
                    45 == l && 45 == a.charCodeAt(b + 1) && 62 == a.charCodeAt(b + 2) && (c.addChild(A.createComment(y.substr(a, h, b - h))), b += 2, e = 1);
                    break;
                case 16:
                    91 == l ? m++ : 93 == l ? m-- : 62 == l && 0 == m && (c.addChild(A.createDocType(y.substr(a,
                        h, b - h))), e = 1);
                    break;
                case 14:
                    63 == l && 62 == a.charCodeAt(b + 1) && (b++, e = y.substr(a, h + 1, b - h - 2), c.addChild(A.createProcessingInstruction(e)), e = 1);
                    break;
                case 18:
                    59 == l && (h = y.substr(a, h, b - h), 35 == h.charCodeAt(0) ? (h = 120 == h.charCodeAt(1) ? u.parseInt("0" + y.substr(h, 1, h.length - 1)) : u.parseInt(y.substr(h, 1, h.length - 1)), n.add(String.fromCharCode(h))) : Da.escapes.exists(h) ? n.add(Da.escapes.get(h)) : n.b += u.string("&" + h + ";"), h = b + 1, e = f)
            }
            l = Uc.fastCodeAt(a, ++b)
        }
        1 == e && (h = b, e = 13);
        if (13 == e) return b == h && 0 != k || c.addChild(A.createPCData(n.b +
            y.substr(a, h, b - h))), b;
        throw "";
    };
    var J = function() {};
    J.__name__ = ["js", "Boot"];
    J.getClass = function(a) {
        return a instanceof Array && null == a.__enum__ ? Array : a.__class__
    };
    J.__string_rec = function(a, b) {
        if (null == a) return "null";
        if (5 <= b.length) return "<...>";
        var c = typeof a;
        "function" == c && (a.__name__ || a.__ename__) && (c = "object");
        switch (c) {
            case "object":
                if (a instanceof Array) {
                    if (a.__enum__) {
                        if (2 == a.length) return a[0];
                        c = a[0] + "(";
                        b += "\t";
                        for (var d = 2, e = a.length; d < e;) var f = d++,
                        c = 2 != f ? c + ("," + J.__string_rec(a[f],
                            b)) : c + J.__string_rec(a[f], b);
                        return c + ")"
                    }
                    c = a.length;
                    d = "[";
                    b += "\t";
                    for (e = 0; e < c;) f = e++, d += (0 < f ? "," : "") + J.__string_rec(a[f], b);
                    return d + "]"
                }
                try {
                    d = a.toString
                } catch (g) {
                    return "???"
                }
                if (null != d && d != Object.toString && (c = a.toString(), "[object Object]" != c)) return c;
                c = null;
                d = "{\n";
                b += "\t";
                e = null != a.hasOwnProperty;
                for (c in a) e && !a.hasOwnProperty(c) || "prototype" == c || "__class__" == c || "__super__" == c || "__interfaces__" == c || "__properties__" == c || (2 != d.length && (d += ", \n"), d += b + c + " : " + J.__string_rec(a[c], b));
                b = b.substring(1);
                return d + ("\n" + b + "}");
            case "function":
                return "<function>";
            case "string":
                return a;
            default:
                return String(a)
        }
    };
    J.__interfLoop = function(a, b) {
        if (null == a) return !1;
        if (a == b) return !0;
        var c = a.__interfaces__;
        if (null != c)
            for (var d = 0, e = c.length; d < e;) {
                var f = d++,
                    f = c[f];
                if (f == b || J.__interfLoop(f, b)) return !0
            }
        return J.__interfLoop(a.__super__, b)
    };
    J.__instanceof = function(a, b) {
        if (null == b) return !1;
        switch (b) {
            case Ca:
                return (a | 0) === a;
            case Ac:
                return "number" == typeof a;
            case ed:
                return "boolean" == typeof a;
            case String:
                return "string" ==
                    typeof a;
            case Array:
                return a instanceof Array && null == a.__enum__;
            case gd:
                return !0;
            default:
                if (null != a) {
                    if ("function" == typeof b && (a instanceof b || J.__interfLoop(J.getClass(a), b))) return !0
                } else return !1;
                return b == hd && null != a.__name__ || b == id && null != a.__ename__ ? !0 : a.__enum__ == b
        }
    };
    J.__cast = function(a, b) {
        if (J.__instanceof(a, b)) return a;
        throw "" + u.string(a) + " to " + u.string(b);
    };
    var Tc = function() {};
    Tc.__name__ = ["js", "Browser"];
    Tc.getLocalStorage = function() {
        try {
            var a = window.localStorage;
            a.getItem("");
            return a
        } catch (b) {
            return null
        }
    };
    var $c, fd = 0;
    Array.prototype.indexOf && (y.indexOf = function(a, b, c) {
        return Array.prototype.indexOf.call(a, b, c)
    });
    Math.NaN = Number.NaN;
    Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
    Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    Math.isFinite = function(a) {
        return isFinite(a)
    };
    Math.isNaN = function(a) {
        return isNaN(a)
    };
    String.prototype.__class__ = String;
    String.__name__ = ["String"];
    Array.__name__ = ["Array"];
    Date.prototype.__class__ = Date;
    Date.__name__ = ["Date"];
    var Ca = {
        __name__: ["Int"]
    },
        gd = {
            __name__: ["Dynamic"]
        }, Ac = Number;
    Ac.__name__ = ["Float"];
    var ed = Boolean;
    ed.__ename__ = ["Bool"];
    var hd = {
        __name__: ["Class"]
    }, id = {};
    A.Element = "element";
    A.PCData = "pcdata";
    A.CData = "cdata";
    A.Comment = "comment";
    A.DocType = "doctype";
    A.ProcessingInstruction = "processingInstruction";
    A.Document = "document";
    aa.NUM_BUBBLE_TYPES = 7;
    aa.BUBBLE_TYPE_UNDEFINED = -1;
    aa.BUBBLE_TYPE_BLOCKER = 0;
    aa.BUBBLE_TYPE_COLOR1 = 1;
    aa.BUBBLE_TYPE_COLOR2 = 2;
    aa.BUBBLE_TYPE_COLOR3 = 3;
    aa.BUBBLE_TYPE_COLOR4 = 4;
    aa.BUBBLE_TYPE_COLOR5 = 5;
    aa.BUBBLE_TYPE_COLOR6 =
        6;
    aa.MATCHES_NEEDED_TO_BURST = 3;
    aa.MIN_TICK_FRAMERATE = 30;
    aa.MAX_RECURSIONS = 1;
    ya.ANIM_APPEAR = 1;
    ya.ANIM_BURST = 2;
    ya.ANIM_SNAP = 3;
    l.NUM_BOTTOM_BUBBLES = 6;
    l.BUBBLE_ANIM_FRAME_APPEAR = 2;
    l.BUBBLE_ANIM_FRAME_APPEAR_END = 25;
    l.BUBBLE_ANIM_FRAME_IDLE = 26;
    l.BUBBLE_ANIM_FRAME_IDLE_END = 31;
    l.BUBBLE_ANIM_FRAME_BURST = 32;
    l.BUBBLE_ANIM_FRAME_BURST_END = 43;
    l.BUBBLE_ANIM_FRAME_SNAP = 44;
    l.BUBBLE_ANIM_FRAME_SNAP_END = 59;
    l.BUBBLE_TOUCH_MAX_BOUNCE_AMOUNT = 0.5;
    l.BUBBLE_TOUCH_DISTANCE_FALLOFF = 1;
    l.BUBBLE_TOUCH_BOUNCE_IN_TIME = 0.125;
    l.BUBBLE_TOUCH_BOUNCE_OUT_TIME =
        1;
    l.BUBBLE_SNAP_TWEEN_DURATION = 0.25;
    l.BUBBLE_APPEAR_DURATION = 0.4;
    l.BUBBLE_BURST_INITIAL_DELAY = 0.01;
    l.BUBBLE_BURST_PER_BUBBLE_DELAY = 0.1;
    l.BUBBLE_BURST_SHRINK_DURATION = 0.5;
    l.BUBBLE_DROP_INITIAL_DELAY = 0.01;
    l.BUBBLE_DROP_PER_BUBBLE_DELAY = 0.1;
    l.VISUAL_BUBBLE_RADIUS_SCALE = 1;
    l.SCORE_UPDATE_TWEEN_TIME = 0.25;
    l.SCORE_UPDATE_INITIAL_DELAY = 0.5;
    l.SCORE_UPDATE_PER_DIGIT_DELAY = 0.025;
    l.BONUS_SOUND_EVERY_BUBBLE = 5;
    l.AIM_DOT_BASE_SIZE = 0.002;
    l.MIN_FREE_ROWS_FOR_KILLING_LINE = 2;
    l.POSITION_CHANGE_TWEEN_DURATION = 0.5;
    l.SUPPORTED_LANGUAGES = ["en", "de"];
    l.DEFAULT_LANGUAGE = "en";
    l.FORCE_LANGUAGE = "";
    l.MORE_GAMES_URL = "http://apps.kaisergames.com/neutral/smarty-bubbles";
    l.NATIVE_WIDTH = 640;
    l.NATIVE_HEIGHT = 960;
    l.DEFAULT_SCREEN_FADE_IN_TIME = 0.4;
    l.DEFAULT_SCREEN_FADE_OUT_TIME = 0.4;
    l.NUM_FREE_ROWS = 7;
    l.KILLING_LINE_ROW_OFFSET = -1.5;
    l.BUBBLE_SPACING_PERCENT = 0.1;
    l.BUBBLE_PADDING = 0.015;
    l.BUBBLE_SNEAK = 0.7;
    l.POINTS_PER_BUBBLE = [10, 10, 10, 25, 50, 100, 250, 500, 1E3];
    l.MAX_SAME_COLORS_IN_A_ROW = 5;
    l.SHOOTER_COLOR_BUBBLE_SPEED = 2.25;
    l.MAX_SHOOTING_ARM_ANGLE = 80;
    l.NUM_LOCAL_HIGHSCORE_ENTRIES =
        6;
    l.LEVEL_SETTINGS = [{
        level: 1,
        bubbles_per_row: 11,
        max_rows: 15,
        start_rows: 7,
        misses_until_new_row: 5,
        colors: [1, 2, 3, 4, 5, 6]
    }, {
        level: 2,
        bubbles_per_row: 20,
        max_rows: 20,
        start_rows: 10,
        misses_until_new_row: 3,
        colors: [1, 2, 5]
    }, {
        level: 3,
        bubbles_per_row: 10,
        max_rows: 12,
        start_rows: 6,
        misses_until_new_row: 1,
        colors: [4, 4]
    }];
    wa.GAME_STATUS_STOPPED = 0;
    wa.GAME_STATUS_RUNNING = 2;
    wa.GAME_STATUS_PAUSED = 3;
    wa.GAME_STATUS_LEVEL_COMPLETE = 4;
    wa.GAME_STATUS_LEVEL_FAILED = 5;
    S.timeLastTouch = 0;
    s.strings_json = "res/strings.json";
    s.sprites_1_png =
        "res/sprites_1.png";
    s.sprites_1_json = "res/sprites_1.json";
    s.sprites_0_png = "res/sprites_0.png";
    s.sprites_0_json = "res/sprites_0.json";
    s.sounds_wav_tap_wav = "res/sounds/wav/tap.wav";
    s.sounds_wav_start_wav = "res/sounds/wav/start.wav";
    s.sounds_wav_snap_wav = "res/sounds/wav/snap.wav";
    s.sounds_wav_shoot_wav = "res/sounds/wav/shoot.wav";
    s.sounds_wav_new_row_wav = "res/sounds/wav/new_row.wav";
    s.sounds_wav_game_over_success_wav = "res/sounds/wav/game_over_success.wav";
    s.sounds_wav_game_over_failure_wav = "res/sounds/wav/game_over_failure.wav";
    s.sounds_wav_burst_wav = "res/sounds/wav/burst.wav";
    s.sounds_wav_bounce_wav = "res/sounds/wav/bounce.wav";
    s.sounds_wav_bonus_wav = "res/sounds/wav/bonus.wav";
    s.sounds_ogg_tap_ogg = "res/sounds/ogg/tap.ogg";
    s.sounds_ogg_start_ogg = "res/sounds/ogg/start.ogg";
    s.sounds_ogg_snap_ogg = "res/sounds/ogg/snap.ogg";
    s.sounds_ogg_shoot_ogg = "res/sounds/ogg/shoot.ogg";
    s.sounds_ogg_new_row_ogg = "res/sounds/ogg/new_row.ogg";
    s.sounds_ogg_game_over_success_ogg = "res/sounds/ogg/game_over_success.ogg";
    s.sounds_ogg_game_over_failure_ogg =
        "res/sounds/ogg/game_over_failure.ogg";
    s.sounds_ogg_burst_ogg = "res/sounds/ogg/burst.ogg";
    s.sounds_ogg_bounce_ogg = "res/sounds/ogg/bounce.ogg";
    s.sounds_ogg_bonus_ogg = "res/sounds/ogg/bonus.ogg";
    s.orientation_png = "res/orientation.png";
    s.logo_png = "res/logo.png";
    s.chunkfive_e_png = "res/chunkfive_e.png";
    s.chunkfive_d_png = "res/chunkfive_d.png";
    s.chunkfive_c_png = "res/chunkfive_c.png";
    s.chunkfive_b_png = "res/chunkfive_b.png";
    s.chunkfive_a_png = "res/chunkfive_a.png";
    s.chunkfive_fnt = "res/chunkfive.fnt";
    s.all = "res/strings.json res/sprites_1.png res/sprites_1.json res/sprites_0.png res/sprites_0.json res/sounds/wav/tap.wav res/sounds/wav/start.wav res/sounds/wav/snap.wav res/sounds/wav/shoot.wav res/sounds/wav/new_row.wav res/sounds/wav/game_over_success.wav res/sounds/wav/game_over_failure.wav res/sounds/wav/burst.wav res/sounds/wav/bounce.wav res/sounds/wav/bonus.wav res/sounds/ogg/tap.ogg res/sounds/ogg/start.ogg res/sounds/ogg/snap.ogg res/sounds/ogg/shoot.ogg res/sounds/ogg/new_row.ogg res/sounds/ogg/game_over_success.ogg res/sounds/ogg/game_over_failure.ogg res/sounds/ogg/burst.ogg res/sounds/ogg/bounce.ogg res/sounds/ogg/bonus.ogg res/orientation.png res/logo.png res/chunkfive_e.png res/chunkfive_d.png res/chunkfive_c.png res/chunkfive_b.png res/chunkfive_a.png res/chunkfive.fnt".split(" ");
    s.path = "res";
    Ba.FADE_NONE = 0;
    Ba.FADE_IN = 1;
    Ba.FADE_OUT = 2;
    Ba.NUM_FIELDS = 3;
    I.soundSupported = !1;
    I.soundMute = !0;
    m._initialized = !1;
    ea._nextGUID = 1;
    k.useFixedTimeStep = !0;
    k.tickRate = 0.01666666;
    k.appTime = 0;
    k.gameTime = 0;
    k.appTimeDelta = 0;
    k.gameTimeDelta = 0;
    k.timeScale = 1;
    k.processedTicks = 0;
    k.processedFrames = 0;
    k.fps = 60;
    k.mAccumulator = 0;
    k.mAccumulatorLimit = 10 * k.tickRate;
    k.mFpsTicks = 0;
    k.mFpsTime = 0;
    r.POOL_SIZE = 4096;
    r.mInitialized = !1;
    r.mNextId = 0;
    ka._counter = 0;
    E.allowXhr = !0;
    z.mBlobSupported = !1;
    p.MAX_SOUND_CHANNELS = 32;
    p.DUP_SOUND_THRESHOLD_SEC = 0.1;
    p._init = !1;
    p._initialized = !1;
    Sa.NONE = new Sa(K.One, L.Zero);
    ha._numStates = -1;
    Ha._tmpMat1 = new lb;
    Ha._tmpMat2 = new lb;
    Nb.mStack = [];
    ib.TYPE = 1;
    Da.escapes = function(a) {
        a = new ca;
        a.set("lt", "<");
        a.set("gt", ">");
        a.set("amp", "&");
        a.set("quot", '"');
        a.set("apos", "'");
        a.set("nbsp", String.fromCharCode(160));
        return a
    }(this);
    za.main()
})();