"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { tr } from "zod/v4/locales";

interface Message {
  type: "success" | "error";
  text: string;
}

export const useToastMessage = () => {
  const [message, setMessage] = useState<Message | null>(null);
useEffect(() => {
  if (!message) return;
  if (message.type === "success") toast.success(message.text);
  else toast.error(message.text); 
}, [message?.text]);


  return { message, setMessage };
};
