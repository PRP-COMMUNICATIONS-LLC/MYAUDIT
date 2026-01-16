import React from 'react';
import { AuditLogEntry } from '../../types'; // Ensure central import

interface Props {
  logs: AuditLogEntry[]; // Centralized type handles the timestamp as number
}

const AuditLogView: React.FC<Props> = ({ logs }) => {
  return (
    <div className="space-y-2">
      {logs.map(log => (
        <div key={log.id} className="text-[10px] p-2 bg-slate-800 border-l border-slate-600">
          <span className="text-slate-500 mr-2">
            {new Date(log.timestamp).toLocaleTimeString()} 
          </span>
          <span className="text-blue-400 font-bold uppercase">{log.user}:</span>
          <span className="text-slate-300 ml-2">{log.details}</span>
        </div>
      ))}
    </div>
  );
};

export default AuditLogView;
