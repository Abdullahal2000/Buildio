import React, { useState, useEffect } from 'react';
import styles from './users.module.css';

function Usersdish() {
  const [error1, setError1] = useState(null);
  const [users, setUsers] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const getallusers = async () => {
      try {
        const response = await fetch('/api/getallusers', {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const jsonData = await response.json();
        setUsers(jsonData);
      } catch (error) {
        setError1(error.message);
      }
    };

    if (!fetched) {
      getallusers();
      setFetched(true);
    }
  }, []);

  return (
    <>
      <section className={styles.sec}>
        <h2>Users</h2>
        <p> this table shows all users</p>
        {error1 ? (
          <p>Error: {error1}</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>user Name</th>
                <th>email</th>
                <th>userype</th>
                <th>phone</th>
                <th>address</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => user.userype === 'user')
                .map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.userype}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

export default Usersdish;
