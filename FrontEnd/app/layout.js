import "./globals.css";

export const metadata = {
  title: "Tixify",
  description: "Going to Concert? Buy ur Ticket!",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased text-white min-h-screen flex flex-col">
        <main className="w-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
