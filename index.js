const photos = ["./images/example.jpeg"];

class Photos extends HTMLElement {
  shadowRoot = null;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const container = document.createElement("div");
    container.setAttribute("part", "container");

    photos.forEach((url) => {
      const photo = document.createElement("photo-element");
      photo.setAttribute("url", url);
      photo.setAttribute("exportparts", "photo,link");
      container.appendChild(photo);
    });

    this.shadowRoot.appendChild(container);
  }
}

class Photo extends HTMLElement {
  shadowRoot = null;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const img = document.createElement("img");
    img.setAttribute("part", "photo");
    img.src = this.getAttribute("url");

    const link = document.createElement("a");
    link.setAttribute("part", "link");
    link.setAttribute("target", "_blank");
    link.href = this.getAttribute("url");
    link.appendChild(img);

    this.shadowRoot.appendChild(link);
  }
}

customElements.define("photos-element", Photos);
customElements.define("photo-element", Photo);
