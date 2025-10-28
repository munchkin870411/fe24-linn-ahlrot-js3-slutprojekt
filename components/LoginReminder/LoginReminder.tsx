"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type LoginReminderProps = {
  show: boolean;
};

export default function LoginReminder({ show }: LoginReminderProps) {
  const searchParams = useSearchParams();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (!show) return;
    if (searchParams?.get("loginRequired") === "1") {
      setShouldShow(true);
      // Remove the param from the URL
      const params = new URLSearchParams(window.location.search);
      params.delete("loginRequired");
      window.history.replaceState({}, "", window.location.pathname + (params.toString() ? `?${params}` : ""));
    }
  }, [show, searchParams]);

  if (!show || !shouldShow) return null;
  return (
    <div style={{
      background: '#fff3cd',
      color: '#856404',
      border: '1px solid #ffeeba',
      borderRadius: 4,
      padding: '12px 16px',
      margin: '16px 0',
      fontWeight: 500
    }}>
      You must be logged in to view country details.
    </div>
  );
}
