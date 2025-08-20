import React, { useEffect, useRef, useState } from 'react'
import '../styles/ContentsBar.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuPanelLeftClose } from "react-icons/lu";
import { LuShuffle } from "react-icons/lu";
import { CgFolderAdd } from "react-icons/cg";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd'
import { useNavigate } from 'react-router-dom';
import { createContent, createModule, deleteModule, reorderCourse } from '../api/Api';
import { useAuth } from '../context/AuthContext';

function ContentsBar({course, setCourse}) {
  const {user} = useAuth();
  console.log(course)
  const [openModuleId, setOpenModuleId] = useState(null);
  const [openOptionId, setOpenOptionId] = useState(null);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate=useNavigate();
  
  // const [modules, setModules] = useState(course.modules||[]);

  const handleModuleDelete = async(courseId, moduleId)=>{
    try{
      await deleteModule(courseId, moduleId);
      setCourse(course=>{
        const updatedModules = course.modules.filter(mod=>mod._id!==moduleId);
        return {
          ...course,
          modules:updatedModules
        }
      })
    }catch(err){
      alert('Error deleting module');
    }
  }

  const handleShuffleClk = ()=>{
    setIsShuffleOn(true);
  }

  const handleShuffleSaveClk = async()=>{
    await reorderCourse(course._id, {reorderedCourse:course});
    setIsShuffleOn(false);
  }

  const handleAddContent = async(moduleId, type)=>{
    try{
      const newContent = await createContent(course._id, moduleId, {type});
      if(!newContent)return;
    setCourse(prevCourse => {
      const updatedModules = prevCourse.modules.map(module=>{
        if(module._id===moduleId){
          return {
            ...module,
            contents:[...module.contents, newContent]
          }
        }
        return module;
      });
      
      return {...prevCourse, modules:updatedModules};
    });
    setOpenModuleId(moduleId);
    navigate(`/course/${course._id}/module/${moduleId}/${type}/${newContent._id}`);
  }catch(err){
      alert('Server error');
    }
  }
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const module = await createModule(course._id,{title});
    if(module){
      setCourse(prev=>({...prev, modules: [...prev.modules,module]}));
    }else{
      alert('Error creating module');
    }
    setIsModuleModalOpen(false);
  }

  const onDragEnd = (result) => {
    const {source,destination,type} = result;
    if(!destination)return;
    
    const newCourse = {...course};
    
    if(type==="module"){
      const items = Array.from(course.modules);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index,0,reorderedItem);
      newCourse.modules=items;
    }else if(type==="content"){
      const sourceModule = course.modules.find(
        (mod)=>mod._id===source.droppableId
      );
      
      const destModule = course.modules.find(
        (mod)=>mod._id===destination.droppableId
      );
      
      const sourceItems = [...sourceModule.contents];
      const [movedItem] = sourceItems.splice(source.index,1);
      
      if(source.droppableId===destination.droppableId){
        sourceItems.splice(destination.index,0,movedItem);
        sourceModule.contents=sourceItems;
      }else{
        const destItems = [...destModule.contents];
        destItems.splice(destination.index,0,movedItem);
        sourceModule.contents=sourceItems;
        destModule.contents=destItems;
      }
    }
    setCourse(newCourse);

  }

  const optionRef = useRef(null);

  useEffect(()=>{
    const handleClickOutside = (e)=>{
      if(optionRef.current && !optionRef.current.contains(e.target))
      setOpenOptionId(null);
    }
    window.addEventListener('mousedown', handleClickOutside);
    return ()=>window.removeEventListener('mousedown',handleClickOutside);
  },[]);
  
  if(!course) return null;
  return (
    <div className={`content-bar ${isSidebarOpen?'open':''}`}>
    <div className='bar-top'>
      <IoMdArrowRoundBack className='bar-top-btns' onClick={()=>navigate(-1)}/>
      <div className='bar-top-right'>
      {user.role!=='student'&&<FiUsers className='bar-top-btns' onClick={()=>navigate(`students`)}/>}
      {user.role!=='student'&&<CgFolderAdd className='bar-top-btns' onClick={()=>setIsModuleModalOpen(prev=>!prev)}/>}
      {user.role!=='student'&&<div>{isShuffleOn?<FaRegCheckCircle style={{backgroundColor:'#355f42'}} className='bar-top-btns' onClick={handleShuffleSaveClk}/>:<LuShuffle className='bar-top-btns' onClick={handleShuffleClk}/>}</div>}
      <LuPanelLeftClose onClick={()=>setIsSidebarOpen(prev=>!prev)} className={`bar-top-btns ${isSidebarOpen?'':'fixed'}`}/>
      </div>
    </div>
    {isModuleModalOpen && <div>
    <div className='module-modal-bg'></div>
      <div className='module-modal'>
        <form onSubmit={handleSubmit}>
          <h2 style={{margin:'0'}}>Module</h2>
          <div className='form-input'>
          <label htmlFor='title'>Title :</label>
          <input name='title' id='title'/>
          </div>
          <div id='module-action-btns'>
          <button onClick={(e)=>{e.preventDefault();setIsModuleModalOpen(false)}}>Cancel</button>
          <button type='submit'>Submit</button>
          </div>
        </form>
        </div>
    </div>}
    <div>
    <h2 className='course-title'>{course.title}</h2>
    </div>
    {course.modules.length===0 ? <div style={{fontSize:'1.2em', textAlign:'center'}}>No module</div>:
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='modules' type='module'>
        {(provided)=>(
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {course.modules.map((module, moduleIndex)=>(
              <Draggable key={module._id} draggableId={module._id} index={moduleIndex}>
                {(provided)=>(
                  <div 
                    className='module'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...(isShuffleOn ? provided.dragHandleProps : {})}
                  >
                    <div className='module-title'><div style={{fontWeight:600,flex:1}} onClick={()=>setOpenModuleId(prev => prev===module._id?null:module._id)}>{module.title}</div>{user.role!=='student'&&<button className='module-opns' onClick={(e)=>{e.stopPropagation();setOpenOptionId(prev=>prev===module._id?null:module._id)}}><SlOptionsVertical className='module-opns'/></button>}</div>
                    {openOptionId===module._id && <div className='module-options' ref={optionRef}>
                      <ul className='module-options-list'>
                        <li onClick={()=>handleAddContent(module._id, "video")}>Add Content</li>
                        <li>Rename</li>
                        {module.isPublished?<li>Unpublish</li>:<li>Publish</li>}
                        <li style={{color:'red'}} onClick={()=>handleModuleDelete(course._id, module._id)}>Delete</li>
                      </ul>
                    </div>}
                    {(openModuleId===module._id||isShuffleOn) && 
                    <Droppable droppableId={module._id} type='content'>
                      {(provided)=>(
                        <div className='list' ref={provided.innerRef} {...provided.droppableProps}>
                          {module.contents.length===0?
                          <div className='list-itm'>No content</div>

                          :module.contents.map((content, contentIndex)=>(
                            <Draggable key={content._id} draggableId={content._id} index={contentIndex}>
                              {(provided)=>(
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...(isShuffleOn ? provided.dragHandleProps :{})}
                                  >
                                    <div className='list-itm' onClick={()=>navigate(`module/${module._id}/${content.type}/${content._id}`)}>{content.title}</div>
                                  </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                )}
                    </Droppable>
                    }
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
    }
    </div>
  )
}

export default ContentsBar