import React from "react";

const ToggleSwitch = ({ disabled, toggle, status, statusText }) => {
    return (
        <>
            <span className={`px-2 py-1 w-18 text-sm rounded-full font-bold text-center ${status ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>{statusText}</span>
            <button
                disabled={disabled}
                onClick={toggle}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition cursor-pointer ${status ? "bg-green-700" : "bg-gray-400"} disabled:cursor-not-allowed disabled:bg-red-200`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition curosor-pointer ${status ? "translate-x-5" : "translate-x-1"}`} />
            </button>
        </>
    );
};

export default ToggleSwitch;
