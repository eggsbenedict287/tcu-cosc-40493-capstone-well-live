import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import ArticleLibrary from './ArticleLibrary';

test('opens a scrollable overview and returns to the article list', () => {
  render(<ArticleLibrary answers={{ sleep_problems: { status: 'CONCERN' } }} />);
  expect(screen.getByRole('heading', { name: 'Explore wellness articles' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Read overview: Healthy Sleep' }));
  const detail = screen.getByRole('article');
  expect(within(detail).getByRole('heading', { name: 'Healthy Sleep' })).toHaveFocus();
  const source = within(detail).getByRole('link', { name: /Open original resource/ });
  expect(source).toHaveAttribute('href', 'https://medlineplus.gov/healthysleep.html');
  expect(source).toHaveAttribute('target', '_blank');
  expect(source).toHaveAttribute('rel', 'noopener noreferrer');
  expect(within(detail).getByText(/leaving Well Live/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Back to articles/ }));
  expect(screen.getByRole('button', { name: 'Read overview: Healthy Sleep' })).toHaveFocus();
});

test('skipped assessments show general resources instead of a diagnostic claim', () => {
  render(<ArticleLibrary answers={{ sleep_problems: { status: 'SKIPPED' } }} />);
  expect(screen.getByText(/Showing general wellness resources/)).toBeInTheDocument();
  expect(screen.queryByText('Related to your selected topics')).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /Read overview:/ })).toHaveLength(4);
});

test('all-articles view removes personalization labels without hiding resources', () => {
  render(<ArticleLibrary answers={{ sleep_problems: { status: 'CONCERN' } }} />);
  expect(screen.getByText('Related to your selected topics')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'All articles' }));
  expect(screen.queryByText('Related to your selected topics')).not.toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /Read overview:/ })).toHaveLength(4);
});
