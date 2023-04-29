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
const saveFood = (element, keyName) => {
  localStorage.setItem(keyName, JSON.stringify(element));
  foodCount(); // 변경 시 마다 count 변경
};



/* drop or delete시,
 놓는 곳에
=> 모바일 : 3개
=> 태블릿 : 6개, 이상의 element가 있다면 local Storage에서 가장 작은 인덱스를 가진 element가 지워지고 새로 drop되는 것이 그려짐 -> 새로고침 하지 않고 drop을 계속하면 그려져 있는것이 계속 바뀜
*/
const deleteOtherElement = (keyName) => {
  if (getAndParse(keyName)) {
    const nextDocumentChild = Array.from(
      document.querySelectorAll(`#${keyName}`)[0].childNodes
    );
    const nextArray = nextDocumentChild.filter((i) => i.className === "listBox");
    const nextIdArray = nextArray.map((i) => parseInt(i.firstChild.id)); // 그려진것들의 아이디 -> drag and drop을 하면 local Storage에 있는 순서대로 화면에 그려지지 않는것을 고려
    if (
      (window.innerWidth <= 480 && nextIdArray.length > 2) ||
      (window.innerWidth > 480 && nextIdArray.length > 5)
    ) {
      let localData = getAndParse(keyName); // 로컬스토리지에서 가져온것
      let indexArray = [];
      for (let i = 0; i < nextIdArray.length; i++) {
        // 제출된것은 로컬스토리지에 저장되기 전
        let index = localData.findIndex((k) => k.id === nextIdArray[i]);
        indexArray.push(index);
      }
      let deleteIndex = Math.min(...indexArray); // 최소값 찾기
      const localDeleteId = getAndParse(keyName)[deleteIndex].id;
      const deleteDiv = nextArray.filter(
        (i) => parseInt(i.firstChild.id) === localDeleteId
      );
      deleteDiv[0].remove();
    }
  }
}


const inputFood = (event) => {
  event.preventDefault();
  /* food칸에 그려져 있는게 6개 이상 or drop시 6개 이상 이면 가장 먼저 그려진게 삭제 */
  deleteOtherElement('food');
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
  storedFood.push(newFoodobj);
  saveFood(storedFood, "food"); //localStorage에 저장
  addList(newFoodobj);
  //객체로 만든 다음에 그리기
  alarm();
};

/* drop 시 그려져 있는것 이외의 element가 있다면 그려지게 + */
const paintOtherElement = (keyName) => {
  if (getAndParse(keyName)) {
    const preDocumentChild = Array.from(
      document.querySelectorAll(`#${keyName}`)[0].childNodes
    );
    const preIdArray = preDocumentChild
      .filter((i) => i.className === "listBox")
      .map((i) => parseInt(i.firstChild.id));

    let localData = getAndParse(keyName);
    for (let i = 0; i < preIdArray.length; i++) {
      localData = localData.filter((k) => k.id !== preIdArray[i]);
    }
    localData[0] !== undefined && addList(localData[0]);
  }

};

/*  modal 열렸다면 modal과 main에서 동시 삭제
    main에서만 삭제 */
const removeLi = (event) => {
  const [modalContent, removeContainer, removeDiv] = [
    ".modal-content",
    ".temp-box",
    ".listBox",
  ].map((i) => event.currentTarget.closest(i));

  /*  modal 열렸다면 modal과 main에서 동시 삭제 
    modal 안열렸을때는 main에서만 삭제 */

  /* if mainBox or modal 열렸다면*/
  const id = removeContainer ? removeContainer.id : modalContent.classList[1];

  storedFood = getAndParse(id);
  storedFood = storedFood.filter(
    (Element) => Element.id !== parseInt(event.currentTarget.parentElement.id)
  );
  saveFood(storedFood, id);
  paintOtherElement(id);

  /* 
    modal과 main에서 동시 삭제하기 위해 main에서 id를 사용해 카테고리(목록, 냉장, 실온, 상온)를 선택해 그중 listBox의 id가 같은것을 찾아 삭제
  */

  const preDocumentChild = Array.from(
    document.querySelectorAll(`#${id}`)[0].childNodes
  );
  
  const listBoxPreIdArray = preDocumentChild
    .filter((i) => i.className === "listBox");
  const preIdArray = listBoxPreIdArray.filter((i) => parseInt(i.firstChild.id) === parseInt(event.currentTarget.parentElement.id));
  removeDiv.remove();
  preIdArray.length !== 0 && preIdArray[0].remove();

  if (!removeContainer) {
    const modalCountP = document.querySelector(".modal-count");
    modalCountP.innerHTML = `(${getAndParse(id).length})`;
  }
};

/* svg delete 만들기 */
const CreateSVG = (button) => {
  const xmlns = "http://www.w3.org/2000/svg";
  const boxWidth = 448;
  const boxHeight = 512;
  const realWidth = "0.6rem";
  const realHeight = "0.6rem";
  const svgElem = document.createElementNS(xmlns, "svg");
  svgElem.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
  svgElem.setAttributeNS(null, "width", realWidth);
  svgElem.setAttributeNS(null, "height", realHeight);
  const coords =
    "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z";
  const path = document.createElementNS(xmlns, "path");
  path.setAttributeNS(null, "d", coords);
  svgElem.appendChild(path);
  button.appendChild(svgElem);
};

/* 느낌표 */

const CreateExclamation = (exDateAlarm) => {
  const xmlns = "http://www.w3.org/2000/svg";
  const boxWidth = 448;
  const boxHeight = 512;
  const realWidth = "0.8rem";
  const realHeight = "0.6rem";
  const svgElem = document.createElementNS(xmlns, "svg");
  svgElem.setAttributeNS(null, "viewBox", "0 0 " + boxWidth + " " + boxHeight);
  svgElem.setAttributeNS(null, "width", realWidth);
  svgElem.setAttributeNS(null, "height", realHeight);
  const coords =
    "M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z";
  const path = document.createElementNS(xmlns, "path");
  const color = "red";
  path.setAttributeNS(null, "fill", color);
  path.setAttributeNS(null, "d", coords);
  svgElem.appendChild(path);
  exDateAlarm.appendChild(svgElem);
};

/* 모달 or 목록, 냉동, 냉장, 상온 */
const paintFood = (div) => {
  if (document.querySelector("div").className === "bg-modal entire") {
    /* click으로 모달이 뜨게되면 */
    let modalContent = document.querySelector(".bg-modal").lastChild;
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
          if (k.id === parseInt(div.firstChild.id)) {
            i.query.appendChild(div);
          }
        });
      }
    });
  }
};

const foodCount = () => {
  const count = document.querySelectorAll(".count");
  count.forEach((i) => {
    const id = i.closest(".temp-box").id;
    if (getAndParse(id)) {
      i.innerText = `(${getAndParse(id).length})`;
    }
  });
};

foodCount();

/* 브라우저에 그리기 */
const addList = (newFoodobj) => {
  let nowDay = new Date();
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
  /* 유통기한 알림 */
  const exDate = new Date(newFoodobj.exDate);
  const diff = exDate - nowDay;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1; // 남은 유통기한
  const exDateAlarm = document.createElement("div");
  exDateAlarm.className = "d-day";

  diffDay >= 0
    ? (exDateAlarm.innerText = diffDay < 8 ? `D-${diffDay}` : " ")
    : CreateExclamation(exDateAlarm);
  dateSpan.appendChild(exDateAlarm);
  button.addEventListener("click", removeLi);
  div.appendChild(li);
  return paintFood(div);
};

const paintNumber = (array, number) => {
  array.map((element) => {
    if (array.lastIndexOf(element) < number) {
      addList(element);
    }
  });
};

/*  mainBox에 food, frozen, refrigerated, roomTemp  */
const refreshDocument = () => {
  const [savedFood, savedFrozen, savedRefrigerated, savedRoomTemp] = [
    "food",
    "frozen",
    "refrigerated",
    "roomTemp",
  ].map((i) => {
    return getAndParse(i)
  });

  [savedFood, savedFrozen, savedRefrigerated, savedRoomTemp].forEach((i) => {
    if (i !== null) {
      /* 대화면 6개, 모바일 3개 */
      window.innerWidth > 480 ? paintNumber(i, 6) : paintNumber(i, 3);
    }
  });
};


/* 모달 창 위에 food list 그리기 */
const paintModal = (keyName) => {
  if (getAndParse(keyName)) {
    const parsedToDos = getAndParse(keyName);
    parsedToDos.forEach((element) => addList(element));
  }
};

/* 전체 목록 modal body의 firstChild로 그리기 */

const openEntList = (event) => {
  const modalId = event.target.closest(".temp-box").id;
  //overflow: hidden 해주기
  body.classList.add("modal-open-body");
  const divEntire = document.createElement("div");
  divEntire.className = "bg-modal";
  divEntire.classList.add("entire");
  const divEntireOverlay = document.createElement("div");
  divEntireOverlay.className = "modal-overlay";
  const divEntireContent = document.createElement("div");
  divEntireContent.className = "modal-content";
  divEntireContent.classList.add(modalId);

  const button = document.createElement("button"); //close 버튼
  button.innerHTML = `+`;
  divEntireContent.appendChild(button);

  const modalTitie = document.createElement("div");
  modalTitie.className = "modal-titie";
  const childNodesArray = Array.from(
    event.target.closest(".temp-title").childNodes
  );
  const title = childNodesArray.find((i) => i.className === "title");
  const titleP = document.createElement("p");
  titleP.innerHTML = title.innerHTML;
  modalTitie.appendChild(titleP);
  const modalCountP = document.createElement("p");
  modalCountP.className = "modal-count";
  modalCountP.innerText = `(${getAndParse(modalId).length})`;

  modalTitie.appendChild(modalCountP);
  divEntireContent.appendChild(modalTitie);
  divEntire.appendChild(divEntireOverlay);
  divEntire.appendChild(divEntireContent);
  body.prepend(divEntire);
  paintModal(modalId); // 모달 위에 식료품 그리기
  button.addEventListener("click", (event) => {
    event.target.parentElement.parentElement.remove();
    body.classList.remove("modal-open-body");
  });
};

/* modal open */
entireLiBtn.forEach((element) =>
  element.addEventListener("click", openEntList)
);

/* 등록 */
foodForm.addEventListener("submit", inputFood);

/* 새로고침 후 화면 */
refreshDocument();

