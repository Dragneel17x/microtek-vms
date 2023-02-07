import { SlButton, SlDialog, SlTab, SlTabGroup, SlTabPanel, SlTag } from "@shoelace-style/shoelace/dist/react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../config/apiConfig";

function View() {
	useEffect(() => {

		getVendorApprovals();

	}, []);


	const [vendorApprovals, setVendorApprovals] = useState();
	const [singleVendorApproval, setSingleVendorApproval] = useState();
	const [vendorApprovalDialog, setVendorApprovalDialog] = useState();

	function getVendorApprovals() {
		const data = {
			employee_id: localStorage.getItem("employee_id"),
		};
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-submission-vendor-view`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			},
			data,
		})
			.then((res) => {
				console.log(res.data.data);
				setVendorApprovals(res.data.data);
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
		{ name: "approver_employee_id", label: "Approver ID" },
		{ name: "ai_status", label: "Approval Status" },
		{ name: "status", label: "Overall Status" },
	];

	return (
		<div>
			<div style={{ padding: '2px 20px' }}>
				<MUIDataTable options={vendorOptions} title="Vendor Forms View" data={vendorApprovals} columns={vendorColumns} />
			</div>
			<SlDialog label="Form Data" open={vendorApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setVendorApprovalDialog(false)}>
				Data Dikhana Hai
				<SlTag slot="footer" size="large" pill style={{ "marginRight": "20px" }} variant={singleVendorApproval?.status == 'pending' ? 'primary' : (singleVendorApproval?.status == 'rejected' ? 'danger' : 'success')}>{singleVendorApproval?.status}</SlTag>
				<SlTag slot="footer" size="large" pill style={{ "marginRight": "20px" }} variant={singleVendorApproval?.ai_status == 'pending' ? 'primary' : (singleVendorApproval?.ai_status == 'rejected' ? 'danger' : singleVendorApproval?.ai_status == 'future_approval' ? 'neutral' : 'success')}>{singleVendorApproval?.ai_status}</SlTag>
				<SlButton slot="footer" variant="primary" onClick={() => setVendorApprovalDialog(false)}>
					Close
				</SlButton>
			</SlDialog>
		</div>
	);
}

export default View