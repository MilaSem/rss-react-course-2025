import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Flyout } from './Flyout';

vi.mock('@/store/useSelectedItems', () => ({
  useSelectedItems: vi.fn(),
}));

vi.mock('@/store/useAnimeCache', () => ({
  useAnimeCache: vi.fn(),
}));

import { useSelectedItems } from '@/store/useSelectedItems';
import { useAnimeCache } from '@/store/useAnimeCache';

describe('Flyout', () => {
  const mockedUseSelectedItems = useSelectedItems as unknown as ReturnType<
    typeof vi.fn
  >;
  const mockedUseAnimeCache = useAnimeCache as unknown as ReturnType<
    typeof vi.fn
  >;

  it('should render with multiple selected items', () => {
    mockedUseSelectedItems.mockReturnValue({
      selectedIds: ['id1', 'id2', 'id3'],
      removeItem: vi.fn(),
    });

    mockedUseAnimeCache.mockReturnValue({
      cache: { id1: {}, id2: {}, id3: {} },
    });

    render(<Flyout />);

    expect(screen.getByText('3 items are selected')).toBeInTheDocument();
  });
});
