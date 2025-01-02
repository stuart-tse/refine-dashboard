import React from "react";
import {
    CreateButton,
    List,
    useTable,
    FilterDropdown,
    DeleteButton,
    EditButton,
} from "@refinedev/antd";
import { useGo, getDefaultFilter, type HttpError } from "@refinedev/core";
import { Table, Space, Input } from "antd";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";
import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { SearchOutlined } from "@ant-design/icons";
import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { CompaniesListQuery } from "@/graphql/types";
import { currencyNumber } from "@/utilities";

type Company = GetFieldsFromList<CompaniesListQuery>;

export const CompanyList = ({ children } : React.PropsWithChildren) => {
    const go = useGo();

    const { tableProps, filters } = useTable<GetFieldsFromList<CompaniesListQuery>, HttpError, GetFieldsFromList<CompaniesListQuery>>({
        resource: "companies",
        onSearch: (values) => [
            {
                field: "name",
                operator: "contains",
                value: values.name,
            },
        ],
        sorters: {
            initial: [
                {
                    field: "createdAt",
                    order: "desc",
                },
            ],
        },
        filters: {
            initial: [
                {
                    field: "name",
                    operator: "contains",
                    value: undefined,
                },
            ],
        },
        pagination: {
            pageSize: 20,
        },
        meta: {
            gqlQuery: COMPANIES_LIST_QUERY,
        },
    });

    return (
        <div>
        <List
            breadcrumb={false}
            headerButtons={() => (
                <CreateButton
                    onClick={() =>
                        go({
                            to: {
                                resource: "companies",
                                action: "create",
                            },
                            options: { keepQuery: true },
                            type: "replace",
                        })
                    }
                />
            )}
        >
            <Table
                {...tableProps}
                pagination={{ ...tableProps.pagination }}
                locale={{ emptyText: "No companies found." }}
            >
                <Table.Column<Company>
                    dataIndex="name"
                    title="Company Title"
                    defaultFilteredValue={getDefaultFilter("id", filters)}
                    filterIcon={<SearchOutlined />}
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Input placeholder="Search Company" />
                        </FilterDropdown>
                    )}
                    render={(value, record) => (
                        <Space>
                            <CustomAvatar shape="square" name={record.name} src={record.avatarUrl} />
                            <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
                        </Space>
                    )}
                />
                <Table.Column<Company>
                    dataIndex="totalRevenue"
                    title="Open Deals Amount"
                    render={(value, company) => (
                        <Text>
                            {currencyNumber(company?.dealsAggregate?.[0]?.sum?.value || 0)}
                        </Text>
                    )}
                />
                <Table.Column<Company>
                    dataIndex="id"
                    title="Actions"
                    fixed="right"
                    render={(value) => (
                        <Space>
                            <EditButton hideText size="small" recordItemId={value} />
                            <DeleteButton hideText size="small" recordItemId={value} />
                        </Space>
                    )}
                />
            </Table>
        </List>
        {children}
        </div>
    );
};
