/*
https://lsw0150305.gitbook.io/til/javascript/performance-optimize
DOM 트리를 접근하는 건 상당히 속도가 느립니다.
따라서, 자바스크립트의 성능을 최적화하기 위해서는 DOM 객체 접근을 최소화하도록 코드를 작성해야 한다.
만약 DOM에 30개의 태그를 추가해야 한다고 가정하면 30번의 접근이 필요하다.
이런경우에 DocumentFragment를 사용해서 추가하면 1번의 접근으로 추가가 가능하다.
*/

const count = document.querySelectorAll(".count");

/* input form */
const [foodForm, foodName, foodPrice, exDate] = [
  ".food-form",
  "#food-name",
  "#food-price",
  "#ex-date",
].map((i) => document.querySelector(i));
const submitAlarm = document.querySelector(".submit-alarm");

/* container box */
const [foodList, frozen, refrigerated, roomTemp] = [
  "#food",
  "#frozen",
  "#refrigerated",
  "#roomTemp",
].map((i) => document.querySelector(i));

/* localStorage에서 value를 가져온뒤 parse */
const [savedFood, savedFrozen, savedRefrigerated, savedRoomTemp] = [
  "food",
  "frozen",
  "refrigerated",
  "roomTemp",
].map((i) => {
  return JSON.parse(localStorage.getItem(i));
});

const getAndParse = (i) => {
  return JSON.parse(localStorage.getItem(i));
};

const body = document.querySelector("body");
let storedFood = [];

/* modal open btn */
const entireLiBtn = document.querySelectorAll(".entire-li-btn");

/* 등록시 알림 */
const alarm = () => {
  submitAlarm.classList.remove("hidden");
  setTimeout(() => {
    submitAlarm.classList.add("hidden");
  }, 800);
};

/* 처음 등록시 localstorage에 key: "food"로 저장 */
function saveFood(element, keyName) {
  localStorage.setItem(keyName, JSON.stringify(element));
}

function inputFood(event) {
  event.preventDefault();
  const [foodNValue, foodPValue, foodEXValue] = [
    foodName.value,
    foodPrice.value,
    exDate.value,
  ];
  [foodName.value, foodPrice.value, exDate.value] = [null, null, null];
  const newFoodobj = {
    id: Date.now(),
    text: foodNValue,
    price: foodPValue,
    exDate: foodEXValue,
  };
  storedFood =
    localStorage.getItem("food") !== null
      ? JSON.parse(localStorage.getItem("food"))
      : [];
  console.log(storedFood);
  storedFood.push(newFoodobj);
  saveFood(storedFood, "food"); //localStorage에 저장
  addList(newFoodobj);
  //객체로 만든 다음에 그리기
  alarm();
  //foodCount();
}

/*  modal 열렸을 때 삭제 and main에서 삭제 */
function removeLi(event) {
  const [modalContent, removeContainer, removeDiv] = [
    ".modal-content",
    ".temp-box",
    ".listBox",
  ].map((i) => event.currentTarget.closest(i));
  /* if modal 열렸다면 or mainBox*/
  const id = removeContainer ? removeContainer.id : modalContent.classList[1];
  console.log(id);
  storedFood = getAndParse(id);
  console.log(storedFood);
  storedFood = storedFood.filter(
    (Element) => Element.id !== parseInt(event.currentTarget.parentElement.id)
  );
  console.log(storedFood);
  saveFood(storedFood, id);
  removeDiv.remove();
}

/* svg delete 만들기 */
function CreateSVG(button) {
  var xmlns = "http://www.w3.org/2000/svg";
  var boxWidth = 448;
  var boxHeight = 512;
  var realWidth = "0.6rem";
  var realHeight = "0.6rem";
  var svgElem = document.createElementNS(xmlns, "svg");
  svgElem.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
  svgElem.setAttributeNS(null, "width", realWidth);
  svgElem.setAttributeNS(null, "height", realHeight);
  svgElem.style.display = "block";
  var coords =
    "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z";
  var path = document.createElementNS(xmlns, "path");
  path.setAttributeNS(null, "d", coords);
  svgElem.appendChild(path);
  button.appendChild(svgElem);
}

/* 모달 or 목록, 냉동, 냉장, 상온 */
const paintFood = (div) => {
  if (document.querySelector("section").className === "bg-modal entire") {
    /* click으로 모달이 뜨게되면 */ let modalContent =
      document.querySelector("section").lastChild;
    modalContent.appendChild(div);
  } else {
    const [savedFood, savedFrozen, savedRefrigerated, savedRoomTemp] = [
      "food",
      "frozen",
      "refrigerated",
      "roomTemp",
    ].map((i) => {
      return getAndParse(i);
    });
    /* html에서 가져온것, localStorage 가져온것 */
    const localAndDocument = [
      {
        query: foodList,
        local: savedFood,
      },
      {
        query: frozen,
        local: savedFrozen,
      },
      {
        query: refrigerated,
        local: savedRefrigerated,
      },
      {
        query: roomTemp,
        local: savedRoomTemp,
      },
    ];
    localAndDocument.forEach((i) => {
      /* 요소가 있는것  */
      if (i.local !== null) {
        i.local.forEach((k) => {
          if (JSON.stringify(k.id) === div.firstChild.id) {
            i.query.appendChild(div);
          }
        });
      }
    });
  }
};

/* 브라우저에 그리기 */
function addList(newFoodobj) {
  const li = document.createElement("li");
  li.setAttribute("class", "list-grid");
  li.id = newFoodobj.id;
  const div = document.createElement("div");
  div.setAttribute("draggable", "true");
  div.className = "listBox";
  const span = document.createElement("span");
  span.className = "foodNSp";
  const dateSpan = document.createElement("span");
  dateSpan.className = "foodNDateSp";
  const button = document.createElement("button");
  button.className = "deleteBtn";
  CreateSVG(button);
  li.appendChild(span);
  li.appendChild(button);
  li.appendChild(dateSpan);
  span.innerText = `${newFoodobj.text}`;
  dateSpan.innerText = `${newFoodobj.exDate}`;
  button.addEventListener("click", removeLi);
  div.appendChild(li);
  console.log(div);
  return paintFood(div);
}

const paintNumber = (array, number) => {
  array.map((element) => {
    if (array.lastIndexOf(element) < number) {
      addList(element);
    }
  });
};

/* food, frozen, refrigerated, roomTemp 각 항목의 개수 
const foodCount = () => {
  count.forEach((i) => {
    const id = i.closest(".temp-box").id;
    if(getAndParse(id)){
      i.innerText = `(${getAndParse(id).length})`
    }
  })
};
*/

/*  mainBox에 food, frozen, refrigerated, roomTemp  */
const refreshDocument = () => {
  [savedFood, savedFrozen, savedRefrigerated, savedRoomTemp].forEach((i) => {
    if (i !== null) {
      storedFood = i.reverse(); //최신순으로 브라우저에 출력
      /* 대화면 7개, 모바일 3개 */
      window.innerWidth > 481
        ? paintNumber(storedFood, 6)
        : paintNumber(storedFood, 3);
    }
  });
};

const maxlengthFx = (event) => {
  if (event.target.value.length > 8) {
    event.target.value = event.target.value.slice(0, 8);
  }
};

/* 모달 창 위에 food list 그리기 */
const paintModal = (keyName) => {
  if (getAndParse(keyName)) {
    const parsedToDos = getAndParse(keyName).reverse();
    parsedToDos.forEach((element) => addList(element));
  }
};

/* 전체 목록 modal body의 firstChild로 그리기 */

const openEntList = (event) => {
  const modalId = event.target.closest(".temp-box").id;
  //overflow: hidden 해주기
  body.classList.add("modal-open-body");
  const sectionEntire = document.createElement("section");
  sectionEntire.className = "bg-modal";
  sectionEntire.classList.add("entire");
  const divEntireOverlay = document.createElement("div");
  divEntireOverlay.className = "modal-overlay";
  const divEntireContent = document.createElement("div");
  divEntireContent.className = "modal-content";
  /* 모달 열릴때 class로 id(food, frozen...ect) 더해주기 */
  divEntireContent.classList.add(modalId);
  const button = document.createElement("button");
  button.innerHTML = `+`;
  divEntireContent.appendChild(button);
  /* 오버레이 다음에 content가 오버레이의 동생으로 와야함 */
  sectionEntire.appendChild(divEntireOverlay);
  sectionEntire.appendChild(divEntireContent);
  body.prepend(sectionEntire);
  paintModal(modalId);
  button.addEventListener("click", (event) => {
    event.target.parentElement.parentElement.remove();
    body.classList.remove("modal-open-body");
  });
};

/* const exDateConfirm = () => {
  let theBigDay = new Date();
  [savedFood, savedFrozen, savedRefrigerated, savedRoomTemp].forEach((container) => {
    if (container) {
      container.forEach((i) => {
        const str = i.exDate;
        const words = str.split('-');
        words[0] < theBigDay.getFullYear() ? console.log("유통기한이 지났습니다") :
          (
            words[1] < theBigDay.getMonth() + 1 ? console.log("유통기한이 지났습니다") :
              (
                words[2] < theBigDay.getDate() ? console.log("유통기한이 지났습니다") : console.log("기한 남음")
              )
          )
      })
    }
  })
}
exDateConfirm(); */

/* modal open */
entireLiBtn.forEach((element) =>
  element.addEventListener("click", openEntList)
);

/* 등록 */
foodForm.addEventListener("submit", inputFood);

/* 새로고침 후 화면 */
refreshDocument();

/* 가격 입력 자리수 8로 제한 */
foodPrice.addEventListener("input", maxlengthFx);
