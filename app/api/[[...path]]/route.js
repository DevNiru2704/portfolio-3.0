import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { seedProjects, seedBlog, seedLab, seedSystemStatus } from '@/config/seed';

// MongoDB connection (lazy + reused)
let client;
let db;

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    db = client.db(process.env.DB_NAME || 'portfolio');
  }
  return db;
}

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }));
}

async function handleRoute(request, { params }) {
  const { path = [] } = params;
  const route = `/${path.join('/')}`;
  const method = request.method;

  try {
    // Health endpoints (don't need DB)
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(
        NextResponse.json({
          message: 'Neural Command Interface · API online',
          status: 'operational',
          time: new Date().toISOString(),
        }),
      );
    }

    const database = await connectToMongo();

    // ---------- CONTACT ----------
    if (route === '/contact' && method === 'POST') {
      const body = await request.json();
      if (!body?.name || !body?.email || !body?.message) {
        return handleCORS(
          NextResponse.json({ error: 'name, email and message are required' }, { status: 400 }),
        );
      }
      const doc = {
        id: uuidv4(),
        name: String(body.name).slice(0, 200),
        email: String(body.email).slice(0, 200),
        subject: String(body.subject || '').slice(0, 200),
        message: String(body.message).slice(0, 5000),
        created_at: new Date(),
        read: false,
      };
      await database.collection('messages').insertOne(doc);
      return handleCORS(NextResponse.json({ ok: true, id: doc.id }));
    }

    // ---------- MESSAGES (for dashboard) ----------
    if (route === '/messages' && method === 'GET') {
      const docs = await database.collection('messages').find({}).sort({ created_at: -1 }).limit(100).toArray();
      return handleCORS(NextResponse.json(docs.map(({ _id, ...rest }) => rest)));
    }

    // ---------- PROJECTS ----------
    if (route === '/projects' && method === 'GET') {
      const docs = await database.collection('projects').find({}).toArray();
      const fromDb = docs.map(({ _id, ...r }) => r);
      // Merge DB items with seed (DB wins on slug collision)
      const slugs = new Set(fromDb.map((p) => p.slug));
      const merged = [...fromDb, ...seedProjects.filter((p) => !slugs.has(p.slug))];
      return handleCORS(NextResponse.json(merged));
    }
    if (route === '/projects' && method === 'POST') {
      const body = await request.json();
      const doc = {
        id: uuidv4(),
        slug: String(body.slug || uuidv4()),
        title: body.title || 'Untitled',
        category: body.category || 'General',
        tags: body.tags || [],
        description: body.description || '',
        featured: !!body.featured,
        status: body.status || 'draft',
        metrics: body.metrics || {},
        year: body.year || new Date().getFullYear(),
        accent: body.accent || '199 89% 74%',
        created_at: new Date(),
      };
      await database.collection('projects').insertOne(doc);
      return handleCORS(NextResponse.json(doc));
    }

    // ---------- BLOG ----------
    if (route === '/blog' && method === 'GET') {
      const docs = await database.collection('blog').find({}).toArray();
      const fromDb = docs.map(({ _id, ...r }) => r);
      const slugs = new Set(fromDb.map((p) => p.slug));
      const merged = [...fromDb, ...seedBlog.filter((p) => !slugs.has(p.slug))];
      return handleCORS(NextResponse.json(merged));
    }

    // ---------- LAB ----------
    if (route === '/lab' && method === 'GET') {
      const docs = await database.collection('lab').find({}).toArray();
      const fromDb = docs.map(({ _id, ...r }) => r);
      const slugs = new Set(fromDb.map((p) => p.slug));
      const merged = [...fromDb, ...seedLab.filter((p) => !slugs.has(p.slug))];
      return handleCORS(NextResponse.json(merged));
    }

    // ---------- SYSTEM STATUS ----------
    if (route === '/system/status' && method === 'GET') {
      const messages = await database.collection('messages').countDocuments();
      const projects = await database.collection('projects').countDocuments();
      return handleCORS(
        NextResponse.json({
          ...seedSystemStatus,
          counts: { messages, projects: projects + seedProjects.length },
        }),
      );
    }

    // Legacy status_checks for compatibility
    if (route === '/status' && method === 'POST') {
      const body = await request.json();
      if (!body.client_name) {
        return handleCORS(NextResponse.json({ error: 'client_name is required' }, { status: 400 }));
      }
      const obj = { id: uuidv4(), client_name: body.client_name, timestamp: new Date() };
      await database.collection('status_checks').insertOne(obj);
      return handleCORS(NextResponse.json(obj));
    }
    if (route === '/status' && method === 'GET') {
      const rows = await database.collection('status_checks').find({}).limit(1000).toArray();
      return handleCORS(NextResponse.json(rows.map(({ _id, ...r }) => r)));
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }));
  } catch (err) {
    console.error('API error:', err);
    return handleCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }));
  }
}

export const GET = handleRoute;
export const POST = handleRoute;
export const PUT = handleRoute;
export const DELETE = handleRoute;
export const PATCH = handleRoute;
