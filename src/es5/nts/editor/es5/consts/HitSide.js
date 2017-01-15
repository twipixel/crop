(function () {
    'use strict';

    var HitSide = {};
    HitSide.NONE = 'none';
    HitSide.LEFT = 'left';
    HitSide.TOP = 'top';
    HitSide.RIGHT = 'right';
    HitSide.BOTTOM = 'bottom';
    HitSide.LEFT_TOP = 'left-top';
    HitSide.LEFT_BOTTOM = 'left-bottom';
    HitSide.RIGHT_TOP = 'right-top';
    HitSide.RIGHT_BOTTOM = 'right-bottom';

    usenamespace('editor.es5.consts').HitSide = HitSide;
})();