import { useEffect,  useState } from "react"
import LoadingAnimation from "../components/loadingAnimation"
import api from "../utils/api"
import uploadMedia from "../utils/mediaUpload"
import toast from "react-hot-toast"

export default function SettingsPage(){
    const [user, setUser]=useState(null)
    const [ firstName, setFirstName]= useState("")
    const [lastName, setLastName]=useState("")
    const [existingImage, setExistingImage]=useState(null) // current image URL from server
    const [imageFile, setImageFile]=useState(null) // new File selected by user (null if unchanged)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword]= useState("")
    const [isUpdatingPassword, setIsUpdatingPassword]=useState(false)
    const[isUpdatingProfile, setIsUpdatingProfile]=useState(false)
    
 useEffect(
        ()=>{
            const token = localStorage.getItem("token")
            if(token){
                api.get("/users/me" , {
                    headers: {
                        "Authorization":`Bearer ${token}`
                    }
                })
                .then(response=>{
                    console.log(response.data)
                    setUser(response.data)
                    setFirstName(response.data.firstName)
                    setLastName(response.data.lastName)
                    setExistingImage(response.data.imageFile)
                })
                .catch(error =>{
                    console.log(error)
                });
            }
        },[]
    );

    async function updateProfile() {
        setIsUpdatingProfile(true)
        const token = localStorage.getItem("token")
        let image = existingImage
        try{
            let image = existingImage
            if(imageFile){
                image = await uploadMedia(imageFile)
            }
            const response =  await api.put("/users/",{
                firstName : firstName,
                lastName : lastName,
                image : image},{
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                })

            localStorage.setItem("token",response.data.token)
            toast.success("Profile updated successfully")

            window.location.reload()
        }catch(error){
            console.log(error)
            toast.error("Failed to upload image")
            setIsUpdatingProfile(false)
            return
        }
        
    }
    async function updatePassword() {
        if(password !== confirmPassword){
            toast.error("Passwords do not match")
            return
        }
        setIsUpdatingPassword(true)
        const token = localStorage.getItem("token")
        try{
            await api.put("/users/password",{
                newPassword : password
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Password updated successfully")
            setPassword("")
            setConfirmPassword("")
            window.location = "/login"
        }catch(error){
            console.log(error)
            toast.error("Failed to update password")
        }
        setIsUpdatingPassword(false)
    }
return (
  <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
    {
      user ? (
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">

          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Basic Information
            </h1>

            {existingImage && (
              <div className="flex justify-center mb-6">
                <img
                  src={existingImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-slate-200"
                />
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  First Name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Last Name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Profile Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-xl p-3"
                />
              </div>

              <button
                onClick={updateProfile}
                disabled={isUpdatingProfile}
                className="w-full py-3 rounded-xl bg-accent text-white font-medium hover:opacity-90 transition"
              >
                {isUpdatingProfile ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Change Password
            </h1>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <button
                onClick={updatePassword}
                disabled={isUpdatingPassword}
                className="w-full py-3 rounded-xl bg-accent text-white font-medium hover:opacity-90 transition"
              >
                {isUpdatingPassword ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>

        </div>
      ) : (
        <LoadingAnimation />
      )
    }
  </div>
)
   
}

// {export default function TestPage(){
//     const videoRef = useRef(null);
//     return(
//         <div className="w-full h-screen flex justify-center bg-white text-secondary flex-col gap-10">{/*rounded-tr-none= eliyata paina eva pen nti krnv */}
        
//            <div className="w-[400px] h-[400px] bg-red-900 rounded-full rounded-tr-none border-10 overflow-hidden relative justify-center items-center flex">
//             <video ref={videoRef} autoPlay src="/videoname.mp4" className="w-full h-full object-cover">
//             <button 
//             onClick={()=>{//videoRef.current=me video track ek dala tiyenne kvd danata
//                 if(videoRef.current.paused){
//                     videoRef.current.play()
//                 }else{
//                     videoRef.current.pause()
//                 }
                
//             }}
//             className="bg-white p-5 rounded-lg absolute">Play</button>
//             </video>
//            </div>

//         </div>
//     )
// }}