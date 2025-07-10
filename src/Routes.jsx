import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import Register from "./Pages/Register";
import VerifyOtp from "./Pages/VerifyOtp";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import PageNotFound from "./Pages/PageNotFound";
// import EditPrompt from "./Pages/EditPrompt";
import ForkPrompt from "./Pages/ForkPrompt";
import CreatePrompt from "./Pages/CreatePrompt";
import PromptDetailPage from "./Pages/PromptDetailPage";
import ProfilePage from "./Pages/ProfilePage";
import StarredPromptsPage from "./Pages/StarredPromptsPage";
import AccountSettings from "./Pages/AccountSettings";
import EditPromptPage from "./Pages/EditPromptPage";



export default function Router(){

    return(
        <Routes>
            <Route path="/" element= {<HomePage/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/verify-otp" element={<VerifyOtp/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/submit" element={<CreatePrompt />} />
            {/* <Route path="/prompt/:id/edit" element={<EditPrompt />} /> */}
            <Route path="/prompt/:id/fork" element={<ForkPrompt />} />
            <Route path="/prompts/:id" element={<PromptDetailPage />} /> 
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/starred" element={<StarredPromptsPage />} />
            <Route path="/forkPrompt/:id" element={<ForkPrompt />} />
            {/* <Route path="/prompt/${newPrompt.data._id}" element={PromptDetailPage}/> */}
            <Route path="/settings" element={<AccountSettings/>}/>
            <Route path="/editPrompt/:id" element={<EditPromptPage />} />
             <Route path="*" element={<PageNotFound/>} />
             
        </Routes>
    )
} 