import { Card, CardBody, Col, Collapse, Input, Row } from 'reactstrap';
import { useAppSelector } from '../../../ReduxToolkit/Hooks';

const MasterAdminPlansCollapseFilterData = ({ onFilterChange }: any) => {
    const { filterToggle } = useAppSelector((state) => state.product);

    const filtersData = [
        {
            name: "Status",
            options: ["Active", "De-Active"],
        },
    ];

    const handleFilterChange = (event: any, filterName: any) => {
        const { value } = event.target;
        let filterKey = '';

        switch (filterName) {
            case 'Status':
                filterKey = 'status';
                break;
            default:
                break;
        }

        onFilterChange(filterKey, value);
    };

    return (
        <Collapse isOpen={filterToggle}>
            <Card className="shadow-none">
                <CardBody className="list-product-body">
                    <Row className="row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
                        {filtersData.map((item, index) => (
                            <Col key={index}>
                                <Input 
                                    type="select" 
                                    onChange={(e) => handleFilterChange(e, item.name)}>
                                    <option value="">{item.name}</option>
                                    {item.options.map((data, optionIndex) => (
                                        <option key={optionIndex} value={data}>{data}</option>
                                    ))}
                                </Input>
                            </Col>
                        ))}
                    </Row>
                </CardBody>
            </Card>
        </Collapse>
    );
};

export default MasterAdminPlansCollapseFilterData;
