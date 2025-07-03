const menuLists = document.getElementsByClassName("menuList");
const visual = document.getElementById("visual");
const headerBars = document.getElementsByClassName("headerBar");
const mapDetails = document.getElementsByClassName("mapDetail")


// load시 화면 천천히 나타내는 효과
window.addEventListener("load", function () {
  load.classList.add("opacity-0");
  this.setTimeout(function () {
    load.classList.add("hidden");
  }, 1500);
});

window.document.addEventListener('mousemove', cursormove);
// 마우스 따라다니는 마름모
function cursormove(e) {
  gsap.to(cursor, 0.5, {
    left: e.clientX,
    top: e.clientY
  })

  console.log(e.target);
  // 특정 엘리먼트 호버시 효과
  if((e.target.tagName === "BUTTON" || e.target.tagName === "A") && !e.target.classList.contains("map")){
  
    cursor.classList.add("on")
  } else {
    cursor.classList.remove("on")
  }
  if(e.target.classList.contains("sideBarDot") || e.target.classList.contains("list")){
    cursor.classList.add("sideBar")
  } else {
    cursor.classList.remove("sideBar")
  }
}


// 뷰포트 크기
let vh = document.documentElement.clientHeight;
let vw = document.documentElement.clientWidth;
// 창 리사이즈 감지
window.addEventListener("resize", function () {
  vh = document.documentElement.clientHeight;
  vw = document.documentElement.clientWidth;
});

//기타 애니메이션
function moveEffect(element, opacity, where, to, howFar) {
  element.classList.replace("opacity-0", `opacity-${opacity}`);
  element.classList.remove(`${where}translate-${to}-${howFar}`);
}
//기타 애니메이션 reset
function moveEffectReset(element, opacity, where, to, howFar) {
  element.classList.replace(`opacity-${opacity}`, "opacity-0");
  element.classList.add(`${where}translate-${to}-${howFar}`);
}

// menu sheet 에니메이션
function menuMoveEffect(element) {
  element.classList.add("duration-1000");
  element.classList.remove("left-full");
}
// menu sheet 에니메이션 reset
function menuMoveEffectReset(element) {
  element.classList.remove("duration-1000");
  element.classList.add("left-full");
}

// menu
let isOpenMenu = false;
function hanldeMenu(boolean) {
  isOpenMenu = boolean;
  if (isOpenMenu) {
    console.log("open menu");
    // main
    menuMainSheet.classList.remove("hidden");
    // sub
    menuMoveEffect(menuSubSheetOpen)

    setTimeout(function () {
      menuMoveEffect(menuMainSheet)
    }, 300);
    setTimeout(function () {
      for (let i = 0; i < menuLists.length; i++) {
        setTimeout(function () {
          moveEffect(menuLists[i], "100", "", "x", "12")
        }, 200 * i);
      }
    }, 500); 
    setTimeout(function () {
      moveEffect(menuFooter, "100", "", "x", "12");
    }, 600);
  } else {
    console.log("close menu");
    menuMainSheet.classList.add("hidden");
    menuSubSheetClose.classList.remove("hidden");
    setTimeout(function () {
      menuSubSheetClose.classList.add("duration-1000", "left-full");

      menuMoveEffectReset(menuMainSheet);
      menuMoveEffectReset(menuSubSheetOpen);

      moveEffectReset(menuFooter, "100", "", "x", "12");

      for (let i = 0; i < menuLists.length; i++) {
        menuLists[i].classList.replace("opacity-100", "opacity-0");
        menuLists[i].classList.add("translate-x-12");
        moveEffectReset(menuLists[i], "100", "", "x", "12");
      }
    }, 100);

    setTimeout(function () {
      menuSubSheetClose.classList.add("hidden");
      menuSubSheetClose.classList.remove("duration-1000", "left-full");
    }, 1000);
  }
}

window.addEventListener("scroll", handleScroll);
let prevScrollTop = 0;
function handleScroll() {
  const visualVT = visual.getBoundingClientRect().top;
  console.log(visualVT);
  if (visualVT === 0) {
    headerLogo.src = "./img/logo.png";
    HeaderSearch.src = "./img/search.png";
    for (i = 0; i < 3; i++) {
      headerBars[i].classList.replace("bg-[#222]", "bg-white");
    }
    aboutHeader.classList.remove("bg-white" , "shadow-md", "shadow-[#222]/30");
  } else {
    headerLogo.src = "./img/logo_b.png";
    HeaderSearch.src = "./img/search_b.png";
    for (i = 0; i < 3; i++) {
      headerBars[i].classList.replace("bg-white", "bg-[#222]");
    }
    aboutHeader.classList.add("bg-white");
    aboutHeader.classList.add("shadow-md", "shadow-[#222]/30");
}

const scrollTop = document.documentElement.scrollTop;
console.log("이전", prevScrollTop + "/ 현재", scrollTop);

console.log(prevScrollTop > scrollTop);
if (prevScrollTop < scrollTop) {
    aboutHeader.classList.add("-translate-y-full");
    aboutHeader.classList.remove("shadow-md", "shadow-[#222]/30");
  } else {
    aboutHeader.classList.remove("-translate-y-full");
  }
  prevScrollTop = scrollTop;
}


function handleOpenDetail(index) {
  if(vw > 1280){
    for(let i=0; i<mapDetails.length; i++){
      if(i === index){
        mapDetails[i].classList.toggle("xl:block")
      }
    }
  }
}

function showList() {
  aboutFamSiteArrow.classList.toggle("-scale-y-100")
  if(aboutFamSiteList.classList.contains("max-h-0")){
    aboutFamSiteList.classList.replace("max-h-0", 'max-h-[9rem]')
  } else {
    aboutFamSiteList.classList.replace('max-h-[9rem]', "max-h-0")
  }
}