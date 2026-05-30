import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AIInsights from '../AIInsights';
import { getAIInsights } from '../../../api';

jest.mock('../../../api');

describe('AIInsights', () => {
  it('should display the AI insights', async () => {
    const mockData = {
      insights: [
        {
          id: 'insight-1',
          text: 'Test insight 1',
          createdAt: '2026-04-04T10:00:00Z',
        },
        {
          id: 'insight-2',
          text: 'Test insight 2',
          createdAt: '2026-04-03T15:30:00Z',
        },
      ],
    };
    getAIInsights.mockResolvedValue({ data: mockData });

    render(<AIInsights />);

    await waitFor(() => {
      expect(screen.getByText(/Insights da IA/)).toBeInTheDocument();
      expect(screen.getByText('Test insight 1')).toBeInTheDocument();
      expect(screen.getByText('Test insight 2')).toBeInTheDocument();
    });
  });

  it('should display an error message when the API call fails', async () => {
    getAIInsights.mockRejectedValue(new Error('Failed to fetch AI insights'));

    render(<AIInsights />);

    await waitFor(() => {
      expect(screen.getByText(/Falha ao carregar os insights de IA/)).toBeInTheDocument();
    });
  });

  it('should display a message when there are no insights', async () => {
    const mockData = { insights: [] };
    getAIInsights.mockResolvedValue({ data: mockData });

    render(<AIInsights />);

    await waitFor(() => {
      expect(screen.getByText(/Nenhum insight ainda!/)).toBeInTheDocument();
    });
  });
});
