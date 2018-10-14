const videoCameras = document.querySelectorAll('.video__player'); 

if (videoCameras.length > 0) {
    for ( let i = 0; i < videoCameras.length; i++) {
        videoCameras[i].addEventListener('click', (e) => {
            const videoContainer = e.target.parentNode;
            videoContainer.style.zIndex = '5';
            videoContainer.classList.add('video__item--fullscreen');
            videoCameras[i].muted= false;


            const closeVideo = () => {
                videoContainer.classList.remove('video__item--fullscreen');
                videoCameras[i].muted= true;
                window.setTimeout(() => {
                    videoContainer.style.zIndex = '1';
                }, 1000);
            };

            videoContainer.querySelector('.video__close').addEventListener('click', (e) => {
                closeVideo();
            });
            window.addEventListener("keydown", function (evt) {
                if (evt.keyCode === 27) {
                  evt.preventDefault();
                  closeVideo();
                }
              });
        });
    }


    const videoForm = document.querySelectorAll('.video__controls'); 
    const videoContrastInput = document.querySelectorAll('.video__input--contrast'); 

    for (let j = 0; j < videoContrastInput.length; j++) {
        videoContrastInput[j].addEventListener('input', (e) => {
            let videoContrastLabel = e.target.parentNode;
            let videoContrastValue = videoContrastLabel.querySelector('.video__value--contrast');
            videoContrastValue.innerHTML = e.target.value + ' %';

            const videoStreamContainer = e.target.parentNode.parentNode.parentNode;
            const videoStream = videoStreamContainer.querySelector('.video__player');
            let videoStreamContrast = (0.5+e.target.value/100);
            videoStream.style.webkitFilter = "contrast("+videoStreamContrast+")" ;
        });
    }

    const videoBrightInput = document.querySelectorAll('.video__input--brightness');

    for (let j = 0; j < videoBrightInput.length; j++) {
        videoBrightInput[j].addEventListener('input', (e) => {
            let videoBrightLabel = e.target.parentNode;
            let videoBrightValue = videoBrightLabel.querySelector('.video__value--brightness');
            videoBrightValue.innerHTML = e.target.value + ' %';

            const videoStreamContainer = e.target.parentNode.parentNode.parentNode;
            const videoStream = videoStreamContainer.querySelector('.video__player');
            let videoStreamBright = (0.5+e.target.value/100);
            videoStream.style.webkitFilter = "brightness("+videoStreamBright+")" ;
        });
    }


}
