import { useEffect, useState } from "react";
import Header from "./components/Header";
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions/flightActions";
import SideDetail from "./components/SideDetail";

function App() {
  const [showMapView, setShowMapView] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch flights when the component mounts
    dispatch(getFlights());
  }, []);

  // Open the modal with details for a specific flight
  const openModal = (id) => {
    setDetailId(id);
    setShowDetail(true);
  };

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* View buttons for toggling between map and list views */}
      <div className="view-buttons">
        <button
          className={showMapView ? "active" : ""}
          onClick={() => setShowMapView(true)}
        >
          Map View
        </button>
        <button
          className={!showMapView ? "active" : ""}
          onClick={() => setShowMapView(false)}
        >
          List View
        </button>
      </div>

      {/* Conditional rendering based on the selected view */}
      {showMapView ? <MapView openModal={openModal} /> : <ListView openModal={openModal} />}

      {/* Display SideDetail component when showDetail is true */}
      {showDetail && <SideDetail detailId={detailId} setShowDetail={setShowDetail} />}
    </>
  );
}

export default App;
