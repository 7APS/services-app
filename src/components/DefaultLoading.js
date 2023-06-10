'use client'

import { Card, Skeleton } from "antd";

export default function DefaultLoading() {
    return (
        <>
            <Card>
                <Skeleton active />
                <Skeleton active />
            </Card>∫
        </>
    )
}