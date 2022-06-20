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
//window 객체는 브라우저 창 (탭 하나)
window.addEventListener('scroll', function() {
    console.log('scroll!');
});