import React, { useState, useEffect } from 'react';
import ApiDetails from '../ApiDetails';
import delay from 'lodash/delay';
import { getSessionId } from '../../../utils/utils';
import { Table, TablePaginationConfig, Button, Drawer, Popconfirm, message, Input } from 'antd';
import { Api, Group, SiteUser } from '../../../typings';
import { SyncOutlined } from '@ant-design/icons';

import './index.scss';

interface IProps {
  siteUser: SiteUser;
}

const AuthorizedApiList: React.FC<IProps> = (props) => {

  const { siteUser } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<Api[]>([]);
  const [groupList, setGroupList] = useState<Group[]>();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchApiName, setSearchApiName] = useState('');
  const [selectedApi, setSelectedApi] = useState<{ api?: Api; group?: Group }>();

  const queryApiList = async () => {
    const sessionId = getSessionId();
    if (!sessionId) return;

    setLoading(true);
    setList([]);
    setGroupList([]);

    const res = await fetch(`/app/apis?sessionId=${sessionId}&appId=${siteUser?.appId}&apiName=${searchApiName}&pageNumber=${pageNumber}&pageSize=${pageSize}`, { method: 'GET' });
    const result = await res.json();

    const list: Api[] = result?.data?.appApiRelationInfos?.appApiRelationInfo || [];
    setList(list);
    setTotal(result?.data?.totalCount || 0);

    const regions: string[] = [];
    list.forEach((api) => {
      if (!regions.includes(api.regionId)) regions.push(api.regionId);
    });

    const groups: Group[] = [];
    for (let i = 0; i < regions.length; i++) {
      const tmp = await queryAllGroupList(regions[i]);
      if (tmp?.length > 0) groups.push(...tmp);
    }
    setGroupList(groups);
    setLoading(false);

  };

  const queryAllGroupList = async (regionId: string) => {
    const sessionId = getSessionId();
    if (!sessionId) return [];

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
    return groupList;
  };

  useEffect(() => {
    queryApiList();
  }, [searchApiName, pageNumber, pageSize]);

  const onRemoveApiAuthorities = async (api: Api) => {
    const sessionId = getSessionId();
    if (!sessionId) return;

    const res = await fetch(`/api/removeAuthorities?sessionId=${sessionId}`, {
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
      delay(() => {
        queryApiList();
        message.success('Removed successfully');
      }, 1000);
    } else {
      message.error(result?.data);
    }

  };

  const columns = [
    {
      title: 'Region',
      dataIndex: 'regionId',
      key: 'regionId',
    },
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
      dataIndex: 'method',
      key: 'method',
      width: 100,
    },
    {
      title: 'Full Path',
      dataIndex: 'path',
      key: 'fullPath',
      render: (apiPath: string, row: Api) => {
        if (row?.groupId && row?.path) {
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
              title="Remove Authorities"
              description="Are you sure to remove authorities?"
              onConfirm={() => onRemoveApiAuthorities(row)}
              okText="Yes"
              cancelText="No"
            >
              <Button>Remove</Button>
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

  const onTableChange = (pagination: TablePaginationConfig) => {
    setPageSize(pagination.pageSize || 10);
    setPageNumber(pagination.current || 1);
  }

  return (
    <div className="authorized-api-list">
      <div className="toolbar">
        <div className="table-filter">
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

export default AuthorizedApiList

