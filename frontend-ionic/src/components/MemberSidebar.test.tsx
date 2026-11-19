import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MemberSidebar from './MemberSidebar';

test('shows the saved name and functional navigation with disabled future features', () => {
  const navigate = jest.fn();
  const logout = jest.fn();
  render(<MemberSidebar member={{ memberId: 'member', email: 'member@example.test', firstName: 'Elijah', lastName: 'Johnston' }}
    active="articles" onNavigate={navigate} onLogout={logout} busy={false} />);
  expect(screen.getByText('Elijah Johnston')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Articles' })).toHaveAttribute('aria-current', 'page');
  fireEvent.click(screen.getByRole('button', { name: 'Health assessment' }));
  expect(navigate).toHaveBeenCalledWith('assessment');
  fireEvent.click(screen.getByRole('button', { name: 'Profile' }));
  expect(navigate).toHaveBeenCalledWith('profile');
  expect(screen.getByRole('button', { name: /Groups/ })).toBeDisabled();
  expect(screen.getByRole('button', { name: /Options/ })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
  expect(logout).toHaveBeenCalledTimes(1);
});
