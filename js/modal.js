const modal = document.querySelector(".bg-modal");
/*새로고침 버튼 추후 추가*/

/* first modal*/
/* 창열기 */
document.querySelector("#modal-click").addEventListener("click", ()=>{
	modal.classList.remove("hidden");
});
/* 창닫기 */
document.querySelector('.close').addEventListener("click", ()=>{
	modal.classList.add("hidden");
});


