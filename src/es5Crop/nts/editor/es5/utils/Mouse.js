(function () {
    'use strict';

    var Mouse = {};


    // 마우스 접근을 위해 pixi renderer 를 참조합니다.
    Object.defineProperty(Mouse, 'renderer', {
        get: function () {return Mouse._renderer;},
        set: function (renderer) {Mouse._renderer = renderer;}
    });

    Object.defineProperty(Mouse, 'stageX', {get: function () {return Mouse._renderer.plugins.interaction.mouse.global.x;}});
    Object.defineProperty(Mouse, 'stageY', {get: function () {return Mouse._renderer.plugins.interaction.mouse.global.y;}});

    usenamespace('editor.es5.utils').Mouse = Mouse;
})();