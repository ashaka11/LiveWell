// Define types for TypeScript
export interface Message {
    id: string;
    text: string;
    isUser: boolean;
  }
  
  export interface HistoryItem {
    id: string;
    date: string;
    encryptedData: string;
    diagnosis: string;
  }