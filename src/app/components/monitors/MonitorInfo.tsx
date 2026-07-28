'use client';

import { Monitor, MonitorFormData } from "@/lib/monitor";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  monitor: Monitor;
}

function toFormData (monitor: Monitor){
  return {
  name: monitor.name,
  url: monitor.url,
  method: monitor.method,
  expectedStatusCode: monitor.expectedStatusCode,
  frequency: monitor.frequency,
  timeout: monitor.timeout,
  notificationMethod: monitor.notificationMethod,
  ...(monitor.webhookUrl && {webhookUrl: monitor.webhookUrl}),
  ...(monitor.payload && {payload: monitor.payload}),
}};

export default function MonitorInfo ({monitor} : Props){

  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<MonitorFormData>(toFormData(monitor))
  const [formData, setFormData] = useState<MonitorFormData>(toFormData(monitor));
  const [errors, setErrors] = useState<Partial<Record<keyof MonitorFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null); 

  const startEditing = () => {
    setSnapshot(formData);
    setIsEditing(true);
  }

  const cancelEditing = () => {
    setFormData(snapshot);
    setErrors({});
    setSubmitError(null);
    setIsEditing(false);
  }

  const update = <K extends keyof MonitorFormData>(key: K, value: MonitorFormData[K]) => {
    setFormData((prev) => ({...prev, [key]: value}));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  const validate = ():boolean => {
    const next: Partial<Record<keyof MonitorFormData, string>> = {};

    if(!formData.name.trim()) next.name = 'Name is required';

    if(!formData.url.trim()) {
      next.url = 'URL is required';
    } else {
      try {
        new URL(formData.url);
      } catch {
        next.url = 'Must be a valid URL(include https://)';
      }
    }
    if(formData.frequency < 1 || formData.frequency > 1440) {
      next.frequency = 'Frequency must be between 1 and 1440 minutes';
    }
    if(formData.timeout < 1 || formData.timeout > 60){
      next.timeout = 'Timeout must be between 1 and 60 seconds';
    }

    if(formData.expectedStatusCode < 100 || formData.expectedStatusCode > 599) {
      next.expectedStatusCode = 'Must be a valid HTTP status code';
    }

    if(formData.notificationMethod === 'webhook' && formData.webhookUrl && ! formData.webhookUrl.trim()){
      next.webhookUrl = 'Webhook URL is required';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!isEditing) return;
    if(!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`/api/monitors/${monitor.id}`, {
        method: 'PATCH',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formData),
      });

      if(!res.ok){
        const body = await res.json().catch(() => null);
        throw new Error (body?.error ?? `Request failed (${res.status})`);
      }

      const updated: Monitor = await res.json();

      setSnapshot(toFormData(updated));
      setFormData(toFormData(updated));
      setIsEditing(false);

      router.refresh();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  const locked = !isEditing;


  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-surface border-2 border-border-strong px-12 py-8 rounded-xl flex items-center flex-col justify-center max-w-5xl"
    >

     <div className="grid grid-cols-[1fr_auto_1fr] mb-10 items-center w-full">
      <div />

      <h2 className="text-xl">
        {monitor.name}
      </h2>

      {!isEditing && (
        <button
          className="btn h-12 w-32 justify-self-end"
          onClick={startEditing}
        >
          Edit
          <Pen size={16} />
        </button>
      )}
    </div>

      <div className="grid grid-cols-[120px_260px_140px_260px] items-center gap-2 mb-4">
        
        <label htmlFor="name">Name:</label>
        <div>
          <input
            id="name"
            value={formData.name}
            onChange={(e) => update('name', e.target.value)}
            disabled={locked}
            className="input"
          />
          {errors.name && <p className="text-danger text-sm">{errors.name}</p>}
        </div>
        
        <label htmlFor="url" className="ml-8">Url:</label>
        <div>
          <input
            id="url"
            placeholder="https://example.com/health"
            value={formData.url}
            onChange={(e) => update('url', e.target.value)}
            className="input"
            disabled={locked}
          />
          {errors.url && <p className="text-danger text-sm">{errors.url}</p>}
        </div>
        

        <label htmlFor="method">Method:</label>
        <select 
          id="method"
          value={formData.method}
          onChange={(e) => update('method', e.target.value as MonitorFormData['method'])}
          className="input"
          disabled={locked}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="HEAD">HEAD</option>
        </select>

        <label htmlFor="frequency" className="ml-8">Frequency:</label>
        <div>
          <input 
            type="number"
            id='frequency'
            value={formData.frequency}
            onChange={(e) => update('frequency', Number(e.target.value))}
            className="input"
            disabled={locked} />
            {errors.frequency && (
              <p className="text-danger text-sm">{errors.frequency}</p>
            )} 
        </div>

        <label htmlFor="timeout">Timeout:</label>
        <div>
          <input 
            type="number"
            id='timeout'
            value={formData.timeout}
            onChange={(e) => update('timeout', Number(e.target.value))}
            className="input"
            disabled={locked} />
            {errors.timeout && (
              <p className="text-danger text-sm">{errors.timeout}</p>
            )}
        </div>

        <label htmlFor="expectedStatusCode" className="ml-8">Expected status code:</label>
        <div>
          <input 
            type="number"
            id='expectedStatusCode'
            value={formData.expectedStatusCode}
            className="input"
            disabled={locked}
            onChange={(e) => update('expectedStatusCode', Number(e.target.value))} />
        </div>

        <label htmlFor="notificationMethod">Notification method:</label>
        <select 
          id="notificationMethod"
          value={formData.notificationMethod}
          className="input"
          disabled={locked}
          onChange={(e) =>
            update('notificationMethod', e.target.value as MonitorFormData['notificationMethod'])
          }>
            <option value="email">Email</option>
            <option value="webhook">Webhook</option>
            <option value="none">None</option>
          </select>

          {formData.notificationMethod === 'webhook' && (
            <>
              <label htmlFor="webhookUrl" className="ml-8">Webhook URL:</label>
              <div>
                <input 
                  id='webhookUrl'
                  value={formData.webhookUrl}
                  onChange={(e) => update('webhookUrl', e.target.value)}
                  className="input"
                  disabled={locked || formData.notificationMethod !== 'webhook'}
                />
                {errors.webhookUrl && (
                  <p className="text-danger text-sm">{errors.webhookUrl}</p>
                )}
              </div>
            </>
          )}
        
          {formData.method === 'POST'  && (
            <>
              <label htmlFor="payload">Payload:</label>
              <textarea
                id='payload'
                value={formData.payload}
                disabled={locked || formData.method !== 'POST'}
                onChange={(e) => update('payload', e.target.value)}
                rows={4}
              />
              </>
        )}
      </div>

      {submitError && <p className="text-danger text-sm">{submitError}</p>}

      {isEditing &&
     ( <div className="flex justify-around w-full mt-4">
        <button type='submit' className="btn btn-secondary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
        <button type='button' className="btn" onClick={cancelEditing} disabled={isSubmitting}>
          Cancel
        </button>
      </div> )}
    </form>
  )
}