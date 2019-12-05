import * as React from 'react'
import { Menu } from 'antd';

export interface Props {
    changeLayout: any
}

export const Navigation = (props: Props) => {
    return (
        <Menu mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
            <Menu.Item key="1" onClick={() => props.changeLayout("#/")}>Home</Menu.Item>
            <Menu.Item key="2" onClick={() => props.changeLayout("#/create")}>Create</Menu.Item>
            <Menu.Item key="3"onClick={() => props.changeLayout("#/other")}>Other</Menu.Item>
            <Menu.Item key="4"><a href="#/another">Another</a></Menu.Item>
        </Menu>
    )
}