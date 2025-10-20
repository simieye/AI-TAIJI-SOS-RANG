
interface WenxinMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface WenxinParams {
  apiKey: string;
  secretKey: string;
  model: string;
  messages: WenxinMessage[];
  temperature?: number;
  topP?: number;
  penaltyScore?: number;
  userId?: string;
  system?: string;
}

interface WenxinChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finishReason: string;
}

interface WenxinUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

interface WenxinResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: WenxinChoice[];
  usage: WenxinUsage;
}

interface CloudFunctionResult {
  success: boolean;
  data: WenxinResponse | { models: string[]; description: Record<string, string> } | { message: string } | null;
  error: string | null;
}

interface CloudFunctionEvent {
  action: 'chat' | 'getModels' | 'clearCache';
  [key: string]: any;
}

export declare function main(event: CloudFunctionEvent, context: any): Promise<CloudFunctionResult>;
