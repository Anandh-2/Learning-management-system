import React, { use, useContext, useEffect, useState } from "react";
import "../styles/VideoPage.css";
import OptionsButton from "../components/OptionsButton";
import {
  Navigate,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { deleteContent, getContentById, saveVideoContent } from "../api/Api";
import { useAuth } from "../context/AuthContext";

function VideoPage() {
  // const demoContents = [
  //   {
  //     id: 'c1',
  //     title: 'My first video',
  //     data: 'nC7j3UKyIbA'
  //   },
  //   {
  //     id: 'c2',
  //     title: 'My second video',
  //     data: '4GxLkMmGURA'
  //   },
  //   {
  //     id: 'c3',
  //     title: 'My third video',
  //     data: 'gEC8IEZYxc0'
  //   },
  //   {
  //     id: 'c4',
  //     title: 'My fourth video',
  //     data: 'U1JLtpJTe84'
  //   }
  // ];

  const {user} = useAuth();
  const [content, setContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { moduleId, contentId } = useParams();
  const { course, setCourse } = useOutletContext();
  const navigate = useNavigate();
  const handleSave = async () => {
    const newTitle = document.getElementById("title").innerText;
    const videoFileInput = document.getElementById("videoFile");
    const videoFile = videoFileInput?.files?.[0];

    if (!newTitle) {
      alert("Title cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("title", newTitle);
    if (videoFile) {
      formData.append("video", videoFile);
    }

    try {
      const content = await saveVideoContent(contentId, formData);
      if (content) {
        setContent(content);
        setCourse((course) => {
          const updatedModules = course.modules.map((mod) => {
            const updatedContents = mod.contents.map((con) => {
              if (con._id === contentId) {
                return content;
              }
              return con;
            });
            return {
              ...mod,
              contents: updatedContents,
            };
          });
          return {
            ...course,
            modules: updatedModules,
          };
        });
      }
    } catch (err) {
      alert("Failed to save changes");
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    document.getElementById("title").innerText = content.title;
    setIsEditing(false);
  };

  const handleContentDelete = async () => {
    try {
      await deleteContent(moduleId, contentId);
      setCourse((course) => {
        const updatedModules = course.modules.map((m) => {
          const updatedContents = m.contents.filter((c) => c._id !== contentId);
          return {
            ...m,
            contents: updatedContents,
          };
        });
        return {
          ...course,
          modules: updatedModules,
        };
      });
      navigate(`/course/${course._id}`, { replace: true });
    } catch (err) {
      alert("Error deleting content");
    }
  };

  useEffect(() => {
    (async function fetchContent() {
      setIsEditing(false);
      setIsLoading(true);
      const content = await getContentById(contentId);
      console.log(content);
      setContent(content);
      setIsLoading(false);
    })();
  }, [contentId]);

  if (isLoading) return <div>Loading...</div>;
  if (!content) return <div>Content not found.</div>;
  return (
    <div className="video-page">
      <div
        contentEditable={isEditing ? true : false}
        className={isEditing ? "editable-div" : ""}
        id="title"
      >
        {content.title}
      </div>
      {isEditing ? (
        <form>
          <input id="videoFile" type="file" accept="video/*" />
        </form>
      ) : content.data ? (
        <iframe
          title={content.title}
          src={`https://youtube.com/embed/${content.data}?rel=0`}
          allowFullScreen
          frameBorder={0}
          className="video"
        ></iframe>
      ) : (
        <div className="no-content">No video content found!</div>
      )}
      {user.role!=='student'&& <OptionsButton
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleDelete={handleContentDelete}
      />}
    </div>
  );
}

export default VideoPage;
