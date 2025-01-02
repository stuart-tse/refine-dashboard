import React from 'react'
import { Popover, Button} from "antd";
import CustomAvatar from "@/components/custom-avatar";
import {useGetIdentity} from "@refinedev/core";
import {Text} from "@/components/text";
import{AccountSettings} from "@/components/layout/account-settings";

import type {User} from '@/graphql/schema.types'
import {SettingOutlined} from "@ant-design/icons";

const CurrentUser = () => {
   const [isOpen, setIsOpen] = React.useState(false);

    const { data: user } = useGetIdentity<User>();

    const content = (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '8px',
            width: '150px',
            alignItems: 'center'
        }}>
            <Text
                strong
                style={{padding: '12px 20px'}}
            >
                {user?.name}
            </Text>
            <div
                style={{
                    borderTop: '1px solid #d9d9d9',
                    padding: '4px',
                    flexDirection: 'column',
                    gap: '4px',
                }}
            >
                <Button
                    style={{ textAlign: 'left'}}
                    icon={<SettingOutlined/>}
                    type='text'
                    block
                    onClick={() => setIsOpen(true)}
                >
                Account Settings
                </Button>
            </div>
        </div>
    )
    return (
        <>
            <Popover
                placement='bottomRight'
                trigger='click'
                overlayInnerStyle={{padding: 0}}
                overlayStyle={{zIndex: 999}}
                content={content}
            >
                <CustomAvatar
                    name={user?.name}
                    src={user?.avatarUrl}
                    size='default'
                    style={{cursor: 'pointer'}}
                />
            </Popover>
            {user && (
                <AccountSettings
                    opened={isOpen}
                    setOpened={setIsOpen}
                    userId={user.id}
            >
                </AccountSettings>)}
        </>
    )
}
export default CurrentUser
