const socialBarServices = [{
  icon: 'twitter',
  label: 'Twitter',
  url: () => {
    return `https://x.com/intent/tweet/?text=&url=${location}`
  }
}, {
  icon: 'facebook',
  label: 'Facebook',
  url: () => {
    return `https://facebook.com/sharer/sharer.php?u=${location}`
  }
}, {
  icon: 'pinterest',
  label: 'Pinterest',
  url: () => {
    return `https://pinterest.com/pin/create/button/?url=${location}`
  }
}, {
  icon: 'linkedin',
  label: 'LinkedIn',
  url: () => {
    return `https://www.linkedin.com/shareArticle?mini=true&url=${location}`
  }
}, {
  icon: 'reddit',
  label: 'Reddit',
  url: () => {
    return `https://reddit.com/submit/?url=${location}`
  }
}, {
  icon: 'whatsapp',
  label: 'WhatsApp',
  url: () => {
    return `whatsapp://send?text=${encodeURIComponent(document.title)} ${location}`
  }
}, {
  icon: 'email',
  label: 'Email',
  url: () => {
    return `mailto:?subject=${encodeURIComponent(document.title)}&body=${location}`
  }
}]

export default socialBarServices
