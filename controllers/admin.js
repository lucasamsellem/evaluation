// Accessible only to logged in users
export function getDashboard(req, res) {
  res.render('dashboard');
}

// Only to logged in admin users
export function getAdmin(req, res) {
  res.render('admin');
}
