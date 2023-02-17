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
		elevation: 1,
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
		<div className="view-table">
			
				<MUIDataTable options={vendorOptions} title="Vendor Forms View For MDM" data={vendorApprovals} columns={vendorColumns} />

			
			<SlDialog label="Form Data" open={vendorApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setVendorApprovalDialog(false)}>
			<div className="Vendor-form-data">
							<div className="cutomer-form-data-inner">
								<h4>Vendor Group:</h4>
								<span>{singleVendorApproval?.vendor_group}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Vendor Name: </h4>
								<span>
									{singleVendorApproval?.vendor_name} {singleVendorApproval?.vendor_name_op}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Vendor Address: </h4>
								<span>
									{singleVendorApproval?.vendor_address} {singleVendorApproval?.vendor_address_op1} {singleVendorApproval?.vendor_address_op2}{' '}
									{singleVendorApproval?.vendor_address_op3}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>District:</h4>
								<span>{singleVendorApproval?.district}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>City:</h4>
								<span>{singleVendorApproval?.city}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Postal Code:</h4>
								<span>{singleVendorApproval?.postal_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Country:</h4>
								<span>{singleVendorApproval?.country}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Region Code/State Code:</h4>
								<span>{singleVendorApproval?.state}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>C/O Person:</h4>
								<span>{singleVendorApproval?.co_person}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Company Code:</h4>
								<span>{singleVendorApproval?.company_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Reconciliation A/C:</h4>
								<span>{singleVendorApproval?.reconciliation_acc}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>PayTerm:</h4>
								<span>{singleVendorApproval?.pay_term}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Mobile Number:</h4>
								<span>{singleVendorApproval?.mobile_no}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Purchasing Organization:</h4>
								<span>{singleVendorApproval?.purchasing_org}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Bank Account Number:</h4>
								<span>{singleVendorApproval?.bank_acc_no}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>IFSC Code:</h4>
								<span>{singleVendorApproval?.ifsc_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Name on Account:</h4>
								<span>{singleVendorApproval?.name_on_acc}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Company Code:</h4>
								<span>{singleVendorApproval?.company_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>PAN:</h4>
								<span>{singleVendorApproval?.pan_number}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>GSTIN:</h4>
								<span>{singleVendorApproval?.gstin}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Approver Name:</h4>
								<span>{singleVendorApproval?.approver_employee_name}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Approver Email Id:</h4>
								<span>{singleVendorApproval?.approver_mail_id}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Approver Mobile Number:</h4>
								<span>{singleVendorApproval?.approver_phone_number}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Remarks:</h4>
								<span>{singleVendorApproval?.approver_remarks}</span>
							</div>
							<div className="cutomer-form-data-inner">
							<h4>Status At Approver's End:</h4>
							<SlTag
							slot="footer"
							size="large"
							
							style={{maxWidth:'200px'}}
							variant={
								singleVendorApproval?.ai_status == 'pending'
									? 'primary'
									: singleVendorApproval?.ai_status == 'rejected'
									? 'danger'
									: singleVendorApproval?.ai_status == 'future_approval'
									? 'neutral'
									: 'success'
							}>
							{singleVendorApproval?.ai_status}
						</SlTag>
							</div>
							
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