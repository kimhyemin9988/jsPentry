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

/* 
모바일 -> 카톡으로 열면 문제생김
크롬 -> ok
사파리 -> ok

1)drag and drop과 input시 모바일에서 4개 이상 되면, 가장 처음것이 main에서  삭제되도록!
2)   웹에서 7개 이상 되면, 가장 처음것이 main에서  삭제되도록!
3)input 확대 막기
4)listBox 레이아웃 다시 만들기

옆으로 넓어지지 높이는 그대로기 때문에 각 칸의 크기 줄이기 -> 모바일 크기 확인 +
목록 가로정렬 -> 높이 확 줄이기 +
상온 가로정렬 -> 높이 확 줄이기 +
*/
