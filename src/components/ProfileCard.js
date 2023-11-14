import React from "react";
import avatar from "../images/profile.png";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import profilePicture from "../images/profile.png";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {CardActionArea, CardActions} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {useNavigate} from "react-router-dom";

function ProfileCard(props) {
	const navigate = useNavigate();
	const currentUser = props;

	const handleSubmit = (user) => {
		console.log(currentUser)
		navigate('/update-profile', {
			state: {
				user: currentUser,
			}
		});
	};

	return (
		<Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
			<Card style={{ border: "2px solid black" }}>
				<CardActionArea>
					<CardMedia
						component="img"
						height="140"
						src={avatar}
						alt="green iguana"
					/>
					<CardContent>
						<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
							{props.job}
						</Typography>
						<Typography gutterBottom variant="h5" component="div">
							{props.name} - {props.age} years old
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Phone: {props.phone}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Email: {props.email}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
						variant="contained"
						color="primary"
						sx={{
							'--variant-borderWidth': '2px',
							borderRadius: 40,
							borderColor: 'primary.500',
							mx: 'auto',
						}}
						onClick={handleSubmit}
					>
						EDIT
					</Button>
				</CardActions>
			</Card>
		</Container>

	);
}

export default ProfileCard;