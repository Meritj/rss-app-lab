import { trace } from '@opentelemetry/api';
import redis from '../../lib/redis';

// Get a tracer instance
const tracer = trace.getTracer('rss-app');

export async function POST(req) {
  const { user = 'default', source, link } = await req.json();
  if (!source || !link) return Response.json({ error: "Missing source or link" }, { status: 400 });

  return tracer.startActiveSpan('mark_article_as_seen', async (span) => {
    span.setAttributes({
      'article.user': user,
      'article.source': source,
      'article.link': link,
    });

    const seenKey = `seen:${user}:${source}:${link}`;
    await redis.set(seenKey, 'true');

    span.end();
    
    return Response.json({ success: true });
  });
}
