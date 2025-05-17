
import React from 'react';

interface StatusItem {
  id: string;
  label: string;
  count: number;
  color: string;
}

interface StatusCardProps {
  title: string;
  items: StatusItem[];
  total: number;
}

export const StatusCard: React.FC<StatusCardProps> = ({ title, items, total }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="font-medium text-maint-gray-700">{title}</h3>
      
      <div className="mt-4 space-y-3">
        {items.map(item => {
          const percentage = Math.round((item.count / total) * 100);
          
          return (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-maint-gray-600">{item.label}</span>
                <span className="font-medium">
                  {item.count} <span className="text-maint-gray-400">({percentage}%)</span>
                </span>
              </div>
              
              <div className="w-full bg-maint-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
