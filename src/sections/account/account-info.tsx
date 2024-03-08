import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'src/store/hooks';
import { account } from 'src/_mock/account';

export function AccountInfo(): React.JSX.Element {
    const user = useAppSelector((state) => state.auth.user);
    return (
        <Card>
            <CardContent>
                <Stack spacing={2} sx={{ alignItems: 'center' }}>
                    <div>
                        <Avatar src={account.photoURL} sx={{ height: '80px', width: '80px' }} />
                    </div>
                    <Stack spacing={1} sx={{ textAlign: 'center' }}>
                        <Typography variant="h5">{`${user?.firstName} ${user?.lastName}`}</Typography>
                        <Typography color="text.secondary" variant="body2">
                            {user?.email}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
            <Divider />
            <CardActions>
                <Button fullWidth variant="text" color="inherit">
                    Upload picture
                </Button>
            </CardActions>
        </Card>
    );
}
