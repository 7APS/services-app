// "use client"

import { Card } from "antd";

// import LoadMore from "@/components/Loadmore"

export default async function Contact() {
    // const res = await fetch("https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo");
    // const data = await res.json();

    return (
        <Card>
            <h1>Contatos</h1>
            {/* <LoadMore results={data} /> */}
        </Card>
    );
}

// // This function gets called at build time
// export async function getStaticProps() {
//     // Call an external API endpoint to get posts
//     const res = await fetch("https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo");
//     const data = await res.json();

//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//         props: {
//             results: data?.results,
//         },
//     }
// }