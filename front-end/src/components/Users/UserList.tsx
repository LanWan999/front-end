import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser, changeUserRole } from '../../api/users';
import { User } from '../../types/users';
import { jwtDecode } from 'jwt-decode';

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  const token = localStorage.getItem('token');
  const currentUser = token ? jwtDecode<{ id: string; role: string }>(token) : null;
  const isAdmin = currentUser?.role === 'ADMIN';

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
      fetchUsers();
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'USER' | 'ADMIN'  ) => {
    if (window.confirm(`Change this user's role to ${newRole}?`)) {
      await changeUserRole(userId, newRole);
      fetchUsers();
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }
  

  return (
    <div className="user-list-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {(isAdmin ) && <th>Role</th>}
            {(isAdmin ) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                <Link to={`/users/${user._id}`} className="user-link">
                  {user.name} {user.surname}
                </Link>
              </td>
              <td>{user.email}</td>
              {(isAdmin ) &&
              <td>
                {user.role}
                {user.role === 'ADMIN'}
              </td>
              }
              <td>
                <div className="action-buttons">

                  
                  {isAdmin && user._id !== currentUser?.id && (
                    <>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>

                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value as 'USER' | 'ADMIN' )}
                        className="role-select"
                      >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
