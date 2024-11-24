import { Provider } from "@/components/ui/provider";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root") as HTMLElement | null;

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider>
      <App />
    </Provider>
  );
}
