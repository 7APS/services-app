"use client"

import { Card, Breadcrumb, Divider } from "antd";
import LoadMore from "@/components/Loadmore"

export default async function Contact() {
    // const res = await fetch("https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo");
    // const data = await res.json();

    return (
        <Card>
            <div className='flex gap-2'>
                <div className='grid'>
                    <h1 className='font-bold text-2xl'>Contatos</h1>
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="/dashboard">Dashboard</a>,
                            },
                            {
                                title: <a href="/contact">Contatos</a>,
                            }
                        ]}
                    />
                </div>
                {/* <div className='absolute right-6'>
                    <Button className='bg-primary text-white h-8'>
                        <Link href={`/users/new`} legacyBehavior>
                            <a className='p-4'>
                                <PlusOutlined /> Adicionar
                            </a>
                        </Link>
                    </Button>
                </div> */}
            </div>
            <Divider />
            <LoadMore />
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