// async-evolution.js
function fetchUserCallback(id, callback) {
  setTimeout(() => {
    callback(null, { id, name: 'Ana' });
  }, 1000);
}
 
fetchUserCallback(1, (err, user) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Callback result:', user);
});

// version 2
function fetchUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, name: 'Ana' });
    }, 1000);
  });
}
 
fetchUserPromise(2)
  .then(user => console.log('Promise result:', user))
  .catch(err => console.error('Error:', err));

// version 3
async function main() {
  try {
    const user = await fetchUserPromise(3);
    console.log('async/await result:', user);
  } catch (err) {
    console.error('Error:', err);
  }
}
 
main();
