export default function SiteName({ isMenu }: { isMenu?: boolean }) {
  return (
    <h1
      className={`relative z-0 mt-4 text-start text-2xl font-bold text-white md:ml-8 md:mt-8 ${isMenu && "flex w-full items-center justify-center text-black"}`}
    >
      <span
        className={`absolute bottom-2 left-1/2 -z-10 w-full -translate-x-1/2 -translate-y-0 text-5xl text-yellow-300 opacity-40${isMenu && "text-center text-3xl text-yellow-500"} `}
      >
        TALK DECK
      </span>
      <span className={`tracking-[10px] ${isMenu && "text-black"}`}>
        会話デッキ
      </span>
    </h1>
  );
}
