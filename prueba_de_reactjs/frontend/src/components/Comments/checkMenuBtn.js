export default function () {
    const btn = document.getElementsByClassName("comment-menu-btn")

    for(let i=0; i < btn.length; i++){
        if(btn[i].clickFlag === true) {
            btn[i].previousElementSibling.classList.add("transition-0")
            btn[i].click()
            setTimeout(() => {
                btn[i] && btn[i].previousElementSibling.classList.remove("transition-0")
            }, 500);
        }
    }
}