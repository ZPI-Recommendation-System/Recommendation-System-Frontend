import './LaptopStar.css';
import { useSelector, useDispatch } from 'react-redux';
import { select, isFavourited } from '../store/slices/favourites';

export default function LaptopStar({ id }) {
  const dispatch = useDispatch();
  const checked = useSelector(isFavourited(id));

  const checkedClass = checked ? "laptop-star" : "laptop-star hidden";

  return <>
    <img onClick={e=>{dispatch(select(id)); e.stopPropagation();}} 
    src="/icons/icons8-star-32.png" className="laptop-star" alt="star" />
    <img onClick={e=>{dispatch(select(id)); e.stopPropagation();}} 
    src="/icons/icons8-star-30.png" className={checkedClass} alt="star-checked" />
    </>;
}
