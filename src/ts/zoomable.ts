window.onload = function() {
	const zoomWrapper = document.querySelector('.event__camera-wrp');
	const zoomImg = document.querySelector('.event__camera-img');

	const zoomWrpWidth = (zoomWrapper as HTMLElement).offsetWidth;
	const zoomImgWidth = (zoomImg as HTMLElement).offsetWidth;

	type MyPointerEvent = {
		id: number;
		startPosition: {
			x: number;
			y: number;
		};
		prevPosition: {
			x: number;
			y: number;
		};
		currentPosition: {
			x: number;
			y: number;
		};
	};

	let pointerEvents: Array<MyPointerEvent> = [];
	let prevDistance = 0;

	(zoomImg as HTMLElement).style.left = '0px';

	zoomWrapper.addEventListener('pointerdown', function startGesture(e: PointerEvent): void {
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

	zoomWrapper.addEventListener('pointermove', function moveGesture(e: PointerEvent): void {
		let startX = pointerEvents[0].prevPosition.x;
		let x: number = e.x;
		let dx: number = x - startX;

		let movedLeft = pointerEvents[0].startPosition.x + dx;
		(zoomImg as HTMLElement).style.left = movedLeft + 'px';
		pointerEvents[0].prevPosition.x = pointerEvents[0].currentPosition.x;
	});

	zoomWrapper.addEventListener('pointerup', function endGesture(e: PointerEvent): void {
		pointerEvents = [];
	});

	zoomWrapper.addEventListener('pointercancel', function cancelGesture(e: PointerEvent): void {
		pointerEvents = [];
	});
};
