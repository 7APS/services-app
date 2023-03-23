import Layouts from "@/components/layouts"

export default function Contact() {
    return <div>contact</div>
}

Contact.getLayout = function getLayout(page) {
    return (
        <Layouts title="assets" classname="dashboard">
            {page}
        </Layouts>
    )
}