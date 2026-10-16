const body = document.querySelector('body')
const cssClass = 'overflow-hidden'

const ScrollLock = {
  mounted () {
    body.classList.add(cssClass)
  },
  beforeUnmount () {
    body.classList.remove(cssClass)
  }
}

export default ScrollLock
