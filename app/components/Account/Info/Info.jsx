"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../hooks/useAuth";
import { format } from 'date-fns';

export default function Info() {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faUserCircle}
          className="text-indigo-500 text-9xl mb-4"
        />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-3">{user.username}</h2>

        <h2 className="text-lg  mb-4">{user.email}</h2>
        <h2 className="text-sm font-semibold text-gray-400">
          Miembro desde {format(new Date(user.createdAt), "dd/MM/yyyy")}
        </h2>
      </div>
    </div>
  );
}
