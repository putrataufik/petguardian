import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuthUser } from "../hooks/authHooks";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import locationIcon from "../assets/locationMark.png";
import calendarIcon from "../assets/calendar.png";
import clockIcon from "../assets/clock.png";

const DetailSchedule = () => {
  const { scheduleId } = useParams();
  const user = useAuthUser();
  const [schedule, setSchedule] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [openBottom, setOpenBottom] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      console.log(user)
      console.log(user.uid)
      if (!user || !user.uid) {
        setError("User is not authenticated.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/schedules/getschedule/${user.uid}`
        );

        const foundSchedule = response.data.schedule.find(
          (item) => item.scheduleID === scheduleId
        );

        if (foundSchedule) {
          setSchedule(foundSchedule);
          setFormData(foundSchedule); // Isi formData dengan data jadwal
        } else {
          setError("Schedule not found.");
        }
      } catch (err) {
        setError("Failed to fetch schedule details.");
        console.error(err);
      }
    };

    fetchSchedule();
  }, [scheduleId, user?.uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/schedules/updateschedule/${scheduleId}`,
        formData
      );
      console.log("Schedule updated successfully:", response.data);
      setSchedule((prev) => ({ ...prev, ...formData }));
      setOpenBottom(false); // Tutup drawer setelah menyimpan
    } catch (error) {
      console.error("Failed to update schedule:", error);
    }
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-24 flex flex-col items-center">
      <div className="w-full flex justify-center items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Schedule Details</h1>
      </div>

      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md relative">
        {schedule ? (
          <>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {schedule.event}
                </h2>
              </div>

              <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => setOpenBottom(true)}
              >
                <PencilIcon className="h-5 w-5" />
              </IconButton>
            </div>

            <div className="flex justify-center gap-5 text-gray-600 text-sm mt-4">
              {/* Location */}
              <div className="flex items-center gap-2">
                <img
                  src={locationIcon}
                  alt="Location Icon"
                  className="w-4 h-4"
                />
                <span>{schedule.location}</span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <img src={calendarIcon} alt="Calender Icon" className="w-4 h-4" />
                <span>{schedule.date}</span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2">
                <img src={clockIcon} alt="Clock Icon" className="w-4 h-4" />
                <span>{schedule.time}</span>
              </div>
            </div>


            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800">Note</h3>
              <p className="text-sm mt-2 text-gray-600">{schedule.note}</p>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/schedule")}
                className="bg-black text-white py-2 px-6 mt-20 rounded-lg shadow-md w-40"
              >
                Back
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-red-500">Schedule not found.</div>
        )}
      </div>

      <Drawer
        open={openBottom}
        onClose={() => setOpenBottom(false)}
        placement="right"
        className="h-[80vh] p-6 overflow-y-auto"
      >
        <Typography variant="h5" className="mb-6">
          Edit Schedule
        </Typography>
        <div className="space-y-4">
          <Input
            label="Event"
            name="event"
            value={formData.event || ""}
            onChange={handleInputChange}
          />
          <Input
            label="Location"
            name="location"
            value={formData.location || ""}
            onChange={handleInputChange}
          />
          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date || ""}
            onChange={handleInputChange}
          />
          <Input
            label="Time"
            name="time"
            type="time"
            value={formData.time || ""}
            onChange={handleInputChange}
          />
          <Textarea
            label="Note"
            name="note"
            value={formData.note || ""}
            onChange={handleInputChange}
            rows="5"
            className="mt-1 block w-full"
          />

        </div>
        <div className="flex justify-center mt-6">
          <Button color="pink" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default DetailSchedule;
