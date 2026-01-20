import { Metadata } from "next";
import { notFound } from "next/navigation";

// Types
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Metadata (static or dynamic)
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page description",
};

// Or dynamic metadata
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const data = await getData(params.id);
//   return {
//     title: data.title,
//     description: data.description,
//   };
// }

// Static params for SSG (optional)
// export async function generateStaticParams() {
//   const items = await getItems();
//   return items.map((item) => ({ id: item.id }));
// }

// Page Component (Server Component by default)
export default async function Page({ params, searchParams }: PageProps) {
  // Data fetching directly in component
  const data = await getData(params.id);

  // Handle not found
  if (!data) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{data.title}</h1>

      {/* Server-rendered content */}
      <section className="mt-8">
        <p>{data.description}</p>
      </section>

      {/* Client Component for interactivity */}
      {/* <InteractiveSection initialData={data.interactiveData} /> */}
    </main>
  );
}

// Placeholder data fetching function
async function getData(id: string) {
  // Replace with actual data fetching
  // import { getData } from "@/features/example/queries";
  return {
    id,
    title: "Example Title",
    description: "Example description",
  };
}
