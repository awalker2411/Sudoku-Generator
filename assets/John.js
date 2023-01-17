//?numberpad functionality
let selectedSpan = null;

document.addEventListener("click", function (event) {
    //checks to see if you selected a td or a span
    if (event.target.matches("td") || event.target.matches("span")) {
        if (selectedSpan) {
            selectedSpan.classList.remove('selected');
        }
        if (event.target.matches("td")) {
            selectedSpan = event.target.querySelector("span");
        } else {
            selectedSpan = event.target;
        }
        selectedSpan.classList.add('selected');
    }
    if(event.target.matches("button")){
        if(selectedSpan !== null){
            selectedSpan.innerHTML = event.target.dataset.value;
        }
    }
});