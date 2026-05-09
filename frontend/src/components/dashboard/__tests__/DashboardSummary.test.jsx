import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardSummary from '../DashboardSummary';
import { getDashboardSummary } from '../../../api';

jest.mock('../../../api');

describe('DashboardSummary', () => {
  it('should display the summary data', async () => {
    const mockData = {
      totalSubjects: 10,
      pendingActivities: 5,
      completionPercentage: 50,
    };
    getDashboardSummary.mockResolvedValue({ data: mockData });

    render(<DashboardSummary />);

    await waitFor(() => {
      expect(screen.getByText('Total Subjects')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('Pending Activities')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('Completion Rate')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });

  it('should display an error message when the API call fails', async () => {
    getDashboardSummary.mockRejectedValue(new Error('Failed to fetch summary data'));

    render(<DashboardSummary />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch summary data')).toBeInTheDocument();
    });
  });
});
