const foodForm = document.querySelector(".food-form");
const foodName = document.querySelector("#food-name");
const foodPrice = document.querySelector("#food-price");
const exDate = document.querySelector("#ex-date");
const [foodList, frozen, refrigerated, roomTemp] = ["#food-list", "#frozen", "#refrigerated", "#roomTemp"].map((i) => document.querySelector(i));
const submitAlarm = document.querySelector(".submit-alarm");
const body = document.querySelector("body");
let storedFood = [];


/* 전체,냉장,냉동,상온 */
const entireLiBtn = document.querySelectorAll(".entire-li-btn");

/* 등록시 알림 */
const alarm = () => {
    submitAlarm.classList.remove("hidden");
    setTimeout(() => { submitAlarm.classList.add("hidden") }, 800);
}

/* localstorage 저장 */
function saveFood(storedFood, keyName) {
    localStorage.setItem(`${keyName}`, JSON.stringify(storedFood));
}

function inputFood(event) {
    event.preventDefault();
    const [foodNValue, foodPValue, foodEXValue] = [foodName.value, foodPrice.value, exDate.value];
    [foodName.value, foodPrice.value, exDate.value] = [null, null, null];
    /* 변수설정해서 할당하면 초기화 x */
    const newFoodobj = {
        id: Date.now(),
        text: foodNValue,
        price: foodPValue,
        exDate: foodEXValue,
    };
    localStorage.getItem('food') !== null ? storedFood = JSON.parse(localStorage.getItem('food')) : storedFood = [];
    storedFood.push(newFoodobj);
    //배열에 넣기
    saveFood(storedFood, 'food');
    addList(newFoodobj);
    //객체로 만든 다음에 그리기
    alarm();
}

function removeLi(event) {
    const removeDiv = event.target.parentElement.parentElement.parentElement.parentElement;

    if (event.target.parentElement.parentElement.parentElement.id === "food-list") {
        storedFood = JSON.parse(localStorage.getItem(`${removeDiv.parentElement.parentElement.id}`));
        storedFood = storedFood.filter(Element =>
            Element.id !== parseInt(removeDiv.firstChild.id)); // 빈배열 or 나머지
        saveFood(storedFood, removeDiv.parentElement.parentElement.id);
        removeDiv.remove();
    }
    else {
        storedFood = JSON.parse(localStorage.getItem(`${removeDiv.parentElement.id}`));
        storedFood = storedFood.filter(Element =>
            Element.id !== parseInt(removeDiv.firstChild.id)); // 빈배열 or 나머지
        saveFood(storedFood, removeDiv.parentElement.id);
        removeDiv.remove();
    }
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
    svgElem.style.display = "block"
    var coords = "M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z";
    var path = document.createElementNS(xmlns, "path");
    path.setAttributeNS(null, 'd', coords);
    svgElem.appendChild(path);
    button.appendChild(svgElem);
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
    return paintFood(div);
}

/* 모달 or 목록, 냉동, 냉장, 상온 */
const paintFood = (div) => {
    if (document.querySelector("section").className == 'bg-modal entire')
    /* click으로 모달이 뜨게되면 */ {
        let modalContent = document.querySelector("section").lastChild;
        modalContent.appendChild(div);
    }
    else {
        const [savedFood, savedFrozen, savedRefrigerated, savedRoomTemp] = ['food', 'frozen', 'refrigerated', 'roomTemp'].map((i) => {
            return JSON.parse(localStorage.getItem(i));
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
            }
        ];
        localAndDocument.map((i) => {
            /* 요소가 있는것  */
            if (i.local !== null) {
                i.local.map((k) => {
                    if (JSON.stringify(k.id) === div.firstChild.id) {
                        i.query.appendChild(div);
                    }
                });
            }
        })
    }
}

const paint3 = (array) => {
    array.forEach(element => {
        if (array.lastIndexOf(element) < 3) {
            addList(element);
        }
    });
}

const paint7 = (array) => {
    array.forEach(element => {
        if (array.lastIndexOf(element) < 7) {
            addList(element);
        }
    });
}

/* 추가될때마다 새로 그리기 */

/*  frozen, refrigerated, roomTemp  */
const refreshDocument = () => {
    const [savedFood, savedFrozen, savedRefrigerated, savedRoomTemp] = ['food', 'frozen', 'refrigerated', 'roomTemp'].map((i) => localStorage.getItem(i));

    [savedFood, savedFrozen, savedRefrigerated, savedRoomTemp].map((i) => {
        if (i !== null) {
            const parsedToDos = JSON.parse(i);
            storedFood = parsedToDos.reverse();
            //최신순으로 브라우저에 출력하기 위해 reverse, 빈 배열에 저장

            window.innerWidth < 481 ? paint3(storedFood) : paint7(storedFood);
            /* 모바일 3개, 대화면 7개 */
        }
    })
}

const maxlengthFx = (event) => {
    if (event.target.value.length > 8) {
        event.target.value = event.target.value.slice(0, 8);
    }
}

/* 모달 창 위에 food list 그리기 */
/* 입력 'food' 이동시 로컬 스토리지에 냉동,냉장,상온으로 저장 변경*/
const paintModal = (keyName) => {
    const savedFood = localStorage.getItem(`${keyName}`);
    //로컬스토리지에서 'food'가져오기
    if (savedFood !== null) {
        const parsedToDos = JSON.parse(savedFood);
        storedFood = parsedToDos.reverse();
        //최신순으로 브라우저에 출력하기 위해 reverse, 빈 배열에 저장
        storedFood.forEach(element => addList(element));
    }

}


/* 전체 목록 modal body의 firstChild로 그리기 */

const openEntList = (element) => {
    //overflow: hidden 해주기
    body.classList.add("modal-open-body");
    const sectionEntire = document.createElement("section");
    sectionEntire.className = "bg-modal";
    sectionEntire.classList.add("entire");
    const divEntireOverlay = document.createElement("div");
    divEntireOverlay.className = "modal-overlay";
    /* content margin주기 */
    const divEntireContent = document.createElement("div");
    divEntireContent.className = "modal-content";
    const button = document.createElement("button");
    button.innerHTML = `+`;
    divEntireContent.appendChild(button);
    /* 오버레이 다음에 content가 오버레이의 동생으로 와야함 */
    sectionEntire.appendChild(divEntireOverlay);
    sectionEntire.appendChild(divEntireContent);
    body.prepend(sectionEntire);
    paintModal(element.parentElement.parentElement.id);
    button.addEventListener("click", (event) => {
        event.target.parentElement.parentElement.remove();
        body.classList.remove("modal-open-body");
    });
}

entireLiBtn.forEach((element) => element.addEventListener("click", () => openEntList(element)));

/* 등록 */
foodForm.addEventListener("submit", inputFood);

/* 새로고침 후 화면 */
refreshDocument();

/* 가격 입력 자리수 8로 제한 */
foodPrice.addEventListener("input", maxlengthFx);

/*
    localStorage.get
    localStorage.set 함수로 만들기
    리팩토링
    빈 화면에 drop해야 들어감 -> 냉장고 아이콘 또는 네모박스를 넣어 그곳에 드랍하도록
    모바일시 깨짐
*/