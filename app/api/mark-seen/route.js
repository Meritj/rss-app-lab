import redis from '../../lib/redis';

export async function POST(req) {
  const { user = 'default', source, link } = await req.json();
  if (!source || !link) return Response.json({ error: "Missing source or link" }, { status: 400 });

  const seenKey = `seen:${user}:${source}:${link}`;
  await redis.set(seenKey, 'true');
  return Response.json({ success: true });
}
