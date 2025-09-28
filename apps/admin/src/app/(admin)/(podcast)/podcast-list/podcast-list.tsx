"use client";
import ComponentCard from '@/components/common/ComponentCard';
import React from 'react';
import PodcastTable from './podcast-table';


export default function PodcastList() {

  return (
    <ComponentCard title="Podcast List">
       <div>
            <PodcastTable />
       </div>
    </ComponentCard>
  );
}
