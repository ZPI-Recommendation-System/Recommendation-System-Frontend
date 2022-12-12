import useFormData from '../useFormData';
import { open, mail, copyToClipboard, beacon } from './utility';
import {HoverText} from './HoverText';

function detailsPage(id) {
    const url = window.location;
    const baseUrl = url.protocol + "//" + url.host;
    return baseUrl + "/details/" + id;
}

export default function LaptopShareLinks({ id, name }) {
    const formData = useFormData()
    const links = [
        ["/icons/comparison/youtube.png", "youtube-search", "Wyszukaj na Youtube", () => open("https://www.youtube.com/results?search_query=" + name)],
        ["/icons/comparison/allegro.jpg", "allegro-search", "Wyszukaj na Allegro", () => open("https://allegro.pl/listing?string=" + name)],
        ["/icons/comparison/icons8-delivered-mail-96.png", "mail", "Wyślij mailem", () => mail("Laptop", "Sprawdź ten laptop.", detailsPage(id))],
        ["/icons/comparison/copy.png", "copy-to-clipboard", "Skopiuj link do schowka", () => copyToClipboard(detailsPage(id))],
    ]
    return <>{links.map(
        ([icon, eventName, name, onClick]) =>
            <HoverText text={name}>
                <img key={name}
                    onClick={()=>{
                        beacon(eventName, id, formData)
                        onClick()
                    }}
                    className="share-link"
                    src={icon} alt={name}/>
            </HoverText>)}</>
}
