async function testApi() {
  console.log('Testing Health Check...');
  const health = await fetch('http://localhost:8787/api/health').then(r => r.json());
  console.log('Health:', health);

  console.log('\nTesting Invalid Submission...');
  const invalidRes = await fetch('http://localhost:8787/api/forms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ full_name: 'John' }) // missing fields
  });
  console.log('Invalid Submit Status:', invalidRes.status, await invalidRes.json());

  console.log('\nTesting Valid Submission...');
  const validData = {
    full_name: 'John Doe',
    fathers_name: 'Richard Doe',
    mothers_name: 'Jane Doe',
    date_of_birth: '1995-01-01',
    gender: 'Male',
    marital_status: 'Single',
    email: 'john@example.com',
    mobile_number: '9876543210',
    alternate_mobile_number: '',
    full_address: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra',
    pin_code: '400001',
    country: 'India',
    qualification_10th: 'CBSE',
    percentage_10th: '90%',
    qualification_12th: 'CBSE',
    percentage_12th: '85%',
    graduation_qualification: 'B.Tech',
    college_university: 'IIT Bombay',
    passing_year: '2017',
    current_occupation: 'Software Engineer',
    company_name: 'Tech Corp',
    designation: 'Senior Developer',
    work_experience: '5 years',
    annual_salary: '',
    profile_photo_url: '',
    skills: 'JavaScript, React, Node.js',
    hobbies: 'Reading, Coding',
    about_yourself: 'I love building things.',
    terms_accepted: true
  };

  const validRes = await fetch('http://localhost:8787/api/forms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validData)
  });
  console.log('Valid Submit Status:', validRes.status, await validRes.json());

  console.log('\nTesting Fetch Records...');
  const recordsRes = await fetch('http://localhost:8787/api/forms').then(r => r.json());
  console.log('Records Found:', recordsRes.records.length);
  if (recordsRes.records.length > 0) {
    console.log('First Record Name:', recordsRes.records[0].full_name);
  }
}

testApi().catch(console.error);
