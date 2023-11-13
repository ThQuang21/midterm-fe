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
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import signup from '../services/signup.service';
import '../components/SignUp.css';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

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

const SignUp = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const navigate = useNavigate();

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await signup(values);
            setSnackbarMessage('Sign-up sucessfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            navigate('/home')
        } catch (error) {
            setSnackbarMessage(error.response.data.error || 'Error during sign-up. Please try again.');
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
                                        label="Phone*"
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
                                        id="job"
                                        label="Job*"
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
                                        label="Age*"
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
                    <Link href="/signin" variant="body2">
                        Already have an account? Sign in
                    </Link>
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
