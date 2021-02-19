const video = document.querySelector('.sample-video');
let videoDu;

video.addEventListener('loadeddata', () => {
  // Event 는 여러 이벤트가 존재한다.
  console.log('Video Load');
  videoDu = video.duration; // duration 속성 접근, 비디오의 전체재생시간을 가짐
  init();
});

let progress;
let currentFrame;

function init() {
  window.addEventListener('scroll', () => {
    progress = pageYOffset / (document.body.offsetHeight - window.innerHeight); // 스크롤 비율
    console.log(progress);

    // 모바일 바운드 대비 예외처리
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    requestAnimationFrame(function () {
      video.currentTime = video.duration * progress; // 현재 재생시간 설정
    });
  });
}
