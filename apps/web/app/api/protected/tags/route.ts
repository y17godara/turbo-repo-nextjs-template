import prisma from "database"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const newUrl = request.nextUrl.clone()
  const search = newUrl.searchParams.get("search") || ""

  try {
    const posts = await prisma.tags.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    })

    return Response.json(posts)
  } catch (error) {
    throw error
  }
}
