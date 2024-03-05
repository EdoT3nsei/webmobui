import {loadSongs} from '../api.js'




let songsListEncours = []
let encours = null




const previous = document.querySelector('#player-control-previous')
const next = document.querySelector('#player-control-next')




previous.addEventListener('click', () => {
  let indexEnCours = songsListEncours.indexOf(encours) - 1
  if(indexEnCours == -1)
    indexEnCours = songsListEncours.length - 1
  encours = songsListEncours[indexEnCours]
  console.log(encours.title)


  document.querySelector('audio').src = encours.audio_url
  document.querySelector('audio').play()
  document.querySelector('#player-infos-song-title').innerText = encours.title
})

next.addEventListener('click', () => {
  let indexEnCours = songsListEncours.indexOf(encours) + 1
  if(indexEnCours == songsListEncours.length)
    indexEnCours = 0
  encours = songsListEncours[indexEnCours]
  console.log(encours.title)


  document.querySelector('audio').src = encours.audio_url
  document.querySelector('audio').play()
  document.querySelector('#player-infos-song-title').innerText = encours.title
})






const listSectionTitle = document.querySelector('#list-section h4')
const displayArtistSongs = (id) => {
  const songList = document.querySelector('.list')

  loadSongs(id).then((songs) => {
    listSectionTitle.innerHTML = `Artistes > ${songs[0].artist.name}`

    // Vider la liste (variante 2)
    songList.innerHTML = ''

    console.warn(songs)

    songsListEncours = songs

    songs.forEach((song) => {
      console.log(song)

      const newElement = document.createElement('song-item')
      newElement.setAttribute('title', song.title)

      newElement.addEventListener('play_click', () => {
        encours = song

        document.querySelector('audio').src = encours.audio_url
        document.querySelector('audio').play()
        document.querySelector('#player-infos-song-title').innerText = encours.title
      })

      songList.appendChild(newElement)
    })
  })
}

export { displayArtistSongs }
