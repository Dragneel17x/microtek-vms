import React, { useEffect, useState } from "react";
import { SlButton, SlCard, SlDivider, SlDropdown, SlDialog, SlIcon, SlInput, SlMenu, SlMenuItem, SlSelect, SlCheckbox } from "@shoelace-style/shoelace/dist/react";
import "./Form.css";
import { useQuery } from "react-query";
import axios, { Axios } from "axios";
import { useFetcher } from "react-router-dom";
import { baseurl } from "../config/apiConfig";
import { toast } from "react-toastify";

function Form() {
	const [countryCodes, setCountryCodes] = useState();
	const [stateList, setStateList] = useState();
	const [transportationZone, setTransportationZone] = useState();
	const [selectedCountry, setSelectedCountry] = useState("India");
	const [companyCode, setCompanyCode] = useState();
	const [reconAcc, setReconAcc] = useState();
	const [payTerm, setPayTerm] = useState();
	const [salesOrg, setSalesOrg] = useState();
	const [sbu_type, setSbu_type] = useState();
	const [distChannel, setDistChannel] = useState();
	const [division, setDivision] = useState();
	const [salesOfficeDistrict, setSalesOfficeDistrict] = useState();
	const [customerAccGrp, setCustomerAccGrp] = useState();
	const [customerGrp, setCustomerGrp] = useState();
	const [salesDistrict, setSalesDistrict] = useState();
	const [open, setOpen] = useState(false);
	const [confirmDialog, setConfirmDialog] = useState(false);
	const [declarationCheck, setDeclarationCheck] = useState(false);
	const [formData, setFormData] = useState({
		cust_group: "",
		cust_name: "",
		cust_name_op1: "",
		cust_address: "",
		cust_address_op1: "",
		cust_address_op2: "",
		cust_address_op3: "",
		district: "",
		state_code: "",
		city: "",
		postal_code: "",
		country: "India",
		company_code: "",
		co_person: "",
		transportation_zone: "",
		mobile_no: "",
		email_id: "",
		company_code: "",
		recon_acc: "",
		pay_term: "",
		sales_org: "",
		dist_channel: "",
		division: "",
		sales_district: "",
		customer_acc_group: "",
		sales_office: "",
		gstin: "",
		tan_number: "",
		pan: "",
		employee_id: localStorage.getItem("employee_id"),
		blank_cheque: "",
		GST_Image: "",
		PAN_Image: "",
		declaration: "",
		DAPF: "",
		sbu_type: "",
	});

	const [pincodeMapping, setPincodeMapping] = useState([]);

	function getPincodeDetails(pincode) {
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-pincode-data`,
			headers: {
				"Content-type": "application/json",
			},
			data: { pincode: pincode },
		})
			.then((res) => {
				console.log(res.data.data);
				setFormData({
					...formData,
					postal_code: pincode,
					city: res.data.data.city,
					district: res.data.data.district,
					state_code: res.data.data.state
				});
				if (formData.country != "India") {
					setError({ ...error, ["postal_code"]: false });
					return;
				}
				setError({ ...error, ["postal_code"]: true });
			})
			.catch((err) => {
				console.log(err);
				setFormData({
					...formData,
					postal_code: pincode,
					city: "",
					district: "",
				});
				if (formData.country != "India") {
					setError({ ...error, ["postal_code"]: true });
					return;
				}
				console.log({ "invalid pincode": pincode });
				setError({ ...error, ["postal_code"]: false });
			});
	}


	function handleSubmit(event) {
		event.preventDefault();
		/* if(!(formData.DAPF && formData.GST_Image && formData.PAN_Image && formData.blank_cheque)){
		  toast.error("you must uploads all Files in upload Section");
		  return;
		} */
		setConfirmDialog(true);
	}

	useQuery("get-customer-grp", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-customer-grp`,
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((res) => {
				console.log(res.data.data);
				setCustomerGrp(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-country-codes", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-country-codes`,
			headers: {
				"Content-type": "application/json",
			},
		})
			.then((res) => {
				console.log(res);
				setCountryCodes(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-tz-zone", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-tz-zone`,
			header: {
				"Content-type": "application/JSON",
			},
		})
			.then((res) => {
				console.log(res);
				setTransportationZone(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-company-code", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-company-code`,
			header: {
				"Content-type": "application/JSON",
			},
		})
			.then((res) => {
				console.log(res);
				setCompanyCode(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-recon-acc", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-recon-acc`,
			header: { Content: "application/JSON" },
		})
			.then((res) => {
				console.log(res);
				setReconAcc(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-pay-term", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-pay-term`,
			header: { Content: "application/JSON" },
		})
			.then((res) => {
				console.log(res);
				setPayTerm(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-sales-org", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-sales-org`,
			header: { Content: "application/JSON" },
		})
			.then((res) => {
				console.log(res);
				setSalesOrg(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-sbu-type", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-sbu-type`,
			header: { Content: "application/JSON" },
		})
			.then((res) => {
				console.log(res);
				setSbu_type(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-dist-channel", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-dist-channel`,
			header: { content: "application/JSON" },
		})
			.then((res) => {
				console.log(res);
				setDistChannel(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-division", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-division`,
			header: { content: "application/JSON" },
		})
			.then((res) => {
				console.log(res);
				setDivision(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-sales-office-district", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-sales-office-district`,
			header: { content: "application/JSON" },
		})
			.then((res) => {
				console.log(res);
				setSalesOfficeDistrict(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-customer-acc-grp", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-customer-acc-grp`,
			header: { content: "application/JSON" },
		})
			.then((res) => {
				console.log(res);
				setCustomerAccGrp(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-sales-district", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-sales-district`,
			header: { content: "application/JSON" },
		})
			.then((res) => {
				console.log(res);
				setSalesDistrict(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});
	useQuery("get-pincode-mapping", () => {
		axios({
			method: "get",
			url: `${baseurl.base_url}/cvm/get-pincode-mapping`,
			header: {
				"Content-type": "application/JSON",
			},
		})
			.then((res) => {
				console.log(res);
				setPincodeMapping(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	useEffect(() => {
		if (selectedCountry) {
			getState();
		}
	}, [selectedCountry]);

	function getState() {
		const data = {
			country: selectedCountry,
		};
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-state-list`,
			header: {
				"Content-type": "application/JSON",
			},
			data,
		})
			.then((res) => {
				console.log(res);
				setStateList(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const [error, setError] = useState({
		co_person: true,
		cust_name: true,
		cust_name_op1: true,
		postal_code: true,
		city: true,
		ind_cust_num: true,
		local_cust_num: true,
		intl_cust_num: true,
		gstin: true,
		pan: true,
		tan_number: true
	});

	const regexp = {
		co_person: /^([A-Z]|[a-z]| ){0,40}$/,
		cust_name: /^([A-Z]|[a-z]| ){0,40}$/,
		cust_name_op1: /^([A-Z]|[a-z]| ){0,40}$/,
		postal_code: /^[0-9]{0,40}$/,
		city: /^([A-Z]|[a-z]| ){0,40}$/,
		ind_cust_num: /^[0-9]{10}$/,
		local_cust_num: /^[0-9]{10}$/,
		intl_cust_num: /^[0-9]{0,40}$/,
		tan_number: /^.{10}$/,
		gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]([0-9]|[A-Z])Z([0-9]|[A-Z])$/,
		pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
	};

	function validCheck(name, value) {
		if (!regexp[name].test(value)) {
			setError({ ...error, [name]: false });
			return;
		}

		setError({ ...error, [name]: true });
	}
	function sendFormData() {
		const formDatas = new FormData();
		Object.keys(formData).forEach((key) => formDatas.append(key, formData[key]));
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/post-form-data`,
			header: {
				"Content-type": "multipart/form-data",
			},
			data: formDatas,
		})
			.then((res) => {
				console.log(res);
				toast.success("Form Submitted Successfully");
				setFormData({
					cust_group: "",
					cust_name: "",
					cust_name_op1: "",
					cust_address: "",
					cust_address_op1: "",
					cust_address_op2: "",
					cust_address_op3: "",
					district: "",
					state_code: "",
					city: "",
					postal_code: "",
					country: "India",
					company_code: "",
					co_person: "",
					transportation_zone: "",
					mobile_no: "",
					email_id: "",
					company_code: "",
					recon_acc: "",
					pay_term: "",
					sales_org: "",
					dist_channel: "",
					division: "",
					sales_district: "",
					customer_acc_group: "",
					sales_office: "",
					gstin: "",
					tan_number: "",
					pan: "",
					employee_id: localStorage.getItem("employee_id"),
					blank_cheque: "",
					GST_Image: "",
					PAN_Image: "",
					declaration: "",
					DAPF: "",
					sbu_type: "",
				})
			})
			.catch((err) => {
				console.log(err);
				if (err?.response?.data?.message) {
					toast.error(err?.response?.data?.message)
				}
				else {
					toast.error("Some Un-Expected Error Occured \n Please Try After Some Time");
				}
			});
	}
	return (
		<div className="content_main">
			<form onSubmit={handleSubmit} className="form-main">
				{/*         Customer Group Mapping */}
				<SlSelect
					required
					label="Select Customer Group"
					value = {formData.cust_group}
					onSlChange={(e) => {
						setFormData({ ...formData, cust_group: e.target.value });
					}}
				>
					{customerGrp?.map((item, i) => {
						return (
							<SlMenuItem key={`cg${i}`} value={item.customer_group}>
								{item.customer_group}
							</SlMenuItem>
						);
					})}
				</SlSelect>
				{/*         CUSTOMER NAME */}
				<div className="input-field-main customer_name">
					<SlInput
						className="helptext"
						required
						pattern="^([A-Z]|[a-z]| ){0,40}$"
						name="cust_name"
						helpText={error.cust_name ? "" : "wrong entry"}
						value={formData.cust_name}
						maxlength={40}
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, cust_name: e.target.value });
						}}
						label="Customer Name"
					/>
					<SlInput
						maxlength={40}
						className="helptext"
						pattern="^([A-Z]|[a-z]| ){0,40}$"
						name="cust_name_op1"
						helpText={error.cust_name_op1 ? "" : "wrong entry"}
						value={formData.cust_name_op1}
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, cust_name_op1: e.target.value });
						}}
						label="Customer Name Optional"
					/>
				</div>
				<div className="input-field-main customer_name">
					<SlInput
						required
						value={formData.cust_address}
						onSlInput={(e) => {
							setFormData({ ...formData, cust_address: e.target.value });
						}}
						label="Customer Address"
					/>
					<SlInput
					value={formData.cust_address_op1}
						onSlInput={(e) => {
							setFormData({ ...formData, cust_address_op1: e.target.value });
						}}
						label="Address Optional 1"
					/>
					<SlInput
					value={formData.cust_address_op2}
						onSlInput={(e) => {
							setFormData({ ...formData, cust_address_op2: e.target.value });
						}}
						label="Address optional 2"
					/>
					<SlInput
					value={formData.cust_address_op3}
						onSlInput={(e) => {
							setFormData({ ...formData, cust_address_op3: e.target.value });
						}}
						label="Address optional 3"
					/>

					{/*District*/}
					<SlInput
						required
						disabled={formData.country == "India" ? true : false}
						value={formData.district}
						onSlInput={(e) => {
							setFormData({ ...formData, district: e.target.value });
						}}
						label="District"
					/>

					{/*City*/}
					<SlInput
						className="helptext"
						required
						disabled={formData.country == "India" ? true : false}
						name="city"
						helpText={error.city == true ? "" : "wrong entry"}
						value={formData.city}
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, city: e.target.value });
						}}
						label="City"
					/>

					{/*Postal Code*/}
					<SlInput
						className="helptext"
						pattern="^[0-9]{0,40}$"
						name="postal_code"
						required
						helpText={error.postal_code == true ? "" : "wrong entry"}
						value={formData.postal_code}
						onSlBlur={(e) => {
							getPincodeDetails(e.target.value);
						}}
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, postal_code: e.target.value });
							//getPincodeDetails(e.target.value)
							/* let pinData = pincodeMapping.filter(item=>{return(item.pincode == e.target.value)}) */

							/* if(pinData?.length){
				setFormData({ ...formData, postal_code: e.target.value, city: pinData[0].city, district: pinData[0].district });
				return
			  }
			  else{
				setFormData({ ...formData, postal_code: e.target.value, city: "", district: "" });
				console.log({"invalid pincode" : e.target.value});
				setError({ ...error, [e.target.name]: false });
			  } */
						}}
						label="Postal Code"
					/>
					{/*           Country */}

					{formData.cust_group == "ZEXP - export customer" ? (
						<SlSelect
							required
							label="Select Country"
							value={formData.country}
							disabled={false}
							onSlInput={(e) => {
								setSelectedCountry(e.target.value);
								setFormData({ ...formData, country: e.target.value });
							}}
						>
							{countryCodes?.map((item, i) => {
								return (
									<SlMenuItem key={`${i}c`} value={item.country}>
										{item.country}
									</SlMenuItem>
								);
							})}
						</SlSelect>
					) : (
						<SlSelect
							required
							label="Select Country"
							disabled={true}
							value={formData.country}
							onSlInput={(e) => {
								setSelectedCountry(e.target.value);
								setFormData({ ...formData, country: e.target.value });
							}}
						>
							{countryCodes?.map((item, i) => {
								return (
									<SlMenuItem key={`${i}c`} value={item.country}>
										{item.country}
									</SlMenuItem>
								);
							})}
						</SlSelect>
					)}

					{/*                       State/Region Code */}

					{formData.cust_group == "ZEXP - export customer" ? (
						<SlSelect
							required
							disabled={false}
							label="Select Region/State Code"
							value={formData.state_code}
							onSlChange={(e) => {
								setFormData({ ...formData, state_code: e.target.value });
							}}
						>
							{stateList?.map((item, i) => {
								return (
									<SlMenuItem key={`sl${i}`} value={item.state}>
										{item.state}
									</SlMenuItem>
								);
							})}
						</SlSelect>
					) : (
						<SlSelect
							required
							disabled={true}
							label="Select Region/State Code"
							value={formData.state_code}
							onSlChange={(e) => {
								setFormData({ ...formData, state_code: e.target.value });
							}}
						>
							{stateList?.map((item, i) => {
								return (
									<SlMenuItem key={`sl${i}`} value={item.state}>
										{item.state}
									</SlMenuItem>
								);
							})}
						</SlSelect>
					)}
				</div>
				{/*C/O Person*/}
				<SlInput
					className="helptext"
					name="co_person"
					required
					pattern="^([A-Z]|[a-z]| ){0,40}$"
					helpText={error.co_person == true ? "" : "wrong entry"}
					value={formData.co_person}
					onSlInput={(e) => {
						validCheck(e.target.name, e.target.value);
						setFormData({ ...formData, co_person: e.target.value });
					}}
					label="C/O Person"
				/>

				{/* Transportation Zone Mapping */}

				{formData.cust_group != "ZEXP - export customer" ? (
					<SlSelect
						required
						value={formData.transportation_zone}
						label="Select Transportation Zone"
						onSlChange={(e) => {
							setFormData({ ...formData, transportation_zone: e.target.value });
						}}
					>
						{transportationZone?.map((item, i) => {
							return (
								<SlMenuItem key={`tz${i}`} value={item.transportation_zone}>
									{item.transportation_zone}
								</SlMenuItem>
							);
						})}
					</SlSelect>
				) : (
					""
				)}

				{/*         Mobile Number  */}

				{formData.cust_group == "ZINC - individual customer" ? (
					<SlInput
						required={false}
						pattern="^[0-9]{10}$"
						className="helptext"
						name="ind_cust_num"
						value={formData.mobile_no}
						maxlength={40}
						label="Mobile Number"
						helpText={error.ind_cust_num ? "" : "Wrong Entry"}
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, mobile_no: e.target.value });
						}}
					/>
				) : formData.cust_group == "ZEXP - export customer" ? (
					<SlInput
						required={true}
						maxlength={40}
						name="intl_cust_num"
						className="helptext"
						helpText={error.intl_cust_num ? " " : "wrong entry"}
						pattern="^[0-9]{0,40}$"
						value={formData.mobile_no}
						label="Mobile Number"
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, mobile_no: e.target.value });
						}}
					/>
				) : (
					<SlInput
						required={true}
						pattern="^[0-9]{10}$"
						className="helptext"
						name="ind_cust_num"
						helpText={error.ind_cust_num ? "" : "wrong entry"}
						maxlength={40}
						value={formData.mobile_no}
						label="Mobile Number"
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, mobile_no: e.target.value });
						}}
					/>
				)}

				{/*            email ID */}

				{formData.cust_group == "ZINC - individual customer" ? (
					<SlInput
						required={false}
						type="email"
						label="E-Mail ID"
						value={formData.email_id}
						onSlInput={(e) => {
							setFormData({ ...formData, email_id: e.target.value });
						}}
					/>
				) : (
					<SlInput
						required={true}
						type="email"
						label="E-Mail ID"
						value={formData.email_id}
						onSlInput={(e) => {
							setFormData({ ...formData, email_id: e.target.value });
						}}
					/>
				)}

				{/*                 Company Code Mapping */}

				<SlSelect
					required
					label="Company Code"
					value={formData.company_code}
					onSlChange={(e) => {
						setFormData({ ...formData, company_code: e.target.value });
					}}
				>
					{companyCode?.map((item, i) => {
						return (
							<SlMenuItem key={`cc${i}`} value={item.company_code}>
								{item.company_code}
							</SlMenuItem>
						);
					})}
				</SlSelect>
				{/*             Reconciliation Account mapping */}

				<SlSelect
					required
					label="Reconciliation A/C"
					value={formData.recon_acc}
					onSlChange={(e) => {
						setFormData({ ...formData, recon_acc: e.target.value });
					}}
				>
					{reconAcc?.map((item, i) => {
						return (
							<SlMenuItem key={`ra${i}`} value={item.reconciliation_account}>
								{item.reconciliation_account}
							</SlMenuItem>
						);
					})}
				</SlSelect>

				{/*             Pay Term Mapping */}

				<SlSelect
					required
					value={formData.pay_term}
					label="Pay Term"
					onSlChange={(e) => {
						setFormData({ ...formData, pay_term: e.target.value });
					}}
				>
					{payTerm?.map((item, i) => {
						return (
							<SlMenuItem key={`pt${i}`} value={item.pay_term}>
								{item.pay_term}
							</SlMenuItem>
						);
					})}
				</SlSelect>

				{/*             Sales Organization Mapping */}

				<SlSelect
					required
					value={formData.sales_org}
					label="Sales Organization"
					onSlChange={(e) => {
						setFormData({ ...formData, sales_org: e.target.value });
					}}
				>
					{salesOrg?.map((item, i) => {
						return (
							<SlMenuItem key={`so${i}`} value={item.sales_org}>
								{item.sales_org}
							</SlMenuItem>
						);
					})}
				</SlSelect>
				{/* SBU Types */}
				<SlSelect
					required
					label="SBU Types"
					value={formData.sbu_type}
					onSlChange={(e) => {
						setFormData({ ...formData, sbu_type: e.target.value });
					}}
				>
					{sbu_type?.map((item, i) => {
						return (
							<SlMenuItem key={`so${i}`} value={item.SBU_type}>
								{item.SBU_type}
							</SlMenuItem>
						);
					})}
				</SlSelect>
				{/*         Distribution channel Mapping */}

				<SlSelect
					required
					label="Distribution Channel"
					value={formData.dist_channel}
					onSlChange={(e) => {
						setFormData({ ...formData, dist_channel: e.target.value });
					}}
				>
					{distChannel?.map((item, i) => {
						return (
							<SlMenuItem key={`dcl${i}`} value={item.dist_channel}>
								{item.dist_channel}
							</SlMenuItem>
						);
					})}
				</SlSelect>

				{/*         Division Mapping */}

				<SlSelect
					required
					value={formData.division}
					label="Divison"
					onSlChange={(e) => {
						setFormData({ ...formData, division: e.target.value });
					}}
				>
					{division?.map((item, i) => {
						return (
							<SlMenuItem key={`divl${i}`} value={item.division}>
								{item.division}
							</SlMenuItem>
						);
					})}
				</SlSelect>

				{/*             Sales District Mapping */}

				<SlSelect
					required
					value={formData.sales_district}
					label="Sales District"
					onSlChange={(e) => {
						setFormData({ ...formData, sales_district: e.target.value });
					}}
				>
					{salesDistrict?.map((item, i) => {
						return (
							<SlMenuItem key={`dn${i}`} value={item.district_name}>
								{item.district_name}
							</SlMenuItem>
						);
					})}
				</SlSelect>

				{/*             Customer Account Group Mapping */}

				<SlSelect
					required
					value={formData.customer_acc_group}
					label="Customer Account Group"
					onSlChange={(e) => {
						setFormData({ ...formData, customer_acc_group: e.target.value });
					}}
				>
					{customerAccGrp?.map((item, i) => {
						return (
							<SlMenuItem key={`cag${i}`} value={item.customer_acc_group}>
								{item.customer_acc_group}
							</SlMenuItem>
						);
					})}
				</SlSelect>

				{/*             Sales Office Mapping */}

				<SlSelect
					required
					value={formData.sales_office}
					label="Sales Office and Delivery Plant"
					onSlChange={(e) => {
						setFormData({ ...formData, sales_office: e.target.value });
					}}
				>
					{salesOfficeDistrict?.map((item, i) => {
						return (
							<SlMenuItem key={`sol${i}`} value={item.sales_office}>
								{item.sales_office}
							</SlMenuItem>
						);
					})}
				</SlSelect>

				{/*           GSTIN input */}

				{formData.cust_group == "ZEXP - export customer" ? (
					""
				) : formData.cust_group == "ZINC - individual customer" || formData.cust_group == "ZSHP - goods recipient" ? (
					<SlInput
						label="GSTIN"
						required={false}
						pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]([0-9]|[A-Z])Z([0-9]|[A-Z])$"
						className="helptext"
						name="gstin"
						helpText={error.gstin ? "" : "wrong Entry"}
						value={formData.gstin}
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, gstin: e.target.value, pan: e.target.value?.slice(2, 12) });
						}}
					/>
				) : (
					<SlInput
						label="GSTIN"
						pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]([0-9]|[A-Z])Z([0-9]|[A-Z])$"
						required
						className="helptext"
						name="gstin"
						helpText={error.gstin ? "" : "wrong Entry"}
						value={formData.gstin}
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, gstin: e.target.value, pan: e.target.value?.slice(2, 12) });
							console.log(formData.gstin);
						}}
					/>
				)}

				{/* 				TAN Number Input  */}

				{formData.cust_group == "ZEXP - export customer" ? ("") : (

					<SlInput
						label="TAN"
						required={formData.gstin ? true : false}
						pattern="^.{10}$"
						helpText={error.tan_number ? "" : "wrong Entry"}
						className="helptext"
						name="tan_number"
						value={formData.tan_number}
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, tan_number: e.target.value });
						}}
					/>)}



				{/*           PAN Number */}
				{formData.cust_group == "ZEXP - export customer" ? (
					""
				) : formData.cust_group != "ZINC - individual customer" ? formData.cust_group == "ZSHP - goods recipient" ? (
					<SlInput
						label="PAN Number"
						required={true}
						className="helptext"
						name="pan"
						disabled={false}
						value={formData.pan}
						helpText={error.pan ? "" : "Wrong Entry"}
						pattern="^[A-Z]{5}[0-9]{4}[A-Z]$"
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, pan: e.target.value });
						}}
					/>
				) :
					(<SlInput
						label="PAN Number"
						required={true}
						className="helptext"
						name="pan"
						disabled={true}
						value={formData.pan}
						helpText={error.pan ? "" : "Wrong Entry"}
						pattern="^[A-Z]{5}[0-9]{4}[A-Z]$"
						onSlInput={(e) => {
							validCheck(e.target.name, e.target.value);
							setFormData({ ...formData, pan: e.target.value });
						}}
					/>) :
					(
						<SlInput
							label="PAN Number"
							required={false}
							className="helptext"
							name="pan"
							disabled={false}
							helpText={error.pan ? "" : "Wrong Entry"}
							pattern="^[A-Z]{5}[0-9]{4}[A-Z]$"
							value={formData.pan}
							onSlInput={(e) => {
								validCheck(e.target.name, e.target.value);
								setFormData({ ...formData, pan: e.target.value });
							}}
						/>
					)}

				<SlButton
					type="submit"
					variant="success"
					onClick={(e) => {
						console.log(formData);
						//setConfirmDialog(true);
						return;
					}}
				>
					Continue
				</SlButton>

				{/*         // Upload Button */}

				<SlButton
					onclick={() => {
						setOpen(true);
					}}
				>
					Upload file
				</SlButton>
			</form>
			<SlDialog label="Upload Files" open={open} onSlAfterHide={() => setOpen(false)}>
				<h4>Blank Cheque</h4>
				<input
					style={{ marginBottom: "20px" }}
					type="file"
					name=""
					id=""
					accept="application/pdf"
					onChange={(e) => {
						setFormData({ ...formData, blank_cheque: e.target.files[0] });
					}}
				/>
				<h4>GSTIN Certificate</h4>
				<input
					style={{ marginBottom: "20px" }}
					type="file"
					name=""
					id=""
					accept="application/pdf"
					onChange={(e) => {
						setFormData({ ...formData, GST_Image: e.target.files[0] });
					}}
				/>
				<h4>Pan Card</h4>
				<input
					style={{ marginBottom: "20px" }}
					type="file"
					name=""
					id=""
					accept="application/pdf"
					onChange={(e) => {
						setFormData({ ...formData, PAN_Image: e.target.files[0] });
					}}
				/>
				<h4>Declaration</h4>
				<input
					style={{ marginBottom: "20px" }}
					type="file"
					name=""
					id=""
					accept="application/pdf"
					onChange={(e) => {
						setFormData({ ...formData, declaration: e.target.files[0] });
					}}
				/>
				<h4>DAPF</h4>
				<input
					style={{ marginBottom: "20px" }}
					type="file"
					name=""
					accept="application/pdf"
					id=""
					onChange={(e) => {
						setFormData({ ...formData, DAPF: e.target.files[0] });
					}}
				/>
				<SlButton style={{ marginRight: "20px" }} slot="footer" variant="success" onClick={() => setOpen(false)}>
					Upload
				</SlButton>
				<SlButton slot="footer" variant="danger" onClick={() => setOpen(false)}>
					Close
				</SlButton>
			</SlDialog>
			<SlDialog label="Preview" open={confirmDialog} onSlAfterHide={() => setConfirmDialog(false)}>
				<div>
					<h4>
						Customer Group: <span>{formData.cust_group}</span>
					</h4>
					<h4 className = "view">
						Customer Name:{" "}
						<span>
							{formData.cust_name} {formData.cust_name_op1}
						</span>
					</h4>
					<h4 className = "view">
						Customer Address:{" "}
						<span>
							{formData.cust_address} {formData.cust_address_op1} {formData.cust_address_op2} {formData.cust_address_op3}
						</span>
					</h4>
					<h4 className = "view">
						District: <span>{formData.district}</span>
					</h4>
					<h4 className = "view">
						City: <span>{formData.city}</span>
					</h4>
					<h4 className = "view">
						Postal Code: <span>{formData.postal_code}</span>
					</h4>
					<h4 className = "view">
						Country: <span>{formData.country}</span>
					</h4>
					<h4 className = "view">
						Region Code: <span>{formData.state_code}</span>
					</h4>
					<h4 className = "view">
						C/O Person: <span>{formData.co_person}</span>
					</h4>
					<h4 className = "view">
						Company Code: <span>{formData.company_code}</span>
					</h4>
					<h4 className = "view">
						Reconciliation A/C: <span>{formData.recon_acc}</span>
					</h4>
					<h4 className = "view">
						PayTerm: <span>{formData.pay_term}</span>
					</h4>
					<h4 className = "view">
						Sales Organization: <span>{formData.sales_org}</span>
					</h4>
					<h4 className = "view">
						Distribution Channel: <span>{formData.dist_channel}</span>
					</h4>
					<h4 className = "view">
						Division: <span>{formData.division}</span>
					</h4>
					<h4 className = "view">
						Transportation Zone: <span>{formData.transportation_zone}</span>
					</h4>
					<h4 className = "view">
						Mobile Number: <span>{formData.mobile_no}</span>
					</h4>
					<h4 className = "view">
						E-mail ID: <span>{formData.email_id}</span>
					</h4>
					<h4 className = "view">
						Company Code: <span>{formData.company_code}</span>
					</h4>
					<h4 className = "view">
						Sales-District: <span>{formData.sales_district}</span>
					</h4>
					<h4 className = "view">
						Customer Account Group: <span>{formData.customer_acc_group}</span>
					</h4>
					<h4 className = "view">
						Sales Office and Delivery Plant: <span>{formData.sales_office}</span>
					</h4>
					<h4 className = "view">
						GSTIN: <span>{formData.gstin}</span>
					</h4>
					<h4 className = "view">
						TAN: <span>{formData.tan_number}</span>
					</h4>
					<h4 className = "view">
						PAN: <span>{formData.pan}</span>
					</h4>
				</div>
				<SlCheckbox
					checked={declarationCheck}
					onSlChange={(e) => {
						setDeclarationCheck(e.target.checked);
					}}
				>
					I hereby confirm that the information entered is true to the best of my knowledge.
				</SlCheckbox>
				<SlButton
					slot="footer"
					variant="primary"
					disabled={!declarationCheck}
					onClick={() => {
						setConfirmDialog(false);
						sendFormData();
					}}
				>
					Submit
				</SlButton>
			</SlDialog>
		</div>
	);
}

export default Form;


// Removed ReDoS possibility by modifying the regex in code (replaced all + with {0,40})
