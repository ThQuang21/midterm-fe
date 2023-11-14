import React, {useEffect, useState} from "react";
import AuthService from "../services/auth.service";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MenuAppBar from "./MenuAppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ProfileCard from "./ProfileCard";
import UpdateProfileCard from "./UpdateProfileCard";
import {useLocation} from "react-router-dom";

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="/">
				Midterm
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const UpdateProfile = () => {
	const location = useLocation();
	const user = location.state.user;
	console.log(location)


	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<MenuAppBar />

			<main>
				<UpdateProfileCard
					name={user.name}
					age={user.age}
					job={user.job}
					phone={user.phone}
					email={user.email}
				/>
			</main>


			{/* Footer */}
			<Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
				<Copyright />
			</Box>
			{/* End footer */}
		</ThemeProvider>
	);
};

export default UpdateProfile;
