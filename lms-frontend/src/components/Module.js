import React, { useState } from "react";
import '../styles/Module.css'
import { useNavigate } from "react-router-dom";

function Module({ module }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();
  return (
    <div className="module">
      <div style={{fontWeight:600}} onClick={()=>setIsOpen((prev)=>!prev)}>{module.title}</div>
      {isOpen && (
        <ul>
          {module.materials.map((material) => (
            <li onClick={()=>navigate(`${material.link}`)}>{material.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Module;
