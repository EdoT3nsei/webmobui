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


// Elements
class SongElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <a href="#">
              <div class="list-item-title">${this.getAttribute('title')}</div>
              <div class="list-item-actions">
                <button type="button" class="icon-button favorite-button ">
                  <span class="material-icons">playlist_add</span>
                </button>
                <button type="button" class="icon-button play-button">
                  <span class="material-icons">play_arrow</span>
                </button>
              </div>
            </a>
    `
  }
}
customElements.define("song-element", SongElement)


// Fetch
const BASE_URL = 'https://webmob-ui-22-spotlified.herokuapp.com'

const loadJson = (url) => fetch(url).then((response) => response.json())

const loadArtists = () => loadJson(`${BASE_URL}/api/artists`)

const loadSongs = (id) => loadJson(`${BASE_URL}/api/artists/${id}/songs`)


//
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

// remplissage chansons

const songsList = document.querySelector('.list')

loadSongs(2).then((songs) => {
  songsList.innerHTML = ''

  songs.forEach((song) => {
    const newSong = document.createElement('song-element')
    newSong.setAttribute('title', song.title)
    songsList.appendChild(newSong)
  })
})



// Remplissage

// const liens = document.querySelectorAll('nav a')

// liens.forEach((lien) => {
//   lien.addEventListener('click', () => {
//     console.warn(lien.hash)

//     const laSectionActive = document.querySelector('section.active')
//     laSectionActive.classList.remove('active')


//     const laSection = document.querySelector(`${lien.hash}-section`)
//     laSection.classList.add('active')





//     const leLienActif = document.querySelector('nav a.active')
//     leLienActif.classList.remove('active')


//     lien.classList.add('active')





//   })
// })

const afficherSection = () => {
  console.warn('Maintenant on est là: ')
  console.warn(window.location.hash)

  // Hint: Comment gérer une section par défaut ? Typiquement, sur localhost:1234, il n'y a pas de hash, donc
  // window.location.hash retourne ''

  // On essaie de trouver la section active et on enlève la classe "active"
  // Hint: Comment gérer le cas où on ne trouve rien ?
  const laSectionActive = document.querySelector('section.active')
  laSectionActive.classList.remove('active')

  // On essaie de trouver la section qui correspond au hash
  // Hint: Comment gérer le cas où ça ne match pas ? typiquement, on utilise la section "list" dans
  // les chansons d'un artiste, les résultats de recherche et les favoris
  const laSection = document.querySelector(`${window.location.hash}-section`)
  laSection.classList.add('active')


  // Same same, avec les liens
  const leLienActif = document.querySelector(`nav a.active`)
  leLienActif.classList.remove('active')

  const lien = document.querySelector(`nav a[href="${window.location.hash}"]`)
  lien.classList.add('active')

  // On peut commencer à mettre de la logique custom !
  if(window.location.hash == '#artists') {
    console.warn('je suis dans les artists !!')

    afficherArtistes()
  }
}

// On veut être averti des changements
window.addEventListener("hashchange", afficherSection)

// on exécute une première fois au chargement de la page pour afficher la bonne section
afficherSection()
