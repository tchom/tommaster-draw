import type { FC } from 'react'
import { clsx } from 'clsx'

const COLORS = [
  '#000000', // Black
  '#404040', // Dark Gray
  '#808080', // Gray
  '#FFFFFF', // White
  '#800000', // Maroon
  '#FF0000', // Red
  '#FFA500', // Orange
  '#FFFF00', // Yellow
  '#008000', // Green
  '#00FF00', // Lime
  '#008080', // Teal
  '#00FFFF', // Cyan
  '#000080', // Navy
  '#0000FF', // Blue
  '#800080', // Purple
  '#FF00FF', // Magenta
]

const SIZES = [5, 10, 20]

interface ToolbarProps {
  color: string
  setColor: (color: string) => void
  lineWidth: number
  setLineWidth: (width: number) => void
  clear: () => void
}

const Toolbar: FC<ToolbarProps> = ({ color, setColor, lineWidth, setLineWidth, clear }) => {
  return (
    <div className="flex flex-col gap-6 p-6 items-center w-64 h-full bg-white text-gray-800">
      
      <div className="mb-4 text-center">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">TomMaster</h1>
      </div>

      {/* Colors Palette */}
      <div className="flex flex-col gap-3 w-full">
        <span className="font-bold text-xs uppercase tracking-widest text-gray-500 w-full text-center">Palette</span>
        <div className="grid grid-cols-4 gap-3 place-items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={clsx(
                "w-8 h-8 rounded-full transition-all hover:scale-110 active:scale-95 shadow-sm border",
                color === c 
                  ? "ring-2 ring-blue-500 ring-offset-2 border-transparent z-10 scale-110" 
                  : "border-gray-200 hover:border-gray-300"
              )}
              style={{ backgroundColor: c }}
              title={c}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gray-100 my-2" />

      {/* Brush Size */}
      <div className="flex flex-col gap-3 items-center w-full">
        <span className="font-bold text-xs uppercase tracking-widest text-gray-500">Brush Size</span>
        <div className="flex gap-4 items-center justify-center p-4 bg-gray-50 rounded-xl w-full border border-gray-100">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setLineWidth(size)}
              className={clsx(
                "rounded-full transition-all hover:bg-gray-700 shadow-sm",
                lineWidth === size ? "bg-blue-600 ring-2 ring-blue-200 ring-offset-2 scale-110" : "bg-gray-800"
              )}
              style={{ width: size + 8, height: size + 8 }}
              title={`Brush size ${size}px`}
              aria-label={`Select brush size ${size}px`}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gray-100 my-2" />

      {/* Actions */}
      <div className="w-full mt-auto pb-4">
        <button 
          onClick={clear}
          className="w-full py-3 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-bold shadow-sm active:scale-95 flex items-center justify-center gap-2 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear Canvas
        </button>
      </div>

    </div>
  )
}

export default Toolbar
