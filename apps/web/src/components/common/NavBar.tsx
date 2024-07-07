export const NavBar = () => {
  return (
    <div className="flex justify-between bg-amber-400 h-[50px] border-b-2 border-b-white">
      <div>
        <h1 className="text-textPrimary font-bold mx-2 text-xl mt-2">
          Chat App
        </h1>
      </div>
      <div className="mx-4 bg-buttonPrimary border-2 px-5 my-1">
        <button className="mt-1 font-bold text-textPrimary text-xl">
          Sign in
        </button>
      </div>
    </div>
  )
}
