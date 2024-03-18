import {loadSongs, loadSearchSongs} from '../api.js'
import playSong from './player.js'

const listSectionTitle = document.querySelector('#list-section h4')
const songList = document.querySelector('.list')

const displaySongArray = (songs) => {
  // Vider la liste (variante 2)
  songList.innerHTML = ''

  songs.forEach((song) => {
    const newElement = document.createElement('song-item')
    newElement.setAttribute('title', song.title)

    newElement.addEventListener('play_click', () => {
      playSong(song, songs)
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

export { displayArtistSongs, displaySearchSongs }
