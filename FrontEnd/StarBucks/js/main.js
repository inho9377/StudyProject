const searchEl = document.querySelector('.search'); //document는 HTML
const searchInputEl = searchEl.querySelector('input'); //SearchEl 안에서 찾음

//돋보기 클릭해도 확대됨
searchEl.addEventListener('click', function () {
    searchInputEl.focus();

});

//핸들러 : 실행되는 함수 *focust 시 실행되는 function
searchInputEl.addEventListener('focus', function () {
    searchEl.classList.add('focused');
    searchInputEl.setAttribute('placeholder', '통합검색'); //HTML의 속성 지정
})

//포커스 해제시
searchInputEl.addEventListener('blur', function () {
    searchEl.classList.remove('focused');
    searchInputEl.setAttribute('placeholder', '통합검색'); //HTML의 속성 지정
})

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
//window 객체는 브라우저 창 (탭 하나)
window.addEventListener('scroll', _.throttle(function () {
    console.log(window.scrollY);
    if(window.scrollY > 500) {
        // 배지 숨기기
        // badgeEl.style.display = 'none';
        // gsap.to(요소, 지속시간(second), 옵션);
        gsap.to(badgeEl, .6, {
            opacity: 0,
            // 시각적으로만 사라짐

            display: 'none'
        });
        // 버튼 보이기
        gsap.to(toTopEl, .2, {
          x: 0
        });

    }
    else {
        // 배지 보이기
        // badgeEl.style.display = 'block';        
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        });
        // 버튼 숨기기
        gsap.to(toTopEl, .2, {
          x: 100
        });
    }  
}, 300 /* 0.3s */));
// _.throttle(함수, 시간(ms))

toTopEl.addEventListener('click', function() {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7,
        opacity: 1
    });
});

//(선택자, 옵션)
// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true
  });
  new Swiper('.promotion .swiper-container', {
    // Default dirction : horizontal
    slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기
    loop: true,
    autoplay: {
      delay: 5000, // 500:0.5초, 5000:5초
      disableOnInteraction: false,
    },
    pagination: {
      el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
      clickable: true, // 사용자의 페이지 번호 요소 제어
    },
    navigation: {
      prevEl: '.promotion .swiper-prev', // 이전 슬라이드 보는 버튼 선택자
      nextEl: '.promotion .swiper-next' // 다음 슬라이드 보는 버튼 선택자
    }
  });
  new Swiper('.awards .swiper-container', {
    autoplay: {
      disableOnInteraction: false
    },
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation: {
      prevEl: '.awards .swiper-prev',
      nextEl: '.awards .swiper-next',
    }
  });
  
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
    isHidePromotion = !isHidePromotion;
    if (isHidePromotion) {
        // 숨김 처리!
        promotionEl.classList.add('hide');
    } else {
        // 보임 처리!
        promotionEl.classList.remove('hide');
    }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
// `.toFixed()`를 통해 반환된 문자 데이터를,
// `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}


function floatingObject(selector, delay, size) {
    gsap.to(selector, random(1.5, 2.5), 
    {
        y: size,
        repeat: -1, /* 무한 반복 */
        yoyo: true,
        ease: Power1.easeInOut,
        delay: random(0, delay),
    }
); 
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook : .8, // 0~1 사이.(1이 맨 아래)
    })
    .setClassToggle(spyEl, 'show') // Hook에 의해 실행되는 메소드. show 라는 클래스를 넣고 뺌
    .addTo(new ScrollMagic.Controller());
});  


const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();