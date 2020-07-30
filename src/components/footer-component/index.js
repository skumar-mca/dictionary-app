import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';
export default function FooterComponent() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">iDictionary</Link>
            {' '}{new Date().getFullYear()}{'.'}
        </Typography>
    );
}
