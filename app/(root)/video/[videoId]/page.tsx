import { redirect } from "next/navigation";


import { getTranscript, getVideoById } from "@/lib/actions/video";
import VideoDetailHeader from "@/components/VideoDetailHeader";
import VideoPlayer from "@/components/VideoPlayer";
import VideoInfo from "@/components/VideoInfo";
import DeleteVideoButton from "@/components/DeleteVideoButton";

const page = async ({ params }: Params) => {
  const { videoId } = await params;

  const { user, video } = await getVideoById(videoId);
  if (!video) redirect("/404");

  const transcript = await getTranscript(videoId);
  const isOwner = video.userId;

  return (
    <main className="wrapper page">
      <VideoDetailHeader
        title={video.title}
        createdAt={video.createdAt}
        userImg={user?.image}
        username={user?.name}
        videoId={video.videoId}
        ownerId={video.userId}
        visibility={video.visibility}
        thumbnailUrl={video.thumbnailUrl}
      />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-pink-600">{video.description}</h2>
        {isOwner && (
          <DeleteVideoButton 
            videoId={video.videoId} 
            thumbnailUrl={video.thumbnailUrl} 
          />
        )}
      </div>

      <section className="video-details">
        <div className="content">
          <VideoPlayer videoId={video.videoId} />
        </div>

        <VideoInfo
          transcript={transcript}
          title={video.title}
          createdAt={video.createdAt}
          description={video.description}
          videoId={videoId}
          videoUrl={video.videoUrl}
        />
      </section>
    </main>
  );
};

export default page;