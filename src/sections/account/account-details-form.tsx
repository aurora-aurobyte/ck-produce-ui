import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import { useAppSelector } from 'src/store/hooks';

export function AccountDetailsForm(): React.JSX.Element {
    const user = useAppSelector((state) => state.auth.user);
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
        >
            <Card>
                <CardHeader subheader="The information can be edited" title="Profile" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>First name</InputLabel>
                                <OutlinedInput
                                    defaultValue={user?.firstName || ''}
                                    label="First name"
                                    name="firstName"
                                />
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Last name</InputLabel>
                                <OutlinedInput
                                    defaultValue={user?.lastName || ''}
                                    label="Last name"
                                    name="lastName"
                                />
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Email address</InputLabel>
                                <OutlinedInput
                                    defaultValue={user?.email || ''}
                                    label="Email address"
                                    name="email"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="inherit">
                        Save details
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}
