import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Media, Table } from "reactstrap";
import { Link } from "react-router-dom";
import StackedColumnChart from "../Dashboard/StackedColumnChart";
import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
//i18n
import { withNamespaces } from 'react-i18next';

//import Swerve TVL component
import TVL from "./tvl"


const SwerveFinance = (props) => {
    const [modal, setmodal] = useState(false);
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
                { title: "Price", iconClass: "bx-copy-alt", description: formatter.format(price) },
                { title: "Market Cap", iconClass: "bx-archive-in", description: formatterEvilTwin.format(marketCap) },
                { title: "24h Volume", iconClass: "bx-purchase-tag-alt", description: formatterEvilTwin.format(volume) }
            ];

          return (
              <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                        <Breadcrumbs title={props.t('Dashboard')} breadcrumbItem={props.t('Swerve Finance')} />

                        <Row>
                            
                            <Col xl="8">
                                <Row>
                                    {/* Reports Render */}
                                    {
                                        reports.map((report, key) =>
                                            <Col md="4" key={"_col_" + key}>
                                                <Card className="mini-stats-wid">
                                                    <CardBody>
                                                        <Media>
                                                            <Media body>
                                                                <p className="text-muted font-weight-medium">{report.title}</p>
                                                                <h4 className="mb-0">{report.description}</h4>
                                                            </Media>
                                                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                                                <span className="avatar-title">
                                                                    <i className={"bx " + report.iconClass + " font-size-24"}></i>
                                                                </span>
                                                            </div>
                                                        </Media>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                                <Card>
                                        <CardTitle >
                                            TVL
                                        </CardTitle>
                                    <TVL />
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
}

export default withNamespaces()(SwerveFinance);