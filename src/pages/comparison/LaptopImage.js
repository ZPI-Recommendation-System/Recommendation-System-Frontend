import { useDispatch } from 'react-redux';
import { show } from '../../store/slices/gallery';

export default function LaptopImage({ laptop }) {
  const dispatch = useDispatch();

  return <div className="comparison-image-container">
      <img className="comparison-image"
      onClick={() => dispatch(show({ images: laptop?.images?.map(i => i.url) }))}
      src={laptop?.images[0].url} alt="laptop" />
    </div>
}