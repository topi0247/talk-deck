export default function SiteName({ isMenu }: { isMenu?: boolean }) {
  return (
    <h1
      className={`text-2xl font-bold text-white relative z-0 text-start mt-4 md:mt-8 md:ml-8 ${isMenu && "text-black w-full flex justify-center items-center"}`}
    >
      <span
        className={`absolute text-yellow-300 -z-10 opacity-40 text-5xl w-full bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-0 ${isMenu && "text-yellow-500 text-3xl text-center"} `}
      >
        TALK DECK
      </span>
      <span className={`tracking-[10px] ${isMenu && "text-black"}`}>
        会話デッキ
      </span>
    </h1>
  );
}
