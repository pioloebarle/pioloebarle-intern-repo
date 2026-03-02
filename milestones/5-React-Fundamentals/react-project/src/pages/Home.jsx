import Profile from "../assets/profile.jpg"
function Home() {
  return (
    <div className="flex flex-row h-screen items-center">
      <div className="flex justify-center min-h-screen items-center flex-col gap-2 bg-slate-50 w-2/3 p-5">
        <h1 className="text-5xl font-bold">Welcome to my Portfolio!</h1>
        <h2 className="text-xl font-medium">Mobile Developer</h2>
      <p className="italic">Computer Engineering Student at the University of San Carlos</p>
      </div>
      <div className="flex justify-center min-h-screen items-center flex-col gap-2 bg-slate-50 w-1/3 p-10">
        <img src={Profile} alt="Profile Picture" className="rounded-full object-cover"/>
      </div>
    </div>
  )
}

export default Home