"use client";

import { deleteVideo } from "@/lib/actions/video";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteVideoButtonProps {
  videoId: string;
  thumbnailUrl: string;
}
const DeleteVideoButton = ({videoId,thumbnailUrl}: DeleteVideoButtonProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteVideo(videoId, thumbnailUrl);
            toast.success("Video deleted successfully!");
            router.push("/");
            router.refresh();
        }
        catch (error) {
            console.error("Error deleting video:", error);
            toast.error("Failed to delete video. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    }

  return (
    <button onClick={handleDelete} disabled={isDeleting} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-sm">
        {isDeleting ? "Deleting..." : "Delete Video"}
    </button>
  )
}

export default DeleteVideoButton