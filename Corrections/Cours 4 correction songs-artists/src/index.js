
import './elements/artists-cover.js'
import './elements/song-item.js'

import { displaySection, activateLink } from './helpers.js'

import {displayArtists} from './sections/artists.js'
import {displayArtistSongs} from './sections/songs.js'

const routeur = () => {
  const hash = window.location.hash || '#home'
  const hashs = hash.split('-')

  console.warn('Maintenant on est là: ', hashs)

  // Colorie le lien
  activateLink(hashs[0])

  switch(hashs[0]) {
    case '#artists':
      if(hashs[1]) {
        displaySection('list')
        displayArtistSongs(hashs[1])
      }
      else {
        displaySection('artists')
        displayArtists()
      }
    break;

    case '#player':
      displaySection('player')
    break;

    case '#home':
      displaySection('home')
    break;
  }
}

// On veut être averti des changements
window.addEventListener('hashchange', routeur)

// on exécute une première fois au chargement de la page pour afficher la bonne section
routeur()
