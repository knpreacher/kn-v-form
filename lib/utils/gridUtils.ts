import type { GridSize, GridSizeObject } from '@/types'

const MAX_CELLS = 12

const FIT: Required<Omit<GridSize, 'fit'>> = {
  cols: MAX_CELLS,
  sm: MAX_CELLS,
  md: MAX_CELLS,
  lg: MAX_CELLS,
  xl: MAX_CELLS,
  xxl: MAX_CELLS
}

export function getGridColProps(gridSize?: GridSize): GridSizeObject {
  if (!gridSize) return {
    cols: MAX_CELLS,
    sm: MAX_CELLS,
    md: MAX_CELLS / 2,
    lg: MAX_CELLS / 3,
    xl: MAX_CELLS / 4,
    xxl: MAX_CELLS / 4
  }
  if (gridSize.fit) return FIT
  return gridSize as GridSizeObject
}

export function getItemGridProps(
  groupGridSize?: GridSize,
  itemGridSize?: GridSize
): GridSizeObject {
  if (itemGridSize) return itemGridSize
  if (groupGridSize) return groupGridSize
  return FIT
}