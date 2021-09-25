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
    this._create();
    this._loading = document.querySelector('progress');
    
    
    

    this.emit(Application.events.READY);
  }
  
  
  
  async _load() {
    const resp = await fetch(`https://swapi.boom.dev/api/planets`);
    // if(resp.status == 200){
    //   this._loading = 'none';
    // }
    const planets = await resp.json();
    const pResults = planets.results;
    return pResults;
  }
  _stopLoading() {
    
  }
  _startLoading() {
    
  }
  _create(){
    this._load().then((planets) => {
      this._loading.style.display = 'none';
      console.log(this._loading);
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
    });
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
