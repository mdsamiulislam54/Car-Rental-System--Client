// Components/ModifyBookingModal.jsx
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ModifyBookingModal = ({ isOpen, onClose, booking, handleConfirmModifyDate ,setEndtDate,setStartDate,startDate,endDate}) => {
 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Modify Booking</h2>

        {/* Start Date */}
        <label className="block text-sm font-medium">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        {/* End Date */}
        <label className="block text-sm font-medium">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndtDate(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

       

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 rounded text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmModifyDate}
            className="px-4 py-2 bg-blue-600 rounded text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyBookingModal;
