
interface AIConfig {
  apiKey?: string;
  secretKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  [key: string]: any;
}

interface AIResponse {
  model: string;
  content: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  finishReason?: string;
}

interface CloudFunctionResult {
  success: boolean;
  data: AIResponse | null;
  error: string | null;
}

interface CloudFunctionEvent {
  modelType: string;
  message: string;
  config: AIConfig;
}

export declare function main(event: CloudFunctionEvent, context: any): Promise<CloudFunctionResult>;
