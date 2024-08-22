import { fakerZH_CN as faker } from '@faker-js/faker';
import { VTableColumn } from '@/components/v-table/interface';

export const data = Array.from({ length: 100 }, (_, index) => ({
  user_id: index + 1,
  name: faker.person.fullName(),
  age: faker.number.int({ min: 18, max: 65 }),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  sex: faker.number.int({ min: 0, max: 1 }),
  address: faker.location.streetAddress(),
}));

type DataItem = (typeof data)[0];

export const columns: VTableColumn<DataItem>[] = [
  { title: 'ID', key: 'user_id' },
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '邮箱', key: 'email' },
  { title: '电话', key: 'phone' },
  {
    title: '性别',
    key: 'sex',
    render: (row) => {
      return <div>{row.sex === 0 ? '男' : '女'}</div>;
    },
    headerRender: () => {
      return <div>性别12</div>;
    },
  },
  { title: '地址', key: 'address' },
];
