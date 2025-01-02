import React from 'react'
import { Card } from 'antd'
import {DollarOutlined} from "@ant-design/icons";
import {Area, AreaConfig} from '@ant-design/plots'

// internal imports
import {Text} from '../text'
import {useList} from "@refinedev/core";
import {DASHBOARD_DEALS_CHART_QUERY} from "@/graphql/queries";
import {mapDealsData} from "@/utilities/helpers";
import {GetFields, GetFieldsFromList} from "@refinedev/nestjs-query";
import {DashboardDealsChartQuery} from "@/graphql/types";

const DealsChart = () => {
    const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>
    ({
        resource: 'dealStages',
        filters: [
            {
                field: 'title',
                operator: 'in',
                value: ['WON', 'LOST']
            }
        ],
        meta: {
            gqlQuery: DASHBOARD_DEALS_CHART_QUERY
        }
    })

    const dealData = React.useMemo(() => {
        return mapDealsData(data?.data)
    }, [data?.data])

    const config: AreaConfig ={
        data: dealData,
        xField: 'timeText',
        yField: 'value',
        isStack: false,
        seriesField: 'state',
        animation: true,
        startOnZero: true,
        smooth: true,
        legend: {
            offsetY: -6,
        },
        yAxis: {
            tickCount: 4,
            label: {
                formatter: (v) => {
                    return `${Number(v) /1000}k`
                }
            }
        },
        tooltip: {
            formatter: (data) => {
                return {
                    name: data.state,
                    value: `${data.value}k`
                }
            }
        }

    }
    return (
        <Card
            style={{height: '100%'}}
            styles={{
                header: {
                    padding: '8px 16px',
                },
                body: {
                    padding: '24px 24px 0 24px',
                }

            }}
            title={
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <DollarOutlined />
                    <Text size="sm" style={{marginLeft: '0.5rem'}}>
                        Deals
                    </Text>
                </div>
            }
        >
            <Area {...config} height={325}>

            </Area>
        </Card>
    )
}
export default DealsChart