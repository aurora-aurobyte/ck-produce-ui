import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { login, verifyUser } from 'src/store/features/authSlice';

// ----------------------------------------------------------------------

export default function LoginView() {
    const theme = useTheme();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password'),
        };
        axios
            .post(`${import.meta.env.VITE_BASE_URL}/auth/login`, data)
            .then((response) => {
                setSuccess(true);
                dispatch(login({ accessToken: response.data.AccessToken as string }));
                dispatch(verifyUser());
            })
            .catch((axiosError) => {
                setError(axiosError.response.data.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
            setLoading(false);
        }
    }, [isAuthenticated, router]);

    const renderForm = (
        <Box component="form" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
                <TextField name="email" label="Email address" />

                <TextField
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
                />
            </Stack>

            {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
                <MuiLink component={Link} to="/forgot" variant="subtitle2" underline="hover">
                    Forgot password?
                </MuiLink>
            </Stack> */}

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
                Login
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
                    <Typography variant="h4">Sign in to CK Produce</Typography>

                    <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                        Don’t have an account?
                        <MuiLink
                            component={Link}
                            to="/register"
                            variant="subtitle2"
                            sx={{ ml: 0.5 }}
                        >
                            Get started
                        </MuiLink>
                    </Typography>

                    {/* <Stack direction="row" spacing={2}>
                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            variant="outlined"
                            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                        >
                            <Iconify icon="eva:google-fill" color="#DF3E30" />
                        </Button>

                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            variant="outlined"
                            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                        >
                            <Iconify icon="eva:facebook-fill" color="#1877F2" />
                        </Button>

                        <Button
                            fullWidth
                            size="large"
                            color="inherit"
                            variant="outlined"
                            sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
                        >
                            <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
                        </Button>
                    </Stack> */}

                    {/* <Divider sx={{ my: 3 }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            OR
                        </Typography>
                    </Divider> */}

                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
