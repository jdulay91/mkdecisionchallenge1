import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from 'axios';

const initialValues = {
	name: '',
	email: '',
	message: ''
};

const errors = {
	nameError: '',
	emailError: '',
	messageError: ''
};

const useStyles = makeStyles(theme => ({
	container: {
		height: '70vh'
	}
}));

function Form() {
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState(errors);
	const classes = useStyles();

	const handleChange = e => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value
		});
		let valid;
		switch (name) {
			case 'email':
				valid = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(value);
				if (!valid) {
					setFormErrors({ ...formErrors, emailError: 'Must input valid email' });
				} else {
					setFormErrors({ ...formErrors, emailError: '' });
				}
				break;
			case 'name':
				valid = new RegExp(/^[A-Za-z]+$/).test(value);
				if (!valid) {
					setFormErrors({ ...formErrors, nameError: 'No Special characters' });
				} else {
					setFormErrors({ ...formErrors, nameError: '' });
				}
				break;
			case 'message':
				if (value.length < 15) {
					setFormErrors({ ...formErrors, messageError: 'Minimum of 15 characters' });
				} else {
					setFormErrors({ ...formErrors, messageError: '' });
				}
				break;
			default:
				break;
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios.get('#');
	};
	const handleClear = e => {
		e.preventDefault();
		setFormValues(initialValues);
	};

	return (
		<Grid className={classes.container} container justify='center' alignItems='center'>
			<Grid item container justify='center' alignItems='center'>
				<form onSubmit={handleSubmit} noValidate autoComplete='off'>
					<Grid spacing={4} container direction='column' justify='center' alignItems='center'>
						<Grid item>
							<TextField
								error={!!formErrors.nameError}
								helperText={formErrors.nameError}
								variant='outlined'
								value={formValues.name}
								required
								autoFocus
								id='name'
								name='name'
								label='Name'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item>
							<TextField
								error={!!formErrors.emailError}
								helperText={formErrors.emailError}
								variant='outlined'
								value={formValues.email}
								required
								type='email'
								id='email'
								name='email'
								label='Email'
								onChange={handleChange}
							/>
						</Grid>
						<Grid item>
							<TextField
								variant='outlined'
								id='message'
								multiline
								error={!!formErrors.messageError}
								helperText={formErrors.messageError}
								value={formValues.message}
								rowsMax={10}
								aria-label='empty textarea'
								placeholder='Message'
								name='message'
								onChange={handleChange}
							/>
						</Grid>
						<Grid container justify='center' alignItems='center' spacing={3}>
							<Grid item>
								<Button
									disabled={
										formValues.name.length === 0 ||
										formValues.email.length === 0 ||
										formValues.message.length === 0 ||
										formErrors.nameError.length !== 0 ||
										formErrors.emailError.length !== 0 ||
										formErrors.messageError.length !== 0
									}
									variant='contained'
									color='primary'>
									<SendIcon></SendIcon>
									Send Message
								</Button>
							</Grid>
							<Grid item>
								<Button
									disabled={formValues.name.length === 0 && formValues.email.length === 0 && formValues.message.length === 0}
									onClick={handleClear}
									variant='contained'
									color='primary'>
									<DeleteOutlineIcon />
									Clear Form
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
}

export default Form;
