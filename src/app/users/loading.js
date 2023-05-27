'use client'

import AppLayout from "@/components/AppLayout";
import { Skeleton } from "antd";

export default function LoadingUsers() {

    return(
        <AppLayout>
            <Skeleton />
        </AppLayout>
    )
}