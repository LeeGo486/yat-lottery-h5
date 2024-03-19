import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full box-border flex flex-col justify-between">
      <div className="order-1 flex items-center justify-center mt-20">
        <img className="w-48" src="/logo.png" alt="senix logo image"/>
      </div>
      <div className="order-2 flex flex-col items-center justify-center">
        <img src="/welcome.png" alt="senix welcome image"/>
        <Link href={"/lottery"} className="flex justify-center items-center drop-shadow-lg mt-8
          w-48 h-14 bg-[rgb(var(--background-senix-orange-rgb))] border-0 rounded-md">
          <span className="text-slate-100 font-sans font-bold text-xl italic uppercase">Lucky draw</span></Link>
      </div>
      <div className="order-last flex items-center justify-center">
        <a href="https://www.senixtools.com" className="text-slate-50 text-xl">www.senixtools.com</a>
      </div>
    </div>
  )
}