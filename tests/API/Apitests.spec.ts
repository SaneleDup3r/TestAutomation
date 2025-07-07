import { test, expect } from '@playwright/test';


test.describe('Restful booker', () => {
      test('should authenticate with valid credentials', async ({ request }) => {
        const response = await request.post('https://restful-booker.herokuapp.com/auth', {
          data: {
          username: 'admin',
          password: 'password123'
        }
    });
      expect(response.ok()).toBeTruthy();
      const data = await response.json();
      expect(data).toHaveProperty('token');
    });

    test('Get all Booking IDs', async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
    data.forEach((item: any) => {
      expect(item).toHaveProperty('bookingid');
    });
  });

  test('Get Booking by ID', async ({ request }) => {
    const response = await request.get(`https://restful-booker.herokuapp.com/booking/1`);
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('firstname');
  });

  test('Create a new booking', async ({ request }) => {
  const bookingData = {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 123,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-07-07',
      checkout: '2025-07-10'
    },
    additionalneeds: 'Breakfast'
  };

  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: bookingData,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  expect(data).toHaveProperty('bookingid');
  expect(data).toHaveProperty('booking');
  expect(data.booking).toMatchObject(bookingData);
});

test('Update a booking by ID with authentication', async ({ request }) => {
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });
  expect(authResponse.ok()).toBeTruthy();
  const authData = await authResponse.json();
  const token = authData.token;

  const bookingData = {
    firstname: 'Jane',
    lastname: 'Smith',
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
      checkin: '2025-08-01',
      checkout: '2025-08-05'
    },
    additionalneeds: 'Lunch'
  };
  const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: bookingData,
    headers: { 'Content-Type': 'application/json' }
  });
  expect(createResponse.ok()).toBeTruthy();
  const created = await createResponse.json();
  const bookingId = created.bookingid;

  const updatedData = { ...bookingData, firstname: 'Janet', totalprice: 250 };
  const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    data: updatedData,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token}`
    }
  });
  expect(updateResponse.ok()).toBeTruthy();
  const updated = await updateResponse.json();
  expect(updated.firstname).toBe('Janet');
  expect(updated.totalprice).toBe(250);
});

test('Delete a booking by ID with authentication', async ({ request }) => {
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });
  expect(authResponse.ok()).toBeTruthy();
  const authData = await authResponse.json();
  const token = authData.token;

  const bookingData = {
    firstname: 'Delete',
    lastname: 'Me',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-09-01',
      checkout: '2025-09-05'
    },
    additionalneeds: 'None'
  };
  const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: bookingData,
    headers: { 'Content-Type': 'application/json' }
  });
  expect(createResponse.ok()).toBeTruthy();
  const created = await createResponse.json();
  const bookingId = created.bookingid;

  const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${token}`
    }
  });
  expect(deleteResponse.ok()).toBeTruthy();

  const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
  expect(getResponse.status()).toBe(404);
});
});