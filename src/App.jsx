import Random from "./components/Random";
import Tag from "./components/Tag";



export default function App() {
  return (
    <div className="w-full h-screen flex flex-col background relative overflow-x-hidden items-center">
    
    <h1 className="bg-gray-800 rounded-lg w-11/12 text-center mt-[40px] px-10 py-2 text-4xl font-bold" style={{ textShadow: "0 0 10px rgba(0, 0, 255, 0.5)", boxShadow: "0 0 10px rgb(94,108,191)" }}>Random Gifs</h1>

    
     <div className="flex flex-col w-full items-center gap-y-10 mt-[30px] ">
      <Random/>
      <Tag/>
     </div>

   </div>
  );
}
