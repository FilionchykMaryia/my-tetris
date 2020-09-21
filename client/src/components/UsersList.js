import React from 'react';

export const UsersList = ({ users }) => {
    if (!users.length) {
        return <p className="center">There are no other players </p>
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Name</th>
                    <th>Max Score</th>
                </tr>
            </thead>

            <tbody style={{color: "rgb(52,104,237)"}}>
                {users.map((user, i) => {
                    return (
                        <tr key={user._id}>
                            <td>{i +1}</td>
                            <td>{user.name}</td>
                            <td>{user.maxScore}</td>
                        </tr>  
                    )
                }) }
                     
            </tbody>
        </table>
    )
}