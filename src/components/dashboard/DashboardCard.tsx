
import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  bgColor?: string;
  textColor?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  trend,
  bgColor = 'bg-white',
  textColor = 'text-maint-gray-800',
}) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-5 ${textColor}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-maint-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs ${trend.isPositive ? 'text-maint-teal' : 'text-red-500'}`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span className="text-xs text-maint-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-full bg-maint-gray-100 text-maint-blue">
          {icon}
        </div>
      </div>
    </div>
  );
};
