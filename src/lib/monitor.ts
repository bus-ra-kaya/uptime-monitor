import { monitor } from '@/db/schema';
import { createSelectSchema } from 'drizzle-zod';
import {z} from 'zod';

export const createMonitorSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    url: z.url('Must be a valid URL'),
    method: z.enum(['GET', 'POST', 'HEAD']),
    expectedStatusCode: z.coerce.number().int().min(100).max(599),
    payload: z.string().optional(),
    notificationMethod: z.enum(['email', 'webhook', 'none']),
    frequency: z.coerce.number().int().min(1).max(1440),
    timeout: z.coerce.number().int().positive(),
    webhookUrl: z.url().optional(),
  })
  .superRefine((data, ctx) => {

     const hasWebhookUrl = !!data.webhookUrl && data.webhookUrl !== "";

    if(data.notificationMethod === 'webhook' && !hasWebhookUrl){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['webhookUrl'],
        message: 'Webhook URL is required when notification method is webhook'
      });
    }
    if(hasWebhookUrl && !z.url().safeParse(data.webhookUrl).success){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['webhookUrl'],
        message: 'Must be a valid URL'
      })
    }
    if((data.method === 'GET' || data.method === 'HEAD') && data.payload) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['payload'],
        message: 'Only POST requests can include a payload'
      })
    }
  });


export type FormData = z.infer<typeof createMonitorSchema>;

export const initialMonitorData: FormData = {
  name: "",
  url: "",
  method: "GET",
  expectedStatusCode: 200,
  frequency: 5,
  timeout: 5,
  notificationMethod: "email",
};

export const monitorSchema = createSelectSchema(monitor);

export type Monitor = z.infer<typeof monitorSchema>;