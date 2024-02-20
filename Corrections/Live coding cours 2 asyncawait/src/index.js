// Elements
class ArtistCover extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <a href="#">
        <img src="${this.getAttribute('cover')}" />
        <div class="artist-list-item-title">${this.getAttribute('name')}</div>
      </a>
    `
  }
}
customElements.define('artist-cover', ArtistCover)








// Fetch
const BASE_URL = 'https://webmob-ui-22-spotlified.herokuapp.com'

// Version promise

const loadJson = (url) => fetch(url).then((response) => response.json())

const loadArtists = () => loadJson(`${BASE_URL}/api/artists`)

const loadSongsForArtist = (id) => loadJson(`${BASE_URL}/api/artists/${id}/songs`)


// Version async/wait
const loadJsonV2 = async (url) => {
  const response = await fetch(url)
  const json = await response.json()
  return json
}
const loadArtiststV2 = async () => {
  return await loadJson(`${BASE_URL}/api/artists`)
}

const masuperfonctionasync = async () => {
  const data = await loadArtists()
  console.log(data)
}
masuperfonctionasync()


// Remplissage
const artistList = document.querySelector('.artist-list')


loadArtists().then((artists) => {
  artists.forEach((artist) => {
    const newElement = document.createElement('artist-cover')

    newElement.setAttribute('name', artist.name)
    newElement.setAttribute('cover', artist.image_url)

    artistList.appendChild(newElement)
  })
})

// Version async await
const afficherArtistes = async () => {
  const artists = await loadArtiststV2()

  artists.forEach((artist) => {
    const newElement = document.createElement('artist-cover')

    newElement.setAttribute('name', artist.name)
    newElement.setAttribute('cover', artist.image_url)

    artistList.appendChild(newElement)
  })
}

afficherArtistes()
