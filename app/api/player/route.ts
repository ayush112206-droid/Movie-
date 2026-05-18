import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type') as 'movie' | 'tv';
  const server = parseInt(searchParams.get('server') || '2');
  const s = searchParams.get('s') || '1';
  const e = searchParams.get('e') || '1';

  if (!id || !type) {
    return NextResponse.json({ error: 'ID and Type are required' }, { status: 400 });
  }

  let embedUrl = '';

  switch (server) {
    case 0: // VidSrc
      embedUrl = type === 'movie' 
        ? `https://vidsrc.xyz/embed/movie/${id}`
        : `https://vidsrc.xyz/embed/tv/${id}/${s}/${e}`;
      break;
    case 1: // VidAPI
      embedUrl = type === 'movie'
        ? `https://vidapi.xyz/embed/movie/${id}`
        : `https://vidapi.xyz/embed/tv/${id}&s=${s}&e=${e}`;
      break;
    case 2: // 2Embed
      embedUrl = type === 'movie'
        ? `https://www.2embed.skin/embed/${id}`
        : `https://www.2embed.skin/embedtv/${id}&s=${s}&e=${e}`;
      break;
    case 3: // EmbedSu
      embedUrl = type === 'movie'
        ? `https://embed.su/embed/movie/${id}`
        : `https://embed.su/embed/tv/${id}/${s}/${e}`;
      break;
    default:
      embedUrl = type === 'movie' 
        ? `https://www.2embed.skin/embed/${id}`
        : `https://www.2embed.skin/embedtv/${id}&s=${s}&e=${e}`;
  }

  return NextResponse.json({ url: embedUrl });
}
