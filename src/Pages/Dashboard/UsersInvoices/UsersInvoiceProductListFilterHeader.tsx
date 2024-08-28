import { Filter } from 'react-feather';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../ReduxToolkit/Hooks';
import { setFilterToggle } from '../../../ReduxToolkit/Reducers/ProductSlice';
import { Href } from '../../../utils/Constant';

const UsersInvoiceProductListFilterHeader = () => {
    const { filterToggle } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
  
    return (
      <div>
        <div className="light-box" onClick={() => dispatch(setFilterToggle())}>
          <Link to={Href}>
            <Filter className={`filter-icon ${filterToggle ? "hide" : "show"}`} />
            <i className={`icon-close filter-close ${filterToggle ? "show" : "hide"}`} />
          </Link>
        </div>
        <Link className="btn btn-primary" to={Href}>
          {/* <i className="fa fa-plus" /> */}
          {"Re-Fetch"}
        </Link>
      </div>
    );
}

export default UsersInvoiceProductListFilterHeader