import type { GridSize } from '@/types.ts'

const MAX_CELLS = 12

export function getGridColProps(gridSize?: GridSize): Required<Omit<GridSize, 'fit'>> {
  if (!gridSize) return {
    sm: MAX_CELLS,
    md: MAX_CELLS / 2,
    lg: MAX_CELLS / 3,
    xl: MAX_CELLS / 4,
    xxl: MAX_CELLS / 4
  }
  if (gridSize.fit) return {
    sm: MAX_CELLS,
    md: MAX_CELLS,
    lg: MAX_CELLS,
    xl: MAX_CELLS,
    xxl: MAX_CELLS
  }
  return gridSize as Required<Omit<GridSize, 'fit'>>
}