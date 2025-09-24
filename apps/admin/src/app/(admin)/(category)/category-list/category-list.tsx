"use client";
import ComponentCard from '@/components/common/ComponentCard';
import React from 'react';
import CategoryTable from './category-table';



export default function CategoryList() {

  return (
    <ComponentCard title="Category List">
       <div>
            <CategoryTable />
       </div>
    </ComponentCard>
  );
}
