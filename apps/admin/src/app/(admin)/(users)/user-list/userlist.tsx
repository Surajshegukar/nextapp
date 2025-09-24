"use client";
import ComponentCard from '@/components/common/ComponentCard';
import React from 'react';
import UserTable from './user-table';

export default function UserList() {

  return (
    <ComponentCard title="User List">
       <div>
            <UserTable />
       </div>
    </ComponentCard>
  );
}
