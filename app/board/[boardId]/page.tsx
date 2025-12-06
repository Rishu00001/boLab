import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";

interface BoardProps {
  params: Promise<{ boardId: string }>; 
}

async function Board({ params }: BoardProps) {
  // Await the params promise to get the actual object
  const { boardId } = await params;
  return (
    <Room roomId={boardId} fallback={<Loading/>}>  
      <Canvas boardId={boardId} />
    </Room>
  );
}

export default Board;
