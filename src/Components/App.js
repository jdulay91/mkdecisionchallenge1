import React from 'react';
import Form from './Form';
import Amplify from 'aws-amplify'
import config from '../aws-exports'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

Amplify.configure(config)

function App() {
	return (
		<React.Fragment>
			<Form />
			<AmplifySignOut/>
		</React.Fragment>
	);
}

export default withAuthenticator(App);
