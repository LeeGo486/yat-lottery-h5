import Welcome from './welcome/page'

export default function Home() {
  return (
    <main className="w-full h-full flex min-h-screen flex-col items-center justify-between">
      <Welcome />
    </main>
  );
}
