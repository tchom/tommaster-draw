import type { FC, RefObject } from 'react'

interface CanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>
  onMouseDown: () => void
  width: number
  height: number
}

const Canvas: FC<CanvasProps> = ({ canvasRef, onMouseDown, width, height }) => {
  return (
    <canvas
      ref={canvasRef}
      onMouseDown={onMouseDown}
      width={width}
      height={height}
      className="border border-black rounded-md shadow-lg bg-white"
    />
  )
}

export default Canvas
