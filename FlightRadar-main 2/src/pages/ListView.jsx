import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const ListView = ({ openModal }) => {
  const store = useSelector((store) => store);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemOffset, setItemOffset] = useState(0);

  // Page-related constants
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const filteredFlights = store.flights.filter((flight) =>
    flight.code.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentItems = filteredFlights.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredFlights.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredFlights.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="list-page">
      <input
        type="text"
        placeholder="Search by code..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Queue Code</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Detail Information</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td>
                <button onClick={() => openModal(flight.id)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        className="pagination"
        pageCount={pageCount}
        nextLabel="Next"
        previousLabel="Previous"
        activeClassName="active"
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default ListView;
