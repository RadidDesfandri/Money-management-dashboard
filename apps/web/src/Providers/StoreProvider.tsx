"use client";
import { AppStore, makeStore } from "@/Redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        persistor={persistStore(storeRef.current)}
        loading={
          <div className="flex h-screen w-screen items-center justify-center bg-hitam text-3xl text-white">
            loading
          </div>
        }
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
