import {API_URL} from "../../api/api";

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

export function beacon(event, laptopId, formJson, payload="") {
  if (window.navigator.sendBeacon) {
    const formData = new FormData();
    formData.append("eventType", event)
    formData.append("laptopId", laptopId)
    formData.append("formJson", JSON.stringify(formJson))
    formData.append("payload", payload)
    console.log("Sending beacon", API_URL + "/stats", event, payload, laptopId)
    window.navigator.sendBeacon(API_URL + "/stats", formData);
  }
}
