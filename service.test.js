const Service = require('./appService');

const service = new Service();

test('Adds user to list', async () => {
  const userName = 'testCase1'
  expect(await service.addUser(userName))
    .toBe(`User ${userName} added.`);
  await service.deleteUser(userName);
});


test('Add duplicate user', async () => {
  const userName = 'testCase2'
  await service.addUser(userName)
  expect(await service.addUser(userName))
    .toBe(`User ${userName} already in list.`)
  await service.deleteUser(userName);
});

test('Delete user', async () => {
  const userName = 'testCase3'
  await service.addUser(userName)
  await service.deleteUser(userName);
  users = await service.readUsers();
  expect(users.includes(userName))
    .toBe(false)
})
