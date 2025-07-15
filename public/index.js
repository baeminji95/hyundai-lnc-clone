const menuLists = document.getElementsByClassName("menuList");
const sideBarDots = document.querySelectorAll(".sideBarDot");

const aboutHeader = document.getElementsByClassName("aboutUs");
const newProductHeader = document.getElementsByClassName("newProduct");
const lvtHeader = document.getElementsByClassName("LVT");
const vinylsheetHeader = document.getElementsByClassName("vinylsheet");
const vctHeader = document.getElementsByClassName("VCT");
const contactHeader = document.getElementsByClassName("contact");

const newProducts = document.getElementsByClassName("newProduct");
const hoverEffects = document.getElementsByClassName("hoverEffect");
const carouselItmes = document.getElementsByClassName("Carousel");

const inputs = document.getElementsByClassName("input")


let sideBarIndex = 0;
let carouselIndex = 1;

// 뷰포트 크기
let vh = document.documentElement.clientHeight;
let vw = document.documentElement.clientWidth;
// 창 리사이즈 감지
window.addEventListener("resize", function () {
  vh = document.documentElement.clientHeight;
  vw = document.documentElement.clientWidth;
});


window.document.addEventListener('mousemove', cursormove);
// 마우스 따라다니는 마름모
function cursormove(e) {
  gsap.to(cursor, 0.5, {
    left: e.clientX,
    top: e.clientY
  })

  // 특정 엘리먼트 호버시 효과
  if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
    cursor.classList.add("on")
  } else {
    cursor.classList.remove("on")
  }
  if (e.target.classList.contains("sideBarDot") || e.target.classList.contains("list")) {
    cursor.classList.add("sideBar")
  } else {
    cursor.classList.remove("sideBar")
  }
}



// load시 화면 천천히 나타내는 효과
window.addEventListener("load", () => {
  load.classList.add("opacity-0");
  setTimeout(() => load.classList.add("hidden"), 1500);
});

// h2 애니메이션
function h2Effect(textArr, where, to, howFar) {
  Array.from(textArr).forEach((element, i) => {
    setTimeout(() => {
      element.classList.replace("opacity-0", "opacity-100");
      element.classList.remove(`${where}translate-${to}-${howFar}`);
    }, 100 * i );
  });
}
// h2 애니메이션 reset
// function h2EffectReset(textArr, where, to, howFar) {
//   Array.from(textArr).forEach((element, i) => {
//     element.classList.replace("opacity-100", "opacity-0");
//     element.classList.add(`${where}translate-${to}-${howFar}`);
//   })
// }

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
    // console.log("open menu");
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
    // console.log("close menu");
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


// 스크롤 감지
window.addEventListener("scroll", handleScroll);
function handleScroll() {
  // VT==viewport top
  const aboutVT = aboutUs.getBoundingClientRect().top;
  const newProductVT = newProduct.getBoundingClientRect().top;
  const lvtVT = LVT.getBoundingClientRect().top;
  const vinylsheetVT = vinylsheet.getBoundingClientRect().top;
  const vctVT = VCT.getBoundingClientRect().top;
  const contactVT = contactUs.getBoundingClientRect().top;

  // console.log("aboutVT: ", aboutVT);
  // console.log("newProductVT: ", newProductVT);
  // console.log("lvtVT: ", lvtVT)
  // console.log("vinylsheetVT: ", vinylsheetVT)
  // console.log("vctVT: ", vctVT)
  // console.log("contactVT: ", contactVT)

  //side bar

  // 뷰포트탑 감지
  if (contactVT < vh / 2) {
    sideBarIndex = 6;
  } else if (vctVT < vh / 2) {
    sideBarIndex = 5;
  } else if (vinylsheetVT < vh / 2) {
    sideBarIndex = 4;
  } else if (lvtVT < vh / 2) {
    sideBarIndex = 3;
  } else if (newProductVT < vh / 2) {
    sideBarIndex = 2;
  } else if (aboutVT < vh / 2) {
    sideBarIndex = 1;
  } else {
    sideBarIndex = 0;
  }
  // console.log("sideBarIndex", sideBarIndex);

  //해당 위치에 접근하면 sideBar dot 크기 변화
  sideBarDots.forEach((dot, i) => {
    const isCurrentIndex = i === sideBarIndex;

    dot.classList.toggle("outline", isCurrentIndex);
    dot.classList.toggle("opacity-60", isCurrentIndex);
    dot.classList.toggle("hover:opacity-100", isCurrentIndex);
  });

  // product 구간 색변환
  if (sideBarIndex === 3 || sideBarIndex === 4 || sideBarIndex === 5) {
    for (let i = 0; i < sideBarDots.length; i++) {
      sideBarDots[i].classList.replace("bg-white", "bg-[#555]");
      sideBarDots[i].classList.replace("outline-white", "outline-[#555]");
    }
    sideBarText.classList.replace("text-white/80", "text-[#555]/80");
    MoveingBarRail.classList.replace("bg-white/30", "bg-[#555]/30");
    MoveingBar.classList.replace("bg-white", "bg-[#555]");
  } else {
    for (let i = 0; i < sideBarDots.length; i++) {
      sideBarDots[i].classList.replace("bg-[#555]", "bg-white");
      sideBarDots[i].classList.replace("outline-[#555]", "outline-white");
    }
    sideBarText.classList.replace("text-[#555]/80", "text-white/80");
    MoveingBarRail.classList.replace("bg-[#555]/30", "bg-white/30");
    MoveingBar.classList.replace("bg-[#555]", "bg-white");
  }

  // const scrollTop = document.documentElement.scrollTop;
  // console.log("이전", prevScrollTop + "/ 현재", scrollTop);
  // prevScrollTop = scrollTop;

  if (aboutVT < vh * 0.9) {
    setTimeout(function () {
      AboutSubSheet.classList.add("right-full");
    }, 300);
    setTimeout(function () {
      h2Effect(aboutHeader, "", "y", "12");
    }, 600);
    setTimeout(function () {
      moveEffect(aboutText, "60", "", "y", "20");
    }, 1000);
    setTimeout(function () {
      moveEffect(AboutBtn, "60", "", "y", "20");
    }, 1000);
  }

  if (newProductVT < vh * 0.9) {
    setTimeout(function () {
      h2Effect(newProductHeader, "", "y", "12");
    }, 600);
    setTimeout(function () {
      moveEffect(newProductBtns, "100", "", "y", "20");
    }, 600);
    setTimeout(function () {
      moveEffect(carousel, "100", "", "y", "20");
    }, 1000);
  }
  if (newProductVT < vh * 0.9) {
    setTimeout(function () {
      lvtSubSheet.classList.remove("-translate-x-[100vw]");
    }, 500);
    setTimeout(function () {
      lvtMainImg.classList.remove("-translate-x-[100vw]");
    }, 800);

    setTimeout(function () {
      h2Effect(lvtHeader, "-", "x", "12");
    }, 1000);

    setTimeout(function () {
      moveEffect(lvtHext1, "100", "-", "x", "12");
    }, 800);
    setTimeout(function () {
      moveEffect(lvtHext2, "80", "-", "x", "12");
    }, 1300);
    setTimeout(function () {
      moveEffect(lvtBtn, "100", "-", "x", "12");
    }, 1500);
  }

  if (vinylsheetVT < vh * 0.9) {
    setTimeout(function () {
      vinylsheetSubSheet.classList.remove("translate-x-[100vw]");
    }, 300);
    setTimeout(function () {
      vinylsheetMainImg.classList.remove("translate-x-[100vw]");
    }, 500);

    setTimeout(function () {
      h2Effect(vinylsheetHeader, "", "x", "12");
    }, 800);

    setTimeout(function () {
      moveEffect(vinylsheetText1, "100", "", "x", "12");
    }, 1000);
    setTimeout(function () {
      moveEffect(vinylsheetText2, "80", "", "x", "12");
    }, 1100);
    setTimeout(function () {
      moveEffect(vinylsheetBtn, "100", "", "x", "12");
    }, 1200);
  }

  if (vctVT < vh * 0.9) {
    setTimeout(function () {
      vctSubSheet.classList.remove("translate-y-[10rem]");
    }, 500);
    setTimeout(function () {
      vctMainImg.classList.remove("translate-y-[10rem]");
    }, 800);

    setTimeout(function () {
      h2Effect(vctHeader, "", "y", "12");
    }, 1000);

    setTimeout(function () {
      moveEffect(vctText1, "100", "", "y", "12");
    }, 800);
    setTimeout(function () {
      moveEffect(vctText2, "80", "", "y", "12");
    }, 1300);
    setTimeout(function () {
      moveEffect(vctBtn, "100", "", "y", "12");
    }, 1500);
  }

  if (contactVT < vh * 0.8) {
    setTimeout(function () {
      h2Effect(contactHeader, "", "x", "12");
    }, 500);

    setTimeout(function () {
      moveEffect(contactText1, "70", "", "x", "20");
    }, 800);
    setTimeout(function () {
      moveEffect(contact, "100", "", "x", "20");
    }, 1000);
    setTimeout(function () {
      moveEffect(contactBtn, "100", "", "x", "20");
    }, 1200);
  }
}

//무한캐러셀을 위한 효과, 이동 효과
function CarouselEffect() {
  if (carouselIndex === 7) {
    // 첫번째로 돌아가는 모습을 안보이게하기위해 duration 제거
    carouselContainer.classList.remove("duration-1000");
    carouselContainer.classList.replace("-left-[300%]", "-left-[0%]");
    carouselIndex = 1
    setTimeout(function () {
      carouselContainer.classList.add("duration-1000");
      moveCarousel()
    }, 100)
  } else if (carouselIndex === -1) {
    // 마지막으로 돌아가는 모습을 안보이게하기위해 duration 제거
    carouselContainer.classList.remove("duration-1000");
    carouselContainer.classList.replace("-left-[0%]", "-left-[300%]");
    carouselIndex = 5
    setTimeout(function () {
      carouselContainer.classList.add("duration-1000");
      moveCarousel()
    }, 100)
  } else {
    moveCarousel();
  }
}
//캐러셀 이동 버튼 함수
function move(num) {
  carouselIndex += num
  // console.log("carouselIndex: ", carouselIndex);
  CarouselEffect();
}
// 자동 넘김을 위한 setInterval
let autoMoveCarousel = setInterval(function () {
  carouselIndex++
  CarouselEffect();
}, 3000)

// newProduct제품 호버이벤트
function hoverEffect(index) {
  hoverEffects[index].classList.replace("w-0", "w-full");
  hoverEffects[index].classList.replace("h-0", "h-full");
  hoverEffects[index].classList.remove("rounded-bl-full");

  clearInterval(autoMoveCarousel)
}
// newProduct 마우스 리브 이벤트
function leaveEffect(index) {
  hoverEffects[index].classList.add("rounded-bl-full");
  hoverEffects[index].classList.replace("h-full", "h-0");
  hoverEffects[index].classList.replace("w-full", "w-0");

  autoMoveCarousel = setInterval(function () {
    carouselIndex++
    CarouselEffect();
  }, 3000)
}
// 현재 필요한 이동 클래스만 남기고 모두 지운다.
function moveCarousel() {
  for (let i = 0; i < carouselItmes.length; i++) {
    const leftX = i * 50
    if (i === carouselIndex) {
      carouselContainer.classList.add(`-left-[${leftX}%]`);
    } else {
      carouselContainer.classList.remove(`-left-[${leftX}%]`);
    }
  }
}


function openCountyList() {
  if (countise.classList.contains("max-h-0")) {
    // console.log("open")
    countise.classList.replace("max-h-0", 'max-h-32')
  } else {
    // console.log("close")
    countise.classList.replace('max-h-32', "max-h-0")
  }
}

function selectCounty(target) {
  const county = target.innerText;
  selectedCounty.innerText = county;
}

contactForm.addEventListener("submit", inquiryForm)

const checkEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/

function inquiryForm(event) {
  event.preventDefault();
  // 나라선택 안되었을 때
  const name = contactName.value;
  if (selectedCounty.innerText === "Please Choose") {
    alertMessage.innerText = "Please choose a county"
    //회사이름 빈칸일 때
  } else if (companyName.value.trim() === '') {
    alertMessage.innerText = "Please enter company name"
    //이름 빈칸일 때
  } else if (contactName.value.trim() === '') {
    alertMessage.innerText = "Please enter contact name"
    //email 빈칸일 때
  } else if (emailF.value.trim() === '' || emailB.value === '') {
    alertMessage.innerText = "Please enter email"
    //email이 정규식에 맞지않을 때
  } else if (!checkEmail.test(emailB.value.trim())) {
    alertMessage.innerText = "Please check email"
    //문의내용 빈칸일 때
  } else if (inquiryContent.value.trim() === '') {
    alertMessage.innerText = "Please enter inquiry content."
    //문의 내용이 10글자 이하일 때
  } else if (inquiryContent.value.length < 10) {
    alertMessage.innerText = "Please enter at least 10 characters in inquiry contents."
    //스팸체크 빈칸일 때
  } else if (spamCheck.value.trim() === '') {
    alertMessage.innerText = "Please enter spam check code."
    //스팸체크 틀렸을 때
  } else if (spamCheck.value.trim() !== spamCheckImg.alt) {
    alertMessage.innerText = "Spam check code do not match.Enter again Please"
    //개인정보 동의 하지않았을 때
  } else if (!isAgree.checked) {
    alertMessage.innerText = "Please check the consent box"
  } else {
    alertMessage.innerText = ''
  }
  if (alertMessage.innerText !== '') {
    return setTimeout(function () {
      alertMessage.classList.remove("opacity-0");
    }, 100)
  } else {
    contactForm.classList.add("hidden");
    completedMessage.innerText = `
    Thanks ${name},
    Your inquiry has been completed.
    We'll be in touch soon.
`
    completedContainer.classList.replace("hidden", "flex")
  }
}

function formOpen() {
  selectedCounty.innerText === "Please Choose"

  Array.prototype.forEach.call(inputs, (input) => {
    input.value = ''
  })
  isAgree.checked = false;

  contactForm.classList.remove("hidden");
  completedMessage.innerText = ''
  completedContainer.classList.replace("flex", "hidden");
  contactForm.scrollTop = 0;
}

let spamCheckImgIndex = 0;
const spamCheckImgs = [
  { src: "./img/norobot_image_7ce8af.png", alt: "7ce8af" },
  { src: "./img/norobot_image_79dcad4.png", alt: "79dcad4" },
  { src: "./img/norobot_image_46487c.png", alt: "46487c" },
  { src: "./img/norobot_image_c5f71e.png", alt: "c5f71e" }
]

function changeSpamCheck() {
  spamCheckImgIndex++
  if (spamCheckImgIndex > 3) spamCheckImgIndex = 0;
  spamCheckImg.src = spamCheckImgs[spamCheckImgIndex].src;
  spamCheckImg.alt = spamCheckImgs[spamCheckImgIndex].alt;
}
