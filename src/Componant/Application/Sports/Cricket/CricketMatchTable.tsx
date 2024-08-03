import DataTable, { TableColumn } from 'react-data-table-component';
import { useState } from 'react';
import { Tooltip } from 'reactstrap';

type CricketData = {
  id: number;
  title: string;
  short_title: string;
  status_str: number;
  date_start_ist: string;
  date_end_ist: string;
  venue: {
    name: string,
    location: string
  };
  location: number;
};

interface CricketMatchTableProps {
  cricketData: any;
  currentPage: number;
  totalRows: number;
  handlePageChange: (page: number) => void;
}

const CricketMatchTable = ({ cricketData, currentPage, totalRows, handlePageChange }: CricketMatchTableProps) => {
  const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});

  const toggleTooltip = (id: any) => {
    setTooltipOpen((prevState: any) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${strMinutes} ${ampm}`;
  };

  const truncatedName = (name: any) => {
    const isLongText = name.length > 20;
    return isLongText ? `${name.substring(0, 20)}...` : name;
  }

  const CricketDataColumn: TableColumn<CricketData>[] = [
    {
      name: "Match",
      cell: (row) => (
        <>
          <p id={`match-key-${row.id}`}>{truncatedName(row.short_title)}</p>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[`match-key-${row.id}`]}
            target={`match-key-${row.id}`}
            toggle={() => toggleTooltip(`match-key-${row.id}`)}
          >
            {row.title}
          </Tooltip>
        </>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Venue",
      cell: (row) => (
        <>
          <span id={`venue-key-${row.id}`} className='text-center'>{truncatedName(row?.venue?.name)}</span>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[`venue-key-${row.id}`]}
            target={`venue-key-${row.id}`}
            toggle={() => toggleTooltip(`venue-key-${row.id}`)}
          >
            {row?.venue?.name}
          </Tooltip>
        </>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Location",
      cell: (row) => (
        <>
          <span id={`location-key-${row.id}`} className='text-center'>{truncatedName(row.venue.location)}</span>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[`location-key-${row.id}`]}
            target={`location-key-${row.id}`}
            toggle={() => toggleTooltip(`location-key-${row.id}`)}
          >
            {row.venue.location}
          </Tooltip>
        </>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Start Date(IST)",
      selector: (row) => row.date_start_ist.split("T")[0],
      cell: (row) => (
        <>
          <span id={`start_date-key-${row.id}`} className='text-center'>{truncatedName(row.date_start_ist.split("T")[0])}</span>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[`start_date-key-${row.id}`]}
            target={`start_date-key-${row.id}`}
            toggle={() => toggleTooltip(`start_date-key-${row.id}`)}
          >
            {row.date_start_ist.split("T")[0]}
          </Tooltip>
        </>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "End Date(IST)",
      cell: (row) => (
        <>
          <span id={`end_date-key-${row.id}`} className='text-center'>{truncatedName(row.date_end_ist.split("T")[0])}</span>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[`end_date-key-${row.id}`]}
            target={`end_date-key-${row.id}`}
            toggle={() => toggleTooltip(`end_date-key-${row.id}`)}
          >
            {row.date_end_ist.split("T")[0]}
          </Tooltip>
        </>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Start Time(IST)",
      selector: (row) => formatTime(row.date_start_ist),
      cell: (row) => (
        <>
          <span id={`start_time-key-${row.id}`} className='text-center'>{formatTime(row.date_start_ist)}</span>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[`start_time-key-${row.id}`]}
            target={`start_time-key-${row.id}`}
            toggle={() => toggleTooltip(`start_time-key-${row.id}`)}
          >
            {formatTime(row.date_start_ist)}
          </Tooltip>
        </>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "End Time(IST)",
      selector: (row) => formatTime(row.date_end_ist),
      cell: (row) => (
        <>
          <span id={`end_time-key-${row.id}`} className='text-center'>{formatTime(row.date_end_ist)}</span>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen[`end_time-key-${row.id}`]}
            target={`end_time-key-${row.id}`}
            toggle={() => toggleTooltip(`end_time-key-${row.id}`)}
          >
            {formatTime(row.date_end_ist)}
          </Tooltip>
        </>
      ),
      sortable: true,
      center: true,
    },
  ];

  console.log("cricketData", cricketData);

  return (
    <div className="order-history table-responsive">
      {
        cricketData?.isLoading ? <p>Loading...</p> :
          cricketData?.data && cricketData?.data.length > 0 &&
          <DataTable
            data={cricketData?.data}
            columns={CricketDataColumn}
            className="dataTables_wrapper theme-scrollbar no-footer"
            highlightOnHover
            noHeader
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangePage={handlePageChange}
            paginationDefaultPage={currentPage}
          />
      }
    </div>
  )
}

export default CricketMatchTable;
