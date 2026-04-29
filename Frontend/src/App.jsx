import { RouterProvider } from "react-router-dom"
import { router } from "./Routes/AppRoutes"
import { AuthProvider } from "./Features/Auth/AuthContext"
import { InterviewProvider } from "./Features/Interview/interview.context"
import "./App.css"
function App() {

  return (
    <AuthProvider>
      <InterviewProvider>
        <RouterProvider router={router} />
      </InterviewProvider>

    </AuthProvider>

  )
}

export default App
