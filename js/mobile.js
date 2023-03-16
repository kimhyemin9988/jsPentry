
const wrapper = document.querySelector('#stored-box');
const empty = Array.from(document.querySelectorAll(".temp-box"));
const drag = document.querySelectorAll(".listBox");
drag.forEach(
    (i) => {
        i.addEventListener('touchmove', touchMove);
        i.addEventListener('touchend', touchEnd);
    }
);
/* 사라지는거 수정, touchend 한곳이 아닌 다른곳에 들어가는것 수정
 touchend시 localStorage 변경되도록 수정
pageX, pageY -> 스크롤 포함한 위치 client(X)
*/
/* 넣을 박스 */
let itemAppend;
let draggedList;
// ------------------------ touchMove
function touchMove(event) {
    event.preventDefault();
    dragged = event.target.closest(".listBox");
    dragged.classList.add(DRAGGING);
    dragged.setAttributeNS(null, "position", "absolute");
    let touch = event.targetTouches[0];
    dragged.style.top = `${touch.pageY - (2 * dragged.offsetWidth)}px`;
    dragged.style.left = `${touch.pageX}px`;
    //- (wrapper.offsetLeft)
    //흔들림 왜지?? (dragged.offsetLeft)
    empty.map(item => {
        if (dragged.getBoundingClientRect().top > item.getBoundingClientRect().top &&
            dragged.getBoundingClientRect().left > item.getBoundingClientRect().left &&
            dragged.getBoundingClientRect().bottom < item.getBoundingClientRect().bottom &&
            dragged.getBoundingClientRect().right < item.getBoundingClientRect().right
        ) {
            itemAppend = item;
            draggedList = dragged;
        }
    })
}

function touchEnd(element) {
    dragged.removeAttributeNS(null, "position", "absolute");
    dragged.style.top = "0";
    dragged.style.left = "0";
    itemAppend.append(draggedList);
    dragged.classList.remove(DRAGGING);
    console.log("drag end");
}