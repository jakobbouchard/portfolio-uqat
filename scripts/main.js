(function() {

	// Konami code
	const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
	let current = 0;

	function keyHandler(event) {
		// If the key isn't in the pattern, or isn't the current key in the pattern, reset
		if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
			current = 0;
			return;
		}

		// Update how much of the pattern is complete
		current++;

		// If complete, toggle class and reset
		if (pattern.length === current) {
			current = 0;
			document.body.classList.toggle('rainbow');
		}
	};

	// Listen for keydown events
	document.addEventListener('keydown', keyHandler);

	// Add selection to `code` tags
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
			console.warn('Could not select text in node: Unsupported browser.');
		}
	}
	document.querySelectorAll('code').forEach((el) => {
		el.addEventListener('click', () => selectText(el));
	});

	// Lazy-load YouTube
	console.log(document.querySelectorAll('.youtube'))
	document.querySelectorAll('.youtube').forEach((el) => {
		const image = new Image();
		image.src = 'https://img.youtube.com/vi/'+ el.dataset.embed +'/sddefault.jpg';
		image.addEventListener('load', () => {
			el.style.backgroundImage = `url(${image.src})`;
		});

		el.addEventListener('click', (event) => {
			el.style.backgroundImage = 'none';
			const container = event.currentTarget;
			const iframe = document.createElement('iframe');
			iframe.title = container.dataset.title;
			iframe.allowFullscreen = true;
			iframe.loading = 'lazy';
			iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
			iframe.src = 'https://www.youtube-nocookie.com/embed/'+ container.dataset.embed +'?rel=0&showinfo=0&autoplay=1';

			container.innerHTML = '';
			container.appendChild(iframe);
		});
	});
})();
