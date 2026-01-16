import { ActivityLog } from '../types';

const activityLogs: ActivityLog[] = [];

export const logActivity = (log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
  const newLog: ActivityLog = {
    ...log,
    id: `${Date.now()}`,
    timestamp: Date.now(),
  };
  activityLogs.push(newLog);
  console.log('Activity logged:', newLog);
};

export const getActivityLogs = (): ActivityLog[] => {
  return activityLogs.sort((a, b) => b.timestamp - a.timestamp);
};
