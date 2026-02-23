import { useState, useCallback } from 'react'
import { useDraw, type Draw } from './hooks/useDraw'
import Canvas from './components/Canvas'
import Toolbar from './components/Toolbar'

function App() {
  const [color, setColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(5)

  const drawLine = useCallback(({ ctx, currentPoint, prevPoint }: Draw) => {
    const startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currentPoint.x, currentPoint.y)
    ctx.stroke()
    
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, lineWidth / 2, 0, 2 * Math.PI)
    ctx.fill()
  }, [color, lineWidth])

  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)

  return (
    <div className="flex h-screen w-full bg-slate-50">
      <div className="flex-shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto">
        <Toolbar 
          color={color} 
          setColor={setColor} 
          lineWidth={lineWidth} 
          setLineWidth={setLineWidth} 
          clear={clear} 
        />
      </div>
      <div className="flex justify-center items-center flex-grow p-10 bg-slate-200 overflow-auto">
        <Canvas 
          canvasRef={canvasRef} 
          onMouseDown={onMouseDown} 
          width={800} 
          height={600} 
        />
      </div>
    </div>
  )
}

export default App
