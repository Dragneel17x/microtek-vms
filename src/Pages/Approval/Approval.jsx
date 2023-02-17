import { SlButton, SlDialog, SlInput, SlTab, SlTabGroup, SlTabPanel } from "@shoelace-style/shoelace/dist/react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../config/apiConfig";

function Approval() {
	useEffect(() => {
		getVendorApprovals();
	}, []);

	const [vendorApprovals, setVendorApprovals] = useState()
	const [singleVendorApproval, setSingleVendorApproval] = useState();
	const [vendorApprovalDialog, setVendorApprovalDialog] = useState(false);

	function getVendorApprovals() {
		const data = {
			employee_id: localStorage.getItem("employee_id"),
		};
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-vendor-approval-forms`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			},
			data,
		})
			.then((res) => {
				console.log(res);
				setVendorApprovals(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function changeVendorRequestStatus(status) {
		const data = {
			status: status,
			approver_remarks: approverRemark,
			employee_id: localStorage.getItem("employee_id"),
			approval_id: singleVendorApproval?.approval_id,
		};
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/approve-vendor-form`,
			header: {
				"Content-type": "application/JSON",
			},
			data,
		})
			.then((res) => {
				console.log(res);
				getVendorApprovals();
				setVendorApprovalDialog(false)
			})
			.catch((err) => {
				console.log(err);
				setVendorApprovalDialog(false)
			});
	}
	const vendor_options = {
		elevation: 1,
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			setSingleVendorApproval(vendorApprovals[rowMeta.dataIndex]);
			setVendorApprovalDialog(true);
		},
	};
	const vendor_columns = [
		{ name: "applied_by", label: "Applied By" },
		{ name: "vendor_name", label: "Vendor Name" },
		{ name: "company_code", label: "Company Code" },
		{ name: "approval_id", label: "Approval ID" },
		{ name: "request_id", label: "Request ID" },
		{ name: "request_type", label: "Request Type" },
		{ name: "created_at", label: "Request Date" },
	];

	const [approverRemark, setApproverRemark] = useState("");
	return (
		<div style={{ padding: '10px 20px' }}>
			<div className="view-table">
			<MUIDataTable options={vendor_options} title="Vendor Form Approvals" data={vendorApprovals} columns={vendor_columns} />

			</div>
			<SlDialog label="Dialog" open={vendorApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setVendorApprovalDialog(false)}>
				Data Dikhana hai
				<SlInput
					className="helptext"
					name="approver_remark"
					value={approverRemark}
					onSlInput={(e) => {
						setApproverRemark(e.target.value)
					}}
					style={{ marginTop: "20px" }}
					label="Remarks"
				/>

				<SlButton
					slot="footer"
					style={{ marginRight: "20px" }}
					variant="success"
					disabled={approverRemark ? false : true}
					onClick={() => {
						changeVendorRequestStatus("approved");
					}}
				>
					Approve
				</SlButton>
				<SlButton
					slot="footer"
					style={{ marginRight: "20px" }}
					disabled={approverRemark?.toLowerCase().replaceAll(" ", "") == "ok" || approverRemark == "" ? true : false}
					variant="danger"
					onClick={() => {
						changeVendorRequestStatus("rejected");
					}}
				>
					Reject
				</SlButton>
				<SlButton slot="footer" variant="primary" onClick={() => setVendorApprovalDialog(false)}>
					Close
				</SlButton>
			</SlDialog>
		</div>
	);
}

export default Approval;
