// CURRENT YEAR //

let now = new Date();
let year = now.getFullYear();
document.querySelector('.currentyear').innerHTML = year;
let menuOpen = false;
const menuBtn = document.querySelector('.hamburger__icon');
const menuNav = document.querySelector('.menu');

menuBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (menuOpen) {
    this.classList.remove('hamburger__icon--open');
    menuNav.classList.remove('menu--open');
  } else {
    this.classList.add('hamburger__icon--open');
    menuNav.classList.add('menu--open');
  }
  menuOpen = !menuOpen;
});
const statsGraph = document.querySelector('.stats__graph');
import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js'

if (statsGraph) {
plotters.forEach(function (data) {
  const chartWrp = document.querySelector('#myChart' + data.index).getContext('2d');

  let plotOptions = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: []
  };

  data.data.values.forEach(function (category) {
    let set = {
      data: [],
      backgroundColor: [
        'rgba(0, 0, 0, 0.1)'
      ],
      borderColor: [
        'transparent',
      ],
      borderWidth: 1,
      cubicInterpolationMode: 'monotone'
    };

    for (const value of Object.values(category)) {
      value.forEach(function (val) {
        set.data.push(val[1]);
      })
    }
    plotOptions.datasets.push(set);
  });

  let myChart = new Chart(chartWrp, {
    type: 'line',
    data: plotOptions,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: false,
      scales: {
        yAxes: [{
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            beginAtZero: true,
            display: false,
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            beginAtZero: true,
            display: false,
          }
        }]
      },
      elements: {
        point: {
          radius: 0
        }
      }
    }
  });
});
}
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

    // Яркость-контрастность для картинки

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

    // определяем уровень звука

    for (let k = 0; k < videoCameras.length; k++) {

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(videoCameras[k]);
    source.connect(analyser);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    // рисуем График  
    
    const videoContainer = videoCameras[k].parentNode;
    const canvas = videoContainer.querySelector(".video__canvas");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const canvasCtx = canvas.getContext("2d");    
    canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
        const barWidth = (canvasWidth / bufferLength) * 10;
        let barHeight;
        let x = 0;

        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]/2;
            canvasCtx.fillStyle = 'rgb(' + (barHeight+250) + ',217,62)';
            canvasCtx.fillRect(x, canvasHeight-barHeight, barWidth, barHeight);
            x += barWidth + 1;
          }
    }
    draw();

    };


}
