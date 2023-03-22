let dragged = null;
let foodDrag = document.getElementById("food"); //감시대상 node
let listBox = [];
const targetTempBox = document.querySelectorAll(".temp-box"); //드래그할것을 놓을 타겟을 모두
const DRAGGING = "dragging";

let observer = new MutationObserver(() => {
  // 노드가 변경 됐을 때의 작업
  refresh(); //노드가 변경되었을때 다시 불러오기
});
// html에 그려지는 리스트의 수가 변하면
let option = {
  childList: true,
};
// 대상 노드에 감시자 전달

observer.observe(foodDrag, option);

function startDrag(element) {
  element.addEventListener("dragstart", (event) => {
    dragged = event.target;
    dragged.classList.add(DRAGGING);
  });
}

/* local Storage에 frozen, refrigerated, roomTemp로 저장
 */
const saveTempBox = (nextBoxKeyName, tempStoredFood) => {
  let oldStorage = getAndParse(nextBoxKeyName);
  if (oldStorage) {
    oldStorage.push(tempStoredFood[0]);
    saveFood(oldStorage, nextBoxKeyName);
  } else {
    saveFood(tempStoredFood, nextBoxKeyName);
  }
};

function opacReset() {
  // 불투명하게 초기화
  dragged.classList.remove(DRAGGING);
}

/* 빈배열을 두지 않으면 null됨 */
let emptyArray = [];

/* dragged 움직이는 html 요소 */
function alertKey(dragged, prevBoxKeyName, nextBoxKeyName) {
  const savedFood = getAndParse(prevBoxKeyName);
  emptyArray = savedFood.filter(
    (i) => i.id !== parseInt(dragged.firstChild.id)
  ); // 지울것 지우고 나머지 filter
  saveFood(emptyArray, prevBoxKeyName); // update
  const tempStoredFood = savedFood.filter(
    (i) => i.id === parseInt(dragged.firstChild.id)
  ); // 다른 key에 저장할 것

  return saveTempBox(nextBoxKeyName, tempStoredFood);
}

function endDrag(element) {
  element.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  element.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.className === "temp-box") {
      const prevBox = dragged.closest(".temp-box");
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
      const nextBox = dragged.parentNode;
      opacReset();
      alertKey(dragged, prevBox.id, nextBox.id);
    }
  });
}

function refresh() {
  listBox = document.querySelectorAll(".listBox");
  /* web Drag
  놓을 타겟에 이벤트 드래그 오버
  drop한곳이 가능한 자리면 이전 자리에 있는 것을 지우고
  drop event target child로 추가
  */
  listBox.forEach((element) => startDrag(element));
  document.addEventListener("dragend", opacReset);
  targetTempBox.forEach((element) => endDrag(element));
}

refresh();
