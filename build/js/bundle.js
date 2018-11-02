// CURRENT YEAR //
var now = new Date();
var year = now.getFullYear();
document.querySelector('.currentyear').innerHTML = String(year);
var menuOpen = false;
var menuBtn = document.querySelector('.hamburger__icon');
var menuNav = document.querySelector('.menu');
menuBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (menuOpen) {
        this.classList.remove('hamburger__icon--open');
        menuNav.classList.remove('menu--open');
    }
    else {
        this.classList.add('hamburger__icon--open');
        menuNav.classList.add('menu--open');
    }
    menuOpen = !menuOpen;
});
var videoCameras = document.querySelectorAll('.video__player');
if (videoCameras.length > 0) {
    var _loop_1 = function (i) {
        videoCameras[i].addEventListener('click', function (e) {
            var videoContainer = e.target.parentNode;
            videoContainer.style.zIndex = '5';
            videoContainer.classList.add('video__item--fullscreen');
            videoCameras[i].muted = false;
            var closeVideo = function () {
                videoContainer.classList.remove('video__item--fullscreen');
                videoCameras[i].muted = true;
                window.setTimeout(function () {
                    videoContainer.style.zIndex = '1';
                }, 1000);
            };
            videoContainer.querySelector('.video__close').addEventListener('click', function (e) {
                closeVideo();
            });
            window.addEventListener('keydown', function (evt) {
                if (evt.keyCode === 27) {
                    evt.preventDefault();
                    closeVideo();
                }
            });
        });
    };
    for (var i = 0; i < videoCameras.length; i++) {
        _loop_1(i);
    }
    // Яркость-контрастность для картинки
    var videoForm = document.querySelectorAll('.video__controls');
    var videoContrastInput = document.querySelectorAll('.video__input--contrast');
    for (var j = 0; j < videoContrastInput.length; j++) {
        videoContrastInput[j].addEventListener('input', function (e) {
            var videoContrastLabel = e.target.parentNode;
            var videoContrastValue = videoContrastLabel.querySelector('.video__value--contrast');
            var videoContrastTarget = e.target;
            videoContrastValue.innerHTML = videoContrastTarget.value + ' %';
            var videoStreamContainer = e.target.parentNode.parentNode;
            var videoStream = videoStreamContainer.querySelector('.video__player');
            var videoStreamContrast = 0.5 + Number(videoContrastTarget.value) / 100;
            videoStream.style.webkitFilter = 'contrast(' + videoStreamContrast + ')';
        });
    }
    var videoBrightInput = document.querySelectorAll('.video__input--brightness');
    for (var j = 0; j < videoBrightInput.length; j++) {
        videoBrightInput[j].addEventListener('input', function (e) {
            var videoBrightLabel = e.target.parentNode;
            var videoBrightValue = videoBrightLabel.querySelector('.video__value--brightness');
            var videoBrightTarget = e.target;
            videoBrightValue.innerHTML = videoBrightTarget.value + ' %';
            var videoStreamContainer = e.target.parentNode.parentNode.parentNode;
            var videoStream = videoStreamContainer.querySelector('.video__player');
            var videoStreamBright = 0.5 + Number(videoBrightTarget.value) / 100;
            videoStream.style.webkitFilter = 'brightness(' + videoStreamBright + ')';
        });
    }
    var _loop_2 = function (k) {
        // @ts-ignore
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioCtx();
        var analyser = audioCtx.createAnalyser();
        var source = audioCtx.createMediaElementSource(videoCameras[k]);
        source.connect(analyser);
        analyser.fftSize = 256;
        var bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);
        var dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);
        // рисуем График
        var videoContainer = videoCameras[k].parentNode;
        var canvas = videoContainer.querySelector('.video__canvas');
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        var canvasCtx = canvas.getContext('2d');
        canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        function draw() {
            requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
            var barWidth = canvasWidth / bufferLength * 10;
            var barHeight;
            var x = 0;
            for (var i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                canvasCtx.fillStyle = 'rgb(' + (barHeight + 250) + ',217,62)';
                canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        }
        draw();
    };
    var audioCtx;
    // определяем уровень звука
    for (var k = 0; k < videoCameras.length; k++) {
        _loop_2(k);
    }
}
window.onload = function () {
    var zoomWrapper = document.querySelector('.event__camera-wrp');
    var zoomImg = document.querySelector('.event__camera-img');
    var zoomWrpWidth = zoomWrapper.offsetWidth;
    var zoomImgWidth = zoomImg.offsetWidth;
    var pointerEvents = [];
    var prevDistance = 0;
    zoomImg.style.left = '0px';
    zoomWrapper.addEventListener('pointerdown', function startGesture(e) {
        zoomWrapper.setPointerCapture(e.pointerId);
        pointerEvents.push({
            id: e.pointerId,
            startPosition: {
                x: e.x,
                y: e.y
            },
            prevPosition: {
                x: e.x,
                y: e.y
            },
            currentPosition: {
                x: e.x,
                y: e.y
            }
        });
    });
    zoomWrapper.addEventListener('pointermove', function moveGesture(e) {
        var startX = pointerEvents[0].prevPosition.x;
        var x = e.x;
        var dx = x - startX;
        var movedLeft = pointerEvents[0].startPosition.x + dx;
        zoomImg.style.left = movedLeft + 'px';
        pointerEvents[0].prevPosition.x = pointerEvents[0].currentPosition.x;
    });
    zoomWrapper.addEventListener('pointerup', function endGesture(e) {
        pointerEvents = [];
    });
    zoomWrapper.addEventListener('pointercancel', function cancelGesture(e) {
        pointerEvents = [];
    });
};
