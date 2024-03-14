import { Alert, Box, Card, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Logo from 'src/components/logo';
import MuiLink from '@mui/material/Link';
import Iconify from 'src/components/iconify';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function RegisterView() {

    const theme = useTheme();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          password: formData.get('password')
        };
        console.log(data)
        if (data.email && data.password && data.firstName && data.lastName) {
          setLoading(true);
          setError('');
          axios
            .post(`${import.meta.env.VITE_BASE_URL}/auth/register`, data)
            .then((response) => {
              setSuccess(true);
              setTimeout(() => {
                navigate('/login');
              }, 3000);
            })
            .catch((err) => {
              setError(err.response.data.message);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          setError('Please fill the required fields');
        }
      };

    const renderForm = (
        <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                fullWidth
                name="email" 
                label="Email address" />
                </Grid>
                  <Grid item xs={12}>
                <TextField
                fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    <Iconify
                                        icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                /></Grid></Grid>

            {error && (
                <Alert sx={{ mt: 1 }} severity="error">
                    {error}
                </Alert>
            )}
            {success && (
                <Alert sx={{ mt: 2 }} severity="success">
                    Logged in
                </Alert>
            )}

            <LoadingButton
                sx={{ mt: 3 }}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                disabled={loading || success}
            >
                Sign Up
            </LoadingButton>
        </Box>
    );

  return (
    <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
            }}
        >
            <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            />

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4">Register to CK Produce</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                    Already have an account?
                        <MuiLink
                            component={Link}
                            to="/login"
                            variant="subtitle2"
                            sx={{ ml: 0.5 }}
                        >
                            Log in
                        </MuiLink>
                    </Typography>
                    {renderForm}
                </Card>
            </Stack>
        </Box>
  )
}
