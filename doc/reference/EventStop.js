

mousedown(event) {
    event.stopPropagation();
    /*
     // 현재 이벤트의 기본 동작을 중단한다.
     event.preventDefault();

     // 현재 이벤트가 상위로 전파되지 않도록 중단한다.
     event.stopPropagation();

     // 현재 이벤트가 상위뿐 아니라 현재 레벨에 걸린 다른 이벤트도 동작하지 않도록 중단한다.
     event.stopImmediatePropagation();
     */
}