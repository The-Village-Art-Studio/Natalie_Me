import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export const size = {
  width: 64,
  height: 64,
}
export const contentType = 'image/png'

export default async function Icon() {
  const fontPath = path.join(process.cwd(), 'public/the-seasons/Fontspring-DEMO-theseasons-reg.otf')
  const fontData = readFileSync(fontPath)

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d0b0a', 
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d4c2b2',
          fontSize: 32,
          fontFamily: `"The Seasons"`,
          borderRadius: '16px',
        }}
      >
        N_M
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'The Seasons',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  )
}
