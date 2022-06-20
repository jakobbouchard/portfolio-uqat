class YouTubePlayer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
					position: relative;
					background-color: #000;
				}
				button {
					box-shadow: 0 0 2rem rgba( 0,0,0,0.6 );
					border: 0;
					width: 4.5rem;
					height: 3rem;
					background-color: #000;
					font-size: 0;
					z-index: 1;
					opacity: 0.8;
					border-radius: .25rem;
				}
				button::before {
					content: "";
					border-style: solid;
					border-width: 0.75rem 0 0.75rem 1.25rem;
					border-color: transparent transparent transparent #fff;
				}
				img {
					opacity: 0.7;
				}
				img,
				iframe {
					display: block;
					width: 100%;
					aspect-ratio: 16 / 9;
				}
				img,
				button {
					cursor: pointer;
				}
				iframe {
					border: 0;
				}
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
		this.shadowRoot.appendChild(this.image);

		this.iframe = document.createElement("iframe");
		this.iframe.allowFullscreen = true;
		this.iframe.loading = "lazy";
		this.iframe.allow =
			"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
	}

	static get observedAttributes() {
		return ["title", "video-id"];
	}

	get title() {
		return this.getAttribute("title");
	}

	set title(value) {
		this.setAttribute("title", value);
	}

	get videoId() {
		return this.getAttribute("video-id");
	}

	set videoId(value) {
		this.setAttribute("video-id", value);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.image.alt = this.title;
		this.iframe.title = this.title;
		this.iframe.src =
			"https://www.youtube-nocookie.com/embed/" +
			this.videoId +
			"?rel=0&showinfo=0&autoplay=1";
	}

	connectedCallback() {
		this.querySelector("a").remove();
		if ("IntersectionObserver" in window) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							this.image.src = `https://img.youtube.com/vi/${this.videoId}/maxresdefault.jpg`;
							observer.disconnect();
						}
					});
				},
				{ rootMargin: "0px 0px 100px 0px" }
			);
			observer.observe(this);
		}

		this.addEventListener("click", () => {
			this.shadowRoot
				.querySelectorAll("img, button")
				.forEach((el) => el.remove());
			this.shadowRoot.appendChild(this.iframe);
		});
	}
}

window.customElements.define("youtube-player", YouTubePlayer);
