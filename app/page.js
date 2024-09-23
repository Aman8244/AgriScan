import About from "@/components/homepage/About";
import Features from "@/components/homepage/Features";
import Navbar from "@/components/Navbar";

export default function Home() {
     
  return (
    <main className="">
        <header className="bg-[#eff1ee]">
          <Navbar/>
        </header>
        <section className="bg-[#eff1ee]">
          <About/>
        </section>
        <section>
          <Features/>
        </section>
    </main>
  );
}
