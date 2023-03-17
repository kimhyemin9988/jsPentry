import { alertKey } from "./drag";

dragula([document.getElementById("food"),
document.getElementById("frozen"),
document.getElementById("refrigerated"),
document.getElementById("roomTemp")], {
    moves: function (el, source, handle, sibling) {
        console.log(el);
        console.log(source);
        console.log(handle);
        console.log(sibling);
        return true; // elements are always draggable by default
    },

});
