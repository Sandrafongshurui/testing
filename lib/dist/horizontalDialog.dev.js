"use strict";

/******/
(function (modules) {
  // webpackBootstrap

  /******/
  // The module cache

  /******/
  var installedModules = {}; // The require function

  /******/

  /******/

  /******/

  function __webpack_require__(moduleId) {
    /******/

    /******/
    // Check if module is in cache

    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports;
      /******/
    } // Create a new module (and put it into the cache)

    /******/

    /******/


    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,

      /******/
      l: false,

      /******/
      exports: {}
      /******/

    }; // Execute the module function

    /******/

    /******/

    /******/

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); // Flag the module as loaded

    /******/

    /******/

    /******/

    module.l = true; // Return the exports of the module

    /******/

    /******/

    /******/

    return module.exports;
    /******/
  } // expose the modules object (__webpack_modules__)

  /******/

  /******/

  /******/

  /******/


  __webpack_require__.m = modules; // expose the module cache

  /******/

  /******/

  /******/

  __webpack_require__.c = installedModules; // identity function for calling harmony imports with the correct context

  /******/

  /******/

  /******/

  __webpack_require__.i = function (value) {
    return value;
  }; // define getter function for harmony exports

  /******/

  /******/

  /******/


  __webpack_require__.d = function (exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        /******/
        configurable: false,

        /******/
        enumerable: true,

        /******/
        get: getter
        /******/

      });
      /******/
    }
    /******/

  }; // getDefaultExport function for compatibility with non-harmony modules

  /******/

  /******/

  /******/


  __webpack_require__.n = function (module) {
    /******/
    var getter = module && module.__esModule ?
    /******/
    function getDefault() {
      return module['default'];
    } :
    /******/
    function getModuleExports() {
      return module;
    };
    /******/

    __webpack_require__.d(getter, 'a', getter);
    /******/


    return getter;
    /******/
  }; // Object.prototype.hasOwnProperty.call

  /******/

  /******/

  /******/


  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }; // __webpack_public_path__

  /******/

  /******/

  /******/


  __webpack_require__.p = ''; // Load entry module and return exports

  /******/

  /******/

  /******/

  return __webpack_require__(__webpack_require__.s = 0);
  /******/
})(
/************************************************************************/

/******/
[
/* 0 */

/***/
function (module, exports, __webpack_require__) {
  'use strict';
  /**
   * @file index.js
   * Contains code that registers a dialog popup component.
   */

  /* global AFRAME */

  if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
  }
  /**
   * Dialog Popup component for A-Frame.
   */


  AFRAME.registerComponent('dialog-popup', {
    schema: {
      title: {
        type: 'string',
        "default": 'New Dialog'
      },
      titleColor: {
        type: 'string',
        "default": 'black'
      },
      titleFont: {
        type: 'string',
        "default": 'assets/raleway.json'
      },
      titleWrapCount: {
        type: 'number',
        "default": 24
      },
      body: {
        type: 'string',
        "default": ''
      },
      bodyColor: {
        type: 'string',
        "default": 'black'
      },
      bodyFont: {
        type: 'string',
        "default": 'assets/raleway.json'
      },
      bodyWrapCount: {
        type: 'number',
        "default": 30
      },
      openOn: {
        type: 'string',
        "default": 'mouseenter'
      },
      active: {
        type: 'boolean',
        "default": true
      },
      openIconImage: {
        type: 'asset',
        "default": 'assets/plus.png'
      },
      openIconRadius: {
        type: 'number',
        "default": 0.3
      },
      openIconColor: {
        type: 'string',
        "default": 'white'
      },
      closeIconImage: {
        type: 'asset',
        "default": ''
      },
      closeIconRadius: {
        type: 'number',
        "default": 0.3
      },
      closeIconColor: {
        type: 'string',
        "default": 'white'
      },
      image: {
        type: 'string',
        "default": ''
      },
      imageWidth: {
        type: 'number',
        "default": 3
      },
      imageHeight: {
        type: 'number',
        "default": 3
      },
      dialogBoxWidth: {
        type: 'number',
        "default": 5
      },
      dialogBoxHeight: {
        type: 'number',
        "default": 2.5
      },
      dialogBoxColor: {
        type: 'string',
        "default": 'white'
      },
      dialogBoxPadding: {
        type: 'number',
        "default": 0.2
      },
      previousDialog: {
        type: 'string',
        "default": ''
      },
      multiple: {
        type: 'boolean',
        "default": 'false'
      }
    },
    multiple: true,
    dialogPlaneEl: null,
    openIconEl: null,
    closeIconEl: null,
    titleEl: null,
    bodyEl: null,
    imageEl: null,
    hasImage: false,

    /**
     * Spawns the entities required to support this dialog.
     */
    init: function init() {
      this.cameraEl = document.querySelector('[camera]');
      this.spawnEntities();
      this.el.emit('loaded');
    },

    /**
     * If the component is open, ensure it always faces the camera.
     */
    tick: function tick() {
      if (this.isOpen) {
        this.positionDialogPlane();
      }
    },

    /**
     * When this component is removed, destruct event listeners.
     */
    remove: function remove() {
      var openOn = this.data.openOn;
      this.openIconEl.removeEventListener(openOn, this.toggleDialogOpen.bind(this));
      this.closeIconEl.removeEventListener(openOn, this.toggleDialogOpen.bind(this));
    },

    /**
     * When this component is updated, re-calculate title, body, image, and
     * dialog plane to incorporate changes.
     */
    update: function update() {
      this.generateTitle();
      this.generateBody();
      this.generateImage();
    },

    /**
     * Handles opening and closing the dialog plane.
     */

    /**
     * Generates the open icon.
     */
    generateOpenIcon: function generateOpenIcon() {
      var _this$data = this.data,
          radius = _this$data.openIconRadius,
          color = _this$data.openIconColor,
          src = _this$data.openIconImage,
          openOn = _this$data.openOn,
          after = _this$data.previousDialog,
          multiple = _this$data.multiple;
      var idname = this.el.getAttribute('id');
      var openIcon = document.createElement('a-entity');
      var pulseIcon = document.createElement('a-entity');
      var pos = this.el.getAttribute('position');
      openIcon.setAttribute('id', ''.concat(this.el.getAttribute('id'), '--open-icon'));
      openIcon.setAttribute('position', Object.assign({}, pos));
      pulseIcon.setAttribute('position', Object.assign({}, pos));
      openIcon.setAttribute('geometry', {
        primitive: 'circle',
        radius: radius
      }); // If the parent entity has aa look-at component attached, apply the look-at
      // component to the openIcon.
      //openIcon.classList.add('removeIcon');

      openIcon.classList.add('dialogIcon');

      if (multiple) {
        pulseIcon.setAttribute('id', ''.concat(idname, '--pulse-icon'));
        pulseIcon.setAttribute('geometry', {
          primitive: 'circle',
          radius: radius + 0.01
        });
        pulseIcon.setAttribute('material', {
          src: 'assets/pulse.png',
          transparent: 'true'
        });
        pulseIcon.classList.add('removePulse');
        var matches = idname.match(/(\d+)/);
        var iconSrc = 'assets/question'.concat(matches[0], '.png');
        openIcon.setAttribute('material', {
          color: color,
          src: iconSrc
        });
        pulseIcon.setAttribute('animation__scale', 'property: scale; to: 1.2 1.2 1; loop: true;');

        if (after) {
          var makeVis = function makeVis() {
            document.getElementById(after.concat('--open-icon')).removeEventListener('mouseenter', makeVis);
            $(openIcon).removeClass('invis');
            $(pulseIcon).removeClass('invis');
          };

          openIcon.classList.add('invis');
          pulseIcon.classList.add('invis');
          openIcon.setAttribute('visible', 'false');
          pulseIcon.setAttribute('visible', 'false');
          $(window).on('load', function () {
            document.getElementById(after.concat('--open-icon')).addEventListener('mouseenter', function () {
              makeVis();
            });
            document.getElementById(after.concat('--pulse-icon')).addEventListener('mouseenter', function () {
              makeVis();
            });
          });
        }
      } else {
        openIcon.setAttribute('material', {
          color: color,
          src: src
        });
      }

      openIcon.setAttribute('material', {
        shader: 'flat'
      });
      pulseIcon.setAttribute('material', {
        shader: 'flat'
      });
      pulseIcon.setAttribute('look-at', '#cam');
      openIcon.setAttribute('look-at', '#cam');
      $(window).on('load', function () {
        openIcon.addEventListener('mouseenter', function () {
          openPlane();
        });
        pulseIcon.addEventListener('mouseenter', function () {
          openPlane();
        });

        function openPlane() {
          //var removeIcon = $('.removeIcon');
          //var removePulse = $('.removePulse');
          document.getElementById(''.concat(idname, '--dialog-plane')).setAttribute('visible', 'true');
          document.getElementById(''.concat(idname, '--open-icon')).setAttribute('visible', 'false'); // for (let x = 0; x < removeIcon.length; x++) {
          // 	removeIcon[x].setAttribute('visible', 'false');
          // }
          // if (removePulse) {
          // 	for (let x = 0; x < removePulse.length; x++) {
          // 		removePulse[x].setAttribute('visible', 'false');
          // 	}
          // }

          if ($(pulseIcon)) {
            $(pulseIcon).remove();
          }
        }
      });
      this.openIconEl = openIcon;
      return [openIcon, pulseIcon];
    },

    /**
     * Generates the close icon.
     */
    generateCloseIcon: function generateCloseIcon() {
      var _this$data2 = this.data,
          radius = _this$data2.closeIconRadius,
          color = _this$data2.closeIconColor,
          src = _this$data2.closeIconImage,
          width = _this$data2.dialogBoxWidth,
          height = _this$data2.dialogBoxHeight,
          openOn = _this$data2.openOn;
      var closeIcon = document.createElement('a-entity');
      closeIcon.setAttribute('id', ''.concat(this.el.getAttribute('id'), '--close-icon'));
      closeIcon.setAttribute('position', {
        x: width / 2,
        y: height / 2,
        z: 0.01
      });
      closeIcon.setAttribute('geometry', {
        primitive: 'circle',
        radius: radius
      });
      closeIcon.setAttribute('material', {
        color: color,
        src: src
      });
      closeIcon.addEventListener(openOn, this.toggleDialogOpen.bind(this));
      this.closeIconEl = closeIcon;
      return closeIcon;
    },

    /**
     * Generates the title text.
     */
    generateTitle: function generateTitle() {
      var _this$data3 = this.data,
          value = _this$data3.title,
          color = _this$data3.titleColor,
          font = _this$data3.titleFont,
          wrapCount = _this$data3.titleWrapCount,
          width = _this$data3.dialogBoxWidth,
          height = _this$data3.dialogBoxHeight,
          padding = _this$data3.dialogBoxPadding,
          body = _this$data3.body,
          imageHeight = _this$data3.imageHeight;
      var title = this.titleEl || document.createElement('a-entity');
      title.setAttribute('id', ''.concat(this.el.getAttribute('id'), '--title'));
      title.setAttribute('text', {
        value: value,
        color: '#456ab7',
        align: 'center',
        font: font,
        letterSpacing: -2,
        wrapCount: 16,
        width: 2,
        shader: 'msdf',
        baseline: 'top',
        anchor: 'center'
      });
      title.setAttribute('geometry', 'primitive: plane; width: auto; height: auto; ');
      title.setAttribute('material', 'color: purple;visible:false;');
      var y = height / 2 - padding;

      if (this.hasImage) {
        y -= imageHeight / 2;
      }

      if (body == '') {
        title.setAttribute('position', {
          x: 1.16,
          y: 0,
          z: 0.01
        });
      } else {
        title.setAttribute('position', {
          x: 1.16,
          y: 0.8,
          z: 0.01
        });
      }

      this.titleEl = title;
      return title;
    },

    /**
     * Generates the body text entity.
     */
    generateBody: function generateBody() {
      var _this$data4 = this.data,
          value = _this$data4.body,
          color = _this$data4.bodyColor,
          font = _this$data4.bodyFont,
          wrapCount = _this$data4.bodyWrapCount,
          width = _this$data4.dialogBoxWidth,
          height = _this$data4.dialogBoxHeight,
          padding = _this$data4.dialogBoxPadding,
          imageHeight = _this$data4.imageHeight;
      var body = this.bodyEl || document.createElement('a-entity');
      body.setAttribute('id', ''.concat(this.el.getAttribute('id'), '--body'));
      body.setAttribute('text', {
        value: value,
        color: color,
        font: font,
        wrapCount: 40,
        shader: 'msdf',
        width: 2.3,
        baseline: 'center',
        anchor: 'center'
      });
      var y = height / 2 - padding * 3;

      if (this.hasImage) {
        y -= imageHeight / 2;
      }

      body.setAttribute('position', {
        x: 1.2,
        y: -0.1,
        z: 0.01
      });
      this.bodyEl = body;
      return body;
    },

    /**
     * Generates the image entity.
     */
    generateImage: function generateImage() {
      var _this$data5 = this.data,
          src = _this$data5.image,
          width = _this$data5.imageWidth,
          height = _this$data5.imageHeight,
          dialogBoxHeight = _this$data5.dialogBoxHeight,
          multiple = _this$data5.multiple;

      if (!src.length) {
        return null;
      }

      var roundedPlane = document.createElement('a-rounded');
      roundedPlane.setAttribute('position', '-0.14 -1.14 0.001');
      roundedPlane.setAttribute('rounded', {
        height: 2.3,
        width: 2.5
      });
      roundedPlane.setAttribute('material', {
        shader: 'flat'
      });
      var image = this.imageEl || document.createElement('a-rounded');
      image.classList.add('ansOrder');
      var idname = this.el.getAttribute('id');
      var matches = idname.match(/(\d+)/);
      image.setAttribute('rounded', 'radius: 0.05');

      if (multiple) {
        image.setAttribute('order', matches[0]);
      }

      image.setAttribute('id', ''.concat(this.el.getAttribute('id'), '--image'));
      image.setAttribute('material', {
        src: src,
        height: height,
        width: width,
        shader: 'flat'
      });
      image.setAttribute('scale', '2.31 2.31 1');
      image.setAttribute('width', '1');
      image.setAttribute('height', '1');
      image.setAttribute('position', {
        x: -2.37,
        y: -1.15,
        z: 0.02
      });
      this.hasImage = true;
      this.imageEl = image;
      return [image, roundedPlane];
    },

    /**
     * Generates the dialog plane.
     */
    generateDialogPlane: function generateDialogPlane() {
      var _this$data6 = this.data,
          width = _this$data6.dialogBoxWidth,
          height = _this$data6.dialogBoxHeight,
          padding = _this$data6.dialogBoxPadding,
          color = _this$data6.dialogBoxColor;
      var plane = this.dialogPlaneEl || document.createElement('a-entity');
      var idname = this.el.getAttribute('id');
      plane.setAttribute('id', ''.concat(this.el.getAttribute('id'), '--dialog-plane'));
      plane.setAttribute('look-at', '#cam');
      plane.setAttribute('position', Object.assign({}, this.el.getAttribute('position')));
      plane.setAttribute('visible', false);
      plane.setAttribute('geometry', {
        primitive: 'plane',
        width: width + padding,
        height: height + padding
      });
      var image = this.generateImage();

      if (image) {
        plane.appendChild(image[0]);
        plane.appendChild(image[1]);
      }

      plane.setAttribute('material', {
        color: color,
        src: 'assets/infoDialog.png',
        transparent: true,
        opacity: '0.5'
      });
      plane.appendChild(this.generateTitle());
      plane.appendChild(this.generateBody());
      document.getElementById('skybox').addEventListener('mouseenter', function () {
        var newEl = document.getElementById(''.concat(idname, '--open-icon'));

        if (!newEl.classList.contains('invis')) {
          document.getElementById(''.concat(idname, '--dialog-plane')).setAttribute('visible', 'false');
          newEl.setAttribute('visible', 'true');
        }

        var newPulse = document.getElementById(''.concat(idname, '--pulse-icon'));

        if (newPulse) {
          if (!newPulse.classList.contains('invis')) {
            newPulse.setAttribute('visible', 'true');
          }
        }
      });
      this.dialogPlaneEl = plane;
      return plane;
    },
    positionDialogPlane: function positionDialogPlane() {
      if (this.dialogPlaneEl) {
        var vector = this.dialogPlaneEl.object3D.parent.worldToLocal(this.cameraEl.object3D.getWorldPosition());
        this.dialogPlaneEl.object3D.lookAt(vector);
      }
    },
    spawnEntities: function spawnEntities() {
      var icons = this.generateOpenIcon();
      this.el.appendChild(icons[0]);
      this.el.appendChild(icons[1]);
      this.el.appendChild(this.generateDialogPlane());
      this.el.removeAttribute('position');
    }
  });
  /***/
}
/******/
]);

var state = false;

function assestMode() {
  var currentOrder = 1;
  var icons = document.getElementsByClassName('dialogIcon');
  var removePulse = document.getElementsByClassName('removePulse');
  var ansOrder = document.getElementsByClassName('ansOrder');

  if (!state) {
    $('#appState').css('visibility', 'visible');
    $('.tooltiptext').text('Click to enter freeview mode!');
    anime.timeline({
      loop: false
    }).add({
      targets: '#morph',
      width: '235px',
      x: '0',
      easing: 'easeInOutQuad',
      duration: '500',
      delay: function delay(el, i) {
        return 100 + 30 * i;
      }
    }).add({
      targets: '#morphtext',
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 800
    });
    anime({
      targets: '#topright',
      opacity: [0, 0.5],
      height: '674',
      easing: 'easeInOutQuad',
      duration: '1000'
    });
    anime({
      targets: '#topleft',
      opacity: [0, 0.5],
      width: '1455',
      easing: 'easeInOutQuad',
      duration: '1000'
    });
    anime({
      targets: '#bottomright',
      opacity: [0, 0.5],
      height: '674',
      y: '5',
      easing: 'easeInOutQuad',
      duration: '1000'
    });
    anime({
      targets: '#bottomleft',
      opacity: [0, 0.5],
      width: '1455',
      x: '5',
      easing: 'easeInOutQuad',
      duration: '1000'
    });

    var _loop = function _loop(x) {
      var iconId = ansOrder[x].getAttribute('id').split('--')[0];
      var order = ansOrder[x].getAttribute('order');

      if (order) {
        icons[x].classList.remove('invis');
        icons[x].setAttribute('material', 'src: assets/question.png');
        icons[x].setAttribute('visible', 'true');
        ansOrder[x].addEventListener('click', function checkOrder() {
          if (!state) {
            ansOrder[x].removeEventListener('click', checkOrder);
          } else {
            var currIcon = document.getElementById(iconId.concat('--open-icon'));

            if (currentOrder == order) {
              var audio = new Audio('assets/positive.mp3');
              audio.play();
              currIcon.setAttribute('material', 'src: assets/correct.png');
              setTimeout(function () {
                currIcon.setAttribute('material', 'src: assets/question'.concat(order, '.png'));
              }, 1000);
              ansOrder[x].removeEventListener('click', checkOrder);
              currentOrder++;
            } else {
              var audio = new Audio('assets/negative.mp3');
              audio.play();
              currIcon.setAttribute('material', 'src: assets/false.png');
              setTimeout(function () {
                currIcon.setAttribute('material', 'src: assets/question.png');
              }, 1000);
            }
          }
        });
      }
    };

    for (var x = 0; x < ansOrder.length; x++) {
      _loop(x);
    }

    for (var _x = 0; _x < removePulse.length; _x++) {
      $(removePulse[_x]).remove();
    }

    state = true; // $('.alert').hide().css('visibility', 'visible').fadeIn('slow');
  } else {
    $('#appState').css('visibility', 'hidden');
    $('.tooltiptext').text('Click to enter assessment mode!');
    anime.timeline({
      loop: false
    }).add({
      targets: '#morphtext',
      translateX: [0, -30],
      opacity: [1, 0],
      easing: 'easeInExpo',
      duration: 500,
      delay: function delay(el, i) {
        return 100 + 30 * i;
      }
    }).add({
      targets: '#morph',
      width: '64px',
      x: '171',
      easing: 'easeInOutQuad',
      duration: '500'
    });
    anime({
      targets: '#topright',
      opacity: [0.5, 0],
      height: '5',
      easing: 'easeInOutQuad',
      duration: '1000'
    });
    anime({
      targets: '#topleft',
      opacity: [0.5, 0],
      width: '5',
      easing: 'easeInOutQuad',
      duration: '1000'
    });
    anime({
      targets: '#bottomright',
      opacity: [0.5, 0],
      height: '5',
      y: '674',
      easing: 'easeInOutQuad',
      duration: '1000'
    });
    anime({
      targets: '#bottomleft',
      opacity: [0.5, 0],
      width: '5',
      x: '1455',
      easing: 'easeInOutQuad',
      duration: '1000'
    });

    for (var _x2 = 0; _x2 < ansOrder.length; _x2++) {
      var iconId = ansOrder[_x2].getAttribute('id').split('--')[0];

      var order = ansOrder[_x2].getAttribute('order');

      if (order) {
        document.getElementById(iconId.concat('--open-icon')).setAttribute('material', 'src: assets/question'.concat(order, '.png'));
      }
    }

    state = false;
  }
} //Hotspot Functions


AFRAME.registerComponent('hotspots', {
  init: function init() {
    this.el.addEventListener('reloadspots', function (evt) {
      //get the entire current spot group and scale it to 0
      var currspotgroup = document.getElementById(evt.detail.currspots);
      currspotgroup.setAttribute('visible', 'false'); //get the entire new spot group and scale it to 1

      var newspotgroup = document.getElementById(evt.detail.newspots);
      newspotgroup.setAttribute('visible', 'true');
    });
  }
});
AFRAME.registerComponent('spot', {
  schema: {
    linkto: {
      type: 'string',
      "default": ''
    },
    spotgroup: {
      type: 'string',
      "default": ''
    },
    nameLink: {
      type: 'string',
      "default": ''
    }
  },
  init: function init() {
    //add image source of hotspot icon
    this.el.setAttribute('src', '#arrow');
    this.el.setAttribute('transparent');
    this.el.setAttribute('geometry', {
      primitive: 'circle',
      radius: '0.6'
    });
    this.el.setAttribute('material', {
      color: 'white'
    }); //make the icon look at the camera all the time

    var data = this.data;
    var tooltip = document.createElement('a-text');
    var tooltipPlane = document.createElement('a-rounded');
    var rotation = this.el.getAttribute('rotation');
    tooltip.setAttribute('rotation', '60 180 0');
    tooltip.setAttribute('position', '0 0.47 -0.10');
    tooltipPlane.setAttribute('rotation', '60 180 0');
    tooltipPlane.setAttribute('position', '0.75 0.51 0');
    tooltipPlane.setAttribute('rounded', 'height: 0.35; width: 1.5; color: #ffffff');
    tooltipPlane.setAttribute('material', 'shader: flat;');
    tooltip.setAttribute('text', {
      value: data.nameLink,
      align: 'center',
      font: 'assets/raleway.json',
      shader: 'msdf',
      baseline: 'top',
      color: '#456ab7'
    });
    tooltip.setAttribute('visible', 'false');
    tooltipPlane.setAttribute('visible', 'false');
    this.el.appendChild(tooltip);
    this.el.appendChild(tooltipPlane);
    this.el.addEventListener('mouseenter', function () {
      tooltip.setAttribute('visible', 'true');
      tooltipPlane.setAttribute('visible', 'true');
      $('.a-canvas.a-grab-cursor:hover').css('cursor', 'pointer');
    });
    this.el.addEventListener('mouseleave', function () {
      tooltip.setAttribute('visible', 'false');
      tooltipPlane.setAttribute('visible', 'false');
      $('.a-canvas.a-grab-cursor:hover').css('cursor', 'grab');
    });
    document.getElementsByClassName('a-canvas')[0].addEventListener('mousedown', function () {
      $('.a-canvas.a-grab-cursor:hover').css('cursor', 'grabbing');
    });
    document.getElementsByClassName('a-canvas')[0].addEventListener('mouseup', function () {
      $('.a-canvas.a-grab-cursor:hover').css('cursor', 'grab');
    });
    this.el.addEventListener('click', function () {
      checkCamera(data.linkto); //set the skybox source to the new image as per the spot

      var sky = document.getElementById('skybox');
      sky.setAttribute('src', data.linkto);
      var spotcomp = document.getElementById('spots');
      var currspots = this.parentElement.getAttribute('id'); //create event for spots component to change the spots data

      spotcomp.emit('reloadspots', {
        newspots: data.spotgroup,
        currspots: currspots
      });
    });
  }
});