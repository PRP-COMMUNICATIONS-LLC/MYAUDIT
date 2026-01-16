import React from 'react';
import { ActivityLog, ActivityType } from '../types';
import { FaCheckCircle, FaUserShield, FaExclamationTriangle } from 'react-icons/fa';

interface ActivityFeedItemProps {
  log: ActivityLog;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ log }) => {
  const getLogAppearance = () => {
    switch (log.type) {
      case 'SYSTEM_ACTION':
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          tag: "System Verified",
          borderColor: "border-green-500"
        };
      case 'USER_ACTION':
        return {
          icon: <FaUserShield className="text-blue-500" />,
          tag: "User Approved",
          borderColor: "border-blue-500"
        };
      case 'FLAG_RAISED':
        return {
          icon: <FaExclamationTriangle className="text-red-500" />,
          tag: "System Blocked",
          borderColor: "border-red-500"
        };
      default:
        return {
          icon: null,
          tag: "Log",
          borderColor: "border-gray-300"
        };
    }
  };

  const { icon, tag, borderColor } = getLogAppearance();
  const formattedTimestamp = new Date(log.timestamp).toLocaleString();

  return (
    <div className={`flex items-start p-3 my-2 border-l-4 ${borderColor} bg-gray-50 rounded-r-lg`}>
      <div className="shrink-0 w-6 h-6 mt-1 mr-3">
        {icon}
      </div>
      <div className="grow">
        <p className="text-sm font-semibold text-gray-800">
          <span className="font-bold">{tag}:</span> {log.details}
        </p>
        <p className="text-xs text-gray-500">
          {formattedTimestamp}
        </p>
      </div>
    </div>
  );
};

export default ActivityFeedItem;
