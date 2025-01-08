import React from 'react'
import { useParams } from "react-router-dom";
function detailSchedule() {
    const { scheduleId } = useParams(); 
    console.log(scheduleId);
  return (
    <div>
      Detail Schedule
    </div>
  )
}

export default detailSchedule
