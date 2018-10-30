window.onload = function() {
	const zoomWrapper = document.querySelector('.event__camera-wrp');
	const zoomImg = document.querySelector('.event__camera-img');

	const zoomWrpWidth = zoomWrapper.offsetWidth;
	const zoomImgWidth = zoomImg.offsetWidth;

	let pointerEvents = [];
	let prevDistance = 0;

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
		let startX = pointerEvents[0].prevPosition.x;
		let x = e.x;
		let dx = x - startX;

		let movedLeft = pointerEvents[0].startPosition.x + dx;
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
