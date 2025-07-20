import React, { useEffect, useState } from 'react'
import '../styles/StudentPanel.css';
import Progress from '../components/Progress';
import { getEnrolledStudents, syncStudents } from '../api/Api';
import { useOutletContext } from 'react-router-dom';
function StudentPanel() {
    const {course, setCourse} = useOutletContext();
    const [students, setStudents] = useState([]);
    const [trigger, setTrigger] = useState(false);

    const handleClick = async()=>{
        if(!course) return;
        await syncStudents(course._id);
        setTrigger(prev=>!prev);
    }

    useEffect(()=>{
        const loadStudents = async()=>{
            if(!course) return;
            console.log(course);
            const data = await getEnrolledStudents(course._id);
            setStudents(data);
        }
        loadStudents();
    },[course, trigger]);
  return (
    <div className='studentpanel'>
        <h2 className='heading'>Students Enrolled</h2>
        <button className='sync-btn' onClick={handleClick}>Sync students</button>
        <table className='stu-tbl'>
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Progress</th>
                </tr>
            </thead>
            <tbody>
                {students.length===0?
                <tr>
                    <td colSpan={2}>No students enrolled yet</td>
                </tr>
                :students.map((student)=>(<tr>
                    <td>{student.student.username}</td>
                    <td><div>
                        <p>{student.progress*100}</p>
                        <progress value={student.progress}/>
                    </div></td>
                </tr>))}
            </tbody>
        </table>
    </div>
  )
}

export default StudentPanel