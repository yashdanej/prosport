import { useAppDispatch } from '../../../../../../ReduxToolkit/Hooks';
import { CardHeader } from 'reactstrap';
import { H4 } from '../../../../../../AbstractElements';
import { Filters } from '../../../../../../utils/Constant';
import { setSideBarOn } from '../../../../../../ReduxToolkit/Reducers/FilterSlice';

const FilterHeader = () => {
    const dispatch = useAppDispatch();
    return (
      <CardHeader>
        <H4 className="mb-0 f-w-600">
          {Filters}
          <span className="pull-right" onClick={() => dispatch(setSideBarOn())}>
            <i className="fa fa-chevron-down toggle-data"></i>
          </span>
        </H4>
      </CardHeader>
    )
}

export default FilterHeader