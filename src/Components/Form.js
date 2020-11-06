import React, { useState } from 'react';
import { Grid, TextField, Button, Dialog, DialogContent, Typography, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { API } from 'aws-amplify'


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
	const [open, setOpen] = useState(false);
	const [confirmed, setConfirmed] = useState(false);
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
		const data = {
			body : {
				name:formValues.name,
				email:formValues.email,
				message:formValues.message
			}
		}
		API.post('mkdecisionapi','/contact',data)	
		
		setFormValues(initialValues);
		setConfirmed(true);
		setOpen(false);
	};

	const handleClear = e => {
		e.preventDefault();
		setFormValues(initialValues);
	};
	return (
		<Grid className={classes.container} container justify='center' alignItems='center'>
			<Grid item container justify='center' alignItems='center' direction='column'>
			<Typography gutterBottom variant='h4'> MK DECISION CONTACT FORM</Typography>
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
									color='primary'
									onClick={() => setOpen(true)}>
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
							<Dialog open={open} onClose={() => setOpen(false)}>
								<DialogContent>
									<Grid alignItems='center' justify='center' container style={{ height: '30em' }} direction='column' spacing={3}>
										<Grid item>
											<Typography variant='h4' gutterBottom>
												Confirm Message
											</Typography>
										</Grid>
										<Grid item>
											<TextField
												error={!!formErrors.nameError}
												helperText={formErrors.nameError}
												variant='outlined'
												value={formValues.name}
												required
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
									</Grid>
									<Grid item container justify='space-around' alignItems='center'>
										<Button type='submit' onClick={handleSubmit} variant='contained' color='primary'>
											<CheckIcon />
											Confirm
										</Button>
										<Button variant='contained' color='primary' onClick={() => setOpen(false)}>
											<CancelIcon />
											Cancel
										</Button>
									</Grid>
								</DialogContent>
							</Dialog>
							<Dialog
								open={confirmed}
								onClose={() => {
									setConfirmed(false);
								}}
								aria-labelledby='alert-dialog-title'
								aria-describedby='email sent confirmation'>
								<DialogTitle id='alert-dialog-title'>{'Message Sent'}</DialogTitle>
							</Dialog>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
}

export default Form;
