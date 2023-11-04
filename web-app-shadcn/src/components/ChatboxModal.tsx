import { Button } from "@/components/ui/button";

export default function ChatboxModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  return (
    <div className={"relative bg-gray-300 z-50"}>
      <Button
        type={"button"}
        onClick={closeModal}
        variant={"ghost"}
        size={"sm"}
        className={"absolute top-0 right-0 rounded m-1"}
      >
        X
      </Button>
      <iframe src={"/chatbox"} allowFullScreen height={"300px"} />
    </div>
  );
}
