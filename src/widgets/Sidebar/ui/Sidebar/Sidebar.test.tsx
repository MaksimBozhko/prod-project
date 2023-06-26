import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar';
import { renderWithTranslation } from 'shared/lib/renderWithTranslation/renderWithTranslation';

describe('Sidebar', () => {
  test('Test only', () => {
    renderWithTranslation(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });
  test('Test only', () => {
    renderWithTranslation(<Sidebar />)
    const toggleBtn = screen.getByTestId('sidebar-toggle')
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    fireEvent.click(toggleBtn)
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
  });
});
