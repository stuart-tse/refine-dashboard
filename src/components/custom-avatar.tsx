import { Avatar as AntdAvatar, AvatarProps } from 'antd'
import {getNameInitials} from "@/utilities";

type Props = AvatarProps & {
    name?: string
}

const CustomAvatar = ({name ='', style, ...rest}: Props) => {
    return (
       <AntdAvatar
        alt={'Javascript Mastery'}
        size="small"
        style={{
            backgroundColor: '#87d068',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 'none',
            ...style
       }}
       {...rest}
       >
           {getNameInitials(name || '')}
       </AntdAvatar >
    )
}
export default CustomAvatar
