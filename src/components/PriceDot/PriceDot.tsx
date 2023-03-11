import { Icon } from 'components/Icon';
import { Tooltip } from 'components/Tooltip';
import Image from 'next/image';
import { FC, useState } from 'react'

import dot from '/public/assets/img/dot-hover.svg'

interface PriceDotProps {
    isBid: boolean
};

export const PriceDot: FC<PriceDotProps> = ({ isBid = false }) => {

    const [hovered, setHovered] = useState<boolean>(false)

    return (
        <>
            <Tooltip trigger='hover' content={'No offering price'}>
                <div
                    onMouseOver={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {!hovered ?
                        <Icon variant='radioButton' size={20} active={isBid} /> :
                        <Image src={dot} />
                    }
                </div>
            </Tooltip>
        </>
    )
}