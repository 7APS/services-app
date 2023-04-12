import Layouts from "@/components/layouts"

export default function Profile() {
    return <div><h1>Profile</h1></div>
}

Profile.getLayout = function getLayout(page) {
    return (
        <Layouts title="assets" classname="dashboard">
            {page}
        </Layouts>
    )
}