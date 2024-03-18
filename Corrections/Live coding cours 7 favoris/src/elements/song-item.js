const playClick = new CustomEvent('play_click')
const favoriteClick = new CustomEvent('favorite_click')

class SongItem extends HTMLElement {
  static observedAttributes = ['favorite']

  attributeChangedCallback() {
    const icon = this.getAttribute("favorite") == "null" ? 'favorite_border' : 'favorite'
    this.innerHTML = `<a href="#">
    <div class="list-item-title">${this.getAttribute('title')}</div>
    <div class="list-item-actions">
      <button type="button" class="icon-button favorite-button ">
        <span class="material-icons">${icon}</span>
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
  this.querySelector('.favorite-button').addEventListener('click', (e) => {
    e.preventDefault()
    this.dispatchEvent(favoriteClick)
  })
  }
}
customElements.define('song-item', SongItem)
