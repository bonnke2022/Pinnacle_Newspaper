import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const p        = new URL(req.url).searchParams
  const title    = p.get('title')    ?? 'Pinnacle Newspaper'
  const author   = p.get('author')   ?? ''
  const category = p.get('category') ?? ''

  return new ImageResponse(
    <div style={{ display:'flex', flexDirection:'column', width:'100%', height:'100%', background:'#fff', padding:'60px 80px', fontFamily:'Georgia,serif', border:'10px solid #1B2D5E' }}>
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:40 }}>
        <span style={{ color:'#1B2D5E', fontSize:24, fontWeight:900, fontFamily:'Georgia,serif', letterSpacing:2 }}>PINNACLE</span>
        <span style={{ color:'#B22222', fontSize:12, fontWeight:900, letterSpacing:5, textTransform:'uppercase', fontFamily:'Arial,sans-serif' }}>NEWSPAPER</span>
        {category && <span style={{ marginLeft:'auto', color:'#B22222', fontSize:13, fontWeight:700, textTransform:'uppercase', letterSpacing:2, fontFamily:'Arial,sans-serif' }}>{category}</span>}
      </div>
      <div style={{ flex:1, display:'flex', alignItems:'center' }}>
        <h1 style={{ fontSize: title.length > 80 ? 40 : 54, fontWeight:'bold', color:'#1a1a1a', lineHeight:1.2, margin:0 }}>{title}</h1>
      </div>
      {author && (
        <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:40 }}>
          <div style={{ width:40, height:40, borderRadius:20, background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontFamily:'Arial,sans-serif', fontWeight:700, color:'#767676' }}>
            {author.charAt(0)}
          </div>
          <span style={{ fontSize:18, fontFamily:'Arial,sans-serif', color:'#444' }}>{author}</span>
        </div>
      )}
    </div>,
    { width: 1200, height: 630 }
  )
}
