import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardSummary from '../DashboardSummary';
import { getSubjects, getAllTasks } from '../../../api';

jest.mock('../../../api');

describe('DashboardSummary', () => {
  it('should display the summary data', async () => {
    const subjects = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Subject ${i + 1}` }));
    const tasks = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, status: i < 5 ? 'completed' : 'pending' }));
    getSubjects.mockResolvedValue({ data: subjects });
    getAllTasks.mockResolvedValue({ data: tasks });

    render(<DashboardSummary />);

    await waitFor(() => {
      expect(screen.getByText(/Total de Disciplinas/)).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText(/Tarefas Pendentes/)).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText(/Taxa de Conclusão/)).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });

  it('should display an error message when the API call fails', async () => {
    getSubjects.mockRejectedValue(new Error('Failed to fetch summary data'));

    render(<DashboardSummary />);

    await waitFor(() => {
      expect(screen.getByText(/Falha ao carregar os dados de resumo/)).toBeInTheDocument();
    });
  });
});
