(function() {
	const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
	let current = 0;

	const keyHandler = function (event) {

		// If the key isn't in the pattern, or isn't the current key in the pattern, reset
		if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
			current = 0;
			return;
		}

		// Update how much of the pattern is complete
		current++;

		// If complete, alert and reset
		if (pattern.length === current) {
			current = 0;
			document.body.classList.toggle('rainbow');
		}

	};

	// Listen for keydown events
	document.addEventListener('keydown', keyHandler, false);
})();
