import { useAppSelector } from '../../../../ReduxToolkit/Hooks';
import { Card, CardBody, Col, Collapse, Input, Row } from 'reactstrap';

const CollapseFilterData = ({ onFilterChange }: any) => {
    const { filterToggle } = useAppSelector((state) => state.product);

    const filtersData = [
        {
            name: "API's Name",
            options: [
                "Get Seasons", "All Seasons", "Get Season Competitions", "Get Competitions",
                "Competition Overview", "Competition Matches", "Competition Teams", 
                "Competition Standings", "Matches", "Match Scorecard", "Match Details", 
                "Match Squads", "Live Match", "Match Fantasy Point", "Match Squad Fantasy", 
                "Match Innings Commentary", "Match Statistics", "Find All Teams", 
                "Team Matches", "Get All Players", "Player Statistic", "Player Profile", 
                "ICC Rankings"
            ],
        },
        {
            name: "API Url",
            options: [
                "/v1/seasons", "/v1/allseasons", "/v1/seasons/competitions/", "/v1/competitions",
                "/v1/competition-overview/", "/v1/competitions/matches/", "/v1/competitions/teams/",
                "/v1/competitions/standings/", "/v1/matches", "/v1/matches/scorecard/", 
                "/v1/matches/details/", "/v1/matches/squads/", "/v1/matches/live/", 
                "/v1/matches/fantasypoint/", "/v1/matches/competitions/squads//", 
                "/v1/matches/innings/commentary//", "/v1/matches/statistics/", "/v1/teams", 
                "/v1/teams/matches/", "/v1/players", "/v1/players/statistic/", 
                "/v1/players/profile/", "/v1/iccranking"
            ],
        },
        {
            name: "Status",
            options: ["Success", "Failure"],
        },
    ];

    const handleFilterChange = (event: any, filterName: any) => {
        const { value } = event.target;
        let filterKey = '';

        switch (filterName) {
            case "API's Name":
                filterKey = 'apiName';
                break;
            case 'API Url':
                filterKey = 'apiUrl';
                break;
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

export default CollapseFilterData;
