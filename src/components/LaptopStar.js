import { useSelector, useDispatch } from 'react-redux';
import { select, isFavourited } from '../store/slices/favourites';

export default function LaptopStar({ id }) {
  const dispatch = useDispatch();
  const checked = useSelector(isFavourited(id));

  const image = checked ? "icons/icons8-star-30.png" : "icons/icons8-star-32.png";
  return <img onClick={e=>{dispatch(select(id)); e.stopPropagation();}} 
    src={image} className="laptop-star" alt="star" />;
}
