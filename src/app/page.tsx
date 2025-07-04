import Header from "@/components/header";
import WorkspaceHarmonizerForm from "@/components/workspace-harmonizer-form";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl">
          <WorkspaceHarmonizerForm />
        </div>
      </main>
    </div>
  );
}
