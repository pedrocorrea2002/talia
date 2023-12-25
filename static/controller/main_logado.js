const menuTab = document.getElementById("menu-tab")
// const menu_button = document.getElementById("menu")
// const menuTab_x = document.getElementById("menu-tab-x")
let menu = false

// menu_button.addEventListener("click",showHideMenu)
// menuTab_x.addEventListener("click",showHideMenu)

//* abrindo ou fechando menu
function showHideMenu(){
  if(menu){
    menuTab.style.display = "none"
    menu = false
  }else{
    menuTab.style.display = "flex"
    menu = true
  }
}