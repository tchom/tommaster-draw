import { useState, useCallback } from 'react'
import { useDraw, type Draw } from './hooks/useDraw'
import Canvas from './components/Canvas'
import Toolbar from './components/Toolbar'

function App() {
  const [color, setColor] = useState('#000000')
  const [lineWidth, setLineWidth] = useState(5)

  const drawLine = useCallback(({ ctx, currentPoint, prevPoint }: Draw) => {
    const startPoint = prevPoint ?? currentPoint
    const width = ctx.canvas.width

    // The Prank: Mirror the X coordinates horizontally!
    const mirrorX = (x: number) => width - x
    const startX = mirrorX(startPoint.x)
    const currentX = mirrorX(currentPoint.x)

    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.moveTo(startX, startPoint.y)
    ctx.lineTo(currentX, currentPoint.y)
    ctx.stroke()
    
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(startX, startPoint.y, lineWidth / 2, 0, 2 * Math.PI)
    ctx.fill()
  }, [color, lineWidth])

  const { canvasRef, onMouseDown } = useDraw(drawLine)

  const handleClear = () => {
    const messages = [
      "I like it! Let's keep it.",
      "You should be less wasteful.",
      "Only by failing do we learn to truly succeed.",
      "Art is never finished, only abandoned.",
      "That's a masterpiece! Why would you delete it?",
      "Error: Undo function not found in this universe.",
      "Have you considered framing it instead?",
      "Deleting this requires a subscription.",
      "The artist formerly known as you cannot do that.",
      "I'm afraid I can't let you do that, Dave.",
      "Your erase credits are insufficient.",
    ]
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    alert(randomMessage)
  }

  const handleCopyToClipboard = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ])
        alert('Copied to clipboard! Share your masterpiece!')
      })
    } catch (err) {
      console.error('Failed to copy: ', err)
      alert('Failed to copy to clipboard. Are you using a supported browser?')
    }
  }

  const handleSetEraser = () => {
    setColor('#FFFFFF')
    setLineWidth(50)
  }

  return (
    <div className="flex h-screen w-full bg-slate-50">
      <div className="flex-shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto">
        <Toolbar 
          color={color} 
          setColor={setColor} 
          lineWidth={lineWidth} 
          setLineWidth={setLineWidth} 
          clear={handleClear} 
          copyToClipboard={handleCopyToClipboard}
          setEraser={handleSetEraser}
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
