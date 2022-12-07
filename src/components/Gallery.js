import './Gallery.css'
import { useSelector, useDispatch } from 'react-redux';
import { visible, selectedImage, hide, next } from '../store/slices/gallery';

export default function Gallery() {
  const dispatch = useDispatch();
  const currentlyVisible = useSelector(visible);
  const image = useSelector(selectedImage);
  
    const className = currentlyVisible ? "gallery-container" : "gallery-container hidden";
    return <div className={className} onClick={()=>dispatch(hide())}>
      <img className="gallery-image"
      onClick={(event)=>{dispatch(next()); event.stopPropagation();}}
      alt="laptop-gallery" src={image || ""}></img>
      </div>
}