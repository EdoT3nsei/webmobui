// Elements
class ArtistCover extends HTMLElement {
  connectedCallback() {
    const newContent = document.querySelector('#artist-list-item-template')
    const newElement = newContent.content.cloneNode(true)
    newElement.querySelector('img').src = this.getAttribute('cover')
    newElement.querySelector('div').innerText = this.getAttribute('name')
    this.replaceChildren(newElement)
  }
}
customElements.define("artist-cover", ArtistCover)


// Fetch
const BASE_URL = 'https://webmob-ui-22-spotlified.herokuapp.com'

const loadJson = (url) => fetch(url).then((response) => response.json())

const loadArtists = () => loadJson(`${BASE_URL}/api/artists`)

const loadSongs = (id) => loadJson(`${BASE_URL}/api/artists/${id}/songs`)

// Remplissage
const artistList = document.querySelector('.artist-list')

const afficherArtistes = () => loadArtists().then((artists) => {
  artistList.replaceChildren()
  artists.forEach((artist) => {
    const newElement = document.createElement('artist-cover')
    newElement.setAttribute('name', artist.name)
    newElement.setAttribute('cover', artist.image_url)
    artistList.appendChild(newElement)
  });
})

afficherArtistes()
