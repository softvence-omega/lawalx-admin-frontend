import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes.tsx";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { persistor,store } from "./store/store.ts";
import { StrictMode } from "react";
createRoot(document.getElementById("root")!).render(
    <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes} />
        <Toaster richColors position="bottom-right" />
      </PersistGate>
    </Provider>
  </StrictMode>
);
