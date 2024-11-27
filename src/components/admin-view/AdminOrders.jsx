import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableHead, TableRow ,TableHeader, TableBody, TableCell} from '../ui/table'
import { Button } from '../ui/button'

export default function AdminOrders() {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Order History</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead><span className='sr-only'>Details</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>324234</TableCell>
            <TableCell>28/4/2007</TableCell>
            <TableCell>In Progress</TableCell>
            <TableCell>$846</TableCell>
            <TableCell><Button>View Detail</Button></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  )
}
