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
    moves: (el, source) => {
      draggedElement = el;
      prevBox = source.id;
      if (el.className === "temp-title") {
        return false;
      }
      return true;
    },
  }
).on("drop", (el) => {
  nextBox = el.closest(".temp-box").id;
  alertKey(draggedElement, prevBox, nextBox);
  /* drop 시 그려져 있는것 이외의 element가 있다면 그려지게 + */
  if (getAndParse(prevBox)) {
    const preDocumentChild = Array.from(
      document.querySelectorAll(`#${prevBox}`)[0].childNodes
    );
    const preIdArray = preDocumentChild
      .filter((i) => i.className === "listBox")
      .map((i) => parseInt(i.firstChild.id));

    let localData = getAndParse(prevBox);
    for (let i = 0; i < preIdArray.length; i++) {
      localData = localData.filter((k) => k.id !== preIdArray[i]);
    }
    localData[0] !== undefined && addList(localData[0]);
  }

  /* drop 시, 놓는 곳에
  => 모바일 : 3개
  => 태블릿 : 6개, 이상의 element가 있다면 local Storage에서 가장 작은 인덱스를 가진 element가 지워지고 새로 drop되는 것이 그려짐 -> 새로고침 하지 않고 drop을 계속하면 그려져 있는것이 계속 바뀜
  */
  if (getAndParse(nextBox)) {
    const nextDocumentChild = Array.from(
      document.querySelectorAll(`#${nextBox}`)[0].childNodes
    );
    const nextArray = nextDocumentChild.filter(
      (i) => i.className === "listBox"
    );
    const nextIdArray = nextDocumentChild
      .filter((i) => i.className === "listBox")
      .map((i) => parseInt(i.firstChild.id)); // 그려진것들의 아이디 -> drag and drop을 하면 local Storage에 있는 순서대로 화면에 그려지지 않는것을 고려
    if (
      (window.innerWidth <= 480 && nextIdArray.length > 2) ||
      (window.innerWidth > 480 && nextIdArray.length > 5)
    ) {
      let localData = getAndParse(nextBox); // 로컬스토리지에서 가져온것
      let indexArray = [];
      for (let i = 0; i < nextIdArray.length - 1; i++) {
        // drop되는 것 제외
        let index = localData.findIndex((k) => k.id === nextIdArray[i]);
        indexArray.push(index);
      }
      let deleteIndex = Math.min(...indexArray); // 최소값 찾기
      const localDeleteId = getAndParse(nextBox)[deleteIndex].id;

      const deleteDiv = nextArray.filter(
        (i) => parseInt(i.firstChild.id) === localDeleteId
      );
      deleteDiv[0].remove();
    }
  }
});
