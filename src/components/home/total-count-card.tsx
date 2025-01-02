import {Text} from "@/components/text";

type Props = {
    resource: "companies" | "contacts" | "deals"
    isLoading: boolean
    totalCount?: number
}

import React from 'react'
import {Card, Skeleton} from 'antd'

import {totalCountVariants} from "@/constants";
import {Area, AreaConfig} from "@ant-design/plots";



const DashboardTotalCountCard = ({
    resource,
    isLoading,
    totalCount
}: Props) => {
    const { primaryColor, secondaryColor, icon, title } = totalCountVariants[resource]

    const config : AreaConfig = {
        data: totalCountVariants[resource].data,
        xField: 'index',
        yField: 'value',
        appendPadding: [1,0,0,0],
        padding: 0,
        syncViewPadding: true,
        autoFit: true,
        tooltip: false,
        animation: false,
        xAxis: false,
        yAxis: {
            tickCount: 12,
            label: {
                style: {
                    stroke: 'transparent'
                }
            },
            grid: {
                line: {
                    style: {
                        stroke: 'transparent'
                    }
                }
            }
        },
        smooth: true,
        line: {
            color: primaryColor,
        },
        areaStyle: ()=> {
            return {
                fill: `l(270) 0:#fff 0.2${secondaryColor} 1:${primaryColor}`,
            }
        }
    }
    return (
        <Card
            style={{height: '96px', padding: 0}}
            styles={{
                body: {
                    padding: '8px 8px 8px 12px',
                }
                }}
            size='small'
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap'
                    }}
            >
                {icon}
                <Text size="md" className="secondary" style={{marginLeft: '8px'}}>
                    {title}
                </Text>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    size="xxxl"
                    strong
                    style={{
                        flex: 1,
                        whiteSpace: 'nowrap',
                        textAlign: 'start',
                        marginLeft: '48px',
                        fontVariantNumeric: 'tabular-nums',
                        flexShrink: 0,
                    }}
                    >


                {isLoading ? (
                    <Skeleton.Button
                        style={{
                            marginTop: '8px',
                            width: '74px',
                        }}
                    />
                ): (
                    totalCount
                )
                }
                </Text>
                <Area {...config} style={{width: '50%'}} />

            </div>

        </Card>
    )
}
export default DashboardTotalCountCard
