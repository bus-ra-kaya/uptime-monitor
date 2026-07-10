import { error } from "console";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
}

type FormData = {
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'HEAD';
  expectedStatusCode: number;
  frequency: number;
  notificationMethod: 'email' | 'webhook' | 'none';
  webhookUrl: string;
  payload: string;
}

const initialFormData: FormData = {
  name: '',
  url: '',
  method: 'GET',
  expectedStatusCode: 200,
  frequency: 5,
  notificationMethod: 'email',
  webhookUrl: '',
  payload: '',
}

export default function AddNewEndpoint ({onSuccess, onCancel}: Props){

  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);


  // might need to go over the update function
  function update<K extends keyof FormData>(key: K, value: FormData[K]){
    setFormData((prev) => ({...prev, [key]: value}));
    if(errors[key]) setErrors ((prev) => ({...prev, [key]: undefined})); 
  }

  // might need to go over the validate function
  function validate():boolean {
    const next: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) next.name= 'Name is required';

    if(!formData.url.trim()) {
      next.url = 'URL is required';
    } else {
      try { 
        new URL(formData.url);
      } catch {
        next.url = 'Must be a valid URL (include https://)';
      }
    }

    if(formData.frequency < 1 || formData.frequency > 1440) {
      next.frequency = 'Frequency must be between 1 and 1440 minutes';
    }

    if (formData.expectedStatusCode < 100 || formData.expectedStatusCode > 599) {
      next.expectedStatusCode = 'Must be a valid HTTP status code';
    }

    if (formData.notificationMethod === 'webhook' && !formData.webhookUrl.trim()) {
      next.webhookUrl = 'Webhook URL is required';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if(!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try{
      const res = await fetch('/api/monitors', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      if(!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }

      onSuccess();
      router.refresh();
    } catch ( err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-surface border-2 border-border-strong px-32 py-8 rounded-xl flex items-center flex-col"
    >

      <h2 className="text-xl text-center mb-10">Add a new endpoint</h2>

      <div className="grid grid-cols-[140px_260px] items-center gap-2 mb-4">
        
        <label htmlFor="name">Name:</label>
        <div>
          <input
            id="name"
            value={formData.name}
            onChange={(e) => update('name', e.target.value)}
            className="input"
          />
          {errors.name && <p className="text-danger text-sm">{errors.name}</p>}
        </div>

        <label htmlFor="url">Url:</label>
        <div>
          <input
            id="url"
            placeholder="https://example.com/health"
            value={formData.url}
            onChange={(e) => update('url', e.target.value)}
            className="input"
          />
          {errors.url && <p className="text-danger text-sm">{errors.url}</p>}
        </div>

        <label htmlFor="method">Method:</label>
        <select 
          id="method"
          value={formData.method}
          onChange={(e) => update('method', e.target.value as FormData['method'])}
          className="input"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="HEAD">HEAD</option>
        </select>

        <label htmlFor="frequency">Frequency:</label>
        <div>
          <input 
            type="number"
            id='frequency'
            value={formData.frequency}
            onChange={(e) => update('frequency', Number(e.target.value))}
            className="input" />
            {errors.frequency && (
              <p className="text-danger text-sm">{errors.frequency}</p>
            )} 
        </div>

        <label htmlFor="expectedStatusCode">Expected status code:</label>
        <div>
          <input 
            type="number"
            id='expectedStatusCode'
            value={formData.expectedStatusCode}
            className="input"
            onChange={(e) => update('expectedStatusCode', Number(e.target.value))} />
        </div>

        <label htmlFor="notificationMethod">Notification method:</label>
        <select 
          id="notificationMethod"
          value={formData.notificationMethod}
          className="input"
          onChange={(e) =>
            update('notificationMethod', e.target.value as FormData['notificationMethod'])
          }>
            <option value="email">Email</option>
            <option value="webhook">Webhook</option>
            <option value="none">None</option>
          </select>

          {formData.notificationMethod === 'webhook' && (
            <>
              <label htmlFor="webhookUrl">Webhook URL:</label>
              <div>
                <input 
                  id='webhookUrl'
                  value={formData.webhookUrl}
                  onChange={(e) => update('webhookUrl', e.target.value)}
                  className="input"
                />
                {errors.webhookUrl && (
                  <p className="text-danger text-sm">{errors.webhookUrl}</p>
                )}
              </div>
            </>
          )}

          {formData.method === 'POST' && (
            <>
              <label htmlFor="payload">Payload:</label>
              <textarea
                id='payload'
                value={formData.payload}
                onChange={(e) => update('payload', e.target.value)}
                rows={4}
              />
            </>
          )}
      </div>

      {submitError && <p className="text-danger text-sm">{submitError}</p>}
      
      <div className="flex justify-around w-full mt-4">
        <button type='submit' className="btn btn-secondary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
        <button type='button' className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}