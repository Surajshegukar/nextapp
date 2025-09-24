"use client";
import ComponentCard from '@/components/common/ComponentCard';
import React from 'react';
import DepartmentTable from './department-table';


export default function DepartmentList() {

  return (
    <ComponentCard title="Department List">
       <div>
            <DepartmentTable />
       </div>
    </ComponentCard>
  );
}
