import axios from "axios";
import React, { useEffect, useState } from "react";
import { detailOptions } from "./../helpers/contants/";

const SideDetail = ({ detailId, setShowDetail }) => {
  // console.log('detail page', detailId)

  const [detailInfo, setDetailInfo] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        detailOptions
      )
      .then((res) => setDetailInfo(res.data))
      .catch((error) => console.log(error));
  }, [detailId]);

  console.log(detailInfo);

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close">
          <span onClick={() => setShowDetail(false)}>X</span>
        </p>

        {!detailInfo ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>{detailInfo.aircraft.model.text}</h2>
            <h2>{detailInfo.aircraft.model.code}</h2>
            <p>Registration: {detailInfo.aircraft.registration}</p>
            <img src={detailInfo.aircraft.images.large[0].src} alt="" />
            <p>Airline: {detailInfo.airline.name}</p>

            <p>
              <span>Departure:</span>
              <a href={detailInfo.airport.origin.website}>
                {detailInfo.airport.origin.name}
              </a>
            </p>

            <p>
              <span>Destination:</span>
              <a href={detailInfo.airport.destination.website}>
                {detailInfo.airport.destination.name}
              </a>
            </p>

            <p>
              <span>Status: </span>
              <span className="status">{detailInfo.status.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SideDetail;
