import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AuthPanel from './AuthPanel';

function Screens() {
  const [registerMode, setRegisterMode] = useState(false);
  return <AuthPanel key={registerMode ? 'register' : 'signin'} registerMode={registerMode}
    onSwitch={() => setRegisterMode(!registerMode)} onSubmit={jest.fn()} busy={false} error="" fieldErrors={{}} />;
}

test('typed sign-in credentials never carry over to registration or back', () => {
  render(<Screens />);
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'signin@example.test' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'signin-secret' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create an account' }));
  expect(screen.getByLabelText('Email')).toHaveValue('');
  expect(screen.getByLabelText('Password')).toHaveValue('');
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'signup@example.test' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'signup-secret' } });
  fireEvent.click(screen.getByRole('button', { name: 'Sign in instead' }));
  expect(screen.getByLabelText('Email')).toHaveValue('');
  expect(screen.getByLabelText('Password')).toHaveValue('');
});

test('names and agreement selections reset when leaving registration', () => {
  render(<Screens />);
  fireEvent.click(screen.getByRole('button', { name: 'Create an account' }));
  fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'Elijah' } });
  fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Johnston' } });
  screen.getAllByRole('checkbox').forEach((checkbox) => fireEvent.click(checkbox));
  fireEvent.click(screen.getByRole('button', { name: 'Sign in instead' }));
  fireEvent.click(screen.getByRole('button', { name: 'Create an account' }));
  expect(screen.getByLabelText('First name')).toHaveValue('');
  expect(screen.getByLabelText('Last name')).toHaveValue('');
  screen.getAllByRole('checkbox').forEach((checkbox) => expect(checkbox).not.toBeChecked());
});

test('registration submits the current fields and existing agreements', () => {
  const submit = jest.fn();
  render(<AuthPanel registerMode onSwitch={jest.fn()} onSubmit={submit} busy={false} error="" fieldErrors={{}} />);
  fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'Elijah' } });
  fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Johnston' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'member@example.test' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'correct-horse' } });
  screen.getAllByRole('checkbox').forEach((checkbox) => fireEvent.click(checkbox));
  fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
  expect(submit).toHaveBeenCalledWith({ firstName: 'Elijah', lastName: 'Johnston', email: 'member@example.test',
    password: 'correct-horse', ageConfirmed: true, termsAccepted: true });
});

test('pending submissions cannot switch screens or submit twice', () => {
  render(<AuthPanel registerMode={false} onSwitch={jest.fn()} onSubmit={jest.fn()} busy error="" fieldErrors={{}} />);
  expect(screen.getByRole('button', { name: /Signing in/ })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Create an account' })).toBeDisabled();
});

test('API errors are shown within the form and retain the current fields for correction', () => {
  render(<AuthPanel registerMode={false} onSwitch={jest.fn()} onSubmit={jest.fn()} busy={false}
    error="Email or password is incorrect." fieldErrors={{}} />);
  expect(screen.getByRole('alert')).toHaveTextContent('Email or password is incorrect.');
  expect(screen.getByLabelText('Email')).toHaveAttribute('autocomplete', 'section-welllive-signin username');
});
