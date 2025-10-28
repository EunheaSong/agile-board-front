import { PriorityIcon } from "../../../components/ui/PriorityIcon";

interface ListItem {
  id: number;
  title: string;
  category: string;
  type: string;
  ticketId: string;
  status: string;
  assignee: string;
  avatar: string;
  priority: string;
}

interface ListPageProps {
  dummyData: ListItem[];
}
export const ListPage = ({ dummyData }: ListPageProps) => {
  return (
    <div className="issues-table-container">
      <table className="issues-table">
        <thead className="table-header">
          <tr>
            <th className="table-header-cell">Type</th>
            <th className="table-header-cell">Ticket ID</th>
            <th className="table-header-cell">Title</th>
            <th className="table-header-cell">Category</th>
            <th className="table-header-cell">Assignee</th>
            <th className="table-header-cell">Priority</th>
            <th className="table-header-cell">Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item) => (
            <tr key={item.id} className="table-row">
              <td className="table-cell">
                <div className={`issue-type-icon-${item.type}`}></div>
              </td>
              <td className="table-cell">{item.ticketId}</td>
              <td className="table-cell">{item.title}</td>
              <td className="table-cell">{item.category}</td>
              <td className="table-cell">{item.assignee}</td>
              <td className="table-cell">
                <PriorityIcon priority={item.priority} />
              </td>
              <td className="table-cell">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
