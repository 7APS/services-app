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

export default function StyledForm({ data, rows, backPath, handleSave, handleChange, disabled }) {

    function evaluate(row) {
        if (data == null) {
            return "";
        } else if (row?.value != null) {
            try {
                return eval(row.value);
            } catch (e) {
                // e
            }
        } else {
            return data[row.name];
        }
    }

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
                                    value={evaluate(row)}
                                    onChange={(e) => handleChange(row.name, e.target.value)}
                                    disabled={row.disabled}
                                />
                            }
                            {row.type === "number" &&
                                <InputNumber
                                    key={`form-input-key-${row.name}`}
                                    placeholder={row.placeholder}
                                    value={evaluate(row)}
                                    onChange={(e) => handleChange(row.name, e)}
                                    disabled={row.disabled}
                                />
                            }
                            {row.type === "switch" &&
                                <Switch
                                    key={`form-Switch-key-${row.name}`}
                                    checked={evaluate(row)}
                                    onChange={(e) => handleChange(row.name, e)}
                                    disabled={row.disabled}
                                />
                            }
                            {row.type === "select" && row.items &&
                                <Select
                                    key={`form-Select-key-${row.name}`}
                                    value={evaluate(row)}
                                    onChange={(e) => handleChange(row.name, e)}
                                    disabled={row.disabled}
                                >
                                    {row.items}
                                </Select>
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