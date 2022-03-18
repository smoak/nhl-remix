import { Footer } from "../Footer";
import { Header } from "../Header";

export type LayoutProps = {
  readonly children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <div className="bg-layout bg-gray-100">
    <div className="z-[1] flex flex-grow flex-col">
      <Header />
      <main className="container mx-auto flex-grow px-4">{children}</main>
      <Footer />
    </div>
  </div>
);
