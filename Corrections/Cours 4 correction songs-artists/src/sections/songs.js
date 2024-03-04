import {loadSongs} from '../api.js'
const listSectionTitle = document.querySelector('#list-section h4')

const displayArtistSongs = (id) => {
  const songList = document.querySelector('.list')

  loadSongs(id).then((songs) => {
    listSectionTitle.innerHTML = `Artistes > ${songs[0].artist.name}`

    // Vider la liste (variante 2)
    songList.innerHTML = ''

    songs.forEach((song) => {
      const newElement = document.createElement('song-item')
      newElement.setAttribute('title', song.title)
      songList.appendChild(newElement)
    })
  })
}
export {displayArtistSongs}
