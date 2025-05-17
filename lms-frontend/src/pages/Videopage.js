import React, { useEffect, useState } from 'react';
import '../styles/VideoPage.css';
import OptionsButton from '../components/OptionsButton';
import { useParams } from 'react-router-dom';

function VideoPage() {
  const content = {
    title:'My first video',
    data: 'code'
  }

  const [isEditing, setIsEditing] = useState(false);
  const {contentId} = useParams();
  return (
    <div className="video-page">
      <div contentEditable={isEditing?true:false} className={isEditing?'editable-div':''} id='title'>{content.title}</div>
      <iframe
        title={content.title}
        src={`https://youtube.com/embed/${contentId}?rel=0`}
        allowFullScreen
        frameBorder={0}
        className='video'
      ></iframe>
      <OptionsButton isEditing={isEditing} setIsEditing={setIsEditing}/>
    </div>
  );
}

export default VideoPage;
