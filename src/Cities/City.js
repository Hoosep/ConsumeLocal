import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";

// Own components
import LoadingLayout from "../Layouts/LoadingLayout";
import MapCity from "../Map/MapCity";
import ListBusiness from "./ListBusiness";

// Services
import { BusinessAPI } from "../Services/Business";

const City = props => {
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
            {
              mobile ? (
                <Col xs={24} className="px-3">
                  <Link to={`/cities/${city}/map`}>
                    <Button block className="font-weight-bold">
                      MOSTRAR MAPA
                    </Button>
                  </Link>
                </Col>
              ) : null
            }
            <Col xs={24} md={12} style={{height: "100vh"}} id="mapCity" className="d-none d-md-block">
              <MapCity markers={datasource} city={city} />
            </Col>
            <Col xs={24} md={12}>
              <ListBusiness data={datasource} city={city} />
            </Col>
          </Row>
        ) : <LoadingLayout text="Buscando información"/>
      }
    </Fragment>
  );
}

export default City;