import React, { useState, useEffect } from 'react';
import ApiDetails from '../ApiDetails';
import { Table, Input, Select, TablePaginationConfig, Button, Drawer, Popconfirm, message } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { getSessionId } from '../../../utils/utils';
import { Api, Group, SiteUser } from '../../../typings';

import './index.scss';

interface IProps {
  siteUser: SiteUser;
}

const ApiList: React.FC<IProps> = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<Api[]>([]);
  const [groupList, setGroupList] = useState<Group[]>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [regionId, setRegionId] = useState('cn-shanghai');
  const [searchApiName, setSearchApiName] = useState('');
  const [selectedApi, setSelectedApi] = useState<{ api?: Api; group?: Group }>();

  const queryApiList = async () => {
    const sessionId = getSessionId();
    if (!sessionId) return;
    setLoading(true);
    setList([]);
    const res = await fetch(`/api/list?sessionId=${sessionId}&regionId=${regionId}&apiName=${searchApiName}&pageNumber=${pageNumber}&pageSize=${pageSize}`, { method: 'GET' });
    const result = await res.json();
    setList(result?.data?.deployedApis?.deployedApiItem || []);
    setTotal(result?.data?.totalCount);
    setLoading(false);
  };

  const queryAllGroupList = async () => {
    const sessionId = getSessionId();
    if (!sessionId) return;

    setGroupList([]);

    const groupList: Group[] = [];
    // query all groups
    let current = 1;
    let allPageNumber: number;
    const exec = async (pageNumber: number, pageSize: number) => {
      const res = await fetch(`/group/list?sessionId=${sessionId}&regionId=${regionId}&pageNumber=${pageNumber}&pageSize=${pageSize}`, { method: 'GET' });
      const result = await res.json();
      if (result?.data) groupList.push(...result?.data?.apiGroupAttributes?.apiGroupAttribute || []);
      if (!allPageNumber) allPageNumber = Math.ceil(result?.data?.totalCount / pageSize);
      if (pageNumber < allPageNumber) {
        current += 1;
        await exec(current, pageSize);
      }
    }
    await exec(current, 50);
    setGroupList(groupList);
  };

  const onApplyApiAuthorities = async (api: Api) => {
    const sessionId = getSessionId();
    if (!sessionId) return;

    const res = await fetch(`/api/applyAuthorities?sessionId=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupId: api?.groupId,
        apiIds: [api?.apiId],
      }),
    });

    const result = await res.json();
    if (result?.success) {
      message.success('Applied successfully');
    } else {
      message.error(result?.data);
    }

  };

  useEffect(() => {
    if (!groupList) queryAllGroupList();
  }, [groupList]);

  useEffect(() => {
    queryApiList();
  }, [regionId, searchApiName, pageNumber, pageSize]);

  const columns = [
    {
      title: 'API ID',
      dataIndex: 'apiId',
      key: 'apiId',
    },
    {
      title: 'Name',
      dataIndex: 'apiName',
      key: 'apiName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Method',
      dataIndex: 'apiMethod',
      key: 'apiMethod',
      width: 100,
    },
    {
      title: 'Full Path',
      dataIndex: 'apiPath',
      key: 'fullPath',
      render: (apiPath: string, row: Api) => {
        if (row?.groupId && row?.apiPath) {
          const group = groupList?.find(group => group.groupId === row?.groupId);
          // const schema = group?.httpsPolicy?.toLowerCase?.()?.includes?.('https') ? 'https://' : '';
          const basePath = group?.basePath === '/' ? '' : group?.basePath;
          return group ? `${group?.subDomain}${basePath}${apiPath}` : '';
        }
        return '--';
      }
    },
    {
      title: 'Operator',
      dataIndex: 'apiId',
      key: 'operator',
      render: (_apiId: string, row: Api) => {
        return (
          <div className="operator-btn">
            <Popconfirm
              title="Apply Authorities"
              description="Are you sure to apply authorities?"
              onConfirm={() => onApplyApiAuthorities(row)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Apply</Button>
            </Popconfirm>
            <Button onClick={() => {
              const group = groupList?.find(group => group.groupId === row?.groupId);
              setSelectedApi({ api: row, group });
            }}>Details</Button>
          </div>
        );
      }
    },
  ];

  const onRegionChange = (regionId: string) => {
    setRegionId(regionId);
  }

  const onTableChange = (pagination: TablePaginationConfig) => {
    setPageSize(pagination.pageSize || 10);
    setPageNumber(pagination.current || 1);
  }

  return (
    <div className="api-list">
      <div className="toolbar">
        <div className="table-filter">
          <div className="region-selector">
            <div className="label-name">Region</div>
            <Select
              defaultValue="cn-shanghai"
              style={{ width: 120 }}
              onChange={onRegionChange}
              options={[
                { value: 'cn-shanghai', label: 'Shanghai' },
                { value: 'cn-beijing', label: 'Beijing' },
                { value: 'cn-hangzhou', label: 'Hangzhou' },
                { value: 'cn-shenzhen', label: 'Shenzhen' },
                { value: 'cn-hongkong', label: 'Hong Kong' },
                { value: 'ap-southeast-1', label: 'Singapore' },
              ]}
            />
          </div>
          <div className="search-api-name-input">
            <div className="label-name">Api Name</div>
            <Input onChange={(e: { target: { value: string } }) => setSearchApiName(e?.target?.value)} value={searchApiName} />
          </div>
        </div>
        <div className="table-operator">
          <SyncOutlined onClick={() => queryApiList()} />
        </div>
      </div>

      <Table
        loading={loading}
        dataSource={list}
        columns={columns}
        onChange={onTableChange}
        pagination={{ current: pageNumber, pageSize, total }}
        scroll={{ y: 500 }}
      />
      <Drawer
        title={selectedApi?.api?.apiName || ''}
        placement="right"
        size="large"
        onClose={() => setSelectedApi(undefined)}
        open={selectedApi !== undefined}
      >
        <ApiDetails
          group={selectedApi?.group}
          api={selectedApi?.api}
        />
      </Drawer>
    </div>
  );
}

export default ApiList

