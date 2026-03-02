import ProfilePic from "../assets/profile.jpg"
import Project from "../assets/PolyVision-System.jpg"
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowDroprightCircle } from "react-icons/io";
function Profile() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-8 gap-5">
      <div className="flex flex-row gap-10 p-8 bg-white shadow-lg rounded-lg"> {/*Container*/}
        <div className="flex flex-col gap-10 p-5 w-2/3"> 
          <div className="flex flex-row items-center gap-8">
            <div>
              <img src={ProfilePic} alt="Profile Picture" className="w-40 h-40 rounded-full object-cover" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">Piolo Pascual E. Besinga</h1>
              <h2 className="text-xl text-gray-600">Mobile Developer</h2>
              <p className="text-gray-500">Computer Engineering Student at the University of San Carlos</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="border-b border-gray-300 pb-2">
              <p className="flex flex-start text-lg text-black">Details</p>
            </div>
            <div className="flex flex-row gap-20 items-center">
              <div className="flex flex-row gap-5 items-center">
                <FaPhoneAlt className="text-l" /> 
                <p className="">09234567890</p>
              </div>
              <div className="flex flex-row gap-5 items-center">
                <MdOutlineMail className="text-xl" />
                <p className="">besingapiolo@gmail.com</p>
              </div>
              <div className="flex flex-row gap-5 items-center">
                <FaLinkedin className="text-xl" />
                <a href="https://linkedin.com/in/piolobesinga" className="text-black hover:underline">linkedin.com/in/piolobesinga</a>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <FaLocationDot className="text-xl" />
              <p className="text-black">Windfields Subd., Danglag, Consolacion, Cebu, Philippines</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="border-b border-gray-300 pb-2">
              <p className="flex flex-start text-lg text-black">Education</p>
            </div>
            <div className="flex flex-row gap-30">
              <p>2022 – Present</p>
              <div className="flex flex-col gap-0 items-start">
                <p className="text-black font-bold">University of San Carlos</p>
                <p className="italic text-gray-800">Bachelor of Science in Computer Engineering</p>
                <p className="text-gray-800">GWA (Present): 1.62</p>
              </div>
            </div>
            <div className="flex flex-row gap-35">
              <p>2020 – 2021</p>
              <div className="flex flex-col gap-0 items-start">
                <p className="text-black font-bold">Central Visayan Institute Foundation</p>
                <p className="italic text-gray-800">Information and Communications Technology (Senior High School)</p>
                <p className="text-gray-800">With High Honors</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 p-10 bg-white shadow-2xl border border-slate-100 rounded-lg items-center">
          <p className="text-xl font-bold">RELEVANT PROJECTS</p>
          <div className="flex flex-col gap-4 items-center">
            <img src={Project} alt="Project" className="w-130 h-65 object-cover rounded-lg shadow-md" />
            <p className="font-bold">Automated Imaging System for Microplastics Sample Classification Using Convolutional Neural Network</p>
            <p className="italic text-gray-600 text-sm">An undergraduate thesis project that utilizes machine learning with computer vision to classify microplastics samples.</p>
            <div className="flex flex-row items-center gap-2 mt-6">
              <button className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-xl shadow-lg flex flex-row items-center gap-8">
                View More <IoIosArrowDroprightCircle className="text-xl"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile