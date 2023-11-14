import React from "react";
import avatar from "../images/profile.png";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import profilePicture from "../images/profile.png";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function ProfileCard(props) {

	return (
		<Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>

			<Box align={"center"}>
				<Avatar src={avatar} sx={{ width: 80, height: 80 }}/>
			</Box>

			<Typography
				component="h1"
				variant="h3"
				align="center"
				color="text.primary"
				gutterBottom
			>
				{props.name} - {props.age} years old
			</Typography>
			<Typography variant="h5" align="center" color="text.primary" component="p">
				{props.job}
			</Typography>
			<Typography variant="h5" align="center" color="text.secondary" component="p">
				Phone: {props.phone}
			</Typography>
			<Typography variant="h5" align="center" color="text.secondary" component="p">
				Email: {props.email}
			</Typography>

			<Box align={"center"} py={{ xs: 2 }}>
				<Button variant="contained" align="center">
					EDIT
				</Button>
			</Box>


		</Container>

	);
}

export default ProfileCard;