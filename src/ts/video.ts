const videoCameras: NodeList = document.querySelectorAll('.video__player');

if (videoCameras.length > 0) {
	for (let i = 0; i < videoCameras.length; i++) {
		videoCameras[i].addEventListener('click', (e) => {
			const videoContainer: HTMLElement = (e.target as HTMLVideoElement).parentNode as HTMLElement;
			videoContainer.style.zIndex = '5';
			videoContainer.classList.add('video__item--fullscreen');
			(videoCameras[i] as HTMLMediaElement).muted = false;

			const closeVideo = () => {
				videoContainer.classList.remove('video__item--fullscreen');
				(videoCameras[i] as HTMLMediaElement).muted = true;
				window.setTimeout(() => {
					videoContainer.style.zIndex = '1';
				}, 1000);
			};

			videoContainer.querySelector('.video__close').addEventListener('click', (e) => {
				closeVideo();
			});
			window.addEventListener('keydown', function(evt) {
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
			let videoContrastLabel = (e.target as HTMLElement).parentNode;
			let videoContrastValue = videoContrastLabel.querySelector('.video__value--contrast');
			let videoContrastTarget = e.target as HTMLInputElement;
			videoContrastValue.innerHTML = videoContrastTarget.value + ' %';

			const videoStreamContainer = (e.target as HTMLElement).parentNode.parentNode;
			const videoStream = videoStreamContainer.querySelector('.video__player');
			let videoStreamContrast = 0.5 + Number(videoContrastTarget.value) / 100;
			(videoStream as HTMLElement).style.webkitFilter = 'contrast(' + videoStreamContrast + ')';
		});
	}

	const videoBrightInput = document.querySelectorAll('.video__input--brightness');

	for (let j = 0; j < videoBrightInput.length; j++) {
		videoBrightInput[j].addEventListener('input', (e) => {
			let videoBrightLabel = (e.target as HTMLElement).parentNode;
			let videoBrightValue = videoBrightLabel.querySelector('.video__value--brightness');
			let videoBrightTarget = e.target as HTMLInputElement;
			videoBrightValue.innerHTML = videoBrightTarget.value + ' %';

			const videoStreamContainer = (e.target as HTMLElement).parentNode.parentNode.parentNode;
			const videoStream = videoStreamContainer.querySelector('.video__player');
			let videoStreamBright = 0.5 + Number(videoBrightTarget.value) / 100;
			(videoStream as HTMLElement).style.webkitFilter = 'brightness(' + videoStreamBright + ')';
		});
	}

	// определяем уровень звука

	for (let k = 0; k < videoCameras.length; k++) {
		// @ts-ignore
		const AudioCtx = window.AudioContext || window.webkitAudioContext;
		var audioCtx = new AudioCtx();

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
		const canvas: HTMLCanvasElement = videoContainer.querySelector('.video__canvas');
		const canvasWidth = canvas.width;
		const canvasHeight = canvas.height;

		const canvasCtx = canvas.getContext('2d');
		canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);

		function draw() {
			requestAnimationFrame(draw);
			analyser.getByteFrequencyData(dataArray);
			canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
			canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
			const barWidth = canvasWidth / bufferLength * 10;
			let barHeight;
			let x = 0;

			for (let i = 0; i < bufferLength; i++) {
				barHeight = dataArray[i] / 2;
				canvasCtx.fillStyle = 'rgb(' + (barHeight + 250) + ',217,62)';
				canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);
				x += barWidth + 1;
			}
		}
		draw();
	}
}
