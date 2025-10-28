"use client";
import React from "react";

export default function ErrorRetry({ message }: { message: string }) {
  return (
    <div role="alert" style={{ color: "red", margin: "2rem 0" }}>
      <p>{message}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
}
