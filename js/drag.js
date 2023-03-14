let dragged = null;
let foodDrag = document.getElementById("food-list");
//감시대상 node
let listBox = [];
const targetTempBox = document.querySelectorAll(".temp-box")
//드래그할것을 놓을 타겟을 모두
const DRAGGING = "dragging";

//드래그 스타트를 하면 그 이벤트의 타겟이 dragged이다

//인스턴스
let observer = new MutationObserver(() => {
  // 노드가 변경 됐을 때의 작업
  refresh();
  //노드가 변경되었을때 다시 불러오기
})
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
};
/* local Storage에 frozen, refrigerated, roomTemp로 저장
*/
const saveTempBox = (keyName, tempStoredFood) => {
  let oldStorage = JSON.parse(localStorage.getItem(`${keyName}`));
  if (oldStorage !== null) {
    oldStorage.push(tempStoredFood[0]);
    localStorage.setItem(`${keyName}`, JSON.stringify(oldStorage));
  }
  else {
    localStorage.setItem(`${keyName}`, JSON.stringify(tempStoredFood));
  }

};

function opacReset() {
  // 불투명하게 초기화
  dragged.classList.remove(DRAGGING);
};



/* 빈배열을 두지 않으면 null됨 */
let emptyArray = [];

/* dragged 움직이는 html 요소 */
const alertKey = (dragged, keyName) => {
  const savedFood = JSON.parse(localStorage.getItem('food'));
  //JSON.parse(dragged.firstChild.id) 지울것 아이디
  emptyArray = savedFood.filter((i) => i.id !== JSON.parse(dragged.firstChild.id));// 지울것 지우고 나머지 filter
  localStorage.setItem('food', JSON.stringify(emptyArray));// update


  const tempStoredFood = savedFood.filter((i) => i.id === JSON.parse(dragged.firstChild.id)); // 다른 key에 저장할 것

  if (tempStoredFood.length !== 0) {
    return saveTempBox(keyName, tempStoredFood);
  }
}


function endDrag(element) {
  element.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  element.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.classList = "temp-box") {
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
      opacReset();
      alertKey(dragged, event.target.id);
    }
  });
}


function refresh() {
  if (foodDrag.childElementCount !== 0) {
    listBox = document.querySelectorAll(".listBox");
    listBox.forEach((element) => startDrag(element));
    document.addEventListener("dragend", opacReset);
    targetTempBox.forEach((element) => endDrag(element));
    //4.놓을 타겟에 이벤트 드래그 오버를 실행시키고
    //그 이벤트의 타겟의 기본동작을 막는다
    //5.타겟(놓을자리)의 이벤트 drop이 발생하면 그 이벤트의 기본을 막는다
    //6.그 이벤트의 클래스네임이 드롭존이라면(놓을 수 있는 자리라면)
    //7.지금 드래그중인것의 부모의 자식(본인)을 지운다
    //8.그리고 이벤트의 타겟(본인)의 자리에 자식을 추가한다
  }
}

refresh();

