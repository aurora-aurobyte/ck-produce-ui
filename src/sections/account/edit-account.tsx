import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import Container from 'src/components/container';
import Title from 'src/components/title/title';
import { AccountDetailsForm } from './account-details-form';
import { AccountInfo } from './account-info';

export default function Page(): React.JSX.Element {
    return (
        <Container>
            <Title title="Profile" />
            <Grid container spacing={3}>
                <Grid lg={4} md={6} xs={12}>
                    <AccountInfo />
                </Grid>
                <Grid lg={8} md={6} xs={12}>
                    <AccountDetailsForm />
                </Grid>
            </Grid>
        </Container>
    );
}
