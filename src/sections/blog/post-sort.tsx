import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

PostSort.propTypes = {
    options: PropTypes.array,
    onSort: PropTypes.func,
};

type PostSortProps = {
    options: any[];
    onSort?: () => any;
};

export default function PostSort({ options, onSort }: PostSortProps) {
    return (
        <TextField select size="small" value="latest" onChange={onSort}>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
}
