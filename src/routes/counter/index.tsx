import { component$, useClientEffect$, useStore, useStylesScoped$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from "./counter.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const state = useStore({
    count: 0,
  });

  useClientEffect$(({ cleanup }) => {
    const timeout = setTimeout(() => (state.count = 0), 500);
    cleanup(() => clearTimeout(timeout));

    const internal = setInterval(() => state.count++, 1000);
    cleanup(() => clearInterval(internal));
  });

  const incrementCount = $(() => state.count++);

  const decrementCount = $(() => {
      if (state.count > 0)
        state.count--
    }
  );

  return (
    <>
      <div>
        <button onClick$={incrementCount}> + </button>
        <h1>State: {state.count}</h1>
        <button onClick$={decrementCount}> - </button>
      </div>
    </>
  );
})

export const head: DocumentHead = {
  title: "Qwik Counter",
};