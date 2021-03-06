import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{' © '}
			<Link
				color='inherit'
				href='https://github.com/bhupesh8222/ChatApplication'>
				bhupesh8222
			</Link>{' '}
		</Typography>
	);
}

export default Copyright;
