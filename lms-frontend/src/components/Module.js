import React, { useState } from "react";
import '../styles/Module.css'

function Module({ module }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="module">
      <div style={{fontWeight:600}} onClick={()=>setIsOpen((prev)=>!prev)}>{module.title}</div>
      {isOpen && (
        <ul>
          {module.materials.map((material) => (
            <li>{material}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Module;
