import "./App.css";

import VendorForm from "./Pages/VendorForm";

import Login from "./Pages/Login/Login";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { baseurl } from "./config/apiConfig";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "./Component/Navbar/Navbar";
import Approval from "./Pages/Approval/Approval";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import View from "./Pages/View/View";
import Mdmview from "./Pages/View/Mdmview";
setBasePath("https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.87/dist/");

function App() {
	let navigate = useNavigate();
	useEffect(() => {
		//verifyToken();
	}, []);
	const verifyToken = () => {
		if (!localStorage.getItem("token")) {
			localStorage.clear();
			localStorage.removeItem("employee_id");
			localStorage.removeItem("token");
			localStorage.removeItem("fullname");
			localStorage.removeItem("email");
			navigate("/login");
			return;
		}
		axios({
			method: "post",
			url: `${baseurl.base_url}/mhere/verify-token`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then(function (response) {})
			.catch(function (err) {
				console.log(err);
				localStorage.clear();
				localStorage.removeItem("employee_id");
				localStorage.removeItem("token");
				localStorage.removeItem("fullname");
				localStorage.removeItem("email");
				navigate("/login");
			});
	};
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnMount: false,
				retry: false,
				refetchOnReconnect: false,
			},
		},
	});

	const Dashboard = () => (
		<div>
			<Navbar />
			<div>
				<Outlet />
			</div>
		</div>
	);
	const Auth = () => (
		<div>
			<Outlet />
		</div>
	);

	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				<Routes>
					<Route element={<Dashboard />}>
						<Route exact path="/vendor-form" element={localStorage.getItem("token") ? (JSON.parse(localStorage.getItem('module_access'))?.cvm_vendor_form ? <VendorForm /> :  <Navigate replace to="/view" /> )  : <Navigate replace to="/login" />}></Route>
						<Route exact path="/approval" element={localStorage.getItem("token") ? <Approval /> : <Navigate replace to="/login" />}></Route>
						<Route exact path="/view" element={localStorage.getItem("token") ? <View /> : <Navigate replace to="/login" />}></Route>
						<Route exact path="/" element={localStorage.getItem("token") ? <View /> : <Navigate replace to="/login" />}></Route>
						<Route exact path="/mdm-view" element={localStorage.getItem("token") ? JSON.parse(localStorage.getItem('module_access'))?.cvm_mdm_view ? <Mdmview /> :  <Navigate replace to="/view" /> : <Navigate replace to="/login" />}></Route>
					</Route>
					<Route element={<Auth />}>
						<Route exact path="/login" element={<Login />} />
					</Route>
				</Routes>
				<ToastContainer limit={1} position="top-right" autoClose={2000} hideProgressBar={true} closeOnClick pauseOnHover={true} draggable theme="colored" />
			</div>
		</QueryClientProvider>
	);
}

export default App;
