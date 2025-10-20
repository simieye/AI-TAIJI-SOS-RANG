
interface TongyiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface TongyiParams {
  apiKey: string;
  model: string;
  messages: TongyiMessage[];
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  repetitionPenalty?: number;
  stop?: string | string[];
  seed?: number;
  enableSearch?: boolean;
}

interface TongyiChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finishReason: string;
}

interface TongyiUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

interface TongyiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: TongyiChoice[];
  usage: TongyiUsage;
}

interface CloudFunctionResult {
  success: boolean;
  data: TongyiResponse | { models: string[]; maxTokens: Record<string, number>; description: Record<string, string> } | null;
  error: string | null;
}

interface CloudFunctionEvent {
  action: 'chat' | 'getModels';
  [key: string]: any;
}

export declare function main(event: CloudFunctionEvent, context: any): Promise<CloudFunctionResult>;
