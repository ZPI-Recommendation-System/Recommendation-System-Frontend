import './Gallery.css'
import { useSelector, useDispatch } from 'react-redux';
import { visible, selectedImage, hide, next, previous } from '../store/slices/gallery';

export default function Gallery() {
  const dispatch = useDispatch();
  const currentlyVisible = useSelector(visible);
  const image = useSelector(selectedImage);

  function handler(action) {
    return e => {
      dispatch(action());
      e.stopPropagation();
    }
  }

  const className = currentlyVisible ? "gallery-background" : "gallery-background hidden";
  return <div className={className} onClick={handler(hide)}>
    <div className='gallery-container'>
      <p className='gallery-control gallery-control-close'
        style={{
          
        }}
      >Zamknij</p>
      <img className="gallery-image"
        onClick={handler(next)}
        alt="laptop-gallery" src={image || ""}>
      </img>

      <span className='gallery-control gallery-control-previous'
        onClick={handler(previous)}
      >Poprzednie</span>
      <span className='gallery-control gallery-control-next'
        onClick={handler(next)}
      >Następne</span>
    </div>
  </div>
}