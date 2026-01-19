# React 19 Advanced Patterns

This reference contains advanced React 19 features and patterns.

---

## Document Metadata

Render metadata tags anywhere in component tree.

```typescript
function BlogPost({ post }) {
  return (
    <article>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      <meta property="og:title" content={post.title} />
      <meta property="og:image" content={post.image} />

      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

**Note**: React hoists these to the `<head>` automatically.

---

## Stylesheet Support

```typescript
function ComponentWithStyles() {
  return (
    <div>
      <link rel="stylesheet" href="/styles/component.css" precedence="default" />
      <MyComponent />
    </div>
  );
}
```

**precedence** controls stylesheet loading order.

---

## Async Script Support

```typescript
function Analytics() {
  return (
    <script async src="https://analytics.example.com/script.js" />
  );
}
```

React deduplicates scripts automatically.

---

## Resource Preloading

```typescript
import { prefetchDNS, preconnect, preload, preinit } from "react-dom";

function MyComponent() {
  // Preload resources
  preload("/fonts/myfont.woff2", { as: "font" });
  preinit("/scripts/analytics.js", { as: "script" });

  return <div>Content</div>;
}
```

---

## Breaking Changes from React 18

| Removed              | Alternative                   |
| -------------------- | ----------------------------- |
| `forwardRef`         | Use `ref` as prop             |
| `<Context.Provider>` | Use `<Context>` directly      |
| `useFormState`       | Use `useActionState`          |
| String refs          | Use `useRef` or callback refs |
| `defaultProps`       | Use default parameters        |
| Legacy Context       | Use `createContext`           |

---

## TypeScript Updates

```typescript
// ✅ useRef requires argument
const ref = useRef<HTMLDivElement>(null);

// ❌ No argument not allowed
const ref = useRef<HTMLDivElement>(); // Error

// ✅ ref cleanup must return function or void
<div ref={(current) => {
  if (current) {
    return () => cleanup();
  }
}} />

// ❌ Can't return arbitrary values
<div ref={(current) => current} /> // TypeScript error
```

---

## Commands

```bash
# Install React 19
npm install react@19 react-dom@19
# or
pnpm add react@19 react-dom@19
# or
yarn add react@19 react-dom@19

# Install TypeScript types
npm install -D @types/react@19 @types/react-dom@19

# Run codemod for ref prop
npx codemod@latest react/19/replace-forward-ref

# Run codemod for Context providers
npx codemod@latest react/19/replace-context-provider

# Run codemod for useFormState
npx codemod@latest react/19/replace-use-form-state
```

---

## Resources

- **React 19 Release**: https://react.dev/blog/2024/12/05/react-19
- **Upgrade Guide**: https://react.dev/blog/2024/04/25/react-19-upgrade-guide
- **use() API**: https://react.dev/reference/react/use
- **useActionState**: https://react.dev/reference/react/useActionState
- **useOptimistic**: https://react.dev/reference/react/useOptimistic
- **useFormStatus**: https://react.dev/reference/react-dom/hooks/useFormStatus
