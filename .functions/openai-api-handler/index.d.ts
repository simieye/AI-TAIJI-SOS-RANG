
interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIParams {
  apiKey: string;
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string | string[];
}

interface OpenAIChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finishReason: string;
}

interface OpenAIUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAIChoice[];
  usage: OpenAIUsage;
}

interface CloudFunctionResult {
  success: boolean;
  data: OpenAIResponse | { models: string[]; maxTokens: Record<string, number> } | null;
  error: string | null;
}

interface CloudFunctionEvent {
  action: 'chat' | 'getModels';
  [key: string]: any;
}

export declare function main(event: CloudFunctionEvent, context: any): Promise<CloudFunctionResult>;
