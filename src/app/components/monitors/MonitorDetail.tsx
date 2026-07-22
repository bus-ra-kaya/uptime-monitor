'use client';

import { Monitor } from "@/lib/monitor";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  monitor: Monitor;
  onSaved: (updated: Monitor) => void;
}

export default function MonitorDetail ({monitor, onSaved} : Props){

  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // not sure what to place as the snapshot or monitordata??
  const [snapshot, setSnapshot] = useState<Monitor>(monitor)
  const [monitorData, setMonitorData] = useState<Monitor>(monitor);
  const [errors, setErrors] = useState<Partial<Record<keyof Monitor, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const startEditing = () => {
    setSnapshot(monitor);
    setIsEditing(true);
  }

  const cancelEditing = () => {
    setMonitorData(snapshot);
    setErrors({});
    setSubmitError(null);
    setIsEditing(false);
  }

  const update = <K extends keyof Monitor>(key: K, value: Monitor[K]) => {
    setMonitorData((prev) => ({...prev, [key]: value}));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  const validate = ():boolean => {
    const next: Partial<Record<keyof Monitor, string>> = {};

    if(!monitorData.name.trim()) next.name = 'Name is required';

    if(!monitorData.url.trim()) {
      next.url = 'URL is required';
    } else {
      try {
        new URL(monitorData.url);
      } catch {
        next.url = 'Must be a valid URL(include https://)';
      }
    }
    if(monitorData.frequency < 1 || monitorData.frequency > 1440) {
      next.frequency = 'Frequency must be between 1 and 1440 minutes';
    }
    if(monitorData.timeout < 1 || monitorData.timeout > 60){
      next.timeout = 'Timeout must be between 1 and 60 seconds';
    }

    if(monitorData.expectedStatusCode < 100 || monitorData.expectedStatusCode > 599) {
      next.expectedStatusCode = 'Must be a valid HTTP status code';
    }

    if(monitorData.notificationMethod === 'webhook' && monitorData.webhookUrl && ! monitorData.webhookUrl.trim()){
      next.webhookUrl = 'Webhook URL is required';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }


  return (
    <div>
    </div>
  )
}