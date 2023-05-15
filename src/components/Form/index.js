import React, { useState, useEffect } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Space,
    Switch,
} from 'antd';
import Link from 'next/link';

export default function StyledForm({ data, rows, backPath, handleSave, handleChange }) {

    function renderRows() {
        return (
            <>
                {rows.map(row => {
                    return (
                        <Form.Item label={row.label}>
                            {row.type === "input" &&
                                <Input
                                    key={`form-input-key-${row.name}`}
                                    placeholder={row.placeholder}
                                    value={data[row.value ?? row.name]}
                                    onChange={(e) => handleChange(row.name, e.target.value)}
                                />
                            }
                            {row.type === "switch" &&
                                <Switch
                                    key={`form-input-key-${row.name}`}
                                    checked={data[row.value ?? row.name]}
                                    onChange={(e) => handleChange(row.name, e)}
                                />
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
                <Space>
                    <Button><Link href={`/${backPath}`} legacyBehavior><a>Voltar</a></Link></Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};