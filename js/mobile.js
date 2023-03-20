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
유통기한 임박 + 지난것 알림, 알림 누르면 해당하는 음식들 모달창, 리펙토링-> 모바일 성능 향상?

모바일 -> 카톡으로 열면 문제생김
크롬 -> ok
사파리 -> ok

4개 이상 되면 새로고침되게
옆으로 넓어지지 높이는 그대로기 때문에 각 칸의 크기 줄이기 -> 모바일 크기 확인
목록 가로정렬 -> 높이 확 줄이기
상온 가로정렬 -> 높이 확 줄이기
d-day에서 만료된것은 다음 단계에 filter되야 하나 모든게 다시 확인됨.
*/
