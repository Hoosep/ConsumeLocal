import React, { useEffect, useState, Fragment } from "react";
import { Row, Col, Button } from "antd";

// Own components
import LoadingLayout from "../Layouts/LoadingLayout";
import MapCity from "../Map/MapCity";
import ListBusiness from "./ListBusiness";

// Services
import { BusinessAPI } from "../Services/Business";

const FullMapCity = props => {
  const { match } = props;
  const { city } = match.params;
  const [datasource, setDatasource] = useState(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fetchData = async(city) => {
      let response = await BusinessAPI.getBusinessByCity(city);
      setDatasource(response);
    };
    setMobile(window.innerWidth < 426);
    fetchData(city);
  }, []);


  return (
    <Fragment>
      {
        datasource ? (
          <Row type="flex">
            <Col xs={24} md={12} style={{height: "100vh"}}>
              <MapCity markers={datasource} city={city} />
            </Col>
          </Row>
        ) : <LoadingLayout text="Cargando mapa" dots={true}/>
      }
    </Fragment>
  );
}

export default FullMapCity;