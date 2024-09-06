import { Filter } from 'react-feather';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../ReduxToolkit/Hooks';
import { setFilterToggle } from '../../../ReduxToolkit/Reducers/ProductSlice';
import { Href } from '../../../utils/Constant';
import { P } from '../../../AbstractElements';

const UsersInvoiceProductListFilterHeader = ({fetchMasterDashboardUsersInvoiceData}: any) => {
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
        <span className="btn btn-primary" onClick={fetchMasterDashboardUsersInvoiceData}>
          {/* <i className="fa fa-plus" /> */}
          {"Re-Fetch"}
        </span>
      </div>
    );
}

export default UsersInvoiceProductListFilterHeader