// src/app/api/hero/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const hero = await prisma.hero.findFirst();
  return NextResponse.json(hero);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const existing = await prisma.hero.findFirst();
  const hero = existing
    ? await prisma.hero.update({ where: { id: existing.id }, data: body })
    : await prisma.hero.create({ data: body });
  return NextResponse.json(hero);
}
