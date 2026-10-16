const cssClass = 'bc-default-btn'
const DefaultBtn = {
  mounted (element) {
    document.querySelectorAll(`.${cssClass}`).forEach(element => {
      element.classList.remove(cssClass)
    })
    element.focus()
    element.classList.add(cssClass)
    DefaultBtn.bind(element)
  },
  bind (element) {
    const classList = element.classList
    element.addEventListener('focus', () => {
      classList.add(cssClass)
    })
    element.addEventListener('blur', () => {
      classList.remove(cssClass)
    })
  }
}

export default DefaultBtn
