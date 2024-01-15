import { useState } from "react";
import "./App.css";
import {
  ServiceWorkerMessage,
  ServiceWorkerMessageKey,
} from "./extension.types";

type MessageHookReturnType = ServiceWorkerMessage | null;

const useReceivedMessage = (
  action: ServiceWorkerMessageKey
): MessageHookReturnType => {
  const [data, setData] = useState<MessageHookReturnType>(null);

  chrome.runtime.onMessage.addListener((message) => {
    console.log("Content Script - Received message:", message);

    if (message.action === action) {
      setData(message.payload);
    }
  });

  return data;
};

function App() {
  const receivedMessage = useReceivedMessage("print-job-info");

  return (
    <>
      <div>
        {receivedMessage?.payload.companyInfo?.name && (
          <>
            <h2>Company Name:</h2>
            <p>{receivedMessage?.payload.companyInfo.name}</p>
          </>
        )}
      </div>
    </>
  );
}

export default App;
