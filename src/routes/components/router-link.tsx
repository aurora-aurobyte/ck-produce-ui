import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const RouterLink = forwardRef(({ href, to, ...other }: any, ref) => (
    <Link ref={ref} to={href || to} {...other} />
));

RouterLink.propTypes = {
    href: PropTypes.string,
};

export default RouterLink;
