import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../../src/components/ui/card"
import { Button } from "../../../src/components/ui/button"
import {
  Table as UserTable,
  TableBody as UserTableBody,
  TableCell as UserTableCell,
  TableHead as UserTableHead,
  TableHeader as UserTableHeader,
  TableRow as UserTableRow,
} from "../../../src/components/ui/table"

export function UsersPage() {
  // Dữ liệu người dùng giả lập
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Editor" },
    { id: 3, name: "Peter Jones", email: "peter.jones@example.com", role: "User" },
    { id: 4, name: "Alice Brown", email: "alice.brown@example.com", role: "User" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage users and their roles in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <UserTable>
          <UserTableHeader>
            <UserTableRow>
              <UserTableHead>ID</UserTableHead>
              <UserTableHead>Name</UserTableHead>
              <UserTableHead>Email</UserTableHead>
              <UserTableHead>Role</UserTableHead>
              <UserTableHead className="text-right">Actions</UserTableHead>
            </UserTableRow>
          </UserTableHeader>
          <UserTableBody>
            {users.map((user) => (
              <UserTableRow key={user.id}>
                <UserTableCell className="font-medium">{user.id}</UserTableCell>
                <UserTableCell>{user.name}</UserTableCell>
                <UserTableCell>{user.email}</UserTableCell>
                <UserTableCell>{user.role}</UserTableCell>
                <UserTableCell className="text-right">
                  {/* Thêm các nút hành động như Edit, Delete */}
                  <Button variant="outline" size="sm" className="mr-2 bg-transparent">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </UserTableCell>
              </UserTableRow>
            ))}
          </UserTableBody>
        </UserTable>
      </CardContent>
    </Card>
  )
}
