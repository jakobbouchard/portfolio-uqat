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

	function selectText(node) {
		if (document.body.createTextRange) {
			const range = document.body.createTextRange();
			range.moveToElementText(node);
			range.select();
		} else if (window.getSelection) {
			const selection = window.getSelection();
			const range = document.createRange();
			range.selectNodeContents(node);
			selection.removeAllRanges();
			selection.addRange(range);
		} else {
			console.warn("Could not select text in node: Unsupported browser.");
		}
	}
	document.querySelectorAll('code').forEach((el) => {
		el.addEventListener('click', () => {
			// Select the text
			selectText(el);
		});
	});
})();
