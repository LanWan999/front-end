import BookForm from "../../forms/BookForm"
import { getAllUsers, updateUserRole, deleteUser } from '../../api/usersApi'
import { useEffect, useState } from "react";
import DessertsForm from "../../forms/DessertForm";
import DrinksForm from "../../forms/DrinkForm";
import { useBooks } from "../../contexts/BookContext";
import EditBookForm from "../../components/editContent/EditBookForm";
import EditCapybaraForm from "../../components/editContent/EditCapybaraForm";
import api from "../../api";
import { Capybara } from "../../types/capybara";
import EditDessertForm from "../../components/editContent/EditDessertForm";
import CapybaraForm from "../../forms/CapybaraForm";
import EditDrinkForm from "../../components/editContent/EditDrinkForm";
import { Drink } from "../../types/drink";

import styles from "./AdminPage.module.scss"
import ReactConfetti from "react-confetti"
import { User } from "../../types/users";
import UserForm from "../../components/Users/UserForm";
import EditUserForm from "../../components/editContent/EditUserForm";

const AdminPage = () => {

    const [users, setUsers] = useState<User[]>([]);

    const [view, setView] = useState<"menu" | "view users" | "add" | "update" | "delete">("menu");

    const { books, fetchAllBooks } = useBooks()
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null)

    const [capybaras, setCapybaras] = useState<Capybara[]>([])
    const [selectedCapybaraId, setSelectedCapybaraId] = useState<string | null>(null)

    const [desserts, setDesserts] = useState<Capybara[]>([])
    const [selectedDessertId, setSelectedDessertId] = useState<string | null>(null)

    const [drinks, setDrinks] = useState<Drink[]>([])
    const [selectedDrinkId, setSelectedDrinkId] = useState<string | null>(null)

    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);


    useEffect(() => {
        getAllUsers()
            .then((response) => {
                console.log('Users fetched:', response.data);
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error.response || error.message);
            });
        }, []);
    
        const handleRoleChange = (userId: string, newRole: 'USER' | 'ADMIN') => {
            updateUserRole(userId, newRole)
                .then(() => {
                setUsers((prev) =>
                    prev.map((user) =>
                    user._id === userId ? { ...user, role: newRole } : user
                    )
                );
                })
                .catch(console.error);
        };
    
      const handleDeleteUser = (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
          if (window.confirm('This action is irreversible. Confirm again to delete.')) {
            deleteUser(userId)
              .then(() => {
                setUsers((prev) => prev.filter((user) => user._id !== userId));
              })
              .catch(console.error);
            }
        }
    };

    useEffect(() => {
        fetchAllBooks();
    }, [fetchAllBooks]);

    const selectedBook = selectedBookId
    ? books.find((b) => b._id === selectedBookId)
    : null;

    const selectedUser = selectedUserId
    ? users.find((u) => u._id === selectedUserId)
    : null;

    useEffect(() => {
        const fetchCapybaras = async () => {
          try {
            const response = await api.get('/capybaras')
            setCapybaras(response.data)
          } catch (error) {
            console.error('Failed to fetch capybaras:', error)
          }
        }
      
        fetchCapybaras()
    }, [])

    useEffect(() => {
        const fetchDesserts = async () => {
          try {
            const response = await api.get('/desserts')
            setDesserts(response.data)
          } catch (error) {
            console.error('Failed to fetch Desserts:', error)
          }
        }
      
        fetchDesserts()
    }, [])

    useEffect(() => {
        const fetchDrinks = async () => {
          try {
            const response = await api.get('/drinks')
            setDrinks(response.data)
          } catch (error) {
            console.error('Failed to fetch Drinks:', error)
          }
        }
      
        fetchDrinks()
    }, [])

    const [showConfetti, setShowConfetti] = useState(false);

    const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 10000); 
    };

    return (
        <div className={styles.pageContainer}>
            {showConfetti && <ReactConfetti />}
            <div  className={styles.buttonControls}>
                <button onClick={() => setView("view users")} className={styles.viewUsersButton}>View users</button>
                <div className={styles.contentButtons}>
                    <button onClick={() => setView("add")}>Add</button>
                    <button onClick={() => setView("update")}>Update</button>
                    <button onClick={() => setView("delete")}>Delete</button>
                </div>
            </div>
            {view === "view users" && (
                <div>
                    <h2>User Management</h2>
                    <table>
                    <thead>
                        <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                            <select
                                value={user.role}
                                onChange={(e) => {
                                if (user._id) {
                                    handleRoleChange(user._id, e.target.value as 'USER' | 'ADMIN');
                                }
                                }}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                            </td>
                            <td>
                            <button onClick={() => user._id && handleDeleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                    <UserForm />
                    <h2>Edit User</h2>
                    <select
                    value={selectedUserId ?? ''}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSelectedUserId(value === '' ? null : value);
                    }}
                    >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                        {user.name}
                        </option>
                    ))}
                    </select>
                    {selectedUserId && selectedUser && (
                        <EditUserForm id={selectedUserId} onCancel={() => setSelectedUserId(null)} />
                    )}
                </div>
            )}

            {view === "add" && (
                <div className={styles.contentContainer}>
                    <h2>Add Content</h2>
                    <h3>Add Book</h3>
                    <BookForm onSuccess={triggerConfetti}/>
                    <h3>Add Dessert</h3>
                    <DessertsForm />
                    <h3>Add Drink</h3>
                    <DrinksForm />
                    <h3>Add Capybara</h3>
                    <CapybaraForm />
                </div>
            )}

            {view === "update" && (
            <div className={styles.contentContainer}>
                <h2>Edit Book</h2>
                <select
                value={selectedBookId ?? ''}
                onChange={(e) => {
                    const value = e.target.value;
                    setSelectedBookId(value === '' ? null : value);
                }}
                >
                <option value="">Select a book</option>
                {books.map((book) => (
                    <option key={book._id} value={book._id}>
                    {book.title}
                    </option>
                ))}
                </select>
                {selectedBookId && selectedBook && (
                    <EditBookForm id={selectedBookId} onCancel={() => setSelectedBookId(null)} />
                )}

                <h2>Edit Dessert</h2>
                <select
                value={selectedDessertId ?? ''}
                onChange={(e) => {
                    const value = e.target.value;
                    setSelectedDessertId(value === '' ? null : value);
                }}
                >
                <option value="">Select a dessert</option>
                {desserts.map((dessert) => (
                    <option key={dessert._id} value={dessert._id}>
                    {dessert.name}
                    </option>
                ))}
                </select>
                {selectedDessertId && <EditDessertForm id={selectedDessertId} onCancel={() => setSelectedDessertId(null)}/>}

                <h2>Edit Drink</h2>
                <select
                value={selectedDrinkId ?? ''}
                onChange={(e) => {
                    const value = e.target.value;
                    setSelectedDrinkId(value === '' ? null : value);
                }}
                >
                <option value="">Select a drink</option>
                {drinks.map((drink) => (
                    <option key={drink._id} value={drink._id}>
                    {drink.name}
                    </option>
                ))}
                </select>
                {selectedDrinkId && <EditDrinkForm id={selectedDrinkId} onCancel={() => setSelectedDrinkId(null)}/>}

                <h2>Edit Capybara</h2>
                <select
                value={selectedCapybaraId ?? ''}
                onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCapybaraId(value === '' ? null : value);
                }}
                >
                <option value="">Select a capybara</option>
                {capybaras.map((capybara) => (
                    <option key={capybara._id} value={capybara._id}>
                    {capybara.name}
                    </option>
                ))}
                </select>
                {selectedCapybaraId && <EditCapybaraForm id={selectedCapybaraId} onCancel={() => setSelectedCapybaraId(null)}/>}
            </div>
            )}

            {view === "delete" && (
            <div className={styles.contentContainer}>
                <h2>Delete Book</h2>
                <select
                value={selectedBookId ?? ''}
                onChange={(e) => {
                    const value = e.target.value;
                    setSelectedBookId(value === '' ? null : value);
                }}
                >
                <option value="">Select a book</option>
                {books.map((book) => (
                    <option key={book._id} value={book._id}>
                    {book.title}
                    </option>
                ))}
                </select>
                {selectedBookId && (
                <button
                    onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this book?")) {
                        try {
                        await api.delete(`/books/${selectedBookId}`);
                        fetchAllBooks();
                        setSelectedBookId(null);
                        } catch (error) {
                        console.error("Failed to delete book:", error);
                        }
                    }
                    }}
                >
                    Delete Book
                </button>
                )}

                <h2>Delete Dessert</h2>
                <select
                value={selectedDessertId ?? ''}
                onChange={(e) => {
                    const value = e.target.value;
                    setSelectedDessertId(value === '' ? null : value);
                }}
                >
                <option value="">Select a dessert</option>
                {desserts.map((dessert) => (
                    <option key={dessert._id} value={dessert._id}>
                    {dessert.name}
                    </option>
                ))}
                </select>
                {selectedDessertId && (
                <button
                    onClick={async () => {
                    if (window.confirm("Delete this dessert?")) {
                        try {
                        await api.delete(`/desserts/${selectedDessertId}`);
                        setDesserts((prev) => prev.filter(d => d._id !== selectedDessertId));
                        setSelectedDessertId(null);
                        } catch (err) {
                        console.error("Failed to delete dessert:", err);
                        }
                    }
                    }}
                >
                    Delete Dessert
                </button>
                )}

                <h2>Delete Drink</h2>
                <select
                value={selectedDrinkId ?? ''}
                onChange={(e) => {
                    const value = e.target.value;
                    setSelectedDrinkId(value === '' ? null : value);
                }}
                >
                <option value="">Select a drink</option>
                {drinks.map((drink) => (
                    <option key={drink._id} value={drink._id}>
                    {drink.name}
                    </option>
                ))}
                </select>
                {selectedDrinkId && (
                <button
                    onClick={async () => {
                    if (window.confirm("Delete this drink?")) {
                        try {
                        await api.delete(`/drinks/${selectedDrinkId}`);
                        setDrinks((prev) => prev.filter(d => d._id !== selectedDrinkId));
                        setSelectedDrinkId(null);
                        } catch (err) {
                        console.error("Failed to delete drink:", err);
                        }
                    }
                    }}
                >
                    Delete Drink
                </button>
                )}

                <h2>Delete Capybara</h2>
                <select
                value={selectedCapybaraId ?? ''}
                onChange={(e) => {
                    const value = e.target.value;
                    setSelectedCapybaraId(value === '' ? null : value);
                }}
                >
                <option value="">Select a capybara</option>
                {capybaras.map((capy) => (
                    <option key={capy._id} value={capy._id}>
                    {capy.name}
                    </option>
                ))}
                </select>
                {selectedCapybaraId && (
                <button
                    onClick={async () => {
                    if (window.confirm("Delete this capybara?")) {
                        try {
                        await api.delete(`/capybaras/${selectedCapybaraId}`);
                        setCapybaras((prev) => prev.filter(c => c._id !== selectedCapybaraId));
                        setSelectedCapybaraId(null);
                        } catch (err) {
                        console.error("Failed to delete capybara:", err);
                        }
                    }
                    }}
                >
                    Delete Capybara
                </button>
                )}
            </div>
            )}


        </div>
    )
}

export default AdminPage