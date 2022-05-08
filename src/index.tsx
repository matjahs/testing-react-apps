import "./test/server";
import "./styles.css";

import * as React from "react";
import {ErrorBoundary} from "react-error-boundary";
import importAll from "import-all.macro";
import {createRoot} from "react-dom/client";

const allDynamicImports = importAll.deferred("./examples/*.tsx");
const lazyComponents: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {};

for (const modulePath in allDynamicImports) {
  if (allDynamicImports.hasOwnProperty(modulePath)) {
    const promise = allDynamicImports[modulePath];
    if (!promise) continue;

    lazyComponents[
      modulePath.replace("./examples", "").replace(/.tsx$/, "")
      // @ts-expect-error meh..
    ] = React.lazy(promise);
  }
}

function DefaultComponent() {
  return (
    <div>
      <div>Please go to the URL for one of the examples:</div>
      <div>
        <ul>
          {Object.keys(lazyComponents).map(key => (
            <li key={key}>
              <a href={key}>{key}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  const Component = React.useState(() => {
    if (window.location.pathname.length > 1) {
      return lazyComponents[window.location.pathname];
    } else {
      return DefaultComponent;
    }
  })[0];
  if (!Component) throw new Error("No component found");
  return (
    <div
      style={{
        flex: 1,
        padding: 20,
        border: "1px solid",
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ErrorBoundary FallbackComponent={DefaultComponent}>
        <React.Suspense fallback="loading...">
          <div>
            <Component />
          </div>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

const container = document.getElementById("⚛");
if (!container) {
  throw new Error("could not find container");
}
createRoot(container).render(<App />);
