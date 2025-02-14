import React, { useState } from "react";
import { Clock, Plus, X, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

const _weekDays = [
  { index: 0, day: "S", name: "Sunday", isUnavailable: true, times: [] },
  {
    index: 1,
    day: "M",
    name: "Monday",
    times: [{ start: "9:00am", end: "5:00pm" }],
    isUnavailable: false,
  },
  {
    index: 2,
    day: "T",
    name: "Tuesday",
    times: [{ start: "9:00am", end: "5:00pm" }],
    isUnavailable: false,
  },
  {
    index: 3,
    day: "W",
    name: "Wednesday",
    times: [{ start: "9:00am", end: "5:00pm" }],
    isUnavailable: false,
  },
  {
    index: 4,
    day: "Th",
    name: "Thursday",
    times: [
      { start: "9:00am", end: "5:00pm" },
      { start: "6:00pm", end: "7:00pm" },
    ],
    isUnavailable: false,
  },
  {
    index: 5,
    day: "F",
    name: "Friday",
    times: [{ start: "9:00am", end: "5:00pm" }],
    isUnavailable: false,
  },
  { index: 6, day: "St", name: "Saturday", isUnavailable: true, times: [] },
];

const WeeklyHours = () => {
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalSelectedDays, setModalSelectedDays] = useState([]);

  const [weekDays, setWeekDays] = useState(_weekDays);

  const addNewTimeSlot = (dayIndex) => {
    const updatedWeekDays = [...weekDays];
    if (updatedWeekDays[dayIndex].isUnavailable) {
      updatedWeekDays[dayIndex] = {
        ...updatedWeekDays[dayIndex],
        isUnavailable: false,
        times: [{ start: "9:00am", end: "5:00pm" }],
      };
    } else {
      updatedWeekDays[dayIndex].times.push({ start: "9:00am", end: "5:00pm" });
    }
    // In a real application, you would use setState here
  };

  const handleCopyClick = (dayIndex) => {
    setSelectedDay(weekDays[dayIndex]);
    setShowCopyModal(true);
    console.log("Copy clicked", weekDays[dayIndex]);
    // make a copy
    // set the copy in the state
  };

  const replaceTimeSlot = (fromDayIndex, toDayIndex) => {
    // Create a new copy of weekDays to ensure immutability
    console.log("fromDayIndex", fromDayIndex, "toDayIndex", toDayIndex);
    const updatedWeekDays = weekDays.map((day) => ({ ...day }));

    const fromDay = updatedWeekDays[fromDayIndex];

    toDayIndex.forEach((index) => {
      updatedWeekDays[index] = {
        ...updatedWeekDays[index], // Ensure new object reference
        isUnavailable: false,
        times: [...fromDay.times], // Copy times array to avoid mutation
      };
    });

    console.log("updatedWeekDays", updatedWeekDays);
    setWeekDays(updatedWeekDays); // React detects the new state
  };

  console.log("modalSelectedDays", modalSelectedDays);

  return (
    <div className="max-w-3xl p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <h2 className="text-lg font-medium">Weekly Hours</h2>
        </div>
        <div className="flex items-center space-x-6">
          <div>
            <h2 className="text-lg font-medium">Date-specific hours</h2>
            <p className="text-sm text-gray-500">
              Adjust hours for specific days
            </p>
          </div>
          <button className="flex items-center space-x-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            <Plus className="w-4 h-4" />
            <span>Hours</span>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Set when you are typically available for meetings
      </p>

      <div className="space-y-3">
        {weekDays.map((day, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-700 text-white rounded-full">
              {day.day}
            </div>

            {day.isUnavailable ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Unavailable</span>
                <button
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={() => addNewTimeSlot(index)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex-1 space-y-2">
                {day.times.map((time, timeIndex) => (
                  <div key={timeIndex} className="flex items-center space-x-2">
                    <div className="flex space-x-2">
                      <div className="bg-gray-100 px-3 py-1 rounded">
                        {time.start}
                      </div>
                      <span>-</span>
                      <div className="bg-gray-100 px-3 py-1 rounded">
                        {time.end}
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={() => addNewTimeSlot(index)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={() => handleCopyClick(index)}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="text-blue-600 text-sm flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>India Standard Time</span>
        </button>
      </div>

      <Dialog open={showCopyModal} onOpenChange={setShowCopyModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Copy times to...</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Copy availability from {selectedDay?.name} to the following days
          </DialogDescription>
          <div className="space-y-3 py-4">
            {weekDays
              // remove selected day
              .filter((day, index) =>
                selectedDay ? index !== selectedDay.index : day
              )
              .map((day, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    onChange={() => {
                      if (modalSelectedDays.includes(index)) {
                        setModalSelectedDays(
                          modalSelectedDays.filter((day) => day !== index)
                        );
                      } else {
                        setModalSelectedDays([...modalSelectedDays, index]);
                      }
                    }}
                    type="checkbox"
                    id={`day-${index}`}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label htmlFor={`day-${index}`} className="text-sm">
                    {day.name}
                  </label>
                </div>
              ))}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
              onClick={() => setShowCopyModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              onClick={() => {
                replaceTimeSlot(selectedDay.index, modalSelectedDays);
                setShowCopyModal(false);
              }}
            >
              Apply
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WeeklyHours;
