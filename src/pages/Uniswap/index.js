import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Media, Table } from "reactstrap";
import { Link } from "react-router-dom";

//import Charts
import StackedColumnChart from "../Dashboard/StackedColumnChart";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components


//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//i18n
import { withNamespaces } from 'react-i18next';

 const Uniswap = (props) => {

     const [modal, setmodal] = useState(false);
     const [price, setPrice] = useState(false);
     const [marketCap, setMarketCap] = useState(false);
     const [volume, setVolume] = useState(false);
 
     const requestAPI = "https://api.coingecko.com/api/v3/coins/uniswap?localization=false"
 
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
                 { title: "24h Volume", iconClass: "bx-purchase-tag-alt", description: formatterEvilTwin.format(volume)}
             ];
         const email = [
                { title: "Week", linkto: "#", isActive: false },
                { title: "Month", linkto: "#", isActive: false },
                { title: "Year", linkto: "#", isActive: true }
            ];

          return (
              <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumb */}
                        <Breadcrumbs title={props.t('Dashboard')} breadcrumbItem={props.t('Uniswap')} />

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
                                                        </Media>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>

                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4 float-sm-left">
                                            Email Sent
                                        </CardTitle>
                                        <div className="float-sm-right">
                                            <ul className="nav nav-pills">
                                                {
                                                    email.map((mail, key) =>
                                                        <li className="nav-item" key={"_li_" + key}>
                                                            <Link className={mail.isActive ? "nav-link active" : "nav-link"} to={mail.linkto}>{mail.title}</Link>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                        <div className="clearfix"></div>
                                        <StackedColumnChart />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                       

                        
                    </Container>
                </div>
                <Modal isOpen={modal} role="dialog" autoFocus={true} centered={true} className="exampleModal" tabindex="-1" toggle={() => { setmodal(!modal); }}>
                    <div className="modal-content">
                        <ModalHeader toggle={() => { setmodal(!modal); }}>
                            Order Details
                        </ModalHeader >
                        <ModalBody>
                            <p className="mb-2">Product id: <span className="text-primary">#SK2540</span></p>
                            <p className="mb-4">Billing Name: <span className="text-primary">Neal Matthews</span></p>

                            <div className="table-responsive">
                                <Table className="table table-centered table-nowrap">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                <div>
                                                    <img src={modalimage1} alt="" className="avatar-sm" />
                                                </div>
                                            </th>
                                            <td>
                                                <div>
                                                    <h5 className="text-truncate font-size-14">Wireless Headphone (Black)</h5>
                                                    <p className="text-muted mb-0">$ 225 x 1</p>
                                                </div>
                                            </td>
                                            <td>$ 255</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                <div>
                                                    <img src={modalimage2} alt="" className="avatar-sm" />
                                                </div>
                                            </th>
                                            <td>
                                                <div>
                                                    <h5 className="text-truncate font-size-14">Hoodie (Blue)</h5>
                                                    <p className="text-muted mb-0">$ 145 x 1</p>
                                                </div>
                                            </td>
                                            <td>$ 145</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Sub Total:</h6>
                                            </td>
                                            <td>$ 400</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Shipping:</h6>
                                            </td>
                                            <td>Free</td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <h6 className="m-0 text-right">Total:</h6>
                                            </td>
                                            <td>$ 400</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="secondary" onClick={() => { setmodal(!modal); }}>Close</Button>
                        </ModalFooter>
                    </div>
                </Modal>
            </React.Fragment>
          );
        }

export default withNamespaces()(Uniswap);