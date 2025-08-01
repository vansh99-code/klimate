import { type PropsWithChildren } from "react";
import Header from "./Header";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradiant-to-br from-background to-muted ">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t backdrop-blur py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Happy with 💗 Vansh Bansal</p>
        </div>
      </footer>
    </div>
  );
};

export default layout;
