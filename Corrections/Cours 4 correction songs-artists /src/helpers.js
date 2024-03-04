
// Cache la section en cours et affiche celle correspondant à l'id passé en paramètre
const displaySection = (id) => {
  // On essaie de trouver la section active et on enlève la classe "active"
  // Hint: Comment gérer le cas où on ne trouve rien ?
  const activeSection = document.querySelector('section.active')
  activeSection.classList.remove('active')

  // ou sur une ligne:
  // document.querySelector('section.active')?.classList.remove('active')

  // On essaie de trouver la section qui correspond à l'id passé
  const newSection = document.querySelector(`#${id}-section`)
  newSection.classList.add('active')

  // ou sur une ligne:
  // document.querySelector(`#${id}-section`)?.classList.add('active')
}

const activateLink = (id) => {
  // Same same, avec les liens
  const activeLink = document.querySelector(`nav a.active`)
  activeLink.classList.remove('active')

  // ou sur une ligne:
  // document.querySelector(`nav a.active`)?.classList.remove('active')

  const link = document.querySelector(`nav a[href="${id}"]`)
  link.classList.add('active')

  // ou sur une ligne:
  // document.querySelector(`nav a[href="${id}"]`)?.classList.add('active')
}

export { displaySection, activateLink }
