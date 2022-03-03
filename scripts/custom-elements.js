class YouTubePlayer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
					position: relative;
					padding-bottom: 56.25%;
					max-width: 100%;
					height: 0;
					background-color: #000;
					overflow: hidden;
				}
				button {
					box-shadow: 0 0 30px rgba( 0,0,0,0.6 );
					border: 0;
					width: 90px;
					height: 60px;
					background-color: #000;
					font-size: 0;
					z-index: 1;
					opacity: 0.8;
					border-radius: 6px;
				}
				button::before {
					content: "";
					border-style: solid;
					border-width: 15px 0 15px 26.0px;
					border-color: transparent transparent transparent #fff;
				}
				img {
					width: 100%;
					top: -16.84%;
					left: 0;
					opacity: 0.7;
				}
				img,
				button {
					cursor: pointer;
				}
				iframe {
					border: 0;
					height: 100%;
					width: 100%;
					top: 0;
					left: 0;
				}
				img,
				iframe,
				button,
				button::before {
					position: absolute;
				}
				button,
				button::before {
					top: 50%;
					left: 50%;
					transform: translate3d( -50%, -50%, 0 );
				}
			</style>
			<button part="play-button">Jouer la vidéo</button>
		`;
		this.image = new Image();
		this.image.alt = this.getAttribute('title');
		this.shadowRoot.appendChild(this.image);

		this.iframe = document.createElement('iframe');
		this.iframe.title = this.getAttribute('title');
		this.iframe.allowFullscreen = true;
		this.iframe.loading = 'lazy';
		this.iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
		this.iframe.src = 'https://www.youtube-nocookie.com/embed/'+ this.getAttribute('video-id') +'?rel=0&showinfo=0&autoplay=1';
	}

	connectedCallback() {
		if ("IntersectionObserver" in window) {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						this.image.src = `https://img.youtube.com/vi/${this.getAttribute('video-id')}/sddefault.jpg`;
						observer.disconnect();
					}
				});
			}, { rootMargin: '0px 0px 100px 0px' });
			observer.observe(this);
		}

		this.addEventListener('click', () => {
			this.shadowRoot.querySelector('img, button').remove();
			this.shadowRoot.appendChild(this.iframe);
		});
	}

	static get observedAttributes() {
		return ['title', 'video-id'];
	}
}

window.customElements.define('youtube-player', YouTubePlayer);
