import React, {useState} from "react";
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
import TextField from "@mui/material/TextField";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const initialValues = {
	name: '',
	email: '',
	phone: '',
	job: '',
	age: '',
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const validationSchema = Yup.object({
	name: Yup.string().required('Name is required').max(25, 'Name must be at most 25 characters'),
	email: Yup.string().email('Invalid email address').required('Email is required'),
	password: Yup.string()
		.required('Password is required')
		.matches(passwordRegex, 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character. It must be at least 6 characters long'),
	phone: Yup.string().required('Phone is required').matches(/^\d+$/, 'Phone must be a number').max(25, 'Phone must be at most 25 characters'),
	job: Yup.string().required('Job is required').max(25, 'Job must be at most 25 characters'),
	age: Yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer'),
});

function UpdateProfileCard(props) {
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState('error');

	const handleSubmit = async (values, { setSubmitting }) => {
		AuthService.signup(values).then(
			(res) => {
				setSnackbarMessage('Sign-up successfully');
				setSnackbarSeverity('success');
				setSnackbarOpen(true);
			},
			(error) => {
				setSnackbarMessage(error.response.data.error || 'Error during sign-up. Please try again.');
				setSnackbarSeverity('error');
				setSnackbarOpen(true);
			}
		).finally(() => setSubmitting(false))
	};

	return (
		<Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
			<Card style={{ border: "2px solid black" }}>
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
					<Form>

				<Card>
					<CardMedia
						component="img"
						height="140"
						src={avatar}
						alt="green iguana"
					/>
					<CardContent>
						<TextField
							required
							defaultValue={props.name}
							variant="outlined"
							fullWidth
							id="name"
							label="Name"
							name="name"
							error={Boolean(validationSchema.fields.name && validationSchema.fields.name.errors)}
							helperText={<ErrorMessage name="name" component="div" className="error-message" />}
						/>
						<TextField
							required
							defaultValue={props.email}
							variant="outlined"
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							error={Boolean(validationSchema.fields.email && validationSchema.fields.email.errors)}
							helperText={<ErrorMessage name="email" component="div" className="error-message" />}
						/>
						<TextField
							required
							defaultValue={props.phone}
							variant="outlined"
							fullWidth
							id="phone"
							label="Phone"
							name="phone"
							error={Boolean(validationSchema.fields.phone && validationSchema.fields.phone.errors)}
							helperText={<ErrorMessage name="phone" component="div" className="error-message" />}
						/>
						<TextField
							required
							defaultValue={props.job}
							variant="outlined"
							fullWidth
							id="job"
							label="Job"
							name="job"
							error={Boolean(validationSchema.fields.job && validationSchema.fields.job.errors)}
							helperText={<ErrorMessage name="job" component="div" className="error-message" />}
						/>
					</CardContent>
				</Card>
					</Form>
				</Formik>

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
					>
						SAVE
					</Button>
				</CardActions>
			</Card>
		</Container>

	);
}

export default UpdateProfileCard;