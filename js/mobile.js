let draggedElement;
let prevBox;
let nextBox;

dragula(
  [
    document.getElementById("food"),
    document.getElementById("frozen"),
    document.getElementById("refrigerated"),
    document.getElementById("roomTemp"),
  ],
  {
    moves: function (el, source) {
      draggedElement = el;
      prevBox = source.id;
      if (el.className === "temp-title") {
        return false;
      }
      return true;
    },
  }
).on("drop", function (el) {
  nextBox = el.closest(".temp-box").id;
  alertKey(draggedElement, prevBox, nextBox);
});


/* 몇개 넣었는지 +
-두번째로 drag and drop 하면 null이 들어감....
-알수 없는 이유로 같은것이 2개 그려짐
-알수 없는 이유

유통기한 임박 + 지난것 알림, 알림 누르면 해당하는 음식들 모달창, 리펙토링-> 모바일 성능 향상? */
