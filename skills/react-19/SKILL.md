---
name: react-19
description: >
  React 19 features and patterns with React Compiler.
  Trigger: When writing React 19 components/hooks in .tsx/.jsx files (Actions, use() hook, refs as props, Context providers).
license: Apache-2.0
metadata:
  author: gpolanco
  version: "1.0.0"
  scope: [root]
  auto_invoke: "Writing React components"
allowed-tools: Read
---

## No Manual Memoization (REQUIRED)

React Compiler handles optimization automatically. Never use `useMemo`, `useCallback`, or `memo` manually.

```typescript
// ✅ React Compiler optimizes automatically
function ProductList({ products }) {
  const filtered = products.filter(p => p.inStock);
  const sorted = filtered.sort((a, b) => a.price - b.price);

  const handleAddToCart = (id) => {
    addToCart(id);
  };

  return <List items={sorted} onAdd={handleAddToCart} />;
}

// ❌ NEVER: Manual memoization
const filtered = useMemo(() => products.filter(p => p.inStock), [products]);
const sorted = useMemo(() => filtered.sort((a, b) => a.price - b.price), [filtered]);
const handleAddToCart = useCallback((id) => addToCart(id), []);
```

## Imports (REQUIRED)

```typescript
// ✅ ALWAYS: Named imports
import { useState, useEffect, useRef, use } from "react";

// ❌ NEVER: Default or namespace imports
import React from "react";
import * as React from "react";
React.useState(); // Wrong
```

## use() Hook for Promises

Read promises in render. React suspends until resolved.

```typescript
import { use } from "react";

// Read promises (requires Suspense boundary)
function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return comments.map(c => <p key={c.id}>{c.text}</p>);
}

function Page({ commentsPromise }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```

**Important**: `use()` does NOT support promises created in render. Pass promises from outside the component.

```typescript
// ❌ NEVER: Create promise in render
function Component() {
  const data = use(fetchData()); // Error!
  return <div>{data}</div>;
}

// ✅ Promise created outside and passed as prop
function Parent() {
  const dataPromise = fetchData();
  return <Child promise={dataPromise} />;
}

function Child({ promise }) {
  const data = use(promise);
  return <div>{data}</div>;
}
```

## use() Hook for Context

Read Context conditionally (not possible with `useContext`).

```typescript
import { use } from "react";

function Heading({ children }) {
  if (children == null) {
    return null;
  }

  // ✅ Can use after early return
  const theme = use(ThemeContext);

  return <h1 style={{ color: theme.color }}>{children}</h1>;
}

// ❌ useContext doesn't work after early returns
function Heading({ children }) {
  if (children == null) {
    return null;
  }

  const theme = useContext(ThemeContext); // Error: unreachable
  return <h1 style={{ color: theme.color }}>{children}</h1>;
}
```

**Key difference**: `use()` can be called conditionally, `useContext()` cannot.

## Actions with useTransition

Handle async operations with automatic pending states.

```typescript
import { useState, useTransition } from "react";

function UpdateName() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      }
      // Success - navigate or update UI
    });
  };

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```

## useActionState for Forms

Simplifies form handling with automatic pending states and error management.

```typescript
import { useActionState } from "react";

// Action function
async function updateName(previousState, formData) {
  const name = formData.get("name");
  const error = await saveNameToAPI(name);

  if (error) {
    return { error }; // Return error state
  }

  return { success: true }; // Return success state
}

// Component
function NameForm() {
  const [state, formAction, isPending] = useActionState(updateName, null);

  return (
    <form action={formAction}>
      <input type="text" name="name" required />
      <button disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </button>
      {state?.error && <p className="error">{state.error}</p>}
      {state?.success && <p className="success">Saved!</p>}
    </form>
  );
}
```

**Note**: `useActionState` was previously called `useFormState` (deprecated).

## useOptimistic for Instant UI Updates

Show optimistic state while async request is in progress.

```typescript
import { useOptimistic } from "react";

function TodoList({ todos, addTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  async function handleAdd(formData) {
    const title = formData.get("title");
    const tempId = crypto.randomUUID();

    // Show optimistic update immediately
    addOptimisticTodo({ id: tempId, title });

    // Perform actual request
    await addTodo(title);

    // React automatically reverts to real state when done
  }

  return (
    <form action={handleAdd}>
      <input name="title" required />
      <button>Add</button>
      <ul>
        {optimisticTodos.map(todo => (
          <li
            key={todo.id}
            className={todo.pending ? "opacity-50" : ""}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </form>
  );
}
```

## ref as Prop (No forwardRef)

```typescript
// ✅ React 19: ref is just a prop
function Input({ ref, placeholder, ...props }) {
  return <input ref={ref} placeholder={placeholder} {...props} />;
}

// Usage
function Form() {
  const inputRef = useRef(null);

  return (
    <div>
      <Input ref={inputRef} placeholder="Name" />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </div>
  );
}

// ❌ Old way (unnecessary in React 19)
const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

## ref Cleanup Functions

```typescript
// ✅ Return cleanup function from ref callback
function VideoPlayer() {
  return (
    <video
      ref={(ref) => {
        if (ref) {
          // Setup
          const player = new VideoPlayer(ref);
          player.init();

          // Return cleanup
          return () => {
            player.destroy();
          };
        }
      }}
    />
  );
}

// ❌ Don't use implicit returns (TypeScript error)
<div ref={current => (instance = current)} />

// ✅ Use explicit block
<div ref={current => { instance = current }} />
```

## Context as Provider

```typescript
import { createContext } from "react";

const ThemeContext = createContext("light");

// ✅ React 19: Use Context directly as provider
function App({ children }) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );
}

// ❌ Old way (still works but will be deprecated)
function App({ children }) {
  return (
    <ThemeContext.Provider value="dark">
      {children}
    </ThemeContext.Provider>
  );
}

// Reading context (same as before)
function Button() {
  const theme = use(ThemeContext);
  // or
  const theme = useContext(ThemeContext);

  return <button className={theme}>Click</button>;
}
```

## Form Actions (React DOM)

Native form integration with Actions.

```typescript
// ✅ Pass function to action prop
function ContactForm() {
  async function handleSubmit(formData) {
    const email = formData.get("email");
    const message = formData.get("message");

    await sendEmail(email, message);

    // Form resets automatically on success
  }

  return (
    <form action={handleSubmit}>
      <input type="email" name="email" required />
      <textarea name="message" required />
      <button>Send</button>
    </form>
  );
}
```

## useFormStatus (React DOM)

Access form status without prop drilling.

```typescript
import { useFormStatus } from "react-dom";

// Design system button
function SubmitButton({ children }) {
  const { pending, data, method, action } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : children}
    </button>
  );
}

// Usage in form
function Form() {
  return (
    <form action={handleSubmit}>
      <input name="name" />
      <SubmitButton>Save</SubmitButton>
    </form>
  );
}
```

**Note**: `useFormStatus` must be called inside a component that is a child of a `<form>`.

## useDeferredValue with Initial Value

```typescript
import { useDeferredValue, useState } from "react";

function SearchResults() {
  const [query, setQuery] = useState("");

  // ✅ React 19: Provide initial value
  const deferredQuery = useDeferredValue(query, "");

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Results query={deferredQuery} />
    </div>
  );
}
```

## Resources

- **Advanced Patterns**: [reference/advanced.md](reference/advanced.md) - Document Metadata, Stylesheets, Scripts, Preloading, and TS Updates.
- **Official Docs**: [React 19 Release](https://react.dev/blog/2024/12/05/react-19)
- **Upgrade Guide**: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- **use() API**: [React use() Reference](https://react.dev/reference/react/use)
- **useActionState**: [React useActionState Reference](https://react.dev/reference/react/useActionState)
- **useOptimistic**: [React useOptimistic Reference](https://react.dev/reference/react/useOptimistic)
- **useFormStatus**: [React-DOM useFormStatus Reference](https://react.dev/reference/react-dom/hooks/useFormStatus)
