const playClick = new CustomEvent('play_click')

class SongItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<a href="#">
    <div class="list-item-title">${this.getAttribute('title')}</div>
    <div class="list-item-actions">
      <button type="button" class="icon-button favorite-button ">
        <span class="material-icons">favorite</span>
      </button>
      <button type="button" class="icon-button play-button">
        <span class="material-icons">play_arrow</span>
      </button>
    </div>
  </a>`
  this.querySelector('.play-button').addEventListener('click', (e) => {
    e.preventDefault()
    this.dispatchEvent(playClick)
  })
  }
}
customElements.define('song-item', SongItem)
