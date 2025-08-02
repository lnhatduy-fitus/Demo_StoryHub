import Table from "@/components/Table/Table";
import { user } from "@nextui-org/react";
const columns = [
  { name: 'NAME', id: 'name' },
  { name: 'ROLE', id: 'role' },
  { name: 'STATUS', id: 'status' },
  { name: 'ACTIONS', id: 'actions' },
];
const users = [
  {
    id: 1,
    name: 'Tony Reichert',
    role: 'CEO',
    team: 'Management',
    status: 'active',
    age: '29',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Zoey Lang',
    role: 'Author',
    team: 'Development',
    status: 'paused',
    age: '25',
    email: 'zoey.lang@example.com',
  },
  {
    id: 3,
    name: 'Jane Fisher',
    role: 'Senior Developer',
    team: 'Development',
    status: 'banned',
    age: '22',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
    email: 'jane.fisher@example.com',
  },
  {
    id: 4,
    name: 'William Howard',
    role: 'Community Manager',
    team: 'Marketing',
    status: 'vacation',
    age: '28',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    email: 'william.howard@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'Sales Manager',
    team: 'Sales',
    status: 'active',
    age: '24',
    avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
    email: 'kristen.cooper@example.com',
  },
];

export default function User() {

    return (
        <>
            <Table columns={columns} users={users} />
        </>
    )

}