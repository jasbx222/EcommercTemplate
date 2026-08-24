import { Login } from "@/app/components/auth/login"
import { GuestGuard } from "@/app/components/shared/AuthGuard"

const page = () => {
    return (
        <GuestGuard>
            <Login />
        </GuestGuard>
    )
}

export default page;