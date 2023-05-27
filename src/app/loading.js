'use client'

import AppLayout from "@/components/AppLayout";
import { Skeleton } from "antd";

export default function Loading() {

    return(
        <AppLayout>
            <Skeleton />
        </AppLayout>
    )
}