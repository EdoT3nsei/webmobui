import {loadSongs, loadSearchSongs} from '../api.js'
import {getItem, setItem, removeItem, getItems} from '../local-storage.js'
import playSong from './player.js'

const listSectionTitle = document.querySelector('#list-section h4')
const songList = document.querySelector('.list')

const displaySongArray = (songs) => {
  // Vider la liste (variante 2)
  songList.innerHTML = ''

  songs.forEach((song) => {
    const newElement = document.createElement('song-item')
    newElement.setAttribute('title', song.title)
    newElement.setAttribute('favorite', getItem(song.id))

    newElement.addEventListener('play_click', () => {
      playSong(song, songs)
    })

    newElement.addEventListener('favorite_click', () => {
      if(getItem(song.id)) {
        console.log("C'est dedans!")
        removeItem(song.id)
      } else {
        console.log("ça n'y est pas")
        setItem(song.id, song)
      }

      newElement.setAttribute('favorite', getItem(song.id))
    })

    songList.appendChild(newElement)
  })
}

const displayArtistSongs = (id) => {
  loadSongs(id).then((songs) => {
    listSectionTitle.innerHTML = `Artistes > ${songs[0].artist.name}`

    displaySongArray(songs)
  })
}

const displaySearchSongs = (query) => {
  loadSearchSongs(query).then((songs) => {
    listSectionTitle.innerHTML = `Recherche`

    displaySongArray(songs)
  })
}

const displayFavoriteSongs = () => {
  const songs = getItems()
  listSectionTitle.innerHTML = `Favoris`

  displaySongArray(songs)
}

export { displayArtistSongs, displaySearchSongs, displayFavoriteSongs }
