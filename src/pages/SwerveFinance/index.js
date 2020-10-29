import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Media } from "reactstrap";

//Import Breadcrumb
// import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';

//import Swerve specific data components
import TVL from "./tvl";
import VOL from "./vol";
import Distribution from "./distribution";

const SwerveFinance = (props) => {

    //State variables and API resource
    const [price, setPrice] = useState(false);
    const [marketCap, setMarketCap] = useState(false);
    const [volume, setVolume] = useState(false);
    const requestAPI = "https://api.coingecko.com/api/v3/coins/swerve-dao?localization=false"

    
    useEffect( () => {
        fetch(requestAPI)
        .then(res => res.json())
        .then(data => organizeData(data))
    })

    const organizeData = (data) => {
        const marketData = data.market_data;
        setPrice(marketData.current_price.usd);
        setMarketCap(marketData.market_cap.usd)
        setVolume(marketData.total_volume.usd)
    }
    
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })

    const formatterEvilTwin = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      })

    const reports = [
                { title: "Price", description: formatter.format(price) },
                { title: "Market Cap", description: formatterEvilTwin.format(marketCap) },
                { title: "24h Volume", description: formatterEvilTwin.format(volume) }
    ];

          return (
              <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <h4>Swerve Finance</h4>
                        <Row>
                            <Col xl="12">
                                <Card>                                
                                    <CardBody>
                                        <TVL />
                                    </CardBody>
                                </Card>
                                <Row>
                                    {reports.map((report, key) =>
                                            <Col md="4" key={"_col_" + key}>
                                                <Card className="mini-stats-wid">
                                                    <CardBody>
                                                        <Media>
                                                            <Media body>
                                                                <p className="text-muted font-weight-medium">{report.title}</p>
                                                                <h4 className="mb-0">{report.description}</h4>
                                                            </Media>
                                                        </Media>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                                    <Card>
                                        <CardBody>
                                            <VOL />
                                        </CardBody>
                                    </Card>
                                <Card>
                                    <CardBody>
                                        <Distribution />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
}

export default withNamespaces()(SwerveFinance);