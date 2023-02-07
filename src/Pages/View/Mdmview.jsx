import { SlButton, SlDialog, SlInput, SlTab, SlTabGroup, SlTabPanel, SlTag } from "@shoelace-style/shoelace/dist/react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../config/apiConfig";

function Mdmview() {
	useEffect(() => {
		getVendorForms();
	}, []);
	
	const [sap_code, setSap_code] = useState("");

	const [vendorApprovals, setVendorApprovals] = useState();
	const [singleVendorApproval, setSingleVendorApproval] = useState();
	const [vendorApprovalDialog, setVendorApprovalDialog] = useState(false);


	function getVendorForms() {
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-vendor-mdm-view`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			}
		})
			.then((res) => {
				console.log(res.data.data);
				setVendorApprovals(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function updateVendorForm() {
		const data = {
			employee_id: localStorage.getItem('employee_id'),
			sap_code: sap_code,
			form_id: singleVendorApproval.id
		}
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/add-vendor-sap-code`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			},
			data
		})
			.then((res) => {
				console.log(res.data);
				setVendorApprovalDialog(false)
				getVendorForms();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const vendorOptions = {
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			setSingleVendorApproval(vendorApprovals[rowMeta.dataIndex]);
			setVendorApprovalDialog(true);
		},
		selectableRowsHideCheckboxes: true
	};
	const vendorColumns = [
		{ name: "created_by", label: "Applied By" },
		{ name: "vendor_name", label: "Vendor Name" },
		{ name: "company_code", label: "Company Code" },
		{ name: "mobile_no", label: "Mobile Number" },
		{ name: "state", label: "State" },
		{ name: "email_id", label: "Email ID" },
		{ name: "status", label: "Overall Status" },
	];
	return (
		<div>
			<MUIDataTable options={vendorOptions} title="Vendor Forms View For MDM" data={vendorApprovals} columns={vendorColumns} />
			<SlDialog label="Form Data" open={vendorApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setVendorApprovalDialog(false)}>
				<div>
					<h4 className="view">
						Vendor Group: <span>{singleVendorApproval?.vendor_group}</span>
					</h4>
					<h4 className="view">
						Customer Name:{" "}
						<span>
							{singleVendorApproval?.vendor_name} {singleVendorApproval?.vendor_name_op1}
						</span>
					</h4>
					<h4 className="view">
						Customer Address:{" "}
						<span>
							{singleVendorApproval?.vendor_address} {singleVendorApproval?.vendor_address_op1} {singleVendorApproval?.vendor_address_op2} {singleVendorApproval?.vendor_address_op3}
						</span>
					</h4>
					<h4 className="view">
						District: <span>{singleVendorApproval?.district}</span>
					</h4>
					<h4 className="view">
						City: <span>{singleVendorApproval?.city}</span>
					</h4>
					<h4 className="view">
						Postal Code: <span>{singleVendorApproval?.postal_code}</span>
					</h4>
					<h4 className="view">
						Country: <span>{singleVendorApproval?.country}</span>
					</h4>
					<h4 className="view">
						Region Code: <span>{singleVendorApproval?.state_code}</span>
					</h4>
					<h4 className="view">
						C/O Person: <span>{singleVendorApproval?.co_person}</span>
					</h4>
					<h4 className="view">
						Company Code: <span>{singleVendorApproval?.company_code}</span>
					</h4>
					<h4 className="view">
						Bank A/C: <span>{singleVendorApproval?.bank_acc_no}</span>
					</h4>
					<h4 className="view">
						Name on Account: <span>{singleVendorApproval?.name_on_acc}</span>
					</h4>
					<h4 className="view">
						Company Code: <span>{singleVendorApproval?.company_code}</span>
					</h4>
					<h4 className="view">
						Purchasing Organization: <span>{singleVendorApproval?.purchasing_org}</span>
					</h4>
					<h4 className="view">
						Division: <span>{singleVendorApproval?.division}</span>
					</h4>
					<h4 className="view">
						Witholding Tax: <span>{singleVendorApproval?.witholding_tax}</span>
					</h4>
					<h4 className="view">
						Mobile Number: <span>{singleVendorApproval?.mobile_no}</span>
					</h4>
					<h4 className="view">
						E-mail ID: <span>{singleVendorApproval?.email_id}</span>
					</h4>
					<h4 className="view">
						Order Currency : <span>{singleVendorApproval?.order_currency}</span>
					</h4>
					<h4 className="view">
						IFSC Code: <span>{singleVendorApproval?.ifsc_code}</span>
					</h4>
					<h4 className="view">
						GSTIN: <span>{singleVendorApproval?.gstin}</span>
					</h4>
					<h4 className="view">
						PAN: <span>{singleVendorApproval?.pan}</span>
					</h4>
				</div>
				<SlInput
					maxlength={40}
					className="helptext"
					pattern="^([A-Z]|[a-z]| )+$"
					name="cust_name_op1"
					style={{ marginTop: "20px" }}
					value={sap_code}
					onSlInput={(e) => {
						setSap_code(e.target.value);
					}}
					label="SAP Vendor Code"
				/>
				{sap_code ? <SlButton slot="footer" variant="success" style={{ marginRight: "20px" }} onClick={() => updateVendorForm()}>
					Update
				</SlButton> : ""}
				<SlButton slot="footer" variant="primary" onClick={() => setVendorApprovalDialog(false)}>
					Close
				</SlButton>
			</SlDialog>
		</div>
	);
}

export default Mdmview