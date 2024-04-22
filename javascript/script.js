const bar = document.getElementById("bar");

var showHeader = false;

function toggle(){
    showHeader = !showHeader;

    if(showHeader){
        bar.className = 'far fa-times'; //Display 'X' icon
    } else{
        bar.className = 'fas fa-bars'; //Display hamburger icon
    }
}