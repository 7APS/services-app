import Layouts from "@/components/layouts"

export default function Schedule() {
    return <div>schedule</div>
}

Schedule.getLayout = function getLayout(page) {
    return (
        <Layouts title="assets" classname="dashboard">
            {page}
        </Layouts>
    )
}