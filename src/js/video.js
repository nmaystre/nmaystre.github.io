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
    const videoBrightnessInput = document.querySelectorAll('.video__inpit--brightness');
    console.log(videoContrastInput);

    for (let j; j < videoContrastInput.length; j++) {
        videoContrastInput[j].addEventListener('oninput', (e) => {
            const videoContrastLabel = document.querySelectorAll('.video__label--contrast');
            const videoContrastValue = videoContrastLabel.querySelector('.video__value');
            console.log(e.target);
            videoContrastValue.innerHtml = e.target.value;
        });
    }


}
