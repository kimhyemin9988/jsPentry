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
    /* (event.target.parentElement).parentElement => 이러면 오류남 */
    const removeDiv = event.target.parentElement.parentElement;
    /* local Storage에 frozen, refrigerated, roomTemp로 저장
        filterTempStorage(removeDiv, removeDiv.parentElement.id);
*/  
    storedFood = JSON.parse(localStorage.getItem(`${removeDiv.parentElement.id}`));
    storedFood = storedFood.filter(Element =>
        Element.id !== parseInt(removeDiv.firstChild.id)); // 빈배열 or 나머지
    saveFood(storedFood, removeDiv.parentElement.id);
    removeDiv.remove();
}


/* 브라우저에 그리기 */
function addList(newFoodobj) {
    const li = document.createElement("li");
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
    li.appendChild(span);
    li.appendChild(button);
    li.appendChild(dateSpan);
    button.innerHTML = `\u2796`;
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
    divEntireContent.setAttribute("style", "margin:300px 0px 50px 0");
    const button = document.createElement("button");
    button.innerHTML = `+`;
    divEntireContent.appendChild(button);
    /* 오버레이 다음에 content가 오버레이의 동생으로 와야함 */
    sectionEntire.appendChild(divEntireOverlay);
    sectionEntire.appendChild(divEntireContent);
    body.prepend(sectionEntire);
    paintModal(element.parentElement.id);
    button.addEventListener("click", (event) => {
        event.target.parentElement.parentElement.remove();
        body.classList.remove("modal-open-body");
    });
}

entireLiBtn.forEach((element) => element.addEventListener("click", ()=>openEntList(element)));

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
    다른 요소안에 drop 안되게
*/