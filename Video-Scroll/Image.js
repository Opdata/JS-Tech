// 프레임단위로 영상을 이미지로 쪼갠 후 입히는 예시
const imgElem = document.querySelector('.sample-img');
const videoImages = [];
let totalImagesCount = 960;
let progress;
let currentFrame;

function setImages() {
  for (let i = 0; i < totalImagesCount; i++) {
    let imgElem = new Image();
    imgElem.src = `../video/002/IMG_${7027 + i}.JPG`;
    videoImages.push(imgElem);
  }
}

function init() {
  document.body.classList.remove('before-load'); // 이미지 로드 시간을 대비한 로딩처리 힌트

  window.addEventListener('scroll', function () {
    progress = pageYOffset / (document.body.offsetHeight - window.innerHeight);

    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
    requestAnimationFrame(function () {
      currentFrame = Math.round((totalImagesCount - 1) * progress);
      imgElem.src = videoImages[currentFrame].src;
    });
  });
}

window.addEventListener('load', init); // 모든 데이터가 로드되고 init 실행
setImages();
