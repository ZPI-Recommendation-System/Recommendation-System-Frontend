export function open(url) {
  window.open(url, '_blank').focus();
}

export function copyToClipboard(url) {
  navigator.clipboard.writeText(url)
}

export function mail(subject, message, link) {
  // line break "cheatcode":
  // https://stackoverflow.com/questions/22765834/insert-a-line-break-in-mailto-body
  open(`mailto:yourmail@mail.com?subject=${subject}&body=${message}%0D%0A%0D%0A${link}`)
}