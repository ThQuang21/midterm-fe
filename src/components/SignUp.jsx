// SignUp.jsx

import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import signup from '../services/signup.service';
import '../components/SignUp.css';


const defaultTheme = createTheme();

const initialValues = {
    name: '',
    email: '',
    phone: '',
    status: '',
    address: '',
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
    phone: Yup.string().matches(/^\d+$/, 'Phone must be a number').max(25, 'Phone must be at most 25 characters'),
    status: Yup.string(),
    address: Yup.string().max(50, 'Address must be at most 25 characters'),
    job: Yup.string().max(25, 'Job must be at most 25 characters'),
    age: Yup.number().positive('Age must be a positive number').integer('Age must be an integer'),
});

const statuses = ['Married', 'Single', 'Divorced'];

const SignUp = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await signup(values);
            console.log('Sign-up successful:', values);
        } catch (error) {
            console.error('Error during sign-up:', error);

            setSnackbarMessage(error.response?.data?.message || 'Error during sign-up. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography style={{ marginBottom: 1 + 'em' }} component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="name"
                                        label="Name*"
                                        name="name"
                                        error={Boolean(validationSchema.fields.name && validationSchema.fields.name.errors)}
                                        helperText={<ErrorMessage name="name" component="div" className="error-message" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        label="Email Address*"
                                        name="email"
                                        error={Boolean(validationSchema.fields.email && validationSchema.fields.email.errors)}
                                        helperText={<ErrorMessage name="email" component="div" className="error-message" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="password"
                                        label="Password*"
                                        name="password"
                                        type="password"
                                        error={Boolean(validationSchema.fields.password && validationSchema.fields.password.errors)}
                                        helperText={<ErrorMessage name="password" component="div" className="error-message" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="phone"
                                        label="Phone"
                                        name="phone"
                                        error={Boolean(validationSchema.fields.phone && validationSchema.fields.phone.errors)}
                                        helperText={<ErrorMessage name="phone" component="div" className="error-message" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="status"
                                        label="Status"
                                        name="status"
                                        select
                                    >
                                        {statuses.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        error={Boolean(validationSchema.fields.address && validationSchema.fields.address.errors)}
                                        helperText={<ErrorMessage name="address" component="div" className="error-message" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="job"
                                        label="Job"
                                        name="job"
                                        error={Boolean(validationSchema.fields.job && validationSchema.fields.job.errors)}
                                        helperText={<ErrorMessage name="job" component="div" className="error-message" />}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="age"
                                        label="Age"
                                        name="age"
                                        error={Boolean(validationSchema.fields.age && validationSchema.fields.age.errors)}
                                        helperText={<ErrorMessage name="age" component="div" className="error-message" />}
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                            </Button>
                        </Form>
                    </Formik>
                </Box>
            </Container>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert elevation={6} variant="filled" severity={snackbarSeverity} onClose={handleSnackbarClose}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default SignUp;
