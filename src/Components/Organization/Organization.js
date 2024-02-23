import React from "react";
import { useState, useMemo, useEffect, useRef } from "react";
import axios from "axios";
import { apikey } from "../../ApiData/apidata";
import Navbar from "../Navbar/Navbar";
import nodata from "../../Assests/Images/nodata.jpg";
import "./Organization.scss";
import Sidebar from "../Sidebar/Sidebar";
const Organization = () => {
  const [allData, setAllData] = useState([]);

  // GET
  useEffect(() => {
    axios({
      method: "get",
      url: apikey + "/organizations",
    })
      .then((response) => {
        setAllData(response.data);
        console.log(response.data, "res");
      })
      .catch((error) => {
        console.log(error, "err");
      });
  }, []);
  return (
    <div className="organization_page_main_wrap">
      <Navbar />
      <Sidebar />

      <div className="row your-order-inner">
        <div class="col-sm-7 col-auto">
          <h4 class="page-title">Organization List</h4>
        </div>
      </div>
      <div class="row org-wrap">
        {allData.length > 0 ? (
          allData.map((store, index) => (
            <div key={index} className="col-md-4 mt-3">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div
                  className="card-body"
                  style={{
                    padding: "1.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="store-details-wrap">
                    <p className="store-desc">
                      <b>Organization Name : </b> {store.name}
                    </p>
                    <p className="store-desc">
                      <b>Description : </b> {store.description}
                    </p>

                    <p className="store-desc">
                      <b>Location : </b> {store.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <img src={nodata} className="no_data" alt="No Data"></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default Organization;
