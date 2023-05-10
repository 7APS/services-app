import React, { useState, useEffect } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
} from 'antd';
import Link from 'next/link';

export default function StyledForm({ data, rows, backPath }) {

    function renderRows() {
        return (
            <>
                {rows.map(row => {
                    return (
                        <Form.Item label={row.label}>
                            {row.type === "input" &&
                                <Input placeholder={row.placeholder} value={data[row.name]} />
                            }
                            {row.type === "switch" &&
                                <Switch checked={data[row.name]} />
                            }
                        </Form.Item>
                    )
                })}
            </>
        )
    }

    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="vertical"
            style={{
                maxWidth: 600,
            }}
        >
            {renderRows()}
            <Form.Item>
                <Button><Link href={`/${backPath}`} legacyBehavior><a>Voltar</a></Link></Button>
                <Button>Salvar</Button>
            </Form.Item>
        </Form>
    );
};