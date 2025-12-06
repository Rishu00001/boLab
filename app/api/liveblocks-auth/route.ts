import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret:process.env.LIVEBLOCKS_SECRET!,
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();
  console.log("AUTH_INFO", {
    authorization,
    user,
  });

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 401 });
  }
  const userInfo = {
    name: user.firstName!,
    picture: user.imageUrl!,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }
  const { status, body } = await session.authorize();

  return new Response(body, { status });

  //   // Use a naming pattern to allow access to rooms with wildcards
  //   // Giving the user read access on their org, and write access on their group
  //   session.allow(`${user.organization}:*`, session.READ_ACCESS);
  //   session.allow(`${user.organization}:${user.group}:*`, session.FULL_ACCESS);

  //   // Authorize the user and return the result
  //   const { status, body } = await session.authorize();
  //   return new Response(body, { status });
}
