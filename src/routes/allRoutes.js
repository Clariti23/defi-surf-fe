import React from "react";
import { Redirect } from "react-router-dom";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

//Sub-Dashboards
import SwerveFinance from "../pages/SwerveFinance/index";
import Uniswap from "../pages/Uniswap/index";
import Plasm from "../pages/Plasm/index";


const userRoutes = [
	{ path: "/dashboard", component: Dashboard },
	{ path: "/swerve.finance", component: SwerveFinance},
	{ path: "/uniswap", component: Uniswap},
	{ path: "/plasm", component: Plasm},

	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];


export { userRoutes };