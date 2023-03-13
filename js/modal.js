const modal = document.querySelector(".bg-modal");

/* 창열기 */
document.querySelector("#modal-click").addEventListener("click", ()=>{
	modal.classList.remove("hidden");
});
/* 창닫기 */
document.querySelector('.close').addEventListener("click", ()=>{
	modal.classList.add("hidden");
});


