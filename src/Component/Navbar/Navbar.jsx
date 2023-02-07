import React, { useState } from "react";
import "./Navbar.css";
import { SlButton, SlDialog, SlDivider, SlDropdown, SlIcon, SlMenu, SlMenuItem } from "@shoelace-style/shoelace/dist/react/index";
import logo from "./time2.jpg";
import { useNavigate } from "react-router-dom";


function Navbar() {
	let navigate = useNavigate();




	return (
		<div className="navbar">
			<div className="navbar-main">
				<nav className="navbar-inner">
					<div className="navbar-logo">
						<img src={logo} className="navbar-logo" alt="" />
						<h2
							className="navbar-head"
							onClick={() => {
								navigate("/home");
							}}
						>
							VMS Module
						</h2>
					</div>

					<div className="nav-items-main">
						{JSON.parse(localStorage.getItem('module_access'))?.cvm_vendor_form ?
							<SlButton
								className="nav-item-button"
								onClick={() => {
									navigate("/vendor-form");
								}}
							>
								Vendor Form
							</SlButton> : ""}


						<SlButton
							className="nav-item-button"
							onClick={() => {
								navigate("/approval");
							}}
						>
							Approvals
						</SlButton>
						<SlDropdown distance={5} className="nav-item">
							<SlButton className="nav-item-button" slot="trigger" caret>
								View
							</SlButton>
							<SlMenu>
								<SlMenuItem
									onclick={() => {
										navigate("/view");
									}}
								>
									Submittion View
								</SlMenuItem>
								{JSON.parse(localStorage.getItem('module_access'))?.cvm_mdm_view ? <SlMenuItem
									onclick={() => {
										navigate("/mdm-view");
									}}
								>
									MDM View
								</SlMenuItem> : ""}
							</SlMenu>
						</SlDropdown>
						{/* <SlDropdown distance={5} className="nav-item">
							<SlButton className="nav-item-button" slot="trigger" caret>
								Services
							</SlButton>
							<SlMenu>
								
								{JSON.parse(localStorage.getItem('module_access'))?.cvm_vendor_form ? 
								<SlMenuItem
									onClick={() => {
										navigate("/vendor-form");
									}}
								>
									Vendor Form
								</SlMenuItem>:""}
								
								
								<SlMenuItem
									onClick={() => {
										navigate("/approval");
									}}
								>
									Approvals
								</SlMenuItem>
								<SlMenuItem
									onClick={() => {
										navigate("/view");
									}}
								>
									View Submittions
								</SlMenuItem>
								
							</SlMenu>
						</SlDropdown> */}
						<SlDropdown distance={5} className="nav-item">
							<SlButton className="nav-item-button" slot="trigger" caret>
								Account
							</SlButton>
							<SlMenu>
								<SlMenuItem onclick={() => { }}>{localStorage.getItem("fullname")}</SlMenuItem>
								<SlMenuItem
									onclick={() => {
										localStorage.clear();
										navigate("/login");
									}}
								>
									LogOut
								</SlMenuItem>
							</SlMenu>
						</SlDropdown>
					</div>
				</nav>
			</div>

		</div>
	);
}

export default Navbar;
