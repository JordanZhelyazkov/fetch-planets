import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    this._loading = document.querySelector("progress");
    this._create();
    this.emit(Application.events.READY);
  }

  async _load(number) {
    const resp = await fetch(
      `https://swapi.boom.dev/api/planets?page=${number}`
    );
    const planets = await resp.json();
    const data = planets.results;
    this.planetsUrl = data.next;
    return data;
  }
  _stopLoading() {
    this._loading.style.display = "none";
  }

  _startLoading() {
    this._loading.style.display = "block";
  }

  _create() {
    for (let index = 1; index <= 6; index++) {
      this._load(index).then((planets) => {
        this._startLoading()
        planets.forEach((element) => {
          const { name, terrain, population } = element;
          const box = document.createElement("div");
          box.classList.add("box");

          box.innerHTML = this._render({
            name,
            terrain,
            population,
          });

          document.body.querySelector(".main").appendChild(box);
        });
        this._stopLoading()
        this.pageNumber++;
    
      });
    }
  }
  _render({ name, terrain, population }) {
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }
}
